import { fetcher } from "@/lib/api/charts";
import type { IProduct } from "@/features/products/types/product.types";

export type ProductInput = Pick<
  IProduct,
  "name" | "sku" | "category" | "price" | "stock"
>;

// Product mutations go through this module so UI components do not need to
// know the backend URL, HTTP methods, or response-envelope details.
export const productsApi = {
  // Filtering and pagination are owned by the products screen, so request the
  // complete persisted collection before applying those controls in the UI.
  list: () => fetcher<IProduct[]>("/products?page=1&pageSize=100"),

  create: (product: ProductInput) =>
    fetcher<IProduct>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    }),

  update: (id: string, product: ProductInput) =>
    fetcher<IProduct>(`/products/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    }),

  remove: (id: string) =>
    fetcher<void>(`/products/${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),
};
