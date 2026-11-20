import React, { Suspense } from "react";
import { ContactPageClient } from "@/components/website/ContactPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Project Enquiries | OAKS AFRICA GROUP",
  description:
    "Get in touch with OAKS AFRICA GROUP's engineering and commercial estimation desk. Request quotations, discuss tenders, or visit our Addis Ababa headquarters.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-brand-charcoal min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>DIRECT COMMERCIAL ACCESS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Contact & Project Enquiries
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed">
              Submit your project scope, tender documentation, or engineering inquiries to our commercial and estimating team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="p-12 text-center text-brand-muted">Loading enquiry desk...</div>}>
            <ContactPageClient />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
