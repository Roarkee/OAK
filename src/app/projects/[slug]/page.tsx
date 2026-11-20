import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  MapPin, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Clock, 
  User, 
  FileText 
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const revalidate = 60;

interface ProjectDetailData {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  status: string;
  year?: string | null;
  client?: string | null;
  scopeOfWork?: string | null;
  description: string;
  coverImage: string;
  images: { imageUrl: string; caption?: string | null; isRender: boolean }[];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let title = "Project Case Study | OAKS AFRICA GROUP";
  let description = "Detailed engineering case study and construction specifications.";

  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    });
    if (project) {
      title = `${project.title} | OAKS AFRICA GROUP`;
      description = project.description;
    }
  } catch (e) {
    // fallback
  }

  return { title, description };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  let project: ProjectDetailData | null = null;
  let relatedProjects: any[] = [];

  try {
    const dbProject = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        images: { orderBy: { displayOrder: "asc" } },
      },
    });

    if (dbProject) {
      project = {
        id: dbProject.id,
        slug: dbProject.slug,
        title: dbProject.title,
        category: dbProject.category.name,
        location: dbProject.location,
        status: dbProject.status,
        year: dbProject.year || (dbProject.completedDate ? new Date(dbProject.completedDate).getFullYear().toString() : "2024"),
        client: dbProject.client || "Confidential Institutional Developer",
        scopeOfWork: dbProject.scopeOfWork || "Full turnkey civil, structural engineering, and general contracting execution.",
        description: dbProject.description,
        coverImage: dbProject.coverImage,
        images: dbProject.images.map((img) => ({
          imageUrl: img.imageUrl,
          caption: img.caption,
          isRender: img.isRender,
        })),
      };

      // Fetch related projects in same category
      relatedProjects = await prisma.project.findMany({
        where: {
          categoryId: dbProject.categoryId,
          NOT: { id: dbProject.id },
        },
        include: { category: true },
        take: 3,
      });
    }
  } catch (error) {
    console.error("Failed to fetch project detail:", error);
  }

  // Fallback if database empty
  if (!project) {
    if (params.slug === "oaks-apex-financial-tower") {
      project = {
        id: "p1",
        slug: "oaks-apex-financial-tower",
        title: "OAKS Apex Financial Tower",
        category: "Commercial",
        location: "Bole Commercial District, Addis Ababa",
        status: "Completed",
        year: "2024",
        client: "Apex Financial Holdings",
        scopeOfWork: "Subterranean diaphragm retaining walls, 28-storey post-tensioned floor slab framing, high-performance double-glazed solar envelope, and complete MEP building management system.",
        description: "A 28-storey Grade-A corporate headquarters engineered to define the skyline of Addis Ababa's financial corridor. Incorporating post-tensioned floor slabs that allow unobstructed 14-meter clear spans without intermediate columns, this development maximizes tenant interior flexibility while achieving exceptional seismic performance.\n\nThe facade incorporates unitized double-glazed panels with ceramic frit solar shading, reducing annual HVAC cooling loads by 34%. Dual subterranean basement levels house high-capacity automated car parking, stormwater retention tanks, and standby emergency generation infrastructure.",
        coverImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85",
        images: [
          {
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
            caption: "Double-glazed unitized curtain wall installation",
            isRender: false,
          },
          {
            imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
            caption: "Structural post-tensioned beam casting & floor sequence",
            isRender: false,
          },
          {
            imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
            caption: "Deep foundation excavation & ground anchor installation",
            isRender: false,
          },
        ],
      };
    } else {
      notFound();
    }
  }

  // Ensure there are at least some gallery images
  const gallery = project.images.length > 0 ? project.images : [
    { imageUrl: project.coverImage, caption: "Main architectural elevation", isRender: false },
    { imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80", caption: "Construction site execution", isRender: false },
    { imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80", caption: "Architectural detail & facade", isRender: false },
  ];

  return (
    <div className="bg-white text-brand-charcoal">
      {/* 1. Project Hero Header */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <Link href="/projects" className="hover:underline">
                PROJECT PORTFOLIO
              </Link>
              <span>/</span>
              <span>{project.category}</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/80 pt-2">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>{project.location}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span>{project.year || "Delivered"}</span>
              </div>
              <span>•</span>
              <span className="bg-brand-gold text-brand-navy px-2.5 py-0.5 rounded-sm font-bold uppercase">
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Large Cover Image */}
      <section className="relative h-[420px] sm:h-[540px] w-full bg-brand-slate">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
      </section>

      {/* 3. Detailed Specifications & Scope Section */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Project Narrative */}
              <div className="bg-white p-8 sm:p-10 rounded-sm border border-brand-border shadow-sm space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
                  PROJECT OVERVIEW
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy">
                  Engineering Scope & Architectural Vision
                </h2>
                <div className="text-brand-charcoal/85 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4 pt-2">
                  {project.description}
                </div>
              </div>

              {/* Scope of Work */}
              {project.scopeOfWork && (
                <div className="bg-white p-8 sm:p-10 rounded-sm border border-brand-border shadow-sm space-y-4">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
                    EXECUTION DETAILS
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy">
                    Scope of Contractor Responsibilities
                  </h3>
                  <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed whitespace-pre-line">
                    {project.scopeOfWork}
                  </p>
                </div>
              )}

              {/* Image Gallery */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-2xl font-bold text-brand-navy">
                    Site Photography & Architectural Details
                  </h3>
                  <span className="text-xs font-mono text-brand-muted">
                    {gallery.length} Images
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {gallery.map((img, i) => (
                    <div
                      key={i}
                      className="group bg-white rounded-sm border border-brand-border overflow-hidden shadow-sm hover:shadow-architectural-lg transition-all"
                    >
                      <div className="relative h-64 w-full overflow-hidden bg-brand-slate">
                        <Image
                          src={img.imageUrl}
                          alt={img.caption || `${project.title} detail`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {img.isRender && (
                          <span className="absolute top-3 left-3 bg-brand-navy/90 text-brand-gold text-[10px] font-mono px-2 py-0.5 rounded-sm uppercase">
                            Architectural Render
                          </span>
                        )}
                      </div>
                      {img.caption && (
                        <div className="p-3 bg-white border-t border-brand-border text-xs text-brand-charcoal/80 font-medium">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Metadata (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Quick Specs Card */}
              <div className="bg-white p-8 rounded-sm border border-brand-border shadow-sm space-y-6">
                <h4 className="font-heading text-lg font-bold text-brand-navy pb-4 border-b border-brand-border">
                  Project Data Sheet
                </h4>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-brand-muted block font-mono uppercase text-[11px]">
                      Client / Employer
                    </span>
                    <span className="font-semibold text-brand-navy">
                      {project.client}
                    </span>
                  </div>

                  <div>
                    <span className="text-brand-muted block font-mono uppercase text-[11px]">
                      Location
                    </span>
                    <span className="font-semibold text-brand-navy">
                      {project.location}
                    </span>
                  </div>

                  <div>
                    <span className="text-brand-muted block font-mono uppercase text-[11px]">
                      Category
                    </span>
                    <span className="font-semibold text-brand-navy">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-brand-muted block font-mono uppercase text-[11px]">
                      Project Status
                    </span>
                    <span className="inline-block mt-0.5 font-bold text-brand-navy bg-brand-ivory px-2 py-0.5 rounded border border-brand-border">
                      {project.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-brand-muted block font-mono uppercase text-[11px]">
                      Completion Year
                    </span>
                    <span className="font-semibold text-brand-navy">
                      {project.year || "Delivered"}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-border">
                  <Link
                    href={`/contact?tab=rfq&projectRef=${encodeURIComponent(project.title)}`}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy py-3.5 px-4 rounded-sm font-semibold text-xs uppercase tracking-wider shadow transition-all duration-200"
                  >
                    <span>Enquire About Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Reassurance Banner */}
              <div className="bg-brand-navy text-white p-6 rounded-sm space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
                  GUARANTEED INTEGRITY
                </span>
                <p className="text-xs text-white/80 leading-relaxed">
                  Every OAKS Africa Group project is governed by independent QA/QC verification and international structural standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Related Projects Carousel / Grid */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-white border-t border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
                  RELATED MILESTONES
                </span>
                <h3 className="font-heading text-2xl font-bold text-brand-navy">
                  More {project.category} Projects
                </h3>
              </div>
              <Link
                href="/projects"
                className="text-xs font-semibold uppercase tracking-wider text-brand-navy hover:text-brand-gold flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <div key={p.id} className="group bg-brand-ivory rounded-sm border border-brand-border overflow-hidden shadow-sm">
                  <div className="relative h-48 w-full overflow-hidden bg-brand-slate">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold font-bold">
                      {p.category.name}
                    </span>
                    <h4 className="font-heading text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                      <Link href={`/projects/${p.slug}`}>
                        {p.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-brand-muted line-clamp-2">{p.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
