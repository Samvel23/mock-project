export interface ICreateProductData {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
}

export interface ICreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ICreateProductData) => void | Promise<void>;
}