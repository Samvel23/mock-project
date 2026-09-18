import { IProduct } from "@/features/products/types/product.types";

export interface IEditProductData {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

export interface IEditProductModalProps {
  product: IProduct | null;
  onClose: () => void;
  onSubmit: (product: IEditProductData) => void | Promise<void>;
}
