"use client";

import { useCallback, useState } from "react";
import { BarChart } from "@/components/organism/BarChart";
import { TimeseriesChart } from "@/components/organism/TimeseriesChart";
import { TopProductsChart } from "@/components/organism/TopProductsChart";
import { chartsApi } from "@/lib/api/charts";
import type {
  IChartBreakdownResponse,
  IChartTopResponse,
  ITimeseriesResponse,
} from "@/features/dashboard/types/chart.types";

type ChartMetric = "count" | "unitsSold" | "revenue";
type TopMetric = "unitsSold" | "revenue";

interface DashboardChartsProps {
  initialTimeseries?: ITimeseriesResponse;
  initialBreakdown?: IChartBreakdownResponse;
  initialTopProducts?: IChartTopResponse;
}

export function DashboardCharts({
  initialTimeseries,
  initialBreakdown,
  initialTopProducts,
}: DashboardChartsProps) {
  const [timeseriesMetric, setTimeseriesMetric] =
    useState<ChartMetric>("revenue");
  const [breakdownMetric, setBreakdownMetric] =
    useState<ChartMetric>("revenue");
  const [breakdownGroupBy, setBreakdownGroupBy] = useState("category");
  const [topMetric, setTopMetric] = useState<TopMetric>("unitsSold");

  const [timeseries, setTimeseries] = useState(initialTimeseries);
  const [breakdown, setBreakdown] = useState(initialBreakdown);
  const [topProducts, setTopProducts] = useState(initialTopProducts);
  const [loadingChart, setLoadingChart] = useState<string | null>(null);
  const [chartError, setChartError] = useState<string | null>(null);

  // Each selector owns one request. Updating one chart does not reset the
  // other chart's data or make the whole dashboard wait for a new response.
  const handleTimeseriesMetricChange = useCallback(async (metric: string) => {
    const nextMetric = metric as ChartMetric;
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
    async (nextMetric: ChartMetric, nextGroupBy: string) => {
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

  const handleTopMetricChange = useCallback(async (metric: TopMetric) => {
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
      handleBreakdownChange(metric as ChartMetric, breakdownGroupBy),
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
