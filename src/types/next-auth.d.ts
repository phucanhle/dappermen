import { ShippingAddress } from "./ShippingAddress";
// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import ShippingAddress from "./ShippingAddress";

declare module "next-auth" {
  interface User {
    id: string;
    size?: string;
    shippingAddress?: ShippingAddress;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      size?: string;
      shippingAddress?: ShippingAddress;
    };
  }
}
