import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Building2, 
  Compass, 
  HardHat, 
  Layers, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  FileText,
  ShieldCheck,
  Award
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const revalidate = 60;

interface ServiceDetailData {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  iconName: string;
  scope: string[];
  capabilities: string[];
}

const STATIC_SERVICES: Record<string, ServiceDetailData> = {
  "structural-civil-engineering": {
    slug: "structural-civil-engineering",
    title: "Structural and Civil Engineering",
    subtitle: "Mathematical Rigor & High-Performance Geotechnical Systems",
    shortDescription: "Full-lifecycle structural engineering, finite element analysis, foundation geotechnical design, seismic retrofitting, and structural integrity audits compliant with international building codes.",
    fullDescription: `At OAKS AFRICA GROUP, our structural engineering team operates at the intersection of mathematical precision, materials science, and advanced computer-aided finite element modeling. We engineer buildings and civil assets that withstand extreme wind shear, dynamic earthquake accelerations, and heavy industrial live loads.\n\nFrom deep borehole soil analysis and post-tensioned floor slab design to high-strength concrete formulations, we adhere strictly to Eurocode (EN 1992, EN 1993, EN 1998) and ASTM standards. Our engineering documentation provides contractors with unambiguous reinforcement schedules, bar-bending lists, and connection details that eliminate on-site ambiguity.`,
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
    iconName: "Building2",
    scope: [
      "Reinforced and post-tensioned concrete structural modeling",
      "Structural steel framing, space trusses, and industrial crane girders",
      "Geotechnical foundation design: deep bored piles, mat foundations, and ground anchors",
      "Seismic hazard mitigation, response spectrum analysis, and shear wall optimization",
      "Structural audits, non-destructive concrete rebound/ultrasonic testing, and retrofitting",
      "Retaining walls, shoring systems, and deep basement excavation stabilization",
    ],
    capabilities: [
      "Finite Element Modeling (ETABS, SAP2000, SAFE)",
      "Eurocode, British Standards (BS), and ASTM Compliance",
      "Post-Tensioned (PT) Tendon Layout & Elongation Calculations",
      "Dynamic Wind Load Tunnel Simulation Coordination",
      "Peer Review & Value Engineering Structural Audits",
    ],
  },
  "architectural-engineering-design": {
    slug: "architectural-engineering-design",
    title: "Architectural and Engineering Design",
    subtitle: "Harmonizing Iconic Aesthetics with Buildability",
    shortDescription: "Harmonizing aesthetic boldness with pragmatic constructability. We produce concept schemes, complete working drawings, 3D BIM coordination, and sustainable LEED/EDGE-ready building enclosures.",
    fullDescription: `Architecture at OAKS AFRICA GROUP is not merely decorative styling—it is a discipline of spatial efficiency, bioclimatic responsiveness, and human-centered design. We create modern commercial landmarks, sustainable residential towers, and civic facilities that embrace daylighting, natural cross-ventilation, and local cultural context.\n\nLeveraging multidisciplinary Building Information Modeling (BIM Revit), we detect spatial clashes between structural elements, HVAC ducts, plumbing runs, and electrical cable trays before ground is ever broken. This digital prototyping guarantees constructability and minimizes on-site variation orders.`,
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    iconName: "Compass",
    scope: [
      "Master planning, site massing analysis, and concept architectural design",
      "Comprehensive architectural working drawings and municipal permit documentation",
      "Multi-disciplinary 3D BIM modeling (LOD 300 - LOD 400) and clash detection",
      "High-performance facade engineering: unitized curtain walls, louvers, and thermal barriers",
      "Interior architecture, space programming, and corporate office fit-out schemes",
      "Sustainable design optimization for LEED, EDGE, and green building certifications",
    ],
    capabilities: [
      "Autodesk Revit 3D Multi-Discipline BIM Coordination",
      "Daylight Autonomy & Computational Solar Radiation Studies",
      "Acoustic & Thermal Performance Envelope Modeling",
      "Parametric Façade Design & Constructability Optimization",
      "Photorealistic 3D Renders & Virtual Walkthrough Simulations",
    ],
  },
  "building-construction": {
    slug: "building-construction",
    title: "Building and General Construction",
    subtitle: "Turnkey Contracting & Exceptional Execution Standards",
    shortDescription: "Main contractor delivery for commercial high-rises, mixed-use retail developments, high-density residential towers, and specialized industrial manufacturing facilities.",
    fullDescription: `As a primary building contractor, OAKS AFRICA GROUP assumes single-source responsibility for the complete physical delivery of high-value developments. We combine modern plant machinery, dedicated tower crane operations, skilled tradesmanship, and rigorous site management to execute projects with speed and craft.\n\nFrom subterranean excavation and formwork shuttering to double-glazed facade installation and premium interior handover, our site supervisors maintain continuous quality checklists. Every batch of concrete is verified for slump and compressive strength, and all reinforcement cages are inspected prior to each pour.`,
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1600&q=85",
    iconName: "HardHat",
    scope: [
      "Turnkey general contracting for commercial, residential, and institutional buildings",
      "Subterranean basement excavation, earth retention, and reinforced concrete core walls",
      "Tower crane operations, climbing formwork, and rapid floor cycle sequencing",
      "Curtain wall glazing, architectural aluminum composite panels, and roofing systems",
      "Mechanical, Electrical, and Plumbing (MEP) installations and BMS automation",
      "Architectural fit-out: precision tiling, acoustic ceilings, and architectural millwork",
    ],
    capabilities: [
      "Direct Equipment Fleet: Tower Cranes, Concrete Pumps, Batching Plants",
      "Certified Quality Assurance (QA/QC) Lab & Cube Crushing Verification",
      "Primavera P6 & MS Project Schedule Tracking",
      "ISO 9001 Quality & ISO 45001 Occupational Safety Systems",
      "Subcontractor Governance & Material Supply Chain Logistics",
    ],
  },
  "infrastructure-development": {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    subtitle: "Heavy Civil Engineering & Transportation Networks",
    shortDescription: "Heavy civil infrastructure connecting communities and accelerating commerce: arterial highways, grade-separated bridges, drainage culverts, earthworks, and bulk municipal water infrastructure.",
    fullDescription: `Infrastructure is the backbone of Africa's economic transformation. OAKS AFRICA GROUP's civil infrastructure division undertakes complex transport links, grade-separated highway interchanges, drainage flood canals, and municipal water supply works that connect regional markets and urban centers.\n\nOur engineering capabilities encompass heavy earthmoving, cut-and-fill geotechnical balancing, sub-base compaction, asphaltic concrete paving, and precast prestressed bridge beam launching. We deploy advanced surveying total stations and GPS-guided graders to maintain sub-millimeter tolerances on long road alignments.`,
    heroImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=85",
    iconName: "Layers",
    scope: [
      "Arterial highways, expressway interchanges, and asphalt concrete paving",
      "Grade-separated bridge viaducts, precast girder bridges, and pedestrian overpasses",
      "Bulk earthworks, quarry development, and geotechnical embankment stabilization",
      "Municipal stormwater trunk lines, box culverts, and flood containment channels",
      "Bulk water supply distribution pipelines, reservoirs, and wastewater treatment civil works",
      "Airfield taxiways, industrial rail sidings, and container terminal concrete aprons",
    ],
    capabilities: [
      "Heavy Earthmoving Fleet & GPS-Equipped Laser Graders",
      "Bridge Girder Pre-stressing & Launching Gantry Systems",
      "Asphaltic Concrete Marshall Mix Design Verification",
      "Hydraulic Modeling for Watersheds and Storm Runoff Channels",
      "Traffic Diversion Planning & Community HSE Safeguards",
    ],
  },
  "project-management-consultancy": {
    slug: "project-management-consultancy",
    title: "Project Management and Consultancy",
    subtitle: "Programmatic Governance & Value Engineering",
    shortDescription: "Client-side representation and professional project governance ensuring milestone certainty, transparent procurement, strict cost control, and comprehensive HSE site supervision.",
    fullDescription: `Large construction endeavors carry inherent cost, scheduling, and technical risks. OAKS AFRICA GROUP provides independent, client-side project management and technical advisory services that safeguard investor capital, enforce contractor compliance, and maintain project momentum.\n\nOperating under international contract frameworks including FIDIC Red, Yellow, and Silver Books, our certified project managers oversee procurement tenders, review progress payment valuations, resolve contractor claims, and run weekly coordination workshops to guarantee quality and budget control.`,
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
    iconName: "Briefcase",
    scope: [
      "Employer representative and client-side project direction",
      "Preparation of Tender Documents, Employer's Requirements, and Bills of Quantities (BOQ)",
      "Contract administration under FIDIC, NEC, and standard public procurement forms",
      "Earned Value Analysis (EVA), monthly budget audits, and progress payment certification",
      "Independent QA/QC site inspection, material witness testing, and snagging reviews",
      "Comprehensive Health, Safety, and Environmental (HSE) site compliance auditing",
    ],
    capabilities: [
      "PMP & Chartered Quantity Surveyor (RICS) Leadership",
      "Contractual Risk Mitigation & Dispute Avoidance Procedures",
      "Independent Cost Estimating & Life-Cycle Value Engineering",
      "Weekly Digital Dashboards with Drone Site Progress Photography",
      "Turnkey Commissioning, Testing, and Facility Handover Protocols",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(STATIC_SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = STATIC_SERVICES[params.slug];
  if (!service) {
    return { title: "Service Not Found" };
  }
  return {
    title: `${service.title} | OAKS AFRICA GROUP`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  let service: ServiceDetailData | null = STATIC_SERVICES[params.slug];

  // Try database fetch
  try {
    const dbService = await prisma.service.findUnique({
      where: { slug: params.slug },
    });
    if (dbService) {
      service = {
        slug: dbService.slug,
        title: dbService.title,
        subtitle: STATIC_SERVICES[params.slug]?.subtitle || "Engineering Discipline",
        shortDescription: dbService.shortDescription,
        fullDescription: dbService.fullDescription,
        heroImage: dbService.heroImage,
        iconName: dbService.iconName,
        scope: dbService.scope,
        capabilities: dbService.capabilities,
      };
    }
  } catch (error) {
    console.warn("Using fallback service data for:", params.slug);
  }

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white text-brand-charcoal">
      {/* 1. Hero Section */}
      <section className="bg-brand-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <Link href="/services" className="hover:underline">
                SERVICES
              </Link>
              <span>/</span>
              <span>{service.slug.replace(/-/g, " ")}</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-brand-gold text-lg font-medium">
              {service.subtitle}
            </p>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed pt-2">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hero Image Banner */}
      <section className="relative h-[380px] sm:h-[480px] w-full bg-brand-slate border-b border-brand-border">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
      </section>

      {/* 3. Detailed Overview & Engineering Rigor */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Text (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4 bg-white p-8 sm:p-10 rounded-sm border border-brand-border shadow-sm">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
                  DETAILED CAPABILITY OVERVIEW
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
                  Engineering Standards & Execution Methodology
                </h2>
                <div className="text-brand-charcoal/85 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4 pt-2">
                  {service.fullDescription}
                </div>
              </div>

              {/* Scope of Works */}
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-bold text-brand-navy">
                  Comprehensive Scope of Works
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.scope.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-sm border border-brand-border flex items-start space-x-3 shadow-sm hover:border-brand-gold transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                      <span className="text-sm text-brand-charcoal leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Capabilities */}
              <div className="space-y-6 pt-4">
                <h3 className="font-heading text-2xl font-bold text-brand-navy">
                  Key Technical Competencies
                </h3>
                <div className="bg-brand-slate text-white p-8 rounded-sm space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center space-x-3 text-sm">
                        <span className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
                        <span className="text-white/90 font-medium">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Request Quotation Card */}
              <div className="bg-brand-navy text-white p-8 rounded-sm border border-brand-gold/40 shadow-architectural space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-widest uppercase text-brand-gold font-bold">
                    GET STARTED
                  </span>
                  <h4 className="font-heading text-xl font-bold text-white">
                    Commission This Service
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Submit your architectural drawings, tender briefs, or geotechnical requirements for an engineered proposal.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}&tab=rfq`}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy py-3.5 px-4 rounded-sm font-semibold text-xs uppercase tracking-wider shadow transition-all duration-200"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-white/60 space-y-2">
                  <p>• Direct consultation with principal engineers</p>
                  <p>• Comprehensive BOQ & timeline analysis</p>
                  <p>• Fast technical turn-around</p>
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="bg-white p-6 rounded-sm border border-brand-border space-y-4">
                <h4 className="font-heading text-base font-bold text-brand-navy">
                  All Engineering Disciplines
                </h4>
                <div className="space-y-2">
                  {Object.values(STATIC_SERVICES).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={`flex items-center justify-between p-2.5 rounded text-xs transition-colors ${
                        s.slug === service?.slug
                          ? "bg-brand-ivory font-bold text-brand-gold border-l-2 border-brand-gold"
                          : "text-brand-charcoal hover:bg-brand-ivory"
                      }`}
                    >
                      <span className="line-clamp-1">{s.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-brand-muted" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Related Projects CTA */}
      <section className="py-20 bg-white border-t border-brand-border text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
            EXPLORE DELIVERED EXCELLENCE
          </span>
          <h2 className="font-heading text-3xl font-bold text-brand-navy">
            View Projects Executed Under This Discipline
          </h2>
          <p className="text-brand-muted text-base max-w-xl mx-auto">
            Browse our completed and ongoing portfolio of commercial high-rises, residential estates, and civil infrastructure.
          </p>
          <div className="pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-slate text-white px-8 py-3.5 rounded-sm font-semibold text-sm transition-all"
            >
              <span>Explore Project Portfolio</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
