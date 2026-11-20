"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  LayoutDashboard, 
  FolderKanban, 
  Wrench, 
  MessageSquareText, 
  FileSpreadsheet, 
  Users, 
  Newspaper, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const ADMIN_LINKS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquareText },
  { label: "Quotations (RFQ)", href: "/admin/quotations", icon: FileSpreadsheet },
  { label: "Careers & Apps", href: "/admin/careers", icon: Users },
  { label: "News & Insights", href: "/admin/news", icon: Newspaper },
  { label: "Company Profile", href: "/admin/company", icon: Building2 },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Settings & Logs", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  // If on login page, render clean container without sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-brand-ivory text-brand-charcoal">
      {/* 1. Desktop Deep Navy Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-brand-navy text-white border-r border-brand-gold/20 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-sm bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <span className="font-heading text-base font-bold text-white block leading-tight">
              OAKS AFRICA
            </span>
            <span className="text-[9px] uppercase tracking-widest text-brand-gold font-mono font-bold">
              Admin Platform
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {ADMIN_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-brand-slate text-brand-gold font-bold border-l-2 border-brand-gold shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-brand-gold" : "text-white/50"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-mono font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {session?.user?.name || "Oak Administrator"}
              </p>
              <p className="text-[10px] text-brand-gold uppercase tracking-wider font-mono">
                {(session?.user as any)?.role || "SUPER_ADMIN"}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs px-2 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center space-x-1 text-brand-error hover:text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="fixed top-0 bottom-0 left-0 w-64 bg-brand-navy text-white p-4 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-heading font-bold text-base text-white">
                  OAKS Admin
                </span>
                <button onClick={() => setSidebarOpen(false)} className="text-white/60">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="py-4 space-y-1">
                {ADMIN_LINKS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname?.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded text-xs uppercase font-semibold ${
                        isActive
                          ? "bg-brand-slate text-brand-gold font-bold border-l-2 border-brand-gold"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-brand-gold" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link href="/" target="_blank" className="text-xs text-white/70 flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Public Site</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="text-xs text-brand-error flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar on Mobile */}
        <header className="lg:hidden bg-brand-navy text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 text-white hover:text-brand-gold"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-heading text-sm font-bold text-white">
            OAKS AFRICA Admin
          </span>
          <Link href="/" target="_blank" className="text-xs text-brand-gold">
            Visit Site
          </Link>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
