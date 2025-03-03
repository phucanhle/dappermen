import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Shop for Men - Thời trang nam cao cấp",
    icons: {
        icon: { url: "/favicon.ico" },
        apple: [{ url: "/favicon.ico" }],
    },
    description: "Khám phá bộ sưu tập thời trang nam cao cấp. Mua sắm áo, quần, giày và phụ kiện chính hãng với giá tốt nhất.",
    openGraph: {
        title: "Shop for Men - Thời trang nam cao cấp",
        description: "Mua sắm thời trang nam chính hãng với nhiều ưu đãi hấp dẫn.",
        url: "https://yourwebsite.com",
        siteName: "Shop for Men",
        images: [
            {
                url: "https://yourwebsite.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Shop for Men - Thời trang nam cao cấp",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shop for Men - Thời trang nam cao cấp",
        description: "Mua sắm thời trang nam chính hãng với nhiều ưu đãi hấp dẫn.",
        images: ["https://yourwebsite.com/og-image.jpg"],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Shop for Men" />
                <meta name="keywords" content="thời trang nam, quần áo nam, giày nam, phụ kiện nam, mua sắm trực tuyến" />
            </head>
            <body suppressHydrationWarning>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
