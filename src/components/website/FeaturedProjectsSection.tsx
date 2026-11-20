import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Layers } from "lucide-react";

export interface FeaturedProjectItem {
  slug: string;
  title: string;
  category: string;
  location: string;
  status: string;
  year: string;
  coverImage: string;
  description: string;
}

export const FEATURED_PROJECTS: FeaturedProjectItem[] = [
  {
    slug: "oaks-apex-financial-tower",
    title: "OAKS Apex Financial Tower",
    category: "Commercial",
    location: "Bole Commercial District, Addis Ababa",
    status: "Completed",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    description: "A 28-storey Grade-A corporate headquarters featuring post-tensioned floor slabs, high-performance double-glazed solar envelope, and dual subterranean parking levels.",
  },
  {
    slug: "horizon-eco-residential-park",
    title: "Horizon Eco-Residential Park",
    category: "Residential",
    location: "Old Airport Zone, Addis Ababa",
    status: "Completed",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "An upscale master-planned residential enclave comprising 140 luxury residences with integrated rainwater harvesting and seismic-dampened shear wall design.",
  },
  {
    slug: "east-gate-multimodal-logistics-hub",
    title: "East Gate Multimodal Logistics Hub",
    category: "Industrial",
    location: "Dukem Industrial Corridor, Oromia",
    status: "Completed",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    description: "A 48,000 m² high-bay clear-span warehouse and intermodal distribution facility engineered with fiber-reinforced laser-screed concrete flooring.",
  },
  {
    slug: "greater-rift-expressway-flyover",
    title: "Greater Rift Expressway Flyover",
    category: "Infrastructure",
    location: "Bishoftu Corridor",
    status: "Ongoing",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80",
    description: "A 4.2-kilometer multi-lane precast post-tensioned bridge viaduct and grade-separated interchange alleviating regional freight bottleneck.",
  },
];

export function FeaturedProjectsSection({ projects = FEATURED_PROJECTS }: { projects?: FeaturedProjectItem[] }) {
  return (
    <section className="py-24 bg-brand-slate text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>PROJECT SHOWCASE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Featured Engineering Milestones
            </h2>
            <p className="text-white/70 text-base sm:text-lg">
              A curated selection of our commercial, residential, industrial, and civil infrastructure developments executed across East Africa.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-5 py-3 rounded-sm font-semibold text-sm transition-all shadow-md group shrink-0"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Editorial Project Grid: Asymmetric 4-Card Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {projects.map((project, index) => {
            // First project takes 7 cols, 2nd takes 5 cols, 3rd takes 5 cols, 4th takes 7 cols
            const colSpan = index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5";

            return (
              <div
                key={project.slug}
                className={`group relative rounded-sm overflow-hidden bg-brand-navy border border-white/10 hover:border-brand-gold/60 transition-all duration-300 shadow-architectural ${colSpan}`}
              >
                {/* Image Container */}
                <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle dark architectural gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-brand-navy/80 backdrop-blur-md border border-white/20 text-brand-gold text-[11px] font-mono font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-sm ${
                        project.status === "Completed"
                          ? "bg-brand-success/90 text-white"
                          : "bg-brand-warning/90 text-brand-navy"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Bottom Information Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3">
                    <div className="flex items-center space-x-4 text-xs text-white/70 font-mono">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-white/75 text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-white transition-colors"
                      >
                        <span>View Project Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
