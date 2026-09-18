import { useMemo, useState } from "react";
import type { IProduct } from "@/features/products/types/product.types";

const PAGE_SIZE = 8;

export function useProductFilters(products: IProduct[] = []) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // 1. cleaned search string for connected words ("iphone15" -> "iphone15")
  const rawSearchClean = useMemo(() => {
    return search.toLowerCase().replace(/\s+/g, "");
  }, [search]);

  // 2. Tokens for search by cleaned words
  const queryTokens = useMemo(() => {
    return search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  }, [search]);

  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    return safeProducts.filter((product) => {
      const productName = String(
        product.name ?? (product as { title?: string }).title ?? "",
      );
      const productCategory = String(product.category ?? "");
      const productSku = String(
        product.sku ?? (product as { code?: string }).code ?? "",
      );

      const matchesCategory =
        category === "All" ||
        productCategory.toLowerCase() === category.toLowerCase();

      if (!matchesCategory) return false;

      // if search is empty show products
      if (!rawSearchClean) return true;

      const searchableText =
        `${productName} ${productCategory} ${productSku}`.toLowerCase();

      // Cleaning product data out of every space
      const searchableTextClean = searchableText.replace(/\s+/g, "");

      // check: connected words
      const matchesConnected = searchableTextClean.includes(rawSearchClean);

      // Check: by words
      const matchesTokens =
        queryTokens.length > 0 &&
        queryTokens.every((token) => searchableText.includes(token));

      return matchesConnected || matchesTokens;
    });
  }, [products, rawSearchClean, queryTokens, category]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const activeProducts = useMemo(
    () =>
      Array.isArray(products)
        ? products.filter((p) => p.status === "active").length
        : 0,
    [products],
  );

  const lowStockProducts = useMemo(
    () =>
      Array.isArray(products)
        ? products.filter((p) => (p.stock ?? 0) <= 20).length
        : 0,
    [products],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return {
    search,
    setSearch: handleSearchChange,
    category,
    setCategory: handleCategoryChange,
    page: safePage,
    setPage: handlePageChange,
    resetPage: () => setPage(1),
    totalPages,
    filteredProducts,
    currentProducts,
    stats: {
      total: Array.isArray(products) ? products.length : 0,
      active: activeProducts,
      lowStock: lowStockProducts,
    },
  };
}
