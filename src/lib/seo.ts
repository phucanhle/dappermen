import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://dappermen.vercel.app"),

  title: {
    default: "Shop for Men - Thời trang nam cao cấp",
    template: "%s | Shop for Men",
  },

  description:
    "Khám phá bộ sưu tập thời trang nam cao cấp tại Shop for Men. Mua sắm áo sơ mi, quần jeans, giày da, phụ kiện chính hãng và đa dạng mẫu mã với giá tốt nhất.",

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    "thời trang nam",
    "quần áo nam cao cấp",
    "giày nam chính hãng",
    "phụ kiện nam",
    "mua sắm thời trang nam trực tuyến",
  ],

  openGraph: {
    type: "website",
    url: "https://dappermen.vercel.app/",
    siteName: "Shop for Men",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shop for Men - Thời trang nam cao cấp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },
};
