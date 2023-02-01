import type { EChartsOption, SetOptionOpts } from 'echarts';
import { BarChart, LineChart } from 'echarts/charts';
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
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
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

interface Props {
  onClick?: (param: echarts.ECElementEvent) => void;
  option: EChartsOption;
  settings?: SetOptionOpts;
  style?: CSSProperties;
}

const ReactECharts: React.FC<Props> = ({ option, style, settings = {}, onClick }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [width, height] = useResize(chartRef);
  const [echart, setEchart] = useState<echarts.ECharts | undefined>(undefined);

  useEffect(() => {
    if (chartRef.current && !echart) {
      const chart = echarts.init(chartRef.current, null, { renderer: 'canvas', useDirtyRect: false });
      chart.on('click', onClick ?? (() => undefined));
      setEchart(chart);
    }

    return () => {
      echart?.dispose();
    };
  }, [echart, onClick]);

  useEffect(() => {
    echart?.resize({ width, height });
  }, [echart, height, width]);

  useEffect(() => {
    echart?.setOption(option, { ...settings, notMerge: false });
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
