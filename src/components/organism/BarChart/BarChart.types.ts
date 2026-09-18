import { IChartBreakdownResponse } from "@/features/dashboard/types/chart.types";

export interface IBarChartProps {
  data?: IChartBreakdownResponse;
  metric: string;
  groupBy: string;
  onMetricChange: (metric: string) => void;
  onGroupByChange: (groupBy: string) => void;
  isLoading?: boolean;
}