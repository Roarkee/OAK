import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Award, Shield, Compass, Ruler } from "lucide-react";

export function CompanyIntro() {
  return (
    <section className="py-24 bg-brand-ivory text-brand-charcoal relative overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e8e6_1px,transparent_1px),linear-gradient(to_bottom,#e7e8e6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text & Capabilities (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>OAKS AFRICA GROUP INTRODUCTION</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-tight">
              Engineering Solutions. <br className="hidden sm:inline" />
              <span className="text-brand-gold">Lasting Impact.</span>
            </h2>

            <p className="text-brand-charcoal/85 text-base sm:text-lg leading-relaxed font-normal">
              OAKS AFRICA GROUP is a premier engineering, architectural design, and general contracting enterprise. Headquartered in East Africa, we combine rigorous structural science with modern building technologies to deliver transformative commercial developments, high-density residential towers, and resilient public infrastructure.
            </p>

            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              From geotechnical ground preparation and structural analysis to full-scale turnkey execution, our multidisciplinary team upholds Eurocode and international safety standards at every milestone. We build not just for today&apos;s occupancy, but for generational longevity.
            </p>

            {/* Core Pillars Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-sm border border-brand-border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-brand-navy">Structural Rigor</h4>
                  <p className="text-xs text-brand-muted mt-0.5">Advanced finite element modeling & material certification</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-sm border border-brand-border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-brand-navy">Turnkey Execution</h4>
                  <p className="text-xs text-brand-muted mt-0.5">Integrated civil, architectural, and MEP contracting</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-sm border border-brand-border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-brand-navy">Zero-Harm HSE</h4>
                  <p className="text-xs text-brand-muted mt-0.5">Stringent site health, safety, and environmental protocols</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-sm border border-brand-border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-brand-navy">Predictable Delivery</h4>
                  <p className="text-xs text-brand-muted mt-0.5">Strict budgetary governance and programmatic scheduling</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-slate text-white px-6 py-3.5 rounded-sm font-semibold text-sm tracking-wide shadow-md transition-all group"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-brand-gold" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center space-x-2 text-brand-navy hover:text-brand-gold font-semibold text-sm px-4 py-3 transition-colors"
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Image & Experience Badge (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative h-[480px] rounded-sm overflow-hidden shadow-architectural-lg border border-brand-border">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80"
                  alt="Engineers reviewing blueprints and site survey at an OAKS Africa Group development"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
              </div>

              {/* Floating Architectural Badge */}
              <div className="absolute -bottom-6 -left-6 bg-brand-navy text-white p-6 rounded-sm border-2 border-brand-gold shadow-2xl max-w-xs hidden sm:block">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading text-2xl font-bold text-white block leading-none">
                      450K+ m²
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brand-gold">
                      Engineered & Built
                    </span>
                  </div>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Delivered across prime commercial, high-rise residential, and industrial master developments.
                </p>
              </div>

              {/* Secondary Accent Border */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border-t-2 border-r-2 border-brand-gold/60 pointer-events-none hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
