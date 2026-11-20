import React from "react";
import { ConstructionJourneyHero } from "@/components/website/ConstructionJourneyHero";
import { CompanyIntro } from "@/components/website/CompanyIntro";
import { ServicesOverview } from "@/components/website/ServicesOverview";
import { FeaturedProjectsSection, FEATURED_PROJECTS } from "@/components/website/FeaturedProjectsSection";
import { WhyChooseUs } from "@/components/website/WhyChooseUs";
import { CtaSection } from "@/components/website/CtaSection";
import { NewsSection, SAMPLE_ARTICLES } from "@/components/website/NewsSection";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 60; // revalidate at most once every minute

export default async function HomePage() {
  let dbProjects = null;
  let dbArticles = null;

  try {
    const rawProjects = await prisma.project.findMany({
      where: { featured: true },
      include: { category: true },
      orderBy: { displayOrder: "asc" },
      take: 4,
    });

    if (rawProjects.length > 0) {
      dbProjects = rawProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category.name,
        location: p.location,
        status: p.status,
        year: p.year || (p.completedDate ? new Date(p.completedDate).getFullYear().toString() : "2024"),
        coverImage: p.coverImage,
        description: p.description,
      }));
    }

    const rawArticles = await prisma.newsArticle.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });

    if (rawArticles.length > 0) {
      dbArticles = rawArticles.map((a) => ({
        slug: a.slug,
        title: a.title,
        summary: a.summary,
        category: a.category.name,
        publishedAt: formatDate(a.publishedAt),
        readingTime: a.readingTime,
        featuredImage: a.featuredImage,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch database items for homepage, using fallback:", error);
  }

  return (
    <>
      {/* 1. Cinematic Scroll-Driven Construction Hero */}
      <ConstructionJourneyHero />

      {/* 2. Company Introduction: Engineering Solutions. Lasting Impact. */}
      <CompanyIntro />

      {/* 3. Services Overview: 5 Core Engineering Capabilities */}
      <ServicesOverview />

      {/* 4. Featured Projects: Curated Architectural Milestones */}
      <FeaturedProjectsSection projects={dbProjects || FEATURED_PROJECTS} />

      {/* 5. Why Choose Us: Differentiating Engineering Capabilities */}
      <WhyChooseUs />

      {/* 6. Call to Action: Let's Build Something Exceptional Together */}
      <CtaSection />

      {/* 7. News & Insights: Technical Perspectives & Project Updates */}
      <NewsSection articles={dbArticles || SAMPLE_ARTICLES} />
    </>
  );
}
