import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { 
  FolderKanban, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const categories = await prisma.projectCategory.findMany();

  // Server Action: Toggle Featured
  async function toggleFeatured(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    await prisma.project.update({
      where: { id },
      data: { featured: !current },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  }

  // Server Action: Delete Project
  async function deleteProject(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  }

  // Server Action: Create Fast Project
  async function createProject(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const categoryId = formData.get("categoryId") as string;
    const location = formData.get("location") as string;
    const status = formData.get("status") as string;
    const description = formData.get("description") as string;
    const coverImage = (formData.get("coverImage") as string) || "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80";

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    await prisma.project.create({
      data: {
        title,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        categoryId,
        location,
        status,
        description,
        coverImage,
        featured: false,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
            CONTENT MANAGEMENT
          </span>
          <h1 className="font-heading text-3xl font-bold text-brand-navy">
            Projects Portfolio Management
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Publish, edit, feature, and archive engineering developments.
          </p>
        </div>
      </div>

      {/* Quick Add Project Form Card */}
      <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
        <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Add New Project Milestone</span>
        </h3>
        <form action={createProject} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Project Title *
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Horizon High-Rise Phase II"
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
              Location *
            </label>
            <input
              name="location"
              required
              placeholder="City, District"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Status *
            </label>
            <select
              name="status"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold bg-white"
            >
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Planned">Planned</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Cover Image URL (or upload path)
            </label>
            <input
              name="coverImage"
              placeholder="https://images.unsplash.com/... or /uploads/..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Technical Description & Scope *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              placeholder="Describe structural modeling, square meter footprint, or client scope..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-slate text-white px-5 py-2 rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors shadow"
            >
              Save & Publish Project
            </button>
          </div>
        </form>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-sm border border-brand-border shadow-sm overflow-hidden">
        <div className="p-4 bg-brand-ivory/50 border-b border-brand-border flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-brand-navy">
            Published Projects ({projects.length})
          </span>
          <span className="text-xs font-mono text-brand-muted">
            Live Database Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px] border-b border-brand-border">
              <tr>
                <th className="p-3">Cover</th>
                <th className="p-3">Project Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-charcoal">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="p-3">
                    <div className="relative w-14 h-10 rounded overflow-hidden bg-brand-slate">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-brand-navy">
                    <span className="block">{p.title}</span>
                    <span className="text-[10px] font-mono text-brand-muted">{p.slug}</span>
                  </td>
                  <td className="p-3 font-mono text-brand-muted">
                    {p.category.name}
                  </td>
                  <td className="p-3 text-brand-muted">
                    {p.location}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        p.status === "Completed"
                          ? "bg-brand-success/10 text-brand-success"
                          : "bg-brand-warning/15 text-brand-warning"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <form action={toggleFeatured}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="current" value={p.featured ? "true" : "false"} />
                      <button
                        type="submit"
                        className={`p-1.5 rounded transition-colors ${
                          p.featured
                            ? "text-brand-gold hover:text-brand-gold-hover"
                            : "text-brand-muted/40 hover:text-brand-gold"
                        }`}
                        title={p.featured ? "Remove from Featured" : "Mark as Featured"}
                      >
                        <Star className={`w-4 h-4 ${p.featured ? "fill-brand-gold" : ""}`} />
                      </button>
                    </form>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-1 text-brand-muted hover:text-brand-navy"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="p-1 text-brand-error hover:text-red-700"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
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
