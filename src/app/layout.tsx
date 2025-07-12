import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Shop for Men - Thời trang nam cao cấp | Quần áo, Giày & Phụ kiện",
  icons: {
    icon: { url: "/favicon.ico" },
    apple: [{ url: "/favicon.ico" }],
  },
  description:
    "Khám phá bộ sưu tập thời trang nam cao cấp tại Shop for Men. Mua sắm áo sơ mi, quần jeans, giày da, phụ kiện chính hãng và đa dạng mẫu mã với giá tốt nhất. Cập nhật xu hướng thời trang nam mới nhất.",
  openGraph: {
    title: "Shop for Men - Thời trang nam cao cấp | Quần áo, Giày & Phụ kiện",
    description:
      "Mua sắm thời trang nam cao cấp, chính hãng với nhiều ưu đãi hấp dẫn tại Shop for Men. Tìm kiếm áo, quần, giày và phụ kiện phù hợp phong cách của bạn.",
    url: "https://yourwebsite.com",
    siteName: "Shop for Men",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shop for Men - Thời trang nam cao cấp | Quần áo, Giày & Phụ kiện",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop for Men - Thời trang nam cao cấp | Quần áo, Giày & Phụ kiện",
    description:
      "Mua sắm thời trang nam chính hãng với nhiều ưu đãi hấp dẫn tại Shop for Men. Khám phá ngay!",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Shop for Men" />
        <meta
          name="keywords"
          content="thời trang nam, quần áo nam cao cấp, giày nam chính hãng, phụ kiện nam, mua sắm thời trang nam trực tuyến, áo sơ mi nam, quần jeans nam, áo khoác nam, đồ công sở nam, phong cách nam"
        />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <Header />
          <main className="mt-18">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
