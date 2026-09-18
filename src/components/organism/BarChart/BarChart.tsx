"use client";

import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  LinearScale,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { IChartBreakdownResponse } from "@/features/dashboard/types/chart.types";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/atom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface BarChartProps {
  data?: IChartBreakdownResponse;
  metric: string;
  groupBy: string;
  onMetricChange: (metric: string) => void;
  onGroupByChange: (groupBy: string) => void;
  isLoading?: boolean;
}

const formatValue = (value: number, metric: string): string =>
  metric === "revenue"
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value)
    : new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value);

const formatMetricLabel = (metric: string): string =>
  metric === "unitsSold"
    ? "Units sold"
    : metric === "count"
      ? "Count"
      : "Revenue";

const formatGroupLabel = (groupBy: string): string =>
  groupBy === "status" ? "status" : "category";

export const BarChart: React.FC<BarChartProps> = React.memo(
  ({
    data,
    metric,
    groupBy,
    onMetricChange,
    onGroupByChange,
    isLoading = false,
  }) => {
    const points = data ?? [];
    const hasData = points.length > 0;

    // The API returns label/value objects; Chart.js expects labels and a data
    // array, so this component converts the response at the UI boundary.
    const chartData: ChartData<"bar"> = {
      labels: points.map((point) => point.label),
      datasets: [
        {
          data: points.map((point) => point.value),
          backgroundColor: "rgba(129, 140, 248, 0.78)",
          borderColor: "#818cf8",
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.68,
          categoryPercentage: 0.72,
        },
      ],
    };

    const options: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 850,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleColor: "#94a3b8",
          bodyColor: "#ffffff",
          borderColor: "#334155",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: (context: TooltipItem<"bar">) =>
              formatValue(Number(context.parsed.y ?? 0), metric),
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#94a3b8", font: { size: 11 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: "#1e293b" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            callback: (value) => formatValue(Number(value), metric),
          },
        },
      },
    };

    return (
      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {formatMetricLabel(metric)} by {formatGroupLabel(groupBy)}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Compare category performance
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative inline-flex items-center">
              <select
                value={metric}
                onChange={(event) => onMetricChange(event.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-950 pl-2.5 pr-8 py-2 appearance-none cursor-pointer text-xs text-slate-200 outline-none focus:border-indigo-400"
                aria-label="Breakdown metric"
              >
                <option value="revenue">Revenue</option>
                <option value="unitsSold">Units sold</option>
                <option value="count">Count</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                <Icon icon={ChevronDown} size="sm" color="muted" />
              </div>
            </div>
            <div className="relative inline-flex items-center">
              <select
                value={groupBy}
                onChange={(event) => onGroupByChange(event.target.value)}
                className="rounded-lg appearance-none border border-slate-700 bg-slate-950 cursor-pointer pl-2.5 pr-8 py-2 text-xs text-slate-200 outline-none focus:border-indigo-400"
                aria-label="Breakdown grouping"
              >
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                <Icon icon={ChevronDown} size="sm" color="muted" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[320px] min-h-[320px] w-full">
          {isLoading ? (
            <div className="h-full w-full animate-pulse rounded-xl bg-slate-800" />
          ) : !hasData ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No category data available.
            </div>
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </div>
      </section>
    );
  },
);

BarChart.displayName = "BarChart";
