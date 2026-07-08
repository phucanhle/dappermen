"use client";

import { useEffect, useState } from "react";
import { LoadingSpin } from "@/components/UI/Loading";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { getProductImageUrl } from "@/lib/imageHelper";

type ProductSize = {
  size: string;
  stock: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image_src: string;
  category: string;
  sizes: ProductSize[];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStocks, setEditingStocks] = useState<Record<string, number>>({});
  const [savingProductId, setSavingProductId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        const stocks: Record<string, number> = {};
        data.products.forEach((p: Product) => {
          p.sizes.forEach((s) => {
            stocks[`${p.id}-${s.size}`] = s.stock;
          });
        });
        setEditingStocks(stocks);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStockChange = (productId: number, size: string, value: string) => {
    const stockNum = parseInt(value, 10);
    setEditingStocks((prev) => ({
      ...prev,
      [`${productId}-${size}`]: isNaN(stockNum) ? 0 : stockNum,
    }));
  };

  const handleSaveStock = async (product: Product) => {
    setSavingProductId(product.id);
    try {
      const sizesToUpdate = ["S", "M", "L", "XL"];
      
      const updatePromises = sizesToUpdate.map((size) => {
        const key = `${product.id}-${size}`;
        const newStock = editingStocks[key] !== undefined ? editingStocks[key] : 0;
        
        return fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            size,
            stock: newStock,
          }),
        });
      });

      const responses = await Promise.all(updatePromises);
      const allOk = responses.every((res) => res.ok);

      if (!allOk) {
        throw new Error("Một số kích thước cập nhật thất bại");
      }

      toast.success(`Cập nhật tồn kho sản phẩm "${product.name}" thành công!`);
      await fetchProducts();
    } catch (err: any) {
      toast.error(err.message || "Lỗi khi lưu tồn kho");
    } finally {
      setSavingProductId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-light text-neutral-900 mb-1">
          Quản lý kho hàng
        </h1>
        <p className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">
          Theo dõi và cập nhật trực tiếp số lượng tồn kho theo kích thước (size)
        </p>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl shadow-3xs overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpin />
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-neutral-400 italic py-16 text-center">
            Không tìm thấy sản phẩm nào trong hệ thống.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider bg-neutral-50/40">
                  <th className="py-4 px-6 w-20">Hình ảnh</th>
                  <th className="py-4 px-4">Sản phẩm</th>
                  <th className="py-4 px-4 w-28">Đơn giá</th>
                  <th className="py-4 px-4 text-center w-20">Size S</th>
                  <th className="py-4 px-4 text-center w-20">Size M</th>
                  <th className="py-4 px-4 text-center w-20">Size L</th>
                  <th className="py-4 px-4 text-center w-20">Size XL</th>
                  <th className="py-4 px-6 text-center w-28">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-sans text-neutral-700">
                {products.map((product) => {
                  const isSaving = savingProductId === product.id;
                  
                  return (
                    <tr key={product.id} className="hover:bg-neutral-50/20 transition-colors">
                      {/* Image Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="w-12 h-16 bg-neutral-50 border border-neutral-200/60 rounded-lg overflow-hidden relative">
                          <Image
                            src={getProductImageUrl(product.image_src) || "/placeholder.png"}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.png";
                            }}
                          />
                        </div>
                      </td>
                      {/* Product details */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-neutral-800 text-sm leading-tight">
                            {product.name}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-neutral-400">
                            ID: #{product.id} | {product.category}
                          </span>
                        </div>
                      </td>
                      {/* Unit Price */}
                      <td className="py-4 px-4 font-bold text-neutral-900">
                        {product.price.toLocaleString("vi-VN")} VND
                      </td>
                      {/* Size S Input */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={editingStocks[`${product.id}-S`] !== undefined ? editingStocks[`${product.id}-S`] : ""}
                          onChange={(e) => handleStockChange(product.id, "S", e.target.value)}
                          className="w-14 px-2 py-1.5 border border-neutral-200 rounded-lg text-center font-semibold text-xs focus:outline-none focus:border-neutral-500 bg-neutral-50/50"
                        />
                      </td>
                      {/* Size M Input */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={editingStocks[`${product.id}-M`] !== undefined ? editingStocks[`${product.id}-M`] : ""}
                          onChange={(e) => handleStockChange(product.id, "M", e.target.value)}
                          className="w-14 px-2 py-1.5 border border-neutral-200 rounded-lg text-center font-semibold text-xs focus:outline-none focus:border-neutral-500 bg-neutral-50/50"
                        />
                      </td>
                      {/* Size L Input */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={editingStocks[`${product.id}-L`] !== undefined ? editingStocks[`${product.id}-L`] : ""}
                          onChange={(e) => handleStockChange(product.id, "L", e.target.value)}
                          className="w-14 px-2 py-1.5 border border-neutral-200 rounded-lg text-center font-semibold text-xs focus:outline-none focus:border-neutral-500 bg-neutral-50/50"
                        />
                      </td>
                      {/* Size XL Input */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={editingStocks[`${product.id}-XL`] !== undefined ? editingStocks[`${product.id}-XL`] : ""}
                          onChange={(e) => handleStockChange(product.id, "XL", e.target.value)}
                          className="w-14 px-2 py-1.5 border border-neutral-200 rounded-lg text-center font-semibold text-xs focus:outline-none focus:border-neutral-500 bg-neutral-50/50"
                        />
                      </td>
                      {/* Save Button */}
                      <td className="py-4 px-6 text-center">
                        <button
                          disabled={isSaving}
                          onClick={() => handleSaveStock(product)}
                          className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold uppercase tracking-wider text-[10px] rounded-lg transition-all disabled:opacity-40 cursor-pointer shadow-3xs"
                        >
                          {isSaving ? "Saving..." : "Lưu Kho"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
