export interface ITimeseriesDataPoint {
  label: string;
  value: number;
}

export interface ITimeseriesResponse {
  metric: string;
  interval: "day" | "month";
  points: ITimeseriesDataPoint[];
}

export interface IPerformanceChartProps {
  data?: ITimeseriesResponse;
  isLoading?: boolean;
}