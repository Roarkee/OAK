import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  Compass, 
  HardHat, 
  Layers, 
  Briefcase, 
  ArrowRight, 
  Check, 
  ChevronRight 
} from "lucide-react";

export interface ServiceCardItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  scopeHighlights: string[];
}

export const CORE_SERVICES: ServiceCardItem[] = [
  {
    slug: "structural-civil-engineering",
    title: "Structural and Civil Engineering",
    subtitle: "Precision Analysis & Geotechnical Frameworks",
    description: "Full-lifecycle structural engineering, finite element analysis, foundation geotechnical design, seismic retrofitting, and structural integrity audits compliant with international building codes.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    scopeHighlights: [
      "Reinforced concrete & steel design",
      "Foundation & deep piling systems",
      "Dynamic load & wind engineering",
    ],
  },
  {
    slug: "architectural-engineering-design",
    title: "Architectural and Engineering Design",
    subtitle: "Visionary Concepts & Detailed Engineering",
    description: "Harmonizing aesthetic boldness with pragmatic constructability. We produce concept schemes, complete working drawings, 3D BIM coordination, and sustainable LEED/EDGE-ready building enclosures.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    scopeHighlights: [
      "Master planning & concept architecture",
      "BIM Revit 3D multi-discipline modeling",
      "Energy-efficient envelope design",
    ],
  },
  {
    slug: "building-construction",
    title: "Building and General Construction",
    subtitle: "Turnkey Execution & Quality Craftsmanship",
    description: "Main contractor delivery for commercial high-rises, mixed-use retail developments, high-density residential towers, and specialized industrial manufacturing facilities.",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80",
    scopeHighlights: [
      "High-rise concrete framing & core slabs",
      "Façade glazing & architectural envelope",
      "Integrated mechanical & electrical works",
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    subtitle: "Civil Works & Public Utility Systems",
    description: "Heavy civil infrastructure connecting communities and accelerating commerce: arterial highways, grade-separated bridges, drainage culverts, earthworks, and bulk municipal water infrastructure.",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
    scopeHighlights: [
      "Highways, pavements & interchange bridges",
      "Stormwater drainage & flood defense",
      "Industrial earthworks & site utilities",
    ],
  },
  {
    slug: "project-management-consultancy",
    title: "Project Management & Consultancy",
    subtitle: "Value Engineering & Schedule Governance",
    description: "Client-side representation and professional project governance ensuring milestone certainty, transparent procurement, strict cost control, and comprehensive HSE site supervision.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    scopeHighlights: [
      "Contract administration (FIDIC / NEC)",
      "Cost estimating & value engineering",
      "Quality assurance & HSE inspection",
    ],
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-white text-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>COMPREHENSIVE CAPABILITIES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
              Our Core Engineering Services
            </h2>
            <p className="text-brand-muted text-base sm:text-lg">
              End-to-end technical solutions spanning planning, detailed structural calculation, general contracting, and infrastructure delivery.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-brand-navy hover:text-brand-gold font-semibold text-sm transition-colors group shrink-0"
          >
            <span>View All Detailed Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid: 5 Principal Cards with Architectural Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className={`group flex flex-col justify-between bg-brand-ivory/60 rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all duration-300 hover:shadow-architectural-lg overflow-hidden ${
                  index === 0 ? "lg:col-span-1" : ""
                }`}
              >
                {/* Image Top Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-brand-slate">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
                  
                  {/* Floating Icon Monogram */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-sm bg-brand-gold text-brand-navy flex items-center justify-center font-bold shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono tracking-widest text-brand-ivory uppercase">
                      Stage 0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-brand-gold mt-1 uppercase tracking-wider">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-brand-charcoal/80 leading-relaxed mt-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-brand-border space-y-2">
                    {service.scopeHighlights.map((hl) => (
                      <div key={hl} className="flex items-center space-x-2 text-xs text-brand-charcoal">
                        <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Link */}
                  <div className="pt-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-gold transition-colors"
                    >
                      <span>Explore Service Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Customized Consultation / Value Engineering Callout */}
          <div className="bg-brand-navy text-white rounded-sm p-8 flex flex-col justify-between border border-brand-gold/40 relative overflow-hidden shadow-architectural">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-gold">
                Tailored Solutions
              </span>
              <h3 className="font-heading text-2xl font-bold text-white leading-tight">
                Have a Complex or Specialized Engineering Challenge?
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                We provide multidisciplinary structural appraisals, value engineering audits, and design-build consulting for high-complexity ventures.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/contact?tab=rfq"
                className="w-full inline-flex items-center justify-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy py-3.5 px-4 rounded-sm font-semibold text-xs uppercase tracking-wider shadow transition-all duration-200"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
