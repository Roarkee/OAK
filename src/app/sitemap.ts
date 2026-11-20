import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://oaksafricagroup.com";

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic services
  const coreServices = [
    "structural-civil-engineering",
    "architectural-engineering-design",
    "building-construction",
    "infrastructure-development",
    "project-management-consultancy",
  ];
  const serviceRoutes: MetadataRoute.Sitemap = coreServices.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic projects
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });
    projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (e) {
    // ignore
  }

  // Dynamic articles
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.newsArticle.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    articleRoutes = articles.map((a) => ({
      url: `${baseUrl}/news/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  } catch (e) {
    // ignore
  }

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...articleRoutes];
}
