"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import Title, { Subtitle } from "@/components/UI/Title";
import { Button, ButtonSecond } from "@/components/UI/Button";
import SelectAddress from "@/components/SelectAddress";
import { FieldSelect } from "@/components/UI/Field";
import { LoadingSpin } from "@/components/UI/Loading";
import { useUserStore } from "@/stores/userStore";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const { name, size, shippingAddress, setUser, resetUser } = useUserStore();

  const [loadingFetch, setLoadingFetch] = useState(true); // 👈 loading dữ liệu ban đầu
  const [loadingSubmit, setLoadingSubmit] = useState(false); // 👈 loading khi submit

  useEffect(() => {
    if (!session?.user) {
      resetUser();
      setLoadingFetch(false);
      return;
    }

    const fetchUser = async () => {
      setLoadingFetch(true);
      try {
        const res = await fetch("/api/users/get-profile");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Lỗi khi lấy dữ liệu");

        setUser({
          name: data.name || "",
          size: data.size || "",
          shippingAddress: {
            details: data.shippingAddress?.details || "",
            street: data.shippingAddress?.street || "",
            province: data.shippingAddress?.province || "",
            ward: data.shippingAddress?.ward || "",
          },
        });
      } catch (err) {
        toast.error("Không tải được thông tin người dùng");
        console.error(err);
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchUser();
  }, [session]);

  if (status === "loading" || loadingFetch)
    return (
      <div className="max-w-3xl mx-auto min-h-screen mt-10 p-6">
        <LoadingSpin />
      </div>
    );
  if (loadingFetch && !session)
    return <p>Bạn cần đăng nhập để xem trang này.</p>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const res = await fetch("/api/users/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, size, shippingAddress }),
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");

      toast.success("Thông tin đã được cập nhật!");
    } catch (error) {
      toast.error("❌ " + (error as Error).message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen mt-10 p-6">
      <Title>Thông tin người dùng</Title>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tên:</label>
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setUser({ name: e.target.value, size, shippingAddress })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <FieldSelect
          label="Size favorite"
          options={SIZE_OPTIONS}
          value={size}
          onChange={(e) =>
            setUser({ name, size: e.target.value, shippingAddress })
          }
        />

        <Subtitle>Thông tin giao hàng</Subtitle>
        <SelectAddress
          value={shippingAddress}
          onChange={(val) => setUser({ name, size, shippingAddress: val })}
        />

        <div className="flex items-center gap-3 pt-4">
          <Button type="submit" disabled={loadingSubmit}>
            {loadingSubmit ? "Đang lưu..." : "Lưu"}
          </Button>
          <ButtonSecond type="reset" onClick={resetUser}>
            Hủy
          </ButtonSecond>
        </div>
      </form>
    </div>
  );
}
