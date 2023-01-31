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
import React, { useEffect, useRef } from 'react';
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
  const [height, width] = useResize(chartRef);

  useEffect(() => {
    console.log(height, width);
    const echart: echarts.ECharts | undefined = (() => {
      if (chartRef.current) {
        const chart = echarts.init(chartRef.current, null, {
          height: height,
          renderer: 'canvas',
          useDirtyRect: false,
          width: width,
        });
        chart.on('click', onClick ?? (() => undefined));

        return chart;
      }
      return undefined;
    })();

    echart?.resize();

    return () => {
      echart?.dispose();
    };
  }, [height, onClick, width]);

  useEffect(() => {
    if (chartRef.current) {
      const echart = echarts.getInstanceByDom(chartRef.current);
      echart?.setOption(option, { ...settings, notMerge: true }); // notMerge should be true
    }
  }, [option, settings]);

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
