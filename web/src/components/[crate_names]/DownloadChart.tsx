/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
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
  const [perfJs, setPerfJs] = useState<number>(0);
  const [perfRs, setPerfRs] = useState<number>(0);

  const uniformedData: ChartData = useMemo(() => {
    const t1 = performance.now();
    const dates: string[] = [];
    let start = dayjs().subtract(89, 'day'); // for 90 days
    const end = dayjs();
    while (start.unix() <= end.unix()) {
      dates.push(start.format('YYYY-MM-DD'));
      start = start.add(1, 'day');
    }

    // Map<crateName, Map<date, downlowd num>>
    const map: Map<string, Map<string, number>> = new Map();
    crateDownloadDataResults.forEach((d, index) => {
      const vMap: Map<string, number> = new Map();
      for (const date of dates) {
        vMap.set(date, 0);
      }
      for (const v of d.version_downloads) {
        vMap.set(v.date, (vMap.has(v.date) ? vMap.get(v.date) : 0) + v.downloads);
      }
      map.set(crateNames[index], vMap);
    });
    const data = {
      dates: dates,
      data: crateNames.map((name) => {
        const m = map.get(name);
        return { name, downloads: map.has(name) ? Array.from(m.values()) : [] };
      }),
    };
    const t2 = performance.now();
    setPerfJs(t2 - t1);
    console.log('uniformedData', t2 - t1);
    return data;
  }, [crateNames, crateDownloadDataResults]);

  const uniformedData2: ChartData = useMemo(() => {
    const t1 = performance.now();
    const data: ChartData = JSON.parse(uniform_data(crateNames, JSON.stringify(crateDownloadDataResults)));
    const t2 = performance.now();
    setPerfRs(t2 - t1);
    console.log('uniformedData2', t2 - t1);
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

  const option2: EChartsOption = {
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
    xAxis: { type: 'category', boundaryGap: true, data: uniformedData2.dates },
    yAxis: { type: 'value' },
    series: uniformedData2.data.map((d) => ({ data: d.downloads, name: d.name, type: 'line' })),
  };

  return (
    <section>
      <Typography variant="h6" component="h3" gutterBottom>
        Recent Daily Downloads (90days)
      </Typography>
      <div>JS: {perfJs} ms</div>
      <div>Rust: {perfRs} ms</div>
      <div css={CrateDownloadChart}>
        <>
          {isWasmLoaded && <ReactECharts option={option} />}
          <ReactECharts option={option2} />
        </>
      </div>
    </section>
  );
};

const CrateDownloadChart = css`
  width: 100%;
  height: 45vh;
`;

export default DownloadChart;
