import { ShippingAddress } from "./ShippingAddress";

export interface UserState {
  name: string;
  size: string;
  shippingAddress: ShippingAddress;

  setUser: (data: {
    name: string;
    size: string;
    shippingAddress: ShippingAddress;
  }) => void;

  resetUser: () => void;
}
