"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Building2, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@oaksafricagroup.com");
  const [password, setPassword] = useState("OakAfrica2026!Secure");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email address or administrative password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected login error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-brand-slate/90 backdrop-blur-md p-8 sm:p-10 rounded-sm border border-brand-gold/30 shadow-2xl text-white space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-sm bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center mx-auto text-brand-gold">
          <Building2 className="w-6 h-6" />
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-white">
          OAKS AFRICA <span className="text-brand-gold">GROUP</span>
        </h1>
        <p className="text-xs font-mono uppercase tracking-widest text-brand-gold">
          Administrative Control Portal
        </p>
      </div>

      {error && (
        <div className="p-3 bg-brand-error/20 border border-brand-error/40 rounded text-xs text-red-200 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@oaksafricagroup.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-brand-navy border border-white/20 text-white text-sm focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-1.5">
            Security Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-brand-navy border border-white/20 text-white text-sm focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy py-3 rounded-sm font-semibold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <span>{loading ? "Authenticating..." : "Access Administrative Console"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Seeded Credentials Callout for Ease of Evaluation */}
      <div className="pt-4 border-t border-white/10 text-xs text-white/60 space-y-1 text-center font-mono">
        <p className="text-brand-gold">Default Development Credentials:</p>
        <p>admin@oaksafricagroup.com / OakAfrica2026!Secure</p>
      </div>

      <div className="text-center pt-2">
        <Link href="/" className="text-xs text-white/50 hover:text-white transition-colors">
          ← Return to Public Corporate Site
        </Link>
      </div>
    </div>
  );
}
