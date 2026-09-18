"use client";

import React from "react";
import { PerformanceChart } from "@/components/organism/PerformanceChart/PerformanceChart";
import type { ITimeseriesResponse } from "@/features/dashboard/types/chart.types";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/atom";

interface TimeseriesChartProps {
  data?: ITimeseriesResponse;
  metric: string;
  onMetricChange: (metric: string) => void;
  isLoading?: boolean;
}

export const TimeseriesChart: React.FC<TimeseriesChartProps> = React.memo(
  ({ data, metric, onMetricChange, isLoading = false }) => {
    const metricLabel =
      metric === "unitsSold"
        ? "Units sold"
        : metric === "count"
          ? "Count"
          : "Revenue";

    return (
      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {metricLabel} trend
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Monthly {metricLabel.toLowerCase()} over time
            </p>
          </div>
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Metric
            <div className="relative inline-flex items-center">
              <select
                value={metric}
                onChange={(event) => onMetricChange(event.target.value)}
                className="appearance-none rounded-lg border border-slate-700 cursor-pointer bg-slate-950 pl-2.5 pr-8 py-2 text-xs normal-case tracking-normal text-slate-200 outline-none focus:border-sky-400"
                aria-label="Timeseries metric"
              >
                <option value="revenue">Revenue</option>
                <option value="unitsSold">Units sold</option>
                <option value="count">Count</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                <Icon icon={ChevronDown} size="sm" color="muted" />
              </div>
            </div>
          </label>
        </div>

        <PerformanceChart data={data} isLoading={isLoading} />
      </section>
    );
  },
);

TimeseriesChart.displayName = "TimeseriesChart";
