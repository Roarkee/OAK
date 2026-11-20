import React from "react";
import { prisma } from "@/lib/prisma";
import { CareersClient, VacancyItem } from "@/components/website/CareersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Talent | OAKS AFRICA GROUP",
  description:
    "Join OAKS AFRICA GROUP's engineering team. Explore current vacancies for structural engineers, project managers, HSE officers, and architectural designers.",
};

export const revalidate = 60;

const FALLBACK_VACANCIES: VacancyItem[] = [
  {
    id: "senior-structural-project-engineer",
    title: "Senior Structural Project Engineer (High-Rise)",
    slug: "senior-structural-project-engineer",
    department: "Structural Engineering",
    location: "Addis Ababa, Ethiopia (Head Office & Sites)",
    employmentType: "Full-time",
    description: "Lead the structural analysis, finite element modeling (ETABS/SAFE), and design execution for 20+ storey reinforced concrete and post-tensioned commercial towers.",
    requirements: [
      "BSc or MSc in Civil / Structural Engineering from an accredited university",
      "Minimum 7+ years of structural design experience in multi-storey buildings",
      "Demonstrated proficiency in ETABS, SAFE, Prokon, and Eurocode EN 1992/EN 1998",
      "Registered professional engineer certification",
    ],
    responsibilities: [
      "Prepare detailed structural calculation packages and bar-bending reinforcement schedules",
      "Conduct dynamic response-spectrum seismic and wind vibration analyses",
      "Liaise with architectural and MEP leads during 3D BIM coordination",
      "Perform periodic on-site compliance audits during foundation and column pours",
    ],
  },
  {
    id: "senior-civil-infrastructure-project-manager",
    title: "Senior Civil Infrastructure Project Manager",
    slug: "senior-civil-infrastructure-project-manager",
    department: "Civil Infrastructure",
    location: "Bishoftu Regional Corridor",
    employmentType: "Full-time Contract",
    description: "Oversee the on-site construction of 4.2km grade-separated highway flyover viaducts, coordinating precast beam casting yards and gantry crane operations.",
    requirements: [
      "BSc in Civil Engineering with certified PMP or PRINCE2 qualification",
      "10+ years managing major road, bridge, or earthwork civil infrastructure",
      "Deep practical familiarity with FIDIC Red/Yellow book conditions of contract",
      "Strong leadership skills managing multidisciplinary teams and subcontractors",
    ],
    responsibilities: [
      "Manage Critical Path Method (CPM) baseline schedules using Primavera P6",
      "Coordinate material deliveries, concrete batching, and beam post-tensioning operations",
      "Supervise daily site quality assurance and environmental safety protocols",
      "Lead weekly employer progress review meetings and contractor valuations",
    ],
  },
  {
    id: "bim-architectural-coordinator",
    title: "BIM Architectural Coordinator (Revit)",
    slug: "bim-architectural-coordinator",
    department: "Design & Innovation",
    location: "Addis Ababa, Ethiopia",
    employmentType: "Full-time",
    description: "Coordinate 3D multi-discipline Building Information Models (BIM) across architectural, structural, and building services disciplines to resolve spatial clashes prior to fabrication.",
    requirements: [
      "Degree in Architecture or Architectural Technology",
      "4+ years specialized experience in Autodesk Revit and Navisworks Manage",
      "Experience with LOD 300 to LOD 400 design documentation",
    ],
    responsibilities: [
      "Build and maintain federated multi-discipline BIM models",
      "Run weekly Navisworks spatial clash detection reports with engineering teams",
      "Generate architectural construction details, wall sections, and schedules from BIM",
    ],
  },
  {
    id: "graduate-engineering-intern-civil-structural",
    title: "Graduate Structural Engineering Intern",
    slug: "graduate-engineering-intern-civil-structural",
    department: "Structural Engineering",
    location: "Addis Ababa, Ethiopia",
    employmentType: "Internship (6 Months)",
    description: "A fast-track engineering rotational internship offering hands-on exposure to structural calculations, CAD drafting, material testing laboratories, and live construction sites.",
    requirements: [
      "Recent graduate (BSc Civil Engineering) with top academic standing",
      "Strong foundation in mechanics of materials and structural theory",
      "Proficiency in AutoCAD and basic structural modeling tools",
    ],
    responsibilities: [
      "Assist senior engineers with structural load take-offs and drafting",
      "Participate in concrete compressive cube crushing tests and QA/QC logs",
      "Shadow resident engineers during site inspections",
    ],
  },
];

export default async function CareersPage() {
  let vacancies = FALLBACK_VACANCIES;

  try {
    const dbVacancies = await prisma.jobVacancy.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbVacancies.length > 0) {
      vacancies = dbVacancies.map((v) => ({
        id: v.id,
        title: v.title,
        slug: v.slug,
        department: v.department,
        location: v.location,
        employmentType: v.employmentType,
        description: v.description,
        requirements: v.requirements,
        responsibilities: v.responsibilities,
      }));
    }
  } catch (error) {
    console.error("Failed to load vacancies from DB:", error);
  }

  return (
    <div className="bg-white text-brand-charcoal min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>ENGINEERING TALENT & LEADERSHIP</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Build Your Career With OAKS AFRICA GROUP
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed">
              Join a team of forward-thinking structural engineers, project directors, and architectural innovators shaping Africa&apos;s physical future.
            </p>
          </div>
        </div>
      </section>

      {/* Main Careers Content */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareersClient vacancies={vacancies} />
        </div>
      </section>
    </div>
  );
}
