import React from "react";
import { prisma } from "@/lib/prisma";
import { ProjectPortfolioGrid } from "@/components/website/ProjectPortfolioGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Portfolio | Engineering Milestones",
  description:
    "Explore OAKS AFRICA GROUP's portfolio of completed and ongoing commercial towers, residential communities, industrial warehouses, and highway bridge infrastructure.",
};

export const revalidate = 60;

const FALLBACK_PROJECTS: {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  status: string;
  year?: string | null;
  client?: string | null;
  coverImage: string;
  description: string;
  featured: boolean;
}[] = [
  {
    id: "p1",
    slug: "oaks-apex-financial-tower",
    title: "OAKS Apex Financial Tower",
    category: "Commercial",
    location: "Bole Commercial District, Addis Ababa",
    status: "Completed",
    year: "2024",
    client: "Apex Financial Holdings",
    coverImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    description: "A 28-storey Grade-A corporate headquarters featuring post-tensioned floor slabs, high-performance double-glazed solar envelope, and dual subterranean parking levels.",
    featured: true,
  },
  {
    id: "p2",
    slug: "horizon-eco-residential-park",
    title: "Horizon Eco-Residential Park",
    category: "Residential",
    location: "Old Airport Zone, Addis Ababa",
    status: "Completed",
    year: "2023",
    client: "Horizon Real Estate Consortium",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "An upscale master-planned residential enclave comprising 140 luxury residences with integrated rainwater harvesting and seismic-dampened shear wall design.",
    featured: true,
  },
  {
    id: "p3",
    slug: "east-gate-multimodal-logistics-hub",
    title: "East Gate Multimodal Logistics Hub",
    category: "Industrial",
    location: "Dukem Industrial Corridor, Oromia",
    status: "Completed",
    year: "2024",
    client: "East Africa Cargo Logistics Group",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    description: "A 48,000 m² high-bay clear-span warehouse and intermodal distribution facility engineered with fiber-reinforced laser-screed concrete flooring.",
    featured: true,
  },
  {
    id: "p4",
    slug: "greater-rift-expressway-flyover",
    title: "Greater Rift Expressway Flyover",
    category: "Infrastructure",
    location: "Bishoftu Corridor",
    status: "Ongoing",
    year: "2025",
    client: "Regional Transport & Highway Authority",
    coverImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80",
    description: "A 4.2-kilometer multi-lane precast post-tensioned bridge viaduct and grade-separated interchange alleviating regional freight bottleneck.",
    featured: true,
  },
  {
    id: "p5",
    slug: "blue-nile-pharmaceutical-manufacturing-plant",
    title: "Blue Nile Pharmaceutical Manufacturing Plant",
    category: "Industrial",
    location: "Kilinto Industrial Zone, Addis Ababa",
    status: "Ongoing",
    year: "2025",
    client: "Blue Nile Pharma Ltd.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    description: "GMP-compliant pharmaceutical production campus with sterile cleanroom HVAC integration, epoxy anti-static flooring, and biological waste neutralization civil infrastructure.",
    featured: false,
  },
  {
    id: "p6",
    slug: "bellevue-heights-mixed-use-development",
    title: "Bellevue Heights Luxury Residences",
    category: "Residential",
    location: "Kazanchis Diplomatic Quarter, Addis Ababa",
    status: "Completed",
    year: "2024",
    client: "Bellevue Urban Properties",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    description: "A 22-storey twin-tower residential and lifestyle development engineered with perimeter diaphragm retaining walls and high-acoustic insulation party walls.",
    featured: false,
  },
];

export default async function ProjectsPage() {
  let projects = FALLBACK_PROJECTS;

  try {
    const dbProjects = await prisma.project.findMany({
      include: { category: true },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    });

    if (dbProjects.length > 0) {
      projects = dbProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category.name,
        location: p.location,
        status: p.status,
        year: p.year || (p.completedDate ? new Date(p.completedDate).getFullYear().toString() : "2024"),
        client: p.client,
        coverImage: p.coverImage,
        description: p.description,
        featured: p.featured,
      }));
    }
  } catch (error) {
    console.error("Failed to load projects from DB:", error);
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
              <span>ENGINEERED DEVELOPMENTS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Project Portfolio
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed">
              Explore our landmark commercial towers, high-density residential developments, advanced manufacturing plants, and regional infrastructure links.
            </p>
          </div>
        </div>
      </section>

      {/* Main Portfolio Grid Section */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectPortfolioGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}
