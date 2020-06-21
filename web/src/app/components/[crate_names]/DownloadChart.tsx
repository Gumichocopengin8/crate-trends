/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
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

const DownloadChart = ({ downloadsData }: Props): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const cratesNames = String(crate_names).split('+');

  /*
    TODO
    When attempt to plot 2 or more charts, it doesnt plot as expected.
    I tried to fill missing dates, but not working
    No need to use the following code. it is a cue to fix this issue
  */

  // const uniformedData: CustomUniformedData[][] = downloadsData.map((data) => {
  //   const dates = data.version_downloads.map((v) => v.date);
  //   return Array.from(new Set(dates))
  //     .map((date) =>
  //       data.version_downloads
  //         .map((download) => {
  //           if (date === download.date) return download;
  //           else return;
  //         })
  //         .filter((v) => v)
  //         .reduce((uniformedDateData, currentValue) => {
  //           if (uniformedDateData.date === currentValue.date) {
  //             uniformedDateData = {
  //               date: currentValue.date,
  //               downloads: uniformedDateData.downloads + currentValue.downloads,
  //             };
  //           } else {
  //             uniformedDateData = { date: currentValue.date, downloads: currentValue.downloads };
  //           }
  //           return uniformedDateData;
  //         }, {} as CustomUniformedData)
  //     )
  //     .sort((a: CustomUniformedData, b: CustomUniformedData) => {
  //       if (a.date < b.date) {
  //         return -1;
  //       }
  //       if (a.date > b.date) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  // });

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
      <Typography variant="h6" gutterBottom>
        Recent Download Chart (90days)
      </Typography>
      <Typography variant="caption" gutterBottom>
        Currently plot chart of first crate
      </Typography>
      <CrateDownloadChart>
        <ResponsiveContainer>
          <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              data={downloadsData[0].version_downloads}
              dataKey="downloads"
              name={cratesNames[0]}
              stroke={generateRandomColor()}
              activeDot={{ r: 8 }}
            />
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
