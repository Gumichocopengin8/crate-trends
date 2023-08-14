import ReactECharts from 'components/echarts/ReactEChart';
import { Version } from 'interfaces/crate';
import { css } from '@emotion/react';
import prettyBytes from 'pretty-bytes';
import type { EChartsOption } from 'echarts';
import { Typography } from '@mui/material';
import { useMemo } from 'react';

interface Props {
  versionList: Version[];
}

const CrateSizeChart = ({ versionList }: Props): JSX.Element => {
  const option: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: (val) => prettyBytes(Number(val)),
      },
      xAxis: {
        type: 'category',
        data: versionList.map((version) => version.num),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (val) => prettyBytes(Number(val)),
        },
      },
      series: [
        {
          data: versionList.map((version) => version?.crate_size ?? 0),
          type: 'bar',
        },
      ],
      dataZoom: [
        { realtime: true, show: true, type: 'slider' },
        { realtime: true, show: true, type: 'inside', zoomLock: true },
      ],
    };
  }, [versionList]);

  return (
    <div>
      <Typography variant="subtitle1">Crate Size Transition</Typography>
      <div css={SizeChart}>
        <ReactECharts option={option} />
      </div>
    </div>
  );
};

const SizeChart = css`
  width: 100%;
  height: clamp(380px, 45vh, 400px);
`;

export default CrateSizeChart;
