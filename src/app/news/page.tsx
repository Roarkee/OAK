import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, ChevronRight, Tag, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Insights | Engineering Thought Leadership",
  description:
    "Read the latest engineering whitepapers, construction project updates, and industry insights from OAKS AFRICA GROUP.",
};

export const revalidate = 60;

const FALLBACK_ARTICLES: {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  featuredImage: string;
}[] = [
  {
    id: "a1",
    slug: "post-tensioned-concrete-seismic-design-in-east-africa",
    title: "Post-Tensioned Concrete & Seismic Resilience in High-Rise Structures",
    summary: "How modern structural modeling and bonded tendon engineering deliver longer clear spans, reduced floor deadweight, and superior seismic dampening in high-density commercial towers.",
    category: "Engineering Insights",
    author: "Eng. Dawit Hailemariam, PE",
    publishedAt: "2024-10-24",
    readingTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "oaks-africa-group-awarded-greater-rift-expressway-flyover",
    title: "OAKS Africa Group Commences Construction on Greater Rift Expressway Viaduct",
    summary: "Milestone contract marks the deployment of advanced precast beam launching gantries to construct 4.2 km of grade-separated highway infrastructure with minimal urban disruption.",
    category: "Company Announcements",
    author: "OAKS Media Relations",
    publishedAt: "2024-11-02",
    readingTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "sustainable-cooling-strategies-for-sub-saharan-commercial-buildings",
    title: "Passive Solar Building Envelopes: Cutting Energy Demand in Tropical Climates",
    summary: "An in-depth analysis of low-E double glazing, ventilated ceramic rainscreens, and thermal mass orientation engineered into OAKS Africa Group's commercial developments.",
    category: "Sustainability",
    author: "Arch. Selamawit Tadesse",
    publishedAt: "2024-11-12",
    readingTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "bim-clash-detection-reducing-construction-variations",
    title: "How Multi-Discipline 3D BIM Clash Detection Eliminates Costly Site Variations",
    summary: "Digital pre-construction prototyping: integrating structural steel layouts with mechanical ductwork and plumbing risers to prevent on-site delays before pouring concrete.",
    category: "Innovation & Technology",
    author: "BIM Coordination Council",
    publishedAt: "2024-11-15",
    readingTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default async function NewsPage() {
  let articles = FALLBACK_ARTICLES;

  try {
    const dbArticles = await prisma.newsArticle.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
    });

    if (dbArticles.length > 0) {
      articles = dbArticles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        category: a.category.name,
        author: a.author,
        publishedAt: formatDate(a.publishedAt),
        readingTime: a.readingTime,
        featuredImage: a.featuredImage,
      }));
    }
  } catch (error) {
    console.error("Failed to load articles from DB:", error);
  }

  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <div className="bg-white text-brand-charcoal min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>ENGINEERING PERSPECTIVES & ANNOUNCEMENTS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              News and Insights
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed">
              Explore technical whitepapers, project milestones, and corporate insights directly from the OAKS AFRICA GROUP engineering team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Featured Lead Story */}
          {featured && (
            <div className="bg-white rounded-sm border border-brand-border overflow-hidden shadow-sm hover:shadow-architectural-lg transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="relative h-[360px] lg:h-[460px] lg:col-span-7 bg-brand-slate overflow-hidden">
                <Image
                  src={featured.featuredImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-navy/90 text-brand-gold text-[10px] font-mono font-semibold px-3 py-1 rounded-sm uppercase tracking-wider">
                  Featured Story • {featured.category}
                </div>
              </div>

              <div className="p-8 lg:p-12 lg:col-span-5 space-y-4">
                <div className="flex items-center space-x-4 text-xs text-brand-muted font-mono">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{featured.publishedAt}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{featured.readingTime}</span>
                  </div>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy hover:text-brand-gold transition-colors leading-tight">
                  <Link href={`/news/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-brand-charcoal/80 text-sm sm:text-base leading-relaxed">
                  {featured.summary}
                </p>

                <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-muted">
                    By {featured.author}
                  </span>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remaining.map((article) => (
              <article
                key={article.slug}
                className="group bg-white rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all duration-300 hover:shadow-architectural-lg overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden bg-brand-slate">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-navy/90 border border-brand-gold/30 text-brand-gold text-[10px] font-mono font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>

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

                  <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                    <span className="text-[11px] font-mono text-brand-muted">
                      {article.author}
                    </span>
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-gold transition-colors"
                    >
                      <span>Read</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-gold transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
