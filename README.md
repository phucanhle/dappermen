# Dapper - Fashion E-commerce Website

![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## Mục lục

-   [Giới thiệu](#dapper---fashion-e-commerce-website)
-   [Tính năng chính](#tính-năng-chính)
-   [Công nghệ sử dụng](#công-nghệ-sử-dụng)
-   [Cài đặt và chạy dự án](#cài-đặt-và-chạy-dự-án)
-   [Cấu trúc thư mục](#cấu-trúc-thư-mục)
-   [Đóng góp](#đóng-góp)
-   [Tác giả & Liên hệ](#tác-giả--liên-hệ)

Dapper là một website thương mại điện tử về thời trang, xây dựng với Next.js, TypeScript và các công nghệ hiện đại. Dự án này cung cấp trải nghiệm mua sắm trực tuyến với giao diện hiện đại, thân thiện với người dùng.

## Tính năng chính

-   Xem danh sách sản phẩm, chi tiết sản phẩm
-   Thêm sản phẩm vào giỏ hàng và mục yêu thích
-   Đăng nhập người dùng
-   Bộ lọc sản phẩm theo danh mục
-   Hướng dẫn chọn size
-   Carousel quảng cáo
-   Responsive trên nhiều thiết bị

## Công nghệ sử dụng

-   [Next.js](https://nextjs.org/)
-   TypeScript
-   CSS Modules
-   PostCSS
-   ESLint

## Cài đặt và chạy dự án

1. **Clone repository:**
    ```bash
    git clone <repo-url>
    cd dapper
    ```
2. **Cài đặt dependencies:**
    ```bash
    npm install
    ```
3. **Chạy ứng dụng:**
    ```bash
    npm run dev
    ```
4. Truy cập website tại `http://localhost:3000`

**Trang production:** [https://dappermen.vercel.app/](https://dappermen.vercel.app/)

## Cấu trúc thư mục

```
constants/         # Dữ liệu tĩnh (footer, ...)
public/            # Ảnh, favicon, logo, ...
  images/          # Ảnh sản phẩm
  size/            # Ảnh hướng dẫn chọn size
src/
  app/             # Trang chính và các route
    cart/          # Trang giỏ hàng
    favourites/    # Trang yêu thích
    login/         # Trang đăng nhập
    products/      # Trang sản phẩm, chi tiết sản phẩm
      details/     # Trang chi tiết sản phẩm động
        [id]/      # Trang chi tiết theo id sản phẩm
  components/      # Các component giao diện
  data/            # Dữ liệu mock (sản phẩm, ...)
  store/           # Zustand store (giỏ hàng, ...)
  types/           # Định nghĩa TypeScript types
  __tests__/       # Unit tests
```

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo pull request hoặc issue nếu bạn có ý tưởng hoặc phát hiện lỗi.

## Tác giả & Liên hệ

-   Email: [lephucanh2601@gmail.com](lephucanh2601@gmail.com)
-   Github: [phucanhle](phucanhle)

---

Cảm ơn bạn đã sử dụng Dapper!
