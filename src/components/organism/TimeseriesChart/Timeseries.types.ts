import { ITimeseriesResponse } from "../PerformanceChart/PerformanceChart.types";

export interface ITimeseriesChartProps {
  data?: ITimeseriesResponse;
  metric: string;
  onMetricChange: (metric: string) => void;
  isLoading?: boolean;
}