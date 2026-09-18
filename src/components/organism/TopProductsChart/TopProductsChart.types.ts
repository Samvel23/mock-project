import { IChartTopResponse } from "@/features/dashboard/types/chart.types";

export type TTopMetric = "unitsSold" | "revenue";

export interface ITopProductsChartProps {
  data?: IChartTopResponse;
  metric: TTopMetric;
  onMetricChange: (metric: TTopMetric) => void;
  isLoading?: boolean;
}