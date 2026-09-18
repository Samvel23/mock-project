import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ScriptableContext,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IPerformanceChartProps } from "./PerformanceChart.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

const formatValue = (value: number, metric?: string): string => {
  if (metric === "revenue") {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat("en-US").format(value);
};

export const PerformanceChart: React.FC<IPerformanceChartProps> = ({
  data,
  isLoading,
}) => {
  const points = data?.points ?? [];
  const hasData = points.length > 0;

  const chartData = {
    labels: points.map((p) => p.label),
    datasets: [
      {
        fill: true,
        data: points.map((p) => p.value),
        borderColor: "#3b82f6",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        tension: 0.4,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.35)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeOutQuart" as const,
    },
    animations: {
      y: {
        from: 0,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#94a3b8",
        bodyColor: "#ffffff",
        borderColor: "#1e293b",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<"line">) =>
            formatValue(context.parsed.y ?? 0, data?.metric),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 12 } },
      },
      y: {
        grid: { color: "#1e293b" },
        ticks: {
          color: "#64748b",
          font: { size: 12 },
          callback: (value: number | string) =>
            formatValue(Number(value), data?.metric),
        },
      },
    },
  };

  return (
    <div className="relative h-full min-h-[300px] w-full">
      {isLoading ? (
        <div className="flex h-full min-h-[300px] items-center justify-center">
          <div className="h-full w-full animate-pulse rounded-lg bg-muted" />
        </div>
      ) : !hasData ? (
        <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-muted-foreground">
          No performance data available.
        </div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};
