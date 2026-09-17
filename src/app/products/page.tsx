"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Package, PackageCheck } from "lucide-react";
import {
  CreateProductModal,
  ICreateProductData,
} from "@/components/organism/CreateProductModal/CreateProductModal";
import { Header } from "@/components/organism/Header/Header";
import { KpiCard } from "@/components/molecule/KpiCard/KpiCard";
import { Typography } from "@/components/atom/Typography/Typography";
import {
  EditProductModal,
  IEditProductData,
} from "@/components/organism/EditProductModal/EditProductModal";
import { ProductsTable } from "@/components/organism/ProductsTable/ProductsTable";
import { ProductsToolbar } from "@/components/organism/ProductsToolbar/ProductsToolbar";
import type { IProduct } from "@/features/products/types/product.types";
import { productsApi } from "@/lib/api/products";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from the backend on every page visit. This is what makes a refresh
  // show persisted products instead of recreating an in-memory demo list.
  useEffect(() => {
    let isMounted = true;

    productsApi
      .list()
      .then((loadedProducts) => {
        if (isMounted) setProducts(loadedProducts);
      })
      .catch((loadError: unknown) => {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load products.",
          );
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // The modal returns only the fields the user entered; the page completes the
  // product model and prepends it so the new item is immediately visible.
  const handleCreateProduct = async (product: ICreateProductData) => {
    try {
      setError(null);
      const createdProduct = await productsApi.create(product);
      setProducts((currentProducts) => [createdProduct, ...currentProducts]);
      setPage(1);
      setIsCreateModalOpen(false);
    } catch (createError: unknown) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Could not create product.",
      );
    }
  };

  // The page owns the list, so editing replaces the matching product here
  // instead of making the table responsible for data changes.
  const handleEditProduct = async (changes: IEditProductData) => {
    if (!editingProduct) return;

    try {
      setError(null);
      const updatedProduct = await productsApi.update(
        editingProduct.id,
        changes,
      );
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      );
      setEditingProduct(null);
    } catch (editError: unknown) {
      setError(
        editError instanceof Error
          ? editError.message
          : "Could not update product.",
      );
    }
  };

  // Delete is confirmed at the page boundary, then the table updates from the
  // new source-of-truth array automatically.
  const handleDeleteProduct = async (productId: string) => {
    const product = products.find((item) => item.id === productId);
    if (!product || !window.confirm(`Delete ${product.name}?`)) return;

    try {
      setError(null);
      await productsApi.remove(productId);
      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== productId),
      );
    } catch (deleteError: unknown) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete product.",
      );
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

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

  // These summary values are derived from the full inventory, so they stay
  // stable while search and category filters change the table below.
  const activeProducts = products.filter(
    (product) => product.status === "active",
  ).length;
  const lowStockProducts = products.filter(
    (product) => product.stock <= 20,
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header onAddProduct={() => setIsCreateModalOpen(true)} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <KpiCard
            title="Total products"
            value={products.length}
            subtext="Across your inventory"
            icon={Package}
            className="bg-slate-900"
          />
          <KpiCard
            title="Active products"
            value={activeProducts}
            subtext="Currently available"
            icon={PackageCheck}
            className="bg-slate-900"
          />
          <KpiCard
            title="Low stock"
            value={lowStockProducts}
            subtext="20 units or fewer"
            icon={AlertTriangle}
            className="bg-slate-900"
          />
        </div>

        <ProductsToolbar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={(value) => {
            setCategory(value);
            setPage(1);
          }}
          page={safePage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          onPageChange={(nextPage) =>
            setPage(Math.min(Math.max(nextPage, 1), totalPages))
          }
          onAddNew={() => setIsCreateModalOpen(true)}
        />

        {error && (
          <Typography variant="small" className="text-red-400">
            {error}
          </Typography>
        )}

        <ProductsTable
          products={currentProducts}
          isLoading={isLoading}
          onEdit={setEditingProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProduct}
      />

      <EditProductModal
        key={editingProduct?.id ?? "closed"}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEditProduct}
      />
    </main>
  );
}
