import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, FileText } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-navy-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase bg-brand-gold/10 px-4 py-1.5 rounded-full border border-brand-gold/30">
          <span>PARTNER WITH OAKS AFRICA GROUP</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Let&apos;s Build Something <br className="hidden sm:inline" />
          <span className="text-brand-gold">Exceptional Together.</span>
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Whether you are planning a high-rise commercial headquarters, an industrial logistics hub, or an infrastructure expansion, our engineering team is ready to evaluate your requirements.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/contact?tab=rfq"
            className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-8 py-4 rounded-sm font-semibold text-sm tracking-wide shadow-xl transition-all duration-200 hover:shadow-2xl active:scale-95 group"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-brand-gold px-8 py-4 rounded-sm font-semibold text-sm transition-all"
          >
            <PhoneCall className="w-4 h-4 text-brand-gold" />
            <span>Contact Our Team</span>
          </Link>
        </div>

        {/* Reassurance Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-white/60">
          <span>• Detailed BOQ & Engineering Feasibility</span>
          <span>• Eurocode & International Compliance</span>
          <span>• Transparent Contractual Governance</span>
        </div>
      </div>
    </section>
  );
}
