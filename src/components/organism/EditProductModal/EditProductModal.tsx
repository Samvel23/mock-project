"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/atom/Button/Button";
import { Input } from "@/components/atom/Input";
import { Typography } from "@/components/atom/Typography/Typography";
import type { IProduct } from "@/features/products/types/product.types";
import { Icon } from "@/components/atom/Icon";

export interface IEditProductData {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

interface EditProductModalProps {
  product: IProduct | null;
  onClose: () => void;
  onSubmit: (product: IEditProductData) => void;
}

const categories = [
  "Electronics",
  "Accessories",
  "Lifestyle",
  "Wearables",
  "Office",
  "Home",
];

const getFormValues = (product: IProduct): IEditProductData => ({
  name: product.name,
  sku: product.sku,
  category: product.category,
  price: product.price,
  stock: product.stock,
});

export function EditProductModal({
  product,
  onClose,
  onSubmit,
}: EditProductModalProps) {
  // The page key remounts this component for each selected product, so React
  // initializes the controlled form with the selected row's values.
  const [form, setForm] = useState<IEditProductData | null>(() =>
    product ? getFormValues(product) : null,
  );

  if (!product || !form) return null;

  // Prevent a page reload and send only editable fields back to the parent.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
  };

  // The generic key keeps each field paired with the correct value type.
  const updateField = <K extends keyof IEditProductData>(
    field: K,
    value: IEditProductData[K],
  ) =>
    setForm((current) => (current ? { ...current, [field]: value } : current));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        // Only a click on the backdrop closes the modal, not a click inside it.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-product-title"
        className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Typography
              variant="h2"
              id="edit-product-title"
              className="text-xl font-semibold text-white"
            >
              Edit product
            </Typography>
            <Typography variant="small" className="mt-1 text-slate-400">
              Update the product details below.
            </Typography>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Close edit product dialog"
            onClick={onClose}
            className="h-9 w-9 rounded-lg p-0 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Icon icon={X} size="sm" color="muted" />
          </Button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Controlled inputs read from form and update it through onChange. */}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              Product name
            </span>
            <Input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="e.g. AeroHead 37"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                SKU
              </span>
              <Input
                required
                value={form.sku}
                onChange={(event) => updateField("sku", event.target.value)}
                placeholder="SKU-0037"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Category
              </span>
              <select
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Price
              </span>
              <Input
                required
                min="0"
                step="0.01"
                type="number"
                value={form.price}
                onChange={(event) =>
                  updateField("price", Number(event.target.value))
                }
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Stock
              </span>
              <Input
                required
                min="0"
                step="1"
                type="number"
                value={form.stock}
                onChange={(event) =>
                  updateField("stock", Number(event.target.value))
                }
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
