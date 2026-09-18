import { chartsApi } from "@/lib/api/charts";
import { Typography } from "@/components/atom/Typography/Typography";
import { KpiGrid } from "@/components/organism/KpiGrid/KpiGrid";
import { DashboardCharts } from "@/components/organism/DashboardCharts";
import { TopProductsChart } from "@/components/organism/TopProductsChart";
import { TimeseriesChart } from "@/components/organism/TimeseriesChart";
import { BarChart } from "@/components/organism/BarChart";
import type { ComponentProps } from "react";
import { Header } from "@/components/organism";

export const revalidate = 60; // ISR: кэширование на 60 секунд

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
    <main className="bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <Header
            title="Dashboard"
            description="Track revenue, inventory, and category performance."
          />
        </div>

        <KpiGrid data={kpiData} />

        {/* The server provides the initial chart data. DashboardCharts then
            owns interactive selectors and refetches only the changed chart. */}
        <DashboardCharts
          initialTimeseries={chartData}
          initialBreakdown={breakdownData}
          initialTopProducts={topProductsData}
        />
      </div>
    </main>
  );
}
