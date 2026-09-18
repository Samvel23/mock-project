import {
  DollarSign,
  ShoppingBag,
  Package,
  Boxes,
  Star,
  AlertTriangle,
} from "lucide-react";
import { KpiCard } from "@/components/molecule/KpiCard";
import { IKpiGridProps } from "./KpiGrid.types";

const CARD_COUNT = 6;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat("en-US");

export const KpiGrid: React.FC<IKpiGridProps> = ({ data, isLoading }) => {
  // Keep the grid shape stable while dashboard data is loading.
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: CARD_COUNT }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl border border-slate-700 bg-slate-900"
          />
        ))}
      </div>
    );
  }

  const needsAttention = data.outOfStock + data.lowStock;

  const cards = [
    {
      title: "Revenue",
      value: currencyFormatter.format(data.totalRevenue),
      icon: DollarSign,
      variant: "success" as const,
    },
    {
      title: "Orders",
      value: numberFormatter.format(data.totalUnitsSold),
      icon: ShoppingBag,
      variant: "default" as const,
    },
    {
      title: "Products",
      value: `${numberFormatter.format(data.activeProducts)} / ${numberFormatter.format(data.totalProducts)}`,
      icon: Package,
      variant: "default" as const,
    },
    {
      title: "Inventory",
      value: currencyFormatter.format(data.inventoryValue),
      icon: Boxes,
      variant: "success" as const,
    },
    {
      title: "Rating",
      value: data.averageRating.toFixed(1),
      icon: Star,
      variant: "warning" as const,
    },
    {
      title: "Alerts",
      value: numberFormatter.format(needsAttention),
      icon: AlertTriangle,
      variant: "danger" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map(({ title, value, icon: Icon, variant }) => (
        <KpiCard
          key={title}
          title={title}
          value={value}
          icon={Icon}
          variant={variant}
        />
      ))}
    </div>
  );
};
