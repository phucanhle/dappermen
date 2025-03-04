"use client";
import React, { useState } from "react";
import Image from "next/image";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isSignUp) {
            // Handle sign-up logic here
            console.log("Sign Up - Email:", email);
            console.log("Sign Up - Password:", password);
        } else {
            // Handle login logic here
            console.log("Login - Email:", email);
            console.log("Login - Password:", password);
        }
    };

    return (
        <div className="flex w-full h-screen">
            <div className="relative w-full p-16 flex flex-col items-center justify-center gap-[50px] bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">
                    {isSignUp ? "Sign Up" : "Login"}
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 flex flex-col justify-center w-full max-w-[500px]"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            className="w-full p-3 outline-none border mt-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mt-5"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            className="w-full p-3 outline-none border mt-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full outline-none border mt-5 p-4 bg-[#383838] text-[#ebebeb] hover:bg-[#494949]"
                    >
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </form>
                <div className="text-center">
                    <button
                        onClick={() =>
                            setIsSignUp(!isSignUp)
                        }
                        className="text-indigo-600 hover:underline"
                    >
                        {isSignUp
                            ? "Already have an account? Login"
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>
                <div className="flex gap-10">
                    <button className="size-10 bg-amber-400"></button>
                    <button className="size-10 bg-amber-400"></button>
                    <button className="size-10 bg-amber-400"></button>
                </div>
            </div>
            <Image
                src="/Carousel1.jpg"
                width={5000}
                height={5000}
                alt={"login"}
                className="w-1/2 object-cover"
            />
        </div>
    );
};

export default LoginPage;
