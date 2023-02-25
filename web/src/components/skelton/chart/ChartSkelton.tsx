import { Typography } from '@mui/material';
import { css } from '@emotion/react';
import { EChartsOption } from 'echarts';
import ReactECharts from 'components/echarts/ReactEChart';

const option: EChartsOption = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'Loading',
          fontSize: '4rem',
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#e33b26',
          lineWidth: 1,
        },
        keyframeAnimation: {
          duration: 4000,
          loop: true,
          keyframes: [
            {
              percent: 0.5,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0],
              },
            },
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
              },
            },
            {
              percent: 1,
              style: {
                fill: '#e33b26',
              },
            },
          ],
        },
      },
    ],
  },
};

const ChartSkelton = () => {
  return (
    <section>
      <Typography variant="h6" component="h3" gutterBottom>
        Recent Daily Downloads (90days)
      </Typography>
      <div css={CrateDownloadChart}>
        <ReactECharts option={option} />
      </div>
    </section>
  );
};

const CrateDownloadChart = css`
  width: 100%;
  height: 45vh;
`;

export default ChartSkelton;
