/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { JSX, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import ReactECharts from 'components/echarts/ReactEChart';
import type { EChartsOption } from 'echarts';
import { uniform_data } from 'web_assembly/pkg/web_assembly';
import { useCrateDownloadDataResultsQuery } from 'api';
import ChartSkelton from 'components/skelton/chart/ChartSkelton';
import wasmInitializer from 'web_assembly/pkg';

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
  const [isWasmLoaded, setIsWasmLoaded] = useState<boolean>(false);
  const { crateDownloadDataResults, isLoading } = useCrateDownloadDataResultsQuery(crateNames);
  const uniformedData: ChartData = useMemo(() => {
    if (!isWasmLoaded) {
      return { dates: [], data: [] };
    }
    const t1 = performance.now();
    const data: ChartData = JSON.parse(uniform_data(crateNames, JSON.stringify(crateDownloadDataResults ?? [])));
    const t2 = performance.now();
    console.log(t2 - t1);
    return data;
  }, [isWasmLoaded, crateNames, crateDownloadDataResults]);

  // load wasm (web assembly)
  useEffect(() => {
    let ignore = false;
    const loadWasm = async () => {
      if (ignore) {
        return;
      }
      try {
        await wasmInitializer();
        setIsWasmLoaded(true);
      } catch {
        setIsWasmLoaded(false);
      }
    };
    loadWasm();
    return () => {
      ignore = true;
    };
  }, []);

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

  // TODO: remove this when swr supports React Suspense
  if (isLoading) {
    return <ChartSkelton />;
  }

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
  height: clamp(380px, 45vh, 400px);
`;

export default DownloadChart;
