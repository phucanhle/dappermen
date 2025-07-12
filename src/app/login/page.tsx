"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/components/Logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Field } from "@/components/UI/Field";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Khởi tạo router
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    if (!email || !password || !isValidEmail(email)) {
      toast.error("Vui lòng nhập email hợp lệ và mật khẩu.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
          toast.success("Đăng ký thành công!");
          setIsSignUp(false);
          setEmail("");
          setPassword("");
        } else {
          const data = await res.json();
          toast.error(data.message || "Đăng ký thất bại");
        }
      } else {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.ok) {
          toast.success("Đăng nhập thành công");
          router.push("/");
        } else {
          toast.error("Đăng nhập thất bại. Kiểm tra lại email/mật khẩu.");
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra.");
      console.error("Error during authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full relative justify-center items-center bg-[url(/Carousel3.jpg)] bg-cover  h-screen">
      <div className="h-screen md:h-fit w-full max-w-md p-16 md:-mt-10 flex flex-col items-center justify-center bg-white gap-8">
        <Logo />
        <h2 className="text-2xl font-bold text-center">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
          <Field
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isSignUp && (
            <Field
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-black text-white hover:bg-gray-800 transition rounded cursor-pointer"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp((prev) => !prev)}
          className="text-sm text-indigo-600 hover:underline cursor-pointer"
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </button>

        <button className="w-full max-w-sm p-3 mt-1 border border-gray-300 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition">
          <Image
            width="24"
            height="24"
            src="/google-logo.png"
            alt="google-logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
