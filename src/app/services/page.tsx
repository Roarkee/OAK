import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Compass, Building2, HardHat, Layers, Briefcase, ChevronRight } from "lucide-react";
import { CORE_SERVICES } from "@/components/website/ServicesOverview";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Services | OAKS AFRICA GROUP",
  description:
    "Explore OAKS AFRICA GROUP's comprehensive engineering capabilities: structural engineering, architectural design, general construction, infrastructure works, and project management.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  let dbServices = null;
  try {
    dbServices = await prisma.service.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (err) {
    console.error("Failed to query services, using fallback:", err);
  }

  return (
    <div className="bg-white text-brand-charcoal">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>ENGINEERING & CONSTRUCTION SOLUTIONS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Multidisciplinary Engineering Capabilities
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed">
              From advanced structural analysis and architectural master planning to high-density commercial construction and transport infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Services List / Grid */}
      <section className="py-24 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {CORE_SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className={`bg-white rounded-sm border border-brand-border p-8 lg:p-12 shadow-sm hover:shadow-architectural-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
                >
                  {/* Text Column */}
                  <div className={`space-y-6 ${isEven ? "lg:col-span-7 lg:order-1" : "lg:col-span-7 lg:order-2"}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-sm bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono tracking-widest uppercase text-brand-gold font-bold">
                        SERVICE DISCIPLINE 0{index + 1}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy">
                      {service.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-gold">
                      {service.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-brand-navy tracking-wider">
                        Key Deliverables & Methodologies:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.scopeHighlights.map((hl) => (
                          <div key={hl} className="flex items-center space-x-2 text-xs sm:text-sm text-brand-charcoal">
                            <Check className="w-4 h-4 text-brand-gold shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-slate text-white px-6 py-3 rounded-sm text-sm font-semibold transition-all group"
                      >
                        <span>Detailed Scope & Specifications</span>
                        <ArrowRight className="w-4 h-4 text-brand-gold transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}&tab=rfq`}
                        className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-navy transition-colors"
                      >
                        <span>Request Service Proposal</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`relative h-[320px] sm:h-[400px] rounded-sm overflow-hidden border border-brand-border ${isEven ? "lg:col-span-5 lg:order-2" : "lg:col-span-5 lg:order-1"}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-brand-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Need Multidisciplinary Engineering Coordination?
          </h2>
          <p className="text-white/80 text-base max-w-xl mx-auto leading-relaxed">
            We operate as an integrated single-source design-build partner, aligning structural calculations, architectural concepts, and on-site contracting.
          </p>
          <div className="pt-4">
            <Link
              href="/contact?tab=rfq"
              className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-8 py-4 rounded-sm font-semibold text-sm tracking-wide shadow-xl transition-all"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
