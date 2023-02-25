/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { crateDownloadDataResultsState } from 'recoil/atoms';
import { Typography } from '@mui/material';
import ReactECharts from 'components/echarts/ReactEChart';
import type { EChartsOption } from 'echarts';

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

  const uniformedData: ChartData = useMemo(() => {
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

    return {
      dates: dates,
      data: crateNames.map((name) => {
        const m = map.get(name);
        return { name, downloads: map.has(name) ? Array.from(m.values()) : [] };
      }),
    };
  }, [crateNames, crateDownloadDataResults]);

  const option: EChartsOption = {
    animation: false,
    dataZoom: [
      { realtime: true, show: true, type: 'slider' },
      { realtime: true, show: true, type: 'inside', zoomLock: true },
    ],
    tooltip: { trigger: 'axis' },
    legend: { data: crateNames, type: 'scroll' },
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
        <ReactECharts option={option} />
      </div>
    </section>
  );
};

const CrateDownloadChart = css`
  width: 100%;
  height: 45vh;
`;

export default DownloadChart;
