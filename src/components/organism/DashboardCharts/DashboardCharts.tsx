"use client"

import { useCallback, useState } from "react";
import { BarChart } from "@/components/organism/BarChart";
import { TimeseriesChart } from "@/components/organism/TimeseriesChart";
import { TopProductsChart } from "@/components/organism/TopProductsChart";
import { chartsApi } from "@/lib/api/charts";
import type { ITimeseriesResponse } from "@/features/dashboard/types/chart.types";
import {
  IDashboardChartsProps,
  TChartMetric,
  TTopMetric,
} from "./DashboardCharts.types";

export function DashboardCharts({
  initialTimeseries,
  initialBreakdown,
  initialTopProducts,
}: IDashboardChartsProps) {
  const [timeseriesMetric, setTimeseriesMetric] =
    useState<TChartMetric>("revenue");
  const [breakdownMetric, setBreakdownMetric] =
    useState<TChartMetric>("revenue");
  const [breakdownGroupBy, setBreakdownGroupBy] = useState("category");
  const [topMetric, setTopMetric] = useState<TTopMetric>("unitsSold");

  const [timeseries, setTimeseries] = useState(initialTimeseries);
  const [breakdown, setBreakdown] = useState(initialBreakdown);
  const [topProducts, setTopProducts] = useState(initialTopProducts);
  const [loadingChart, setLoadingChart] = useState<string | null>(null);
  const [chartError, setChartError] = useState<string | null>(null);

  // Each selector owns one request. Updating one chart does not reset the
  // other chart's data or make the whole dashboard wait for a new response.
  const handleTimeseriesMetricChange = useCallback(async (metric: string) => {
    const nextMetric = metric as TChartMetric;
    setTimeseriesMetric(nextMetric);
    setLoadingChart("timeseries");
    setChartError(null);

    try {
      const nextData = await chartsApi.getTimeseries({
        metric: nextMetric,
        interval: "month",
      });
      setTimeseries(nextData as ITimeseriesResponse);
    } catch (requestError: unknown) {
      setChartError(
        requestError instanceof Error
          ? requestError.message
          : "Could not update the timeseries chart.",
      );
    } finally {
      setLoadingChart(null);
    }
  }, []);

  const handleBreakdownChange = useCallback(
    async (nextMetric: TChartMetric, nextGroupBy: string) => {
      setBreakdownMetric(nextMetric);
      setBreakdownGroupBy(nextGroupBy);
      setLoadingChart("breakdown");
      setChartError(null);

      try {
        const nextData = await chartsApi.getBreakdown({
          metric: nextMetric,
          groupBy: nextGroupBy,
        });
        setBreakdown(nextData);
      } catch (requestError: unknown) {
        setChartError(
          requestError instanceof Error
            ? requestError.message
            : "Could not update the breakdown chart.",
        );
      } finally {
        setLoadingChart(null);
      }
    },
    [],
  );

  const handleTopMetricChange = useCallback(async (metric: TTopMetric) => {
    setTopMetric(metric);
    setLoadingChart("top");
    setChartError(null);

    try {
      const nextData = await chartsApi.getTop({ metric, limit: 6 });
      setTopProducts(nextData);
    } catch (requestError: unknown) {
      setChartError(
        requestError instanceof Error
          ? requestError.message
          : "Could not update the top-products chart.",
      );
    } finally {
      setLoadingChart(null);
    }
  }, []);

  const handleBreakdownMetricChange = useCallback(
    (metric: string) =>
      handleBreakdownChange(metric as TChartMetric, breakdownGroupBy),
    [breakdownGroupBy, handleBreakdownChange],
  );

  const handleBreakdownGroupChange = useCallback(
    (groupBy: string) => handleBreakdownChange(breakdownMetric, groupBy),
    [breakdownMetric, handleBreakdownChange],
  );

  return (
    <div className="space-y-6">
      {chartError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {chartError}
        </div>
      )}
      <TimeseriesChart
        data={timeseries}
        metric={timeseriesMetric}
        onMetricChange={handleTimeseriesMetricChange}
        isLoading={loadingChart === "timeseries"}
      />
      <BarChart
        data={breakdown}
        metric={breakdownMetric}
        groupBy={breakdownGroupBy}
        onMetricChange={handleBreakdownMetricChange}
        onGroupByChange={handleBreakdownGroupChange}
        isLoading={loadingChart === "breakdown"}
      />
      <TopProductsChart
        data={topProducts}
        metric={topMetric}
        onMetricChange={handleTopMetricChange}
        isLoading={loadingChart === "top"}
      />
    </div>
  );
}
