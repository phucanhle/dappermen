import { create } from "zustand";
import { ShippingAddress } from "@/types/ShippingAddress";
import { UserState } from "@/types/User";

export const useUserStore = create<UserState>((set) => ({
  name: "",
  size: "",
  shippingAddress: {
    details: "",
    street: "",
    province: "",
    ward: "",
  },

  setUser: ({ name, size, shippingAddress }) =>
    set({ name, size, shippingAddress }),

  resetUser: () =>
    set({
      name: "",
      size: "",
      shippingAddress: {
        details: "",
        street: "",
        province: "",
        ward: "",
      },
    }),
}));
