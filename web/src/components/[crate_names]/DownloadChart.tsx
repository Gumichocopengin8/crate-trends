/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { crateDownloadDataResultsState } from 'recoil/atoms';
import { Typography } from '@mui/material';
import ReactECharts from 'components/echarts/ReactEChart';
import type { EChartsOption } from 'echarts';
import { uniform_data } from 'web_assembly/pkg/web_assembly';
import { wasmInitSelector } from 'recoil/selectors';

interface Props {
  crateNames: string[];
}

// date and downloads array length must be equal
interface ChartData {
  dates: string[];
  data: {
    name: string;
    downloads: number[];
  }[];
}

const DownloadChart = ({ crateNames }: Props): JSX.Element => {
  const crateDownloadDataResults = useRecoilValue(crateDownloadDataResultsState(crateNames));
  const isWasmLoaded = useRecoilValue(wasmInitSelector);

  const uniformedData: ChartData = useMemo(() => {
    const t1 = performance.now();
    const data: ChartData = JSON.parse(uniform_data(crateNames, JSON.stringify(crateDownloadDataResults)));
    const t2 = performance.now();
    console.log(t2 - t1);
    return data;
  }, [crateNames, crateDownloadDataResults]);

  const option: EChartsOption = {
    animation: false,
    dataZoom: [
      { realtime: true, show: true, type: 'slider' },
      { realtime: true, show: true, type: 'inside', zoomLock: true },
    ],
    tooltip: { trigger: 'axis' },
    legend: { data: crateNames, type: 'scroll', padding: [8, 200, 0, 0], left: '10%' },
    toolbox: {
      feature: {
        dataZoom: { yAxisIndex: 'none' },
        dataView: { readOnly: true },
        magicType: { type: ['line', 'bar'] },
        saveAsImage: {},
      },
    },
    grid: { left: 80, right: 80 },
    xAxis: { type: 'category', boundaryGap: true, data: uniformedData.dates },
    yAxis: { type: 'value' },
    series: uniformedData.data.map((d) => ({ data: d.downloads, name: d.name, type: 'line' })),
  };

  return (
    <section>
      <Typography variant="h6" component="h3" gutterBottom>
        Recent Daily Downloads (90days)
      </Typography>
      <div css={CrateDownloadChart}>
        <>{isWasmLoaded && <ReactECharts option={option} />}</>
      </div>
    </section>
  );
};

const CrateDownloadChart = css`
  width: 100%;
  height: 45vh;
`;

export default DownloadChart;
