"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { LoadingSpin } from "@/components/UI/Loading";
import { FiLayout, FiShoppingBag, FiBox, FiHome, FiLogOut } from "react-icons/fi";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center font-sans">
        <LoadingSpin />
        <p className="text-neutral-400 text-sm mt-3 animate-pulse">Checking credentials...</p>
      </div>
    );
  }

  // Guard routing - redirect/block non-admins
  if (status === "unauthenticated" || (session?.user as any)?.role !== "admin") {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center font-sans px-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 max-w-md w-full text-center shadow-xs">
          <h1 className="font-serif text-3xl font-light text-neutral-900 mb-3">403 Forbidden</h1>
          <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
            Bạn không có quyền truy cập trang quản trị. Vui lòng đăng nhập bằng tài khoản Admin.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/login?callbackUrl=/admin"
              className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all text-center"
            >
              Đăng Nhập Admin
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all text-center"
            >
              Về Trang Chủ Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  const menuItems = [
    { name: "Tổng quan", path: "/admin", icon: <FiLayout className="w-4 h-4" /> },
    { name: "Đơn hàng", path: "/admin/orders", icon: <FiShoppingBag className="w-4 h-4" /> },
    { name: "Kho hàng", path: "/admin/products", icon: <FiBox className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex font-sans">
      {/* Fixed Left Sidebar */}
      <aside className="w-64 bg-neutral-950 text-neutral-300 flex flex-col fixed inset-y-0 left-0 z-20 border-r border-neutral-800 select-none">
        {/* Brand Logo Header */}
        <div className="p-6 border-b border-neutral-900 flex flex-col gap-1">
          <span className="font-serif text-2xl tracking-widest font-light text-white uppercase">
            Dappermen
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#d4af37] font-semibold font-sans">
            Management System
          </span>
        </div>

        {/* User Info Card */}
        <div className="px-6 py-4 border-b border-neutral-900 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-neutral-950 font-bold text-xs uppercase">
            {session.user.name?.substring(0, 2) || "AD"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white truncate">{session.user.name}</span>
            <span className="text-[10px] text-neutral-500 font-mono truncate">{session.user.email}</span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-150 ${
                  isActive
                    ? "bg-[#d4af37] text-neutral-950 shadow-sm font-bold"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Operations */}
        <div className="p-4 border-t border-neutral-900 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all"
          >
            <FiHome className="w-4 h-4" />
            Về Trang Chủ Shop
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-all text-left bg-transparent border-0 outline-none cursor-pointer"
          >
            <FiLogOut className="w-4 h-4" />
            Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Right Content Area */}
      <div className="pl-64 w-full flex flex-col min-h-screen">
        <main className="flex-1 p-8 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
