"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/components/Logo";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !password) return;

        try {
            if (isSignUp) {
                console.log("📝 Sign Up:", {
                    email,
                    password,
                });
                // TODO: Gọi API đăng ký ở đây
            } else {
                console.log("🔐 Login:", {
                    email,
                    password,
                });
                // TODO: Gọi API đăng nhập ở đây
            }
        } catch (error) {
            console.error("❌ Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full relative justify-center items-center bg-[url(/Carousel3.jpg)] bg-cover  h-screen">
            <div className="h-screen md:h-fit w-full max-w-md p-16 md:-mt-10 flex flex-col items-center justify-center bg-white gap-8">
                <Logo />
                <h2 className="text-2xl font-bold text-center">
                    {isSignUp
                        ? "Create an account"
                        : "Welcome back"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full max-w-sm"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 bg-black text-white hover:bg-gray-800 transition rounded cursor-pointer"
                    >
                        {loading
                            ? "Processing..."
                            : isSignUp
                            ? "Sign Up"
                            : "Login"}
                    </button>
                </form>

                <button
                    onClick={() =>
                        setIsSignUp((prev) => !prev)
                    }
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
                        src="https://img.icons8.com/color/48/google-logo.png"
                        alt="google-logo"
                    />
                    <span>Login with Google</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
