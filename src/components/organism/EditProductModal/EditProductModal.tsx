"use client";

import { FormEvent, useState } from "react";
import { ChevronDown, X } from "lucide-react";
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
  onSubmit: (product: IEditProductData) => void | Promise<void>;
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
  const [form, setForm] = useState<IEditProductData | null>(() =>
    product ? getFormValues(product) : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  if (!product || !form) return null;

  const updateField = <K extends keyof IEditProductData>(
    field: K,
    value: IEditProductData[K],
  ) => {
    setForm((current) => (current ? { ...current, [field]: value } : current));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFieldErrors({});
    setGeneralError(null);

    try {
      await onSubmit(form);
      onClose();
    } catch (err: unknown) {
      let parsedError: any = err;

      const rawString = err instanceof Error ? err.message : String(err);
      const jsonMatch = rawString.match(/\{.*\}/s);

      if (jsonMatch) {
        try {
          parsedError = JSON.parse(jsonMatch[0]);
        } catch {
          // Игнорируем ошибку парсинга
        }
      }

      const details = parsedError?.details || parsedError?.error?.details;
      const errorsMap: Record<string, string> = {};
      const detailMessages: string[] = [];

      if (Array.isArray(details)) {
        details.forEach((item: { field?: string; message?: string }) => {
          if (item.field && item.message) {
            errorsMap[item.field] = item.message;
          }
          if (item.message) {
            detailMessages.push(item.message);
          }
        });
      }

      setFieldErrors(errorsMap);

      const displayMessage =
        detailMessages.length > 0
          ? detailMessages.join(". ")
          : parsedError?.error?.message ||
            parsedError?.message ||
            "Validation failed";

      setGeneralError(displayMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setFieldErrors({});
    setGeneralError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
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
            onClick={handleClose}
            disabled={isSubmitting}
            className="h-9 w-9 rounded-lg p-0 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Icon icon={X} size="sm" color="muted" />
          </Button>
        </div>

        {generalError && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
            {generalError}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              Product name
            </span>
            <Input
              required
              disabled={isSubmitting}
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="e.g. AeroHead 37"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-rose-400">{fieldErrors.name}</p>
            )}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                SKU
              </span>
              <Input
                required
                disabled={isSubmitting}
                value={form.sku}
                onChange={(event) => updateField("sku", event.target.value)}
                placeholder="SKU-0037"
              />
              {fieldErrors.sku && (
                <p className="mt-1 text-xs text-rose-400">{fieldErrors.sku}</p>
              )}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Category
              </span>
              <div className="relative flex w-full items-center">
                <select
                  disabled={isSubmitting}
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className="h-11 w-full appearance-none cursor-pointer rounded-xl border border-slate-700 bg-slate-950 pl-3.5 pr-10 text-sm text-slate-100 outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                  <Icon icon={ChevronDown} size="sm" color="muted" />
                </div>
              </div>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Price
              </span>
              <Input
                required
                disabled={isSubmitting}
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) =>
                  updateField("price", Number(event.target.value))
                }
              />
              {fieldErrors.price && (
                <p className="mt-1 text-xs text-rose-400">
                  {fieldErrors.price}
                </p>
              )}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-300">
                Stock
              </span>
              <Input
                required
                disabled={isSubmitting}
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={(event) =>
                  updateField("stock", Number(event.target.value))
                }
              />
              {fieldErrors.stock && (
                <p className="mt-1 text-xs text-rose-400">
                  {fieldErrors.stock}
                </p>
              )}
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
