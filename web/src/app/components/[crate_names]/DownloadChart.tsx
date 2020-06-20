import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Downloads } from 'interfaces/downloads';

interface Props {
  downloadsData: Downloads[];
}

const DownloadChart = ({ downloadsData }: Props): JSX.Element => {
  const router = useRouter();
  const { crate_names } = router.query;
  const cratesNames = String(crate_names).split('+');

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
      <CrateDownloadChart>
        <ResponsiveContainer>
          <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {downloadsData.map((data, i) => (
              <Line
                key={i}
                type="monotone"
                data={data.version_downloads}
                dataKey="downloads"
                name={cratesNames[i]}
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
