"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
import { getSession } from "@/utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        window.location.href = "/pages/dashboard";
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else window.location.href = "/pages/dashboard";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBAD26]">
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-[1000px] rounded-3xl bg-white p-8 shadow-lg">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left side with logo and uniforms */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <Image
                src="/assets/HPLogo.png"
                alt="HRL Logo"
                width={150}
                height={150}
                className="mb-2"
              />
              <div className="relative h-[400px] w-full">
                <Image
                  src="/assets/DisplayL.png"
                  alt="Uniforms"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            {/* Right side with login form */}
            <div className="flex flex-col justify-center p-6">
              <h2 className="mb-8 text-center text-4xl font-bold text-[#FBAD26]">
                LOGIN
              </h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <input
                  className="w-full rounded-lg border-2 border-[#FBAD26] bg-transparent p-3 placeholder-[#FBAD26] focus:outline-none focus:ring-2 focus:ring-[#FBAD26]"
                  type="email"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full rounded-lg border-2 border-[#FBAD26] bg-transparent p-3 placeholder-[#FBAD26] focus:outline-none focus:ring-2 focus:ring-[#FBAD26]"
                  type="password"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="w-full rounded-lg bg-[#FBAD26] p-3 text-lg font-semibold text-white transition-colors hover:bg-[#e99d15]">
                  LOGIN
                </button>
                {error && <p className="text-center text-red-500">{error}</p>}
              </form>

              <p className="mt-6 text-center text-[#FBAD26]">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
