export interface ITimeseriesDataPoint {
  label: string;
  value: number;
}

export interface ITimeseriesResponse {
  metric: string;
  interval: "day" | "month";
  points: ITimeseriesDataPoint[];
}

export interface IChartBreakdownPoint {
  label: string;
  value: number;
}

// The shared API fetcher unwraps the backend envelope, so breakdown calls
// receive this point array directly rather than the outer response object.
export type IChartBreakdownResponse = IChartBreakdownPoint[];

export interface IChartTopPoint {
  id: string;
  name: string;
  sku: string;
  category: string;
  value: number;
}

// The API fetcher unwraps the response envelope, so this is the array used by
// the top-products chart after the request completes.
export type IChartTopResponse = IChartTopPoint[];
