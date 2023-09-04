/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EChartsOption, SetOptionOpts } from 'echarts';
import { BarChart, LineChart } from 'echarts/charts';
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import useResize from 'hooks/useResize';

echarts.use([
  BarChart,
  LineChart,
  DataZoomComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GraphicComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export interface EchartsEventFunction {
  eventName: string;
  query?: string | object;
  handler: (param: echarts.ECElementEvent) => void;
}

interface Props {
  option: EChartsOption;
  eventFunctions?: EchartsEventFunction[];
  settings?: SetOptionOpts;
  style?: CSSProperties;
  group?: string;
}

const ReactECharts: React.FC<Props> = ({ option, style, group, settings = {}, eventFunctions }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [width, height] = useResize(chartRef);
  const [echart, setEchart] = useState<echarts.ECharts | undefined>(undefined);

  useEffect(() => {
    if (chartRef.current && !echart) {
      const chart = echarts.init(chartRef.current, null, { renderer: 'canvas', useDirtyRect: false });
      for (const eventFunc of eventFunctions ?? []) {
        chart.on(eventFunc.eventName, eventFunc.query, eventFunc.handler);
      }
      chart.getZr().on('dblclick', () => {
        chart.dispatchAction({ type: 'dataZoom', start: 0, end: 100 });
      });
      if (group) {
        chart.group = group;
        echarts.connect(group);
      }
      setEchart(chart);
    }

    return () => {
      echart?.dispose();
    };
  }, [echart, group, eventFunctions]);

  useEffect(() => {
    echart?.resize({ width, height });
  }, [echart, height, width]);

  useEffect(() => {
    echart?.setOption(option, {
      ...settings,
      notMerge: false,
      replaceMerge: ['xAxis', 'yAxis', 'series'],
    });
  }, [echart, option, settings]);

  return (
    <div
      ref={chartRef}
      style={{
        height: '100%',
        position: 'relative',
        width: '100%',
        ...style,
      }}
    />
  );
};

export default ReactECharts;
