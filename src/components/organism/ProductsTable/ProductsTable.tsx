import { Edit3, Package, Star, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/atom/Button";
import { Icon } from "@/components/atom/Icon";
import { Typography } from "@/components/atom/Typography";
import { IProduct } from "@/features/products/types/product.types";
import { IProductsTableProps } from "./ProductsTable.types";

export const ProductsTable: React.FC<IProductsTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="dashboard-table overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-sm">
        <div className="animate-pulse divide-y divide-slate-700">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-10 rounded-lg bg-slate-800" />
              <div className="h-4 flex-1 rounded bg-slate-800" />
              <div className="h-4 w-20 rounded bg-slate-800" />
              <div className="h-4 w-24 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getValue = (product: IProduct, key: string) =>
    (product as unknown as Record<string, unknown>)[key];

  const handleDeleteClick = (id: string, title: string) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2 p-1">
          <Typography variant="small" className="font-medium text-slate-100">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-rose-400">"{title}"</span>?
          </Typography>
          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={closeToast}
              className="h-8 px-3 text-xs text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={async () => {
                closeToast();
                try {
                  await onDelete?.(id);
                  toast.success(`Product "${title}" deleted successfully`);
                } catch {
                  toast.error("Failed to delete product");
                }
              }}
              className="h-8 rounded-lg border border-rose-500/30 bg-rose-500/20 px-3 text-xs text-rose-400 hover:bg-rose-500/30"
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "dark",
      },
    );
  };

  return (
    <div className="dashboard-table overflow-hidden rounded-[28px] border border-slate-700 bg-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm text-slate-200">
          <thead className="dashboard-table-head bg-slate-950/90 text-xs uppercase tracking-[0.18em] text-slate-400">
            <tr>
              <th className="px-5 py-4 font-semibold">
                <Typography
                  variant="small"
                  className="font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Product
                </Typography>
              </th>
              <th className="px-5 py-4 font-semibold">
                <Typography
                  variant="small"
                  className="font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Category
                </Typography>
              </th>
              <th className="px-5 py-4 font-semibold">
                <Typography
                  variant="small"
                  className="font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Price
                </Typography>
              </th>
              <th className="px-5 py-4 font-semibold">
                <Typography
                  variant="small"
                  className="font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Rating
                </Typography>
              </th>
              <th className="px-5 py-4 text-right font-semibold">
                <Typography
                  variant="small"
                  className="font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-14 text-center">
                  <Typography variant="small" className="text-slate-400">
                    No products found.
                  </Typography>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const id = String(
                  getValue(product, "id") ?? getValue(product, "_id") ?? "",
                );
                const title = String(
                  getValue(product, "title") ??
                    getValue(product, "name") ??
                    "Untitled product",
                );
                const image =
                  getValue(product, "image") ?? getValue(product, "thumbnail");
                const rating = getValue(product, "rating");

                return (
                  <tr
                    key={id}
                    className="dashboard-table-row border-t border-slate-700/80 bg-slate-900/40 transition-colors hover:bg-slate-800/80"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {image ? (
                          <img
                            src={String(image)}
                            alt={title}
                            className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-600"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-400/20">
                            <Icon icon={Package} size="md" color="primary" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <Typography
                            variant="small"
                            className="max-w-xs truncate font-semibold text-slate-100"
                          >
                            {title}
                          </Typography>
                          <Typography
                            variant="small"
                            className="mt-1 text-slate-400"
                          >
                            {id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="dashboard-table-badge inline-flex rounded-full border border-slate-600 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200">
                        {String(getValue(product, "category") ?? "—")}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-100">
                      <Typography
                        variant="small"
                        className="font-semibold text-slate-100"
                      >
                        ${Number(getValue(product, "price") ?? 0).toFixed(2)}
                      </Typography>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-amber-300">
                        <Icon
                          icon={Star}
                          size="sm"
                          color="warning"
                          className="fill-current"
                        />
                        {rating == null ? "—" : String(rating)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          aria-label={`Edit ${title}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit?.(product)}
                          className="h-9 w-9 rounded-lg border border-slate-600 bg-slate-800 p-0 text-slate-300 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                          <Icon icon={Edit3} size="sm" color="primary" />
                        </Button>
                        <Button
                          type="button"
                          aria-label={`Delete ${title}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(id, title)}
                          className="h-9 w-9 rounded-lg border border-slate-600 bg-slate-800 p-0 text-slate-300 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed"
                        >
                          <Icon icon={Trash2} size="sm" color="danger" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
