"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  Download, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  Shield,
  ExternalLink
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <footer className="bg-brand-navy text-white border-t border-brand-gold/20">
      {/* Pre-footer Callout Banner */}
      <div className="border-b border-white/10 bg-brand-slate/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase block mb-1">
                Start Your Project With Precision
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to Discuss Your Next Development?
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact?tab=rfq"
                className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-6 py-3 rounded-sm font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Request a Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/documents"
                className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-brand-gold px-5 py-3 rounded-sm text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4 text-brand-gold" />
                <span>Company Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand Info & Overview (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-sm bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-tight text-white leading-tight">
                  OAKS AFRICA <span className="text-brand-gold font-light">GROUP</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-muted font-medium">
                  Engineering & Construction
                </span>
              </div>
            </Link>
            
            <p className="text-brand-muted text-sm leading-relaxed max-w-sm">
              OAKS AFRICA GROUP is an established engineering and construction corporation delivering world-class structural, architectural, and civil infrastructure developments grounded in technical excellence and international safety standards.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://linkedin.com/company/oaks-africa-group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/OaksAfricaGroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/OaksAfricaGroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/oaksafricagroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Group
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers & Culture
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News & Insights
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  Downloadable Documents
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Principal Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/services/structural-civil-engineering" className="hover:text-white transition-colors">
                  Structural & Civil Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/architectural-engineering-design" className="hover:text-white transition-colors">
                  Architectural & Design
                </Link>
              </li>
              <li>
                <Link href="/services/building-construction" className="hover:text-white transition-colors">
                  Building & Construction
                </Link>
              </li>
              <li>
                <Link href="/services/infrastructure-development" className="hover:text-white transition-colors">
                  Infrastructure Works
                </Link>
              </li>
              <li>
                <Link href="/services/project-management-consultancy" className="hover:text-white transition-colors">
                  Project Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Corporate Office
            </h4>
            <div className="space-y-3 text-sm text-brand-muted">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Oaks Tower, 7th Floor, Bole Commercial Corridor, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+251911234567" className="hover:text-white transition-colors">
                  +251 91 123 4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:info@oaksafricagroup.com" className="hover:text-white transition-colors">
                  info@oaksafricagroup.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Mon - Fri: 8:00 AM - 5:30 PM<br/>Sat: 8:30 AM - 1:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Portal */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div>
            © {new Date().getFullYear()} OAKS AFRICA GROUP. All rights reserved. Engineering Solutions. Lasting Impact.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy & Governance
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/documents" className="hover:text-white transition-colors">
              Capability Statement
            </Link>
            <span className="text-white/20">•</span>
            <Link 
              href="/admin" 
              className="flex items-center space-x-1 text-white/50 hover:text-brand-gold transition-colors"
            >
              <Shield className="w-3 h-3 text-brand-gold" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
