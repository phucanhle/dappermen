import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://dappermen.vercel.app"),

  title: {
    default: "Dappermen | Thời trang nam cao cấp & Lookbook",
    template: "%s | Dappermen",
  },

  description:
    "Khám phá bộ sưu tập thời trang nam thiết kế cao cấp và lookbook nam lịch lãm tại Dappermen. Mua sắm áo sơ mi, quần tây âu, giày da và phụ kiện nam cao cấp tại Hà Nội & TPHCM.",

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    "dappermen",
    "dappermen shop",
    "thời trang nam dappermen",
    "thời trang nam cao cấp",
    "thời trang nam thiết kế",
    "thời trang nam hà nội",
    "thời trang nam tphcm",
    "shop quần áo nam cao cấp hà nội",
    "quần áo nam thiết kế sài gòn",
    "lookbook thời trang nam",
    "áo sơ mi nam cao cấp",
    "quần tây nam đẹp",
    "giày nam chính hãng",
    "phụ kiện nam luxury",
  ],

  openGraph: {
    type: "website",
    url: "https://dappermen.vercel.app/",
    siteName: "Dappermen",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dappermen - Thời trang nam cao cấp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },
};
