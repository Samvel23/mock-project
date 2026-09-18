"use client";

import { useState } from "react";
import { AlertTriangle, Package, PackageCheck } from "lucide-react";
import { CreateProductModal } from "@/components/organism/CreateProductModal/CreateProductModal";
import type { ICreateProductData } from "@/components/organism/CreateProductModal/CreateProductModal.types";
import { KpiCard } from "@/components/molecule/KpiCard/KpiCard";
import { EditProductModal } from "@/components/organism/EditProductModal/EditProductModal";
import type { IEditProductData } from "@/components/organism/EditProductModal/EditProductModal.types";
import { ProductsTable } from "@/components/organism/ProductsTable/ProductsTable";
import { ProductsToolbar } from "@/components/organism/ProductsToolbar/ProductsToolbar";
import type { IProduct } from "@/features/products/types/product.types";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";

export function ProductsClientView() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const { products, isLoading, createProduct, editProduct, deleteProduct } =
    useProducts();

  const {
    search,
    setSearch,
    category,
    setCategory,
    page,
    setPage,
    resetPage,
    totalPages,
    filteredProducts,
    currentProducts,
    stats,
  } = useProductFilters(products);

  const handleCreateProduct = async (data: ICreateProductData) => {
    await createProduct(data);
    resetPage();
    setIsCreateModalOpen(false);
  };

  const handleEditProduct = async (data: IEditProductData) => {
    if (!editingProduct) return;
    const targetId = String(
      editingProduct.id ?? (editingProduct as { _id?: string })._id,
    );
    await editProduct(targetId, data);
    setEditingProduct(null);
  };

  const editingProductId = editingProduct
    ? String(editingProduct.id ?? (editingProduct as { _id?: string })._id)
    : "closed";

  return (
    <main className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-100">
      <div className="mx-auto max-w-[1720px] space-y-6">
        {/* Enhanced Header Section */}
        <div className="flex flex-col gap-2 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Products
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Manage your inventory, track stock levels, and monitor product
            performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:gap-6 md:grid-cols-3">
          <KpiCard
            title="Total products"
            value={stats.total}
            subtext="Across your inventory"
            icon={Package}
          />
          <KpiCard
            title="Active products"
            value={stats.active}
            subtext="Currently available"
            icon={PackageCheck}
          />
          <KpiCard
            title="Low stock"
            value={stats.lowStock}
            subtext="20 units or fewer"
            icon={AlertTriangle}
          />
        </div>

        <ProductsToolbar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          page={page}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          onPageChange={setPage}
          onAddNew={() => setIsCreateModalOpen(true)}
        />

        <ProductsTable
          products={currentProducts}
          isLoading={isLoading}
          onEdit={setEditingProduct}
          onDelete={deleteProduct}
        />
      </div>

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProduct}
      />

      <EditProductModal
        key={editingProductId}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEditProduct}
      />
    </main>
  );
}
