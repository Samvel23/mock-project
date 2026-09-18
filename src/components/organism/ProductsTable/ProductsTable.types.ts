import { IProduct } from "@/features/products/types/product.types";

export interface IProductsTableProps {
  products: IProduct[];
  isLoading?: boolean;
  onEdit?: (product: IProduct) => void;
  onDelete?: (id: string) => void;
}
