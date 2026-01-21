// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/checkout",
          "/account",
          "/login",
          "/register",
          "/api",
        ],
      },
    ],
    sitemap: "https://dappermen.vercel.app/sitemap.xml",
  };
}
