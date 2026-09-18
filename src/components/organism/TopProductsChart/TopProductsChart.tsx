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
import type { IChartTopResponse } from "@/features/dashboard/types/chart.types";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/atom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type TopMetric = "unitsSold" | "revenue";

interface TopProductsChartProps {
  data?: IChartTopResponse;
  metric: TopMetric;
  onMetricChange: (metric: TopMetric) => void;
  isLoading?: boolean;
}

const formatValue = (value: number, metric: TopMetric): string => {
  if (metric === "revenue") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US").format(value);
};

export const TopProductsChart: React.FC<TopProductsChartProps> = React.memo(
  ({ data, metric, onMetricChange, isLoading = false }) => {
    const products = data ?? [];
    const hasData = products.length > 0;

    // A horizontal bar chart gives long product names enough room to remain
    // readable while the bar length makes ranking easy to compare.
    const chartData: ChartData<"bar"> = {
      labels: products.map((product) => product.name),
      datasets: [
        {
          data: products.map((product) => product.value),
          backgroundColor: "rgba(45, 212, 191, 0.78)",
          borderColor: "#2dd4bf",
          borderWidth: 1,
          borderRadius: 7,
          borderSkipped: false,
          barPercentage: 0.66,
          categoryPercentage: 0.72,
        },
      ],
    };

    const options: ChartOptions<"bar"> = {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 850, easing: "easeOutQuart" },
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
              formatValue(Number(context.parsed.x ?? 0), metric),
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: "#1e293b" },
          ticks: {
            color: "#64748b",
            font: { size: 11 },
            callback: (value) => formatValue(Number(value), metric),
          },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#94a3b8", font: { size: 11 } },
        },
      },
    };

    return (
      <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Top products</h2>
            <p className="mt-1 text-sm text-slate-400">
              Best performers by selected metric
            </p>
          </div>
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
            Metric
            <div className="relative inline-flex items-center">
              <select
                value={metric}
                onChange={(event) =>
                  onMetricChange(event.target.value as TopMetric)
                }
                className="appearance-none rounded-lg border border-slate-700 cursor-pointer bg-slate-950 pl-2.5 pr-8 py-2 text-xs normal-case tracking-normal text-slate-200 outline-none focus:border-teal-400"
                aria-label="Top products metric"
              >
                <option value="unitsSold">Units sold</option>
                <option value="revenue">Revenue</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                <Icon icon={ChevronDown} size="sm" color="muted" />
              </div>
            </div>
          </label>
        </div>

        <div className="relative h-[360px] min-h-[360px] w-full">
          {isLoading ? (
            <div className="h-full w-full animate-pulse rounded-xl bg-slate-800" />
          ) : !hasData ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No top products data available.
            </div>
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </div>
      </section>
    );
  },
);

TopProductsChart.displayName = "TopProductsChart";
