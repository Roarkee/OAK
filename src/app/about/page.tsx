import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Scale, 
  Leaf, 
  HardHat, 
  Users2, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Linkedin, 
  Mail,
  Award,
  Layers
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Corporate Identity & Leadership",
  description:
    "Learn about OAKS AFRICA GROUP, our company history, vision, mission, core values, and the multidisciplinary engineering leadership driving our projects.",
};

const CORE_VALUES_FALLBACK = [
  {
    title: "Engineering Excellence",
    description: "Rigorous mathematical modeling, advanced materials science, and adherence to Eurocode and international structural standards.",
    icon: ShieldCheck,
  },
  {
    title: "Uncompromising Integrity",
    description: "Transparent procurement, strict budgetary governance, and complete accountability across all project phases.",
    icon: Scale,
  },
  {
    title: "Sustainable Innovation",
    description: "Integration of energy-efficient systems, green building certification standards (LEED/EDGE), and local material optimization.",
    icon: Leaf,
  },
  {
    title: "Safety & Health Governance",
    description: "Zero-harm workplace philosophy with stringent HSE protocols, active hazard mitigation, and continuous team training.",
    icon: HardHat,
  },
  {
    title: "Client Partnership",
    description: "Collaborative value engineering focused on life-cycle performance, economic viability, and exceeding client expectations.",
    icon: Users2,
  },
];

const LEADERSHIP_FALLBACK = [
  {
    name: "Eng. Dawit Hailemariam, PE, CEng",
    designation: "Managing Director & Principal Structural Engineer",
    department: "Executive Board",
    bio: "Over 22 years of senior structural engineering experience directing high-rise developments, prestressed concrete bridge viaducts, and municipal infrastructure across East Africa and the UK.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    linkedinUrl: "https://linkedin.com",
    isLeadership: true,
  },
  {
    name: "Arch. Selamawit Tadesse, AIA, MSc",
    designation: "Director of Architecture & Master Planning",
    department: "Design & Innovation",
    bio: "Award-winning architectural director specializing in bioclimatic urban design, high-density residential master plans, and sustainable commercial enclosures that harmonise modern aesthetics with local context.",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    linkedinUrl: "https://linkedin.com",
    isLeadership: true,
  },
  {
    name: "Eng. Marcus Adebayo, PMP, MICE",
    designation: "Chief of Infrastructure & Operations",
    department: "Civil Infrastructure",
    bio: "Chartered civil engineer with an extensive track record in major transportation corridors, heavy earthworks, multimodal logistics terminals, and international contractor consortiums.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    linkedinUrl: "https://linkedin.com",
    isLeadership: true,
  },
  {
    name: "Kalkidan Bekele, BSc, NEBOSH",
    designation: "Head of Health, Safety & Environment (HSE)",
    department: "Compliance & Safety",
    bio: "Certified HSE director responsible for instilling zero-harm safety cultures across all active job sites, overseeing environmental impact assessments and ISO 45001 safety governance.",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    linkedinUrl: "https://linkedin.com",
    isLeadership: false,
  },
];

export const revalidate = 60;

