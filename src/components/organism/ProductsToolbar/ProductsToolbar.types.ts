export interface IProductsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onAddNew: () => void;
}
