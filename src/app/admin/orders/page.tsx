"use client";

import { useEffect, useState } from "react";
import { LoadingSpin } from "@/components/UI/Loading";
import { toast } from "react-hot-toast";
import { FiSearch, FiX } from "react-icons/fi";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  payment_method: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  items: OrderItem[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        if (selectedOrder) {
          const updated = data.orders.find((o: Order) => o.id === selectedOrder.id);
          if (updated) setSelectedOrder(updated);
        }
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Cập nhật trạng thái thất bại");
      }

      toast.success(`Cập nhật đơn hàng thành công: ${newStatus}`);
      await fetchOrders();
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    const matchesQuery =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shipping_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shipping_phone.includes(searchQuery);
    return matchesStatus && matchesQuery;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "bg-emerald-100 text-emerald-800";
      case "Đang giao":
        return "bg-blue-100 text-blue-800";
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      case "Chờ thanh toán":
        return "bg-amber-100 text-amber-800";
      case "Đã hủy":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  const parseAddress = (addressStr: string) => {
    try {
      const addr = JSON.parse(addressStr);
      const parts = [];
      if (addr.details) parts.push(addr.details);
      if (addr.street) parts.push(addr.street);
      if (addr.ward) parts.push(addr.ward);
      if (addr.province) parts.push(addr.province);
      return parts.join(", ") || addressStr;
    } catch (e) {
      return addressStr;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-light text-neutral-900 mb-1">
            Quản lý đơn hàng
          </h1>
          <p className="text-neutral-400 text-xs font-semibold uppercase tracking-wider">
            Quản lý vòng đời và xử lý đơn hàng của khách hàng
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-3xs">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["All", "Chờ thanh toán", "Đang xử lý", "Đang giao", "Đã giao", "Đã hủy"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterStatus === status
                  ? "bg-neutral-950 text-white"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              {status === "All" ? "Tất cả" : status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm theo Mã đơn, Tên, SĐT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-xs bg-neutral-50/50 focus:outline-none focus:border-neutral-500 font-sans"
          />
          <FiSearch className="absolute left-3.5 top-3 text-neutral-400 w-3.5 h-3.5" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl shadow-3xs overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpin />
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="text-sm text-neutral-400 italic py-16 text-center">
            Không tìm thấy đơn hàng phù hợp.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase tracking-wider bg-neutral-50/40">
                  <th className="py-4 px-6">Mã đơn</th>
                  <th className="py-4 px-4">Khách hàng</th>
                  <th className="py-4 px-4">Ngày đặt</th>
                  <th className="py-4 px-4">Thanh toán</th>
                  <th className="py-4 px-4">Tổng tiền</th>
                  <th className="py-4 px-6 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-sans text-neutral-700">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-neutral-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-6 font-mono font-semibold text-neutral-900">
                      {order.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral-800">{order.shipping_name}</span>
                        <span className="text-[10px] text-neutral-400 mt-0.5">{order.shipping_phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-neutral-400">
                      {new Date(order.date).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-4 px-4 font-semibold text-neutral-600">
                      {order.payment_method}
                    </td>
                    <td className="py-4 px-4 font-bold text-neutral-900">
                      {order.total.toLocaleString("vi-VN")} VND
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeClass(
                          order.status
                        )}`}
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white border border-neutral-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/40">
              <div>
                <h3 className="font-serif text-lg text-neutral-900">Chi tiết đơn hàng</h3>
                <span className="text-xs font-mono font-semibold text-neutral-500">{selectedOrder.id}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-all cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Shipping info */}
              <div className="bg-neutral-50/50 border border-neutral-200/50 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">
                  Thông tin giao hàng
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Người nhận</span>
                    <span className="font-semibold text-neutral-900">{selectedOrder.shipping_name}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Số điện thoại</span>
                    <span className="font-semibold text-neutral-900">{selectedOrder.shipping_phone}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-neutral-200/40">
                  <span className="text-neutral-400 block mb-0.5">Địa chỉ giao hàng</span>
                  <span className="font-semibold text-neutral-900 leading-relaxed">
                    {parseAddress(selectedOrder.shipping_address)}
                  </span>
                </div>
              </div>

              {/* Order items */}
              <div>
                <h4 className="font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-3">
                  Sản phẩm đặt mua
                </h4>
                <div className="border border-neutral-200/60 rounded-xl overflow-hidden divide-y divide-neutral-100">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-neutral-900 block">{item.name}</span>
                        <span className="text-neutral-400 text-[10px] block">Số lượng: x{item.quantity}</span>
                      </div>
                      <span className="font-bold text-neutral-950">
                        {(item.price * item.quantity).toLocaleString("vi-VN")} VND
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta billing */}
              <div className="flex justify-between items-center pt-2 font-semibold">
                <div className="text-neutral-500">
                  <span>Phương thức: {selectedOrder.payment_method}</span>
                  <span className="mx-2">|</span>
                  <span>Trạng thái: </span>
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getStatusBadgeClass(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-right text-sm">
                  <span className="text-neutral-400 mr-2 font-normal">TỔNG CỘNG:</span>
                  <span className="text-neutral-950 font-bold text-base">{selectedOrder.total.toLocaleString("vi-VN")} VND</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-neutral-100 flex flex-wrap gap-2.5 justify-end bg-neutral-50/40">
              {selectedOrder.status === "Chờ thanh toán" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedOrder.id, "Đang xử lý")}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Xác nhận đã trả tiền
                </button>
              )}
              {selectedOrder.status === "Đang xử lý" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedOrder.id, "Đang giao")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Giao hàng
                </button>
              )}
              {selectedOrder.status === "Đang giao" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedOrder.id, "Đã giao")}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Hoàn tất đơn hàng
                </button>
              )}
              {selectedOrder.status !== "Đã giao" && selectedOrder.status !== "Đã hủy" && (
                <button
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedOrder.id, "Đã hủy")}
                  className="px-4 py-2 border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Hủy đơn hàng
                </button>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 border border-neutral-200 hover:bg-neutral-100 text-neutral-800 font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
