"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, ArrowRight, Filter, Layers, CheckCircle2 } from "lucide-react";

export interface ProjectCardData {
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
}

export function ProjectPortfolioGrid({ projects }: { projects: ProjectCardData[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Commercial", "Residential", "Industrial", "Infrastructure"];
  const statuses = ["All", "Completed", "Ongoing"];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === "All" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchStatus =
        selectedStatus === "All" ||
        project.status.toLowerCase() === selectedStatus.toLowerCase();
      const matchSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchStatus && matchSearch;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Filtering and Search Controls */}
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-brand-border shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, location, or scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-charcoal"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-brand-muted mr-1 hidden sm:inline">
              Discipline:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono font-medium uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-navy text-brand-gold font-bold shadow-sm"
                    : "bg-brand-ivory text-brand-charcoal hover:bg-brand-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-brand-border text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-mono uppercase text-brand-muted">Status:</span>
            {statuses.map((stat) => (
              <button
                key={stat}
                onClick={() => setSelectedStatus(stat)}
                className={`px-2.5 py-1 rounded-sm transition-colors ${
                  selectedStatus === stat
                    ? "bg-brand-gold text-brand-navy font-bold"
                    : "text-brand-muted hover:text-brand-charcoal"
                }`}
              >
                {stat}
              </button>
            ))}
          </div>

          <div className="font-mono text-brand-muted">
            Showing <span className="font-bold text-brand-navy">{filteredProjects.length}</span> of {projects.length} projects
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-brand-ivory/50 rounded-sm border border-dashed border-brand-border p-12 space-y-3">
          <p className="font-heading text-lg font-semibold text-brand-navy">
            No projects matched your criteria
          </p>
          <p className="text-sm text-brand-muted">
            Try adjusting your search keywords or switching filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedStatus("All");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-bold text-brand-gold uppercase tracking-wider hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all duration-300 hover:shadow-architectural-lg overflow-hidden flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative h-64 w-full overflow-hidden bg-brand-slate">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-brand-navy/90 backdrop-blur-sm border border-brand-gold/30 text-brand-gold text-[10px] font-mono font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-sm ${
                      project.status === "Completed"
                        ? "bg-brand-success/90 text-white"
                        : "bg-brand-warning/90 text-brand-navy"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-brand-muted font-mono">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>
                    {project.year && (
                      <div className="flex items-center space-x-1 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{project.year}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-charcoal/80 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Link */}
                <div className="pt-4 border-t border-brand-border">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-gold transition-colors"
                  >
                    <span>View Project Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
