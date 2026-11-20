import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/utils";
import { Newspaper, Plus, Trash2, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function AdminNewsPage() {
  const articles = await prisma.newsArticle.findMany({
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  const categories = await prisma.newsCategory.findMany();

  // Server Action: Toggle Publish
  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    await prisma.newsArticle.update({
      where: { id },
      data: { published: !current },
    });
    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");
  }

  // Server Action: Create Article
  async function createArticle(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const categoryId = formData.get("categoryId") as string;
    const author = (formData.get("author") as string) || "OAKS Editorial Team";
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const readingTime = (formData.get("readingTime") as string) || "5 min read";
    const featuredImage = (formData.get("featuredImage") as string) || "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80";

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    await prisma.newsArticle.create({
      data: {
        title,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        categoryId,
        author,
        summary,
        content,
        readingTime,
        featuredImage,
        published: true,
      },
    });

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
          EDITORIAL & COMMUNICATIONS
        </span>
        <h1 className="font-heading text-3xl font-bold text-brand-navy">
          News & Insights Editorial Desk
        </h1>
        <p className="text-xs text-brand-muted mt-1">
          Publish engineering whitepapers, company milestones, and contract awards.
        </p>
      </div>

      {/* Add New Article Form */}
      <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
        <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Write & Publish New Article</span>
        </h3>
        <form action={createArticle} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Article Title *
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Seismic Dampening Advances in East African Towers"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Category *
            </label>
            <select
              name="categoryId"
              required
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Author / Byline
            </label>
            <input
              name="author"
              placeholder="Eng. Dawit Hailemariam, PE"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Estimated Reading Time
            </label>
            <input
              name="readingTime"
              placeholder="5 min read"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Cover Image URL
            </label>
            <input
              name="featuredImage"
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Article Summary (Editorial Lead) *
            </label>
            <textarea
              name="summary"
              required
              rows={2}
              placeholder="Brief summary displayed on cards and overview grids..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Full Article Body (Markdown supported) *
            </label>
            <textarea
              name="content"
              required
              rows={6}
              placeholder="Full text with paragraphs, bullet points, and engineering analysis..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-slate text-white px-6 py-2.5 rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors shadow"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>

      {/* Published Articles List */}
      <div className="bg-white rounded-sm border border-brand-border shadow-sm overflow-hidden">
        <div className="p-4 bg-brand-ivory/50 border-b border-brand-border flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-brand-navy">
            Published Articles ({articles.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px] border-b border-brand-border">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Author</th>
                <th className="p-3">Published</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-charcoal">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="p-3 font-semibold text-brand-navy">
                    <span className="block text-sm">{art.title}</span>
                    <span className="text-[10px] text-brand-muted font-mono">{art.slug}</span>
                  </td>
                  <td className="p-3 font-mono text-brand-muted">
                    {art.category.name}
                  </td>
                  <td className="p-3 text-brand-charcoal">
                    {art.author}
                  </td>
                  <td className="p-3 font-mono text-brand-muted">
                    {formatDate(art.publishedAt)}
                  </td>
                  <td className="p-3">
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={art.id} />
                      <input type="hidden" name="current" value={art.published ? "true" : "false"} />
                      <button
                        type="submit"
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          art.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {art.published ? "Published" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/news/${art.slug}`}
                      target="_blank"
                      className="inline-flex items-center space-x-1 text-brand-navy hover:text-brand-gold text-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
