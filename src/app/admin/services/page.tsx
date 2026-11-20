import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Wrench, Check, Plus, Trash2, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  // Server Action: Toggle Publish
  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    await prisma.service.update({
      where: { id },
      data: { published: !current },
    });
    revalidatePath("/admin/services");
    revalidatePath("/services");
  }

  // Server Action: Create Service
  async function createService(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const heroImage = (formData.get("heroImage") as string) || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80";
    const rawScope = (formData.get("scope") as string) || "";
    const rawCapabilities = (formData.get("capabilities") as string) || "";

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const scope = rawScope.split("\n").map(s => s.trim()).filter(Boolean);
    const capabilities = rawCapabilities.split("\n").map(c => c.trim()).filter(Boolean);

    await prisma.service.create({
      data: {
        title,
        slug,
        shortDescription,
        fullDescription,
        heroImage,
        scope: scope.length > 0 ? scope : ["Structural calculation", "Quality assurance"],
        capabilities: capabilities.length > 0 ? capabilities : ["Eurocode Compliance"],
        published: true,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
          CONTENT MANAGEMENT
        </span>
        <h1 className="font-heading text-3xl font-bold text-brand-navy">
          Engineering Services Management
        </h1>
        <p className="text-xs text-brand-muted mt-1">
          Control public service listings, technical scopes, and deliverables.
        </p>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-sm border border-brand-border shadow-sm overflow-hidden">
        <div className="p-4 bg-brand-ivory/50 border-b border-brand-border flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-brand-navy">
            Core Engineering Disciplines ({services.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px] border-b border-brand-border">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Slug Route</th>
                <th className="p-3">Scope Items</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-charcoal">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="p-3 font-semibold text-brand-navy">
                    <span className="block text-sm">{s.title}</span>
                    <span className="text-[11px] text-brand-muted line-clamp-1">{s.shortDescription}</span>
                  </td>
                  <td className="p-3 font-mono text-brand-gold font-medium">
                    /services/{s.slug}
                  </td>
                  <td className="p-3 text-brand-muted font-mono">
                    {s.scope.length} Deliverables
                  </td>
                  <td className="p-3">
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="current" value={s.published ? "true" : "false"} />
                      <button
                        type="submit"
                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold transition-colors ${
                          s.published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {s.published ? "Published" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/services/${s.slug}`}
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

      {/* Add New Service Form */}
      <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
        <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Add New Engineering Service Category</span>
        </h3>
        <form action={createService} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Service Title *
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Geotechnical Ground Engineering"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Hero Image URL
            </label>
            <input
              name="heroImage"
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Short Description (Card Summary) *
            </label>
            <input
              name="shortDescription"
              required
              placeholder="One sentence summary of engineering discipline..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Detailed Description & Methodology *
            </label>
            <textarea
              name="fullDescription"
              required
              rows={3}
              placeholder="Full engineering standards, calculation packages, and execution overview..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Scope of Work Items (One per line)
            </label>
            <textarea
              name="scope"
              rows={3}
              placeholder="Soil borehole drilling&#10;Plate load bearing tests&#10;Slope stability calculations"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Technical Capabilities (One per line)
            </label>
            <textarea
              name="capabilities"
              rows={3}
              placeholder="PLAXIS 3D Geotechnical Modeling&#10;Eurocode 7 Geotechnical Design"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-slate text-white px-5 py-2.5 rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors shadow"
            >
              Add Engineering Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
