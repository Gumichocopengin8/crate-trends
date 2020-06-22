/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import moment from 'moment';
import _zip from 'lodash.zip';
import { Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Downloads } from 'interfaces/downloads';

interface Props {
  downloadsData: Downloads[];
}

interface CustomUniformedData {
  date: string;
  downloads: number;
}

interface ChartData {
  date: string;
  [x: string]: number | string;
}

const DownloadChart = ({ downloadsData }: Props): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const cratesNames = String(crate_names).split('+');

  const uniformedData: ChartData[][] = downloadsData
    .map((data) => {
      const start = moment().subtract(90, 'days');
      const end = moment();
      while (start.unix() < end.unix()) {
        // fill missing date data
        data.version_downloads.push({ date: start.format('YYYY-MM-DD'), downloads: 0, version: 0 });
        start.add(1, 'days');
      }

      const dates = data.version_downloads.map((v) => v.date);
      return Array.from(new Set(dates))
        .map((date) =>
          data.version_downloads
            .map((download) => {
              if (date === download.date) return download;
              else return;
            })
            .filter((v) => v)
            .reduce((uniformedDateData, currentValue) => {
              if (uniformedDateData.date === currentValue.date) {
                uniformedDateData = {
                  date: currentValue.date,
                  downloads: uniformedDateData.downloads + currentValue.downloads,
                };
              } else {
                uniformedDateData = { date: currentValue.date, downloads: currentValue.downloads };
              }
              return uniformedDateData;
            }, {} as CustomUniformedData)
        )
        .sort((a: CustomUniformedData, b: CustomUniformedData) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        });
    })
    .map((data, i) => {
      // modifiy data type for chart
      return data.map((nd) => {
        return { date: nd.date, [cratesNames[i]]: nd.downloads };
      });
    });

  // zip to have all crates in an object
  const chartData = _zip(...uniformedData).map((v) => Object.assign({}, ...v));

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <Typography variant="h6" component="h3" gutterBottom>
        Recent Daily Downloads (90days)
      </Typography>
      <Typography variant="caption" gutterBottom>
        Currently plot chart of first crate
      </Typography>
      <CrateDownloadChart>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {cratesNames.map((crateName) => (
              <Line
                key={crateName}
                type="monotone"
                dataKey={crateName}
                name={crateName}
                stroke={generateRandomColor()}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CrateDownloadChart>
    </>
  );
};

const CrateDownloadChart = styled.div`
  width: 100%;
  height: 45vh;
`;

export default DownloadChart;
