
export interface Product {
  id: number;
  name: string;
  image: string;
  basePrice: number;
  badge?: string;
}

export interface CartItem {
  id: string; // unique instance id
  productId: number;
  name: string;
  size: string;
  sizeMultiplier: number;
  material: string;
  materialMultiplier: number;
  quantity: number;
  price: number;
}

export interface SizeOption {
  label: string;
  multiplier: number;
}

export interface MaterialOption {
  label: string;
  multiplier: number;
}
