"use client";

import React from "react";
import { PerformanceChart } from "@/components/organism/PerformanceChart/PerformanceChart";
import type { ITimeseriesResponse } from "@/features/dashboard/types/chart.types";

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

    // PerformanceChart is the single Chart.js renderer. This wrapper gives the
    // dashboard a domain-specific name without maintaining a second chart setup.
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
            <select
              value={metric}
              onChange={(event) => onMetricChange(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs normal-case tracking-normal text-slate-200 outline-none focus:border-sky-400"
              aria-label="Timeseries metric"
            >
              <option value="revenue">Revenue</option>
              <option value="unitsSold">Units sold</option>
              <option value="count">Count</option>
            </select>
          </label>
        </div>

        {/* The existing PerformanceChart handles Chart.js registration, data
          mapping, tooltips, loading, and empty states in one place. */}
        <PerformanceChart data={data} isLoading={isLoading} />
      </section>
    );
  },
);

TimeseriesChart.displayName = "TimeseriesChart";
