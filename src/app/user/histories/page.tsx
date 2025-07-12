"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface OrderHistory {
  id: string;
  date: string;       // ISO string
  status: string;
  total: number;      // Tổng tiền
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export default function UserHistoriesPage() {
  const { data: session, status } = useSession();

  const [histories, setHistories] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    async function fetchHistories() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/user/histories");
        if (!res.ok) throw new Error("Không thể tải lịch sử");

        const data = await res.json();
        setHistories(data.histories || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchHistories();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Bạn cần đăng nhập để xem lịch sử.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đơn hàng</h1>

      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && histories.length === 0 && (
        <p>Bạn chưa có đơn hàng nào.</p>
      )}

      <ul className="space-y-4">
        {histories.map((order) => (
          <li key={order.id} className="border rounded p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Đơn hàng #{order.id}</span>
              <span className="text-gray-500">
                {new Date(order.date).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <div className="mb-2">
              <span
                className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  order.status === "Đã giao"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Đang xử lý"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <ul className="mb-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>
                </li>
              ))}
            </ul>

            <div className="text-right font-semibold">
              Tổng:{" "}
              {order.total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
