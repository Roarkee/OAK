import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/utils";
import { FileText, Plus, Download, Trash2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminDocumentsPage() {
  const documents = await prisma.companyDocument.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Server Action: Toggle Publish
  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    await prisma.companyDocument.update({
      where: { id },
      data: { isPublished: !current },
    });
    revalidatePath("/admin/documents");
    revalidatePath("/documents");
  }

  // Server Action: Add Document
  async function addDocument(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const category = formData.get("category") as any;
    const description = formData.get("description") as string;
    const fileUrl = (formData.get("fileUrl") as string) || "/documents/sample.pdf";
    const fileName = (formData.get("fileName") as string) || "Company-Profile.pdf";
    const fileSize = (formData.get("fileSize") as string) || "12.4 MB";

    await prisma.companyDocument.create({
      data: {
        title,
        category,
        description,
        fileUrl,
        fileName,
        fileSize,
        isPublished: true,
      },
    });

    revalidatePath("/admin/documents");
    revalidatePath("/documents");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
          DOCUMENT ASSET MANAGEMENT
        </span>
        <h1 className="font-heading text-3xl font-bold text-brand-navy">
          Corporate Documents & Downloads
        </h1>
        <p className="text-xs text-brand-muted mt-1">
          Manage downloadable brochures, capability statements, and compliance manuals.
        </p>
      </div>

      {/* Add Document Form */}
      <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
        <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Upload & Register New Corporate Document</span>
        </h3>
        <form action={addDocument} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Document Title *
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Quality Assurance & ISO 9001 Manual"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Category *
            </label>
            <select
              name="category"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold bg-white"
            >
              <option value="PROFILE">Corporate Profile</option>
              <option value="CAPABILITY">Capability Statement</option>
              <option value="BROCHURE">Brochure</option>
              <option value="CERTIFICATION">Certification & Safety</option>
              <option value="OTHER">Other Official Document</option>
            </select>
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              File Name
            </label>
            <input
              name="fileName"
              defaultValue="Oaks-Document.pdf"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              File Size (display string)
            </label>
            <input
              name="fileSize"
              defaultValue="8.5 MB"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              File Path / Download URL
            </label>
            <input
              name="fileUrl"
              defaultValue="/documents/Oaks-Profile.pdf"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Description / Summary *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              placeholder="Outline contents, ISO standards, or year of release..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-slate text-white px-5 py-2.5 rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors shadow"
            >
              Register Document
            </button>
          </div>
        </form>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-sm border border-brand-border shadow-sm overflow-hidden">
        <div className="p-4 bg-brand-ivory/50 border-b border-brand-border flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-brand-navy">
            Registered Documents ({documents.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px] border-b border-brand-border">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">File Name</th>
                <th className="p-3">Size</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-charcoal">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-brand-ivory/40 transition-colors">
                  <td className="p-3 font-semibold text-brand-navy">
                    <span className="block">{doc.title}</span>
                    <span className="text-[10px] text-brand-muted line-clamp-1">{doc.description}</span>
                  </td>
                  <td className="p-3 font-mono text-brand-muted">
                    {doc.category}
                  </td>
                  <td className="p-3 font-mono text-brand-charcoal">
                    {doc.fileName}
                  </td>
                  <td className="p-3 font-mono text-brand-muted">
                    {doc.fileSize}
                  </td>
                  <td className="p-3">
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={doc.id} />
                      <input type="hidden" name="current" value={doc.isPublished ? "true" : "false"} />
                      <button
                        type="submit"
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          doc.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {doc.isPublished ? "Published" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td className="p-3 text-right">
                    <a
                      href={doc.fileUrl}
                      download={doc.fileName}
                      className="inline-flex items-center space-x-1 text-brand-navy hover:text-brand-gold text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </a>
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
