"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import { Lock, Loader2 } from "lucide-react";
import { MESSAGES, PLACEHOLDERS } from "@/constants";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || MESSAGES.loginFailed);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError(MESSAGES.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-cream-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <SectionHeading
          subtitle="Secure"
          title="Admin Login"
          description="Enter your password to access the admin panel"
        />

        <form
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-rose-100 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-rose-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-300" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={PLACEHOLDERS.adminPassword}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-rose-200 bg-white text-rose-900 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                  autoFocus
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-rose-400 text-sm mt-6">
          <a href="/" className="hover:text-rose-600 transition-colors">
            ← Back to wedding site
          </a>
        </p>
      </div>
    </section>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <section className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-cream-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-rose-400">Loading...</div>
      </section>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
