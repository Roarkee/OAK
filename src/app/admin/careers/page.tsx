import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/utils";
import { 
  Users, 
  Briefcase, 
  Plus, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  MapPin 
} from "lucide-react";

export const revalidate = 0;

export default async function AdminCareersPage() {
  const vacancies = await prisma.jobVacancy.findMany({
    include: { applications: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  const allApplications = await prisma.jobApplication.findMany({
    include: { vacancy: true },
    orderBy: { createdAt: "desc" },
  });

  // Server Action: Create Vacancy
  async function createVacancy(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const employmentType = formData.get("employmentType") as string;
    const description = formData.get("description") as string;
    const rawReqs = (formData.get("requirements") as string) || "";
    const rawResp = (formData.get("responsibilities") as string) || "";

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const requirements = rawReqs.split("\n").map(s => s.trim()).filter(Boolean);
    const responsibilities = rawResp.split("\n").map(s => s.trim()).filter(Boolean);

    await prisma.jobVacancy.create({
      data: {
        title,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        department,
        location,
        employmentType,
        description,
        requirements: requirements.length > 0 ? requirements : ["Relevant Engineering Degree"],
        responsibilities: responsibilities.length > 0 ? responsibilities : ["Execute project milestones"],
        isActive: true,
      },
    });

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
  }

  // Server Action: Update Application Status
  async function updateAppStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as any;
    await prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/careers");
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
            HUMAN CAPITAL & TALENT RECRUITMENT
          </span>
          <h1 className="font-heading text-3xl font-bold text-brand-navy">
            Careers & Application Management
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Manage open job roles, internship programs, and candidate application pipelines.
          </p>
        </div>
      </div>

      {/* 1. Add New Vacancy Form */}
      <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
        <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Publish New Job Vacancy or Internship</span>
        </h3>
        <form action={createVacancy} className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Job Title *
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Geotechnical Project Engineer"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Department *
            </label>
            <input
              name="department"
              required
              placeholder="e.g. Civil Infrastructure"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Location *
            </label>
            <input
              name="location"
              required
              placeholder="e.g. Addis Ababa / On-site"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Employment Type *
            </label>
            <select
              name="employmentType"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold bg-white"
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship (6 Months)</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div className="md:col-span-4">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Role Description *
            </label>
            <textarea
              name="description"
              required
              rows={2}
              placeholder="Summary of responsibilities and scope..."
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Responsibilities (One per line)
            </label>
            <textarea
              name="responsibilities"
              rows={3}
              placeholder="Lead structural analysis&#10;Verify reinforcing cage alignment"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
              Requirements (One per line)
            </label>
            <textarea
              name="requirements"
              rows={3}
              placeholder="BSc in Civil Engineering&#10;5+ years experience&#10;Proficiency in ETABS"
              className="w-full px-3 py-2 border rounded-sm focus:border-brand-gold"
            />
          </div>

          <div className="md:col-span-4 flex justify-end">
            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-slate text-white px-5 py-2.5 rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors shadow"
            >
              Publish Job Vacancy
            </button>
          </div>
        </form>
      </div>

      {/* 2. Received Job Applications Table */}
      <div className="bg-white rounded-sm border border-brand-border shadow-sm overflow-hidden space-y-4">
        <div className="p-4 bg-brand-ivory/50 border-b border-brand-border flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-brand-navy">
            Received Candidate Applications ({allApplications.length})
          </span>
          <span className="text-xs font-mono text-brand-muted">
            Candidate Pipeline
          </span>
        </div>

        {allApplications.length === 0 ? (
          <p className="text-xs text-brand-muted p-8 text-center">No applications received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px] border-b border-brand-border">
                <tr>
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Role Applied</th>
                  <th className="p-3">Resume</th>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Application Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-charcoal">
                {allApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-brand-ivory/40 transition-colors">
                    <td className="p-3">
                      <span className="font-semibold block text-brand-navy">{app.fullName}</span>
                      <span className="text-[10px] text-brand-muted">{app.email} • {app.phone}</span>
                    </td>
                    <td className="p-3 font-semibold text-brand-navy">
                      {app.vacancy.title}
                    </td>
                    <td className="p-3">
                      <a
                        href={app.resumeUrl}
                        download={app.resumeFileName}
                        className="inline-flex items-center space-x-1 text-brand-gold hover:underline font-mono"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{app.resumeFileName}</span>
                      </a>
                    </td>
                    <td className="p-3 font-mono text-brand-muted">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="p-3">
                      <form action={updateAppStatus} className="inline-block">
                        <input type="hidden" name="id" value={app.id} />
                        <select
                          name="status"
                          defaultValue={app.status}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-brand-border bg-white"
                        >
                          <option value="NEW">NEW</option>
                          <option value="REVIEWING">REVIEWING</option>
                          <option value="SHORTLISTED">SHORTLISTED</option>
                          <option value="INTERVIEW">INTERVIEW</option>
                          <option value="REJECTED">REJECTED</option>
                          <option value="HIRED">HIRED</option>
                        </select>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
