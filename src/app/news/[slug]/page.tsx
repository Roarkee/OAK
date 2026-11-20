import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Tag, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const revalidate = 60;

interface ArticleData {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  publishedAt: string;
  readingTime: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    });
    if (article) {
      return {
        title: `${article.title} | OAKS AFRICA GROUP News`,
        description: article.summary,
      };
    }
  } catch (e) {
    // fallback
  }
  return {
    title: "Article | OAKS AFRICA GROUP Insights",
    description: "Engineering and construction insights from OAKS Africa Group.",
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  let article: ArticleData | null = null;
  let recentArticles: any[] = [];

  try {
    const dbArticle = await prisma.newsArticle.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    });

    if (dbArticle) {
      article = {
        id: dbArticle.id,
        slug: dbArticle.slug,
        title: dbArticle.title,
        summary: dbArticle.summary,
        content: dbArticle.content,
        featuredImage: dbArticle.featuredImage,
        author: dbArticle.author,
        category: dbArticle.category.name,
        publishedAt: formatDate(dbArticle.publishedAt),
        readingTime: dbArticle.readingTime,
      };

      recentArticles = await prisma.newsArticle.findMany({
        where: {
          published: true,
          NOT: { id: dbArticle.id },
        },
        include: { category: true },
        take: 3,
      });
    }
  } catch (error) {
    console.error("Failed to fetch article detail:", error);
  }

  // Fallback if not found in DB
  if (!article) {
    if (params.slug === "post-tensioned-concrete-seismic-design-in-east-africa") {
      article = {
        id: "a1",
        slug: "post-tensioned-concrete-seismic-design-in-east-africa",
        title: "Post-Tensioned Concrete & Seismic Resilience in High-Rise Structures",
        summary: "How modern structural modeling and bonded tendon engineering deliver longer clear spans, reduced floor deadweight, and superior seismic dampening in high-density commercial towers.",
        content: `As African urban centers expand vertically, developers and structural engineers encounter twin structural imperatives: the market demand for column-free, highly flexible commercial floor plates, and the technical necessity of rigorous earthquake and wind resistance.\n\nTraditional reinforced concrete frame construction often requires thick floor slabs (300mm to 350mm) and closely spaced internal columns to resist gravity shear and seismic lateral drift. In contrast, post-tensioned (PT) concrete utilizes high-strength steel strands encased in bonded plastic ducts, which are hydraulically jacked to approximately 80% of their ultimate tensile strength after concrete reaches initial curing strength.\n\nAt OAKS AFRICA GROUP, our structural design for the 28-storey OAKS Apex Financial Tower adopted bonded post-tensioned flat plate slabs. This reduced total slab thickness to just 220mm while extending clear spans to 14 meters. By eliminating nearly 35% of total structural concrete volume from elevated floors, the building's overall seismic mass was significantly diminished.\n\nKey Engineering Advantages Observed:\n• Significant Reduction in Floor Deadweight: Lighter floors translate directly into lower seismic base shear forces transferred to foundation piles during tremor events.\n• Crack Control & Water Tightness: High compressive pre-stress prevents flexural micro-cracking under full live occupancy loads.\n• Rapid Construction Cycles: Formwork stripping times are reduced from 21 days to just 4 to 5 days, enabling floor-to-floor cycles of under 8 calendar days.\n\nAdhering to Eurocode EN 1992-1-1 and EN 1998 seismic guidelines, our engineers continuous-model PT tendons using finite element analysis to ensure ductile energy dissipation. We believe post-tensioning is central to the future of sustainable, material-efficient high-rise commercial architecture across the continent.`,
        featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1600&q=85",
        author: "Eng. Dawit Hailemariam, PE",
        category: "Engineering Insights",
        publishedAt: "Oct 24, 2024",
        readingTime: "5 min read",
      };
    } else {
      notFound();
    }
  }

  return (
    <article className="bg-white text-brand-charcoal min-h-screen">
      {/* 1. Article Header */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-gold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <div className="inline-block">
            <span className="bg-brand-gold text-brand-navy text-[11px] font-mono font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-white/80 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-brand-gold" />
              <span>{article.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>{article.publishedAt}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-brand-gold" />
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="relative h-[380px] sm:h-[480px] rounded-sm overflow-hidden shadow-architectural-lg border border-brand-border bg-brand-slate">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* 3. Main Editorial Body */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Summary Lead Paragraph */}
          <div className="p-6 bg-brand-ivory rounded-sm border-l-4 border-brand-gold text-brand-charcoal font-medium text-base sm:text-lg leading-relaxed">
            {article.summary}
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-brand-charcoal/90 space-y-6 whitespace-pre-line">
            {article.content}
          </div>

          {/* Author Box */}
          <div className="pt-10 mt-12 border-t border-brand-border flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted">
                Published By
              </span>
              <p className="font-heading font-bold text-base text-brand-navy">
                {article.author}
              </p>
              <p className="text-xs text-brand-muted">
                OAKS AFRICA GROUP Technical Directorate
              </p>
            </div>

            <Link
              href="/contact?tab=rfq"
              className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span>Consult Our Engineers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. More Articles Section */}
      {recentArticles.length > 0 && (
        <section className="py-16 bg-brand-ivory border-t border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h3 className="font-heading text-2xl font-bold text-brand-navy">
              More Insights & Technical Whitepapers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((ra) => (
                <div key={ra.id} className="bg-white p-5 rounded-sm border border-brand-border space-y-2">
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-bold">
                    {ra.category.name}
                  </span>
                  <h4 className="font-heading text-base font-bold text-brand-navy hover:text-brand-gold">
                    <Link href={`/news/${ra.slug}`}>
                      {ra.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-brand-muted line-clamp-2">{ra.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
