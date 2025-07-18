// src/types/CartItem.ts
export type cartItem = {
  id: number;
  image_src: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  onDelete?: () => void;
  onQuantityChange?: (qty: number) => void;
};