export default async function AboutPage() {
  let company = null;
  let teamMembers = null;

  try {
    company = await prisma.companyInformation.findUnique({
      where: { id: "singleton" },
    });
    teamMembers = await prisma.teamMember.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch about data from database, using fallback:", error);
  }

  const overview =
    company?.overview ||
    "OAKS AFRICA GROUP is a premier engineering, architectural design, and general construction enterprise headquartered in East Africa. We deliver world-class commercial developments, high-density residential towers, specialized industrial facilities, and large-scale public civil infrastructure. Built upon a bedrock of engineering precision, technical competence, and international safety compliance, we turn visionary master plans into durable, sustainable built environments.";

  const history =
    company?.history ||
    "Founded by a consortium of seasoned structural engineers, architects, and infrastructure strategists, OAKS AFRICA GROUP was established to close the critical gap between visionary architectural concepts and rigorous, high-standard engineering execution across the continent. Over the past decade, our multidisciplinary team has engineered and delivered over 450,000 square meters of structural space, major transportation interchanges, and industrial facilities that drive economic growth.";

  const vision =
    company?.vision ||
    "To be Africa's benchmark engineering and construction group, globally recognized for technical excellence, uncompromised structural integrity, and transformative development.";

  const mission =
    company?.mission ||
    "To engineer, design, and deliver sustainable, resilient, and superior built environments through disciplined precision, ethical delivery, and enduring client partnerships.";

  const team = teamMembers && teamMembers.length > 0 ? teamMembers : LEADERSHIP_FALLBACK;
  const leadership = team.filter((m) => m.isLeadership);
  const engineers = team.filter((m) => !m.isLeadership);

  return (
    <div className="bg-white text-brand-charcoal">
      {/* 1. Hero Header */}
      <section className="bg-brand-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>CORPORATE PROFILE</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              About OAKS AFRICA GROUP
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed">
              Founded on the pillars of mathematical rigor, ethical transparency, and architectural innovation, we transform complex challenges into durable built reality.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Overview & History */}
      <section className="py-24 bg-brand-ivory relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
                <span className="w-6 h-px bg-brand-gold"></span>
                <span>COMPANY OVERVIEW & HISTORY</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
                Pioneering Engineering Excellence Across East Africa
              </h2>
              <div className="text-brand-charcoal/85 space-y-4 text-base leading-relaxed">
                <p>{overview}</p>
                <p className="text-brand-muted">{history}</p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/documents"
                  className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-6 py-3.5 rounded-sm font-semibold text-sm transition-all shadow-md group"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Company Profile (PDF)</span>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-slate text-white px-6 py-3.5 rounded-sm font-semibold text-sm transition-all"
                >
                  <span>View Project Portfolio</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-[480px] rounded-sm overflow-hidden shadow-architectural-lg border border-brand-border">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural models and technical blueprints at OAKS Africa Group"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-navy text-white p-6 rounded-sm border-2 border-brand-gold shadow-2xl max-w-xs hidden sm:block">
                <span className="font-heading text-2xl font-bold text-white block">
                  10+ Years
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-brand-gold">
                  Of Engineering Delivery
                </span>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  Adhering to Eurocode, ASTM, and ISO 9001/45001 project compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-brand-navy text-white p-10 rounded-sm border border-brand-gold/30 relative overflow-hidden shadow-architectural">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-sm bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
                  OUR CORPORATE VISION
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                The Benchmark of Engineering Rigor
              </h3>
              <p className="text-white/80 leading-relaxed text-base">
                {vision}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-brand-slate text-white p-10 rounded-sm border border-brand-gold/30 relative overflow-hidden shadow-architectural">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-sm bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
                  OUR MISSION STATEMENT
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                Engineered Value & Sustainable Delivery
              </h3>
              <p className="text-white/80 leading-relaxed text-base">
                {mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-24 bg-brand-ivory text-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>GUIDING PRINCIPLES</span>
              <span className="w-6 h-px bg-brand-gold"></span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
              Our Core Corporate Values
            </h2>
            <p className="text-brand-muted text-base">
              The fundamental standards shaping our engineering decisions, site safety protocols, and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_VALUES_FALLBACK.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white p-8 rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all hover:shadow-architectural-lg group"
                >
                  <div className="w-12 h-12 rounded-sm bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-6 group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Executive Leadership & Engineering Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>TECHNICAL LEADERSHIP</span>
              <span className="w-6 h-px bg-brand-gold"></span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight">
              Executive Leadership & Key Experts
            </h2>
            <p className="text-brand-muted text-base">
              A multidisciplinary council of certified structural engineers, architects, project directors, and safety specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="bg-brand-ivory/50 rounded-sm border border-brand-border hover:border-brand-gold/60 overflow-hidden transition-all group shadow-sm hover:shadow-architectural-lg"
              >
                <div className="relative h-72 w-full overflow-hidden bg-brand-slate">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-navy/90 border border-brand-gold/30 text-brand-gold text-[10px] font-mono font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {member.department}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-brand-gold font-mono uppercase tracking-wider mt-0.5">
                      {member.designation}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {engineers.length > 0 && (
            <div className="mt-16 pt-12 border-t border-brand-border">
              <h3 className="font-heading text-xl font-bold text-brand-navy mb-8 text-center">
                Specialist Engineering Leads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {engineers.map((eng) => (
                  <div key={eng.name} className="bg-brand-ivory p-6 rounded-sm border border-brand-border space-y-2">
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-semibold">
                      {eng.department}
                    </span>
                    <h4 className="font-heading text-base font-bold text-brand-navy">{eng.name}</h4>
                    <p className="text-xs text-brand-muted">{eng.designation}</p>
                    <p className="text-xs text-brand-charcoal/80 pt-2 leading-relaxed">{eng.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Downloadable Profile & Contact CTA */}
      <section className="py-20 bg-brand-navy text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-gold text-xs font-mono uppercase tracking-widest">
            OFFICIAL CORPORATE DOCUMENTATION
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Review Our Complete Capability Statement
          </h2>
          <p className="text-white/80 text-base max-w-2xl mx-auto leading-relaxed">
            Download our verified corporate brochure and technical capability statement detailing equipment fleets, engineering credentials, and executed square footage.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/documents"
              className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-8 py-4 rounded-sm font-semibold text-sm tracking-wide shadow-xl transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Documents</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-sm font-semibold text-sm transition-all"
            >
              <span>Contact Executive Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
