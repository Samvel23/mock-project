import { IKpiResponse } from "@/features/dashboard/types/kpi.types";

export interface IKpiGridProps {
  data?: IKpiResponse;
  isLoading?: boolean;
}
