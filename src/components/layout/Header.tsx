"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Menu, 
  X, 
  ChevronRight, 
  Phone, 
  Mail, 
  FileText,
  Compass,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) {
    return null; // Admin has its own dedicated administrative layout
  }

  return (
    <>
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-brand-slate text-brand-ivory text-xs border-b border-white/10 py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white/80">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span>Engineering Solutions. Lasting Impact.</span>
            </div>
            <div className="h-3 w-px bg-white/20"></div>
            <a 
              href="tel:+251911234567" 
              className="flex items-center space-x-1.5 text-white/80 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>+251 91 123 4567</span>
            </a>
            <div className="h-3 w-px bg-white/20"></div>
            <a 
              href="mailto:info@oaksafricagroup.com" 
              className="flex items-center space-x-1.5 text-white/80 hover:text-brand-gold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>info@oaksafricagroup.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/60">Bole Commercial Corridor, Addis Ababa</span>
            <div className="h-3 w-px bg-white/20"></div>
            <Link 
              href="/documents" 
              className="flex items-center space-x-1 text-brand-gold hover:text-white transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>Company Profile (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 w-full",
          isScrolled
            ? "bg-brand-navy/95 backdrop-blur-md shadow-architectural border-b border-brand-gold/20 py-3.5"
            : "bg-brand-navy border-b border-white/10 py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-sm bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Building2 className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                  OAKS AFRICA <span className="text-brand-gold font-light">GROUP</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-brand-muted font-medium">
                  Engineering & Construction
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium tracking-wide transition-colors relative rounded-sm",
                      isActive
                        ? "text-brand-gold font-semibold"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/contact?tab=rfq"
                className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wide shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <Link
                href="/contact?tab=rfq"
                className="bg-brand-gold text-brand-navy px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wider uppercase"
              >
                Quote
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-brand-gold focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-brand-navy border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <span className="font-heading text-base font-bold text-white block leading-none">
                      OAKS AFRICA
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-brand-gold">
                      GROUP
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-6 space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-3 rounded text-base font-medium transition-colors",
                        isActive
                          ? "bg-brand-slate text-brand-gold font-semibold border-l-2 border-brand-gold"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-white/30" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Contact Info */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <Link
                href="/contact?tab=rfq"
                className="w-full flex items-center justify-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy py-3 rounded-sm font-semibold text-sm tracking-wide shadow"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-white/60 space-y-1 text-center">
                <p>+251 91 123 4567</p>
                <p>info@oaksafricagroup.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
