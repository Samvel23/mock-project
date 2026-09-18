import { chartsApi } from "@/lib/api/charts";
import { KpiGrid } from "@/components/organism/KpiGrid/KpiGrid";
import { DashboardCharts } from "@/components/organism/DashboardCharts";
import { TopProductsChart } from "@/components/organism/TopProductsChart";
import { TimeseriesChart } from "@/components/organism/TimeseriesChart";
import { BarChart } from "@/components/organism/BarChart";
import type { ComponentProps } from "react";

export const revalidate = 60; // ISR: 60 second caching

export default async function Home() {
  let kpiData: ComponentProps<typeof KpiGrid>["data"];
  let chartData: ComponentProps<typeof TimeseriesChart>["data"];
  let breakdownData: ComponentProps<typeof BarChart>["data"];
  let topProductsData: ComponentProps<typeof TopProductsChart>["data"];

  try {
    [kpiData, chartData, breakdownData, topProductsData] = (await Promise.all([
      chartsApi.getKpis(),
      chartsApi.getTimeseries({ metric: "revenue", interval: "month" }),
      chartsApi.getBreakdown({ metric: "revenue", groupBy: "category" }),
      chartsApi.getTop({ metric: "unitsSold", limit: 6 }),
    ])) as [
      ComponentProps<typeof KpiGrid>["data"],
      ComponentProps<typeof TimeseriesChart>["data"],
      ComponentProps<typeof BarChart>["data"],
      ComponentProps<typeof TopProductsChart>["data"],
    ];
  } catch (error) {
    console.error("Failed to load dashboard metrics:", error);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-100">
      <div className="mx-auto max-w-[1720px] space-y-6">
        {/* Enhanced Header Section */}
        <div className="flex flex-col gap-2 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Track revenue, inventory, and category performance across your
            platform.
          </p>
        </div>

        <KpiGrid data={kpiData} />

        <DashboardCharts
          initialTimeseries={chartData}
          initialBreakdown={breakdownData}
          initialTopProducts={topProductsData}
        />
      </div>
    </main>
  );
}
