import { useEffect, useState } from "react";
import type { ICreateProductData } from "@/components/organism/CreateProductModal/CreateProductModal.types";
import type { IEditProductData } from "@/components/organism/EditProductModal/EditProductModal.types";
import type { IProduct } from "@/features/products/types/product.types";
import { productsApi } from "@/lib/api/products";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const createProduct = async (product: ICreateProductData) => {
    try {
      setError(null);
      const createdProduct = await productsApi.create(product);
      setProducts((currentProducts) => [createdProduct, ...currentProducts]);
      return createdProduct;
    } catch (createError: unknown) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Could not create product.",
      );
      throw createError;
    }
  };

  const editProduct = async (targetId: string, changes: IEditProductData) => {
    try {
      setError(null);
      const updatedProduct = await productsApi.update(targetId, changes);

      setProducts((currentProducts) =>
        currentProducts.map((product) => {
          const currentId = String(product.id ?? (product as any)._id);
          const updatedId = String(
            updatedProduct.id ?? (updatedProduct as any)._id ?? targetId,
          );
          return currentId === updatedId ? updatedProduct : product;
        }),
      );
    } catch (editError: unknown) {
      setError(
        editError instanceof Error
          ? editError.message
          : "Could not update product.",
      );
      throw editError;
    }
  };

  const deleteProduct = async (productId: string) => {
    const targetId = String(productId);
    const product = products.find(
      (item) => String(item.id ?? (item as any)._id) === targetId,
    );

    if (
      !product ||
      !window.confirm(
        `Delete ${product.name ?? (product as any).title ?? "product"}?`,
      )
    ) {
      return;
    }

    try {
      setError(null);
      await productsApi.remove(targetId);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (item) => String(item.id ?? (item as any)._id) !== targetId,
        ),
      );
    } catch (deleteError: unknown) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete product.",
      );
    }
  };

  return {
    products,
    isLoading,
    error,
    createProduct,
    editProduct,
    deleteProduct,
  };
}
