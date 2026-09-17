"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/atom/Button/Button";
import { Icon } from "@/components/atom/Icon";
import { Input } from "@/components/atom/Input";
import { Typography } from "@/components/atom/Typography/Typography";

export interface ICreateProductData {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

// The parent controls whether the modal is visible and receives the completed
// form through onSubmit. The modal itself only manages temporary input values.
interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ICreateProductData) => void;
}

const categories = [
  "Electronics",
  "Accessories",
  "Lifestyle",
  "Wearables",
  "Office",
  "Home",
];

export function CreateProductModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateProductModalProps) {
  // Each input is controlled by React, so form always contains the latest value
  // shown in the modal.
  const [form, setForm] = useState<ICreateProductData>({
    name: "",
    sku: "",
    category: categories[0],
    price: 0,
    stock: 0,
  });

  // Returning null keeps the modal out of the DOM until the parent opens it.
  if (!isOpen) return null;

  // Prevent the browser reload, send the values to the page, then prepare a
  // blank form for the next time the modal opens.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      sku: "",
      category: categories[0],
      price: 0,
      stock: 0,
    });
  };

  // This generic helper updates one property while preserving the other form
  // values. The K type keeps the field name and value type connected.
  const updateField = <K extends keyof ICreateProductData>(
    field: K,
    value: ICreateProductData[K],
  ) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        // Clicking the dark area closes the dialog; clicking inside the form
        // does not because the event target is not the overlay itself.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-product-title"
        className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Typography
              variant="h2"
              id="create-product-title"
              className="text-xl font-semibold text-white"
            >
              Create product
            </Typography>
            <Typography variant="small" className="mt-1 text-slate-400">
              Add a product to your inventory.
            </Typography>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Close create product dialog"
            onClick={onClose}
            className="h-9 w-9 rounded-lg p-0 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Icon icon={X} size="sm" color="muted" />
          </Button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Inputs use value + onChange, which makes them controlled inputs. */}
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
              Create product
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
