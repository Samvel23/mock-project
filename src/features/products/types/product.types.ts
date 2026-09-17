export type ProductStatus = "active" | "draft" | "archived";

export interface IProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: ProductStatus;
  tags: string[];
  unitsSold: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginationMeta {
  page: number;
  currentPage?: number;
  lastPage?: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IProductsApiResponse {
  success: boolean;
  data: IProduct[];
  meta: IPaginationMeta;
}
