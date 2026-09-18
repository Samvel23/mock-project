import type {
  IChartBreakdownResponse,
  IChartTopResponse,
  ITimeseriesResponse,
} from "@/features/dashboard/types/chart.types";

export type TChartMetric = "count" | "unitsSold" | "revenue";
export type TTopMetric = "unitsSold" | "revenue";

export interface IDashboardChartsProps {
  initialTimeseries?: ITimeseriesResponse;
  initialBreakdown?: IChartBreakdownResponse;
  initialTopProducts?: IChartTopResponse;
}
