"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingSpin } from "@/components/UI/Loading";
import { FiDollarSign, FiShoppingBag, FiClock, FiArrowRight } from "react-icons/fi";

type AnalyticsData = {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
};

type OrderSummary = {
  id: string;
  date: string;
  status: string;
  total: number;
  shipping_name: string;
};

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [analyticRes, ordersRes] = await Promise.all([
          fetch("/api/admin/analytics"),
          fetch("/api/admin/orders"),
        ]);

        const analyticJson = await analyticRes.json();
        const ordersJson = await ordersRes.json();

        if (analyticJson.success) setAnalytics(analyticJson.data);
        if (ordersJson.success) setRecentOrders(ordersJson.orders.slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpin />
      </div>
    );
  }

  const kpis = [
    {
      title: "Doanh Thu",
      value: `${analytics?.totalRevenue.toLocaleString("vi-VN")} VND`,
      desc: "Chỉ tính đơn hàng đã giao thành công",
      icon: <FiDollarSign className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-100",
    },
    {
      title: "Tổng Đơn Hàng",
      value: analytics?.totalOrders || 0,
      desc: "Toàn bộ đơn hàng đã phát sinh",
      icon: <FiShoppingBag className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50 border-blue-100",
    },
    {
      title: "Đơn Cần Xử Lý",
      value: analytics?.pendingOrders || 0,
      desc: "Đơn hàng đang chờ duyệt/chờ thanh toán",
      icon: <FiClock className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in font-sans">
      {/* Header section */}
      <div>
        <h1 className="font-serif text-3xl font-light text-neutral-900 mb-1">
          Tổng quan hệ thống
        </h1>
        <p className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">
          Dữ liệu kinh doanh thời gian thực
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="border border-neutral-200/60 rounded-2xl p-6 bg-white shadow-3xs flex justify-between items-start transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                {kpi.title}
              </span>
              <span className="text-xl md:text-2xl font-bold text-neutral-900 block font-sans">
                {kpi.value}
              </span>
              <span className="text-[10px] text-neutral-400 block">{kpi.desc}</span>
            </div>
            <div className={`p-3 rounded-xl border ${kpi.bg}`}>{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-3xs">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-serif text-lg text-neutral-900">Đơn hàng gần đây</h2>
            <p className="text-xs text-neutral-400 mt-0.5">5 đơn hàng mới phát sinh gần nhất</p>
          </div>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-neutral-500 uppercase tracking-wider transition-all"
          >
            Tất cả đơn hàng
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-sm text-neutral-400 italic py-6 text-center">Chưa có đơn hàng nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="py-3.5 pr-4">Mã đơn</th>
                  <th className="py-3.5 px-4">Khách hàng</th>
                  <th className="py-3.5 px-4">Ngày đặt</th>
                  <th className="py-3.5 px-4">Tổng tiền</th>
                  <th className="py-3.5 pl-4 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100/60 font-sans text-neutral-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3.5 pr-4 font-mono font-semibold text-neutral-900">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4 font-medium">{order.shipping_name}</td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      {new Date(order.date).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-900">
                      {order.total.toLocaleString("vi-VN")} VND
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "Đã giao"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Đang giao"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Chờ thanh toán"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
