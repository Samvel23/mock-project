import { IKpiResponse } from "@/features/dashboard/types/kpi.types";
import type {
  IChartBreakdownResponse,
  IChartTopResponse,
} from "@/features/dashboard/types/chart.types";
type ITimeseriesResponse = unknown;

const getBaseUrl = (): string => {
  // Browser requests use the Next.js proxy, so they stay same-origin and do
  // not depend on the backend allowing whichever port Next is using.
  if (typeof window !== "undefined") return `${window.location.origin}/api`;

  const envUrl = process.env.NEXT_PUBLIC_API_URL;

  if (envUrl) {
    return envUrl.startsWith("http") ? envUrl : `http://${envUrl}`;
  }

  return "http://localhost:4000";
};

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, statusText: string, body: unknown) {
    super(
      `API Error [${status}]: ${typeof body === "string" ? body : JSON.stringify(body ?? statusText)}`,
    );
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export async function fetcher<T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = getBaseUrl().replace(/\/$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${cleanEndpoint}`;

  const res = await fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      // response wasn't JSON; leave body null and fall back to statusText
    }
    throw new ApiError(res.status, res.statusText, body);
  }

  // DELETE endpoints may legitimately return 204 with no JSON body.
  if (res.status === 204) return undefined as T;

  const json = (await res.json()) as ApiEnvelope<T>;
  return json.data;
}

const buildQuery = (
  params?: Record<string, string | number | undefined>,
): string => {
  if (!params) return "";

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value));
  }

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

export type ChartInterval = "day" | "month";

export const chartsApi = {
  fetcher,

  getKpis: () => fetcher<IKpiResponse>("/charts/kpis"),

  getTimeseries: (params?: { metric?: string; interval?: ChartInterval }) =>
    fetcher<ITimeseriesResponse>(`/charts/timeseries${buildQuery(params)}`),

  getBreakdown: (params?: { metric?: string; groupBy?: string }) =>
    fetcher<IChartBreakdownResponse>(`/charts/breakdown${buildQuery(params)}`),

  getTop: (params?: { metric?: string; limit?: number }) =>
    fetcher<IChartTopResponse>(`/charts/top${buildQuery(params)}`),
};
