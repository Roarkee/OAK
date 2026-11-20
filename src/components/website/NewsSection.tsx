import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";

export interface ArticlePreview {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  featuredImage: string;
}

export const SAMPLE_ARTICLES: ArticlePreview[] = [
  {
    slug: "post-tensioned-concrete-seismic-design-in-east-africa",
    title: "Post-Tensioned Concrete & Seismic Resilience in High-Rise Structures",
    summary: "How modern structural modeling and bonded tendon engineering deliver longer clear spans, reduced floor deadweight, and superior seismic dampening in high-density commercial towers.",
    category: "Engineering Insights",
    publishedAt: "Oct 24, 2024",
    readingTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "oaks-africa-group-awarded-greater-rift-expressway-flyover",
    title: "OAKS Africa Group Commences Construction on Greater Rift Expressway Viaduct",
    summary: "Milestone contract marks the deployment of advanced precast beam launching gantries to construct 4.2 km of grade-separated highway infrastructure with minimal urban disruption.",
    category: "Company Announcements",
    publishedAt: "Nov 02, 2024",
    readingTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "sustainable-cooling-strategies-for-sub-saharan-commercial-buildings",
    title: "Passive Solar Building Envelopes: Cutting Energy Demand in Tropical Climates",
    summary: "An in-depth analysis of low-E double glazing, ventilated ceramic rainscreens, and thermal mass orientation engineered into OAKS Africa Group's commercial developments.",
    category: "Sustainability",
    publishedAt: "Nov 12, 2024",
    readingTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
];

export function NewsSection({ articles = SAMPLE_ARTICLES }: { articles?: ArticlePreview[] }) {
  return (
    <section className="py-24 bg-white text-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>KNOWLEDGE & PERSPECTIVES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
              News and Insights
            </h2>
            <p className="text-brand-muted text-base sm:text-lg">
              Technical whitepapers, project milestones, and industry perspectives from our engineering leadership.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center space-x-2 text-brand-navy hover:text-brand-gold font-semibold text-sm transition-colors group shrink-0"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Column Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between bg-brand-ivory/50 rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all duration-300 hover:shadow-architectural-lg overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden bg-brand-slate">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-sm border border-brand-gold/30 text-brand-gold text-[10px] font-mono font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-brand-muted font-mono">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{article.publishedAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-charcoal/80 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border">
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-gold transition-colors"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
