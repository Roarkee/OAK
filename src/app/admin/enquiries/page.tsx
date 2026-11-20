import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/utils";
import { 
  MessageSquareText, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Plus 
} from "lucide-react";

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    include: { notes: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  const adminUsers = await prisma.adminUser.findMany({
    select: { id: true, name: true, email: true },
  });

  // Server Action: Update Enquiry Status
  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as any;
    await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");
  }

  // Server Action: Assign to Admin
  async function assignAdmin(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const assignedTo = formData.get("assignedTo") as string;
    await prisma.enquiry.update({
      where: { id },
      data: { assignedTo },
    });
    revalidatePath("/admin/enquiries");
  }

  // Server Action: Add Internal Note
  async function addNote(formData: FormData) {
    "use server";
    const enquiryId = formData.get("enquiryId") as string;
    const content = formData.get("content") as string;
    const authorName = (formData.get("authorName") as string) || "Oak Administrator";

    if (!content.trim()) return;

    await prisma.enquiryNote.create({
      data: {
        enquiryId,
        authorName,
        content,
      },
    });

    revalidatePath("/admin/enquiries");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
            CLIENT RELATIONSHIP MANAGEMENT
          </span>
          <h1 className="font-heading text-3xl font-bold text-brand-navy">
            Incoming Client Enquiries
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Review submissions, assign responsible engineers, log follow-up notes, and transition statuses.
          </p>
        </div>
        <div className="text-xs font-mono bg-white px-3 py-2 border rounded-sm">
          Total Enquiries: <span className="font-bold text-brand-navy">{enquiries.length}</span>
        </div>
      </div>

      {/* Enquiries Stream */}
      <div className="space-y-6">
        {enquiries.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-sm border border-brand-border text-brand-muted text-sm">
            No client enquiries received yet.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-sm border border-brand-border shadow-sm p-6 space-y-6"
            >
              {/* Top Summary Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 bg-brand-navy text-brand-gold font-mono font-bold text-xs rounded-sm">
                    {enq.referenceNumber}
                  </span>
                  <span className="text-xs text-brand-muted font-mono">
                    Received on {formatDate(enq.createdAt)}
                  </span>
                </div>

                {/* Status Changer Form */}
                <form action={updateStatus} className="flex items-center space-x-2">
                  <input type="hidden" name="id" value={enq.id} />
                  <span className="text-[11px] font-mono text-brand-muted uppercase">Status:</span>
                  <select
                    name="status"
                    defaultValue={enq.status}
                    onChange={(e) => e.target.form?.requestSubmit()}
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded border border-brand-border bg-brand-ivory text-brand-navy focus:outline-none"
                  >
                    <option value="NEW">NEW</option>
                    <option value="UNDER_REVIEW">UNDER REVIEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUOTATION_SENT">QUOTATION SENT</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </form>
              </div>

              {/* Client Info & Description Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Client Details */}
                <div className="space-y-2 bg-brand-ivory/50 p-4 rounded-sm border border-brand-border">
                  <h4 className="font-mono font-bold uppercase text-[10px] text-brand-muted">
                    Contact Information
                  </h4>
                  <div className="space-y-1.5 text-brand-charcoal">
                    <p className="font-bold text-sm text-brand-navy">{enq.name}</p>
                    {enq.company && <p className="text-brand-muted">{enq.company}</p>}
                    <div className="flex items-center space-x-1.5 pt-1">
                      <Mail className="w-3.5 h-3.5 text-brand-gold" />
                      <a href={`mailto:${enq.email}`} className="hover:underline">{enq.email}</a>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-gold" />
                      <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>
                    </div>
                  </div>
                </div>

                {/* Scope & Location */}
                <div className="space-y-2 bg-brand-ivory/50 p-4 rounded-sm border border-brand-border">
                  <h4 className="font-mono font-bold uppercase text-[10px] text-brand-muted">
                    Project Parameters
                  </h4>
                  <div className="space-y-1 text-brand-charcoal">
                    <p><strong>Discipline:</strong> {enq.category || "General Inquiry"}</p>
                    <p><strong>Location:</strong> {enq.location || "Unspecified"}</p>
                    <p><strong>Estimated Budget:</strong> {enq.budget || "Not provided"}</p>
                    <div className="pt-2">
                      <form action={assignAdmin} className="flex items-center space-x-2">
                        <input type="hidden" name="id" value={enq.id} />
                        <span className="text-[10px] text-brand-muted font-mono">Assigned:</span>
                        <select
                          name="assignedTo"
                          defaultValue={enq.assignedTo || ""}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="text-[11px] p-1 border rounded bg-white"
                        >
                          <option value="">Unassigned</option>
                          {adminUsers.map((u) => (
                            <option key={u.id} value={u.name}>
                              {u.name}
                            </option>
                          ))}
                        </select>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Description Narrative */}
                <div className="space-y-2 bg-brand-ivory/50 p-4 rounded-sm border border-brand-border md:col-span-1">
                  <h4 className="font-mono font-bold uppercase text-[10px] text-brand-muted">
                    Client Message & Inquiry
                  </h4>
                  <p className="text-brand-charcoal leading-relaxed whitespace-pre-line text-xs">
                    {enq.description}
                  </p>
                </div>
              </div>

              {/* Internal Notes Thread */}
              <div className="pt-4 border-t border-brand-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs uppercase tracking-wider text-brand-navy">
                    Internal Engineer Notes & Activity Log ({enq.notes.length})
                  </span>
                </div>

                {enq.notes.length > 0 && (
                  <div className="space-y-2 bg-brand-ivory/30 p-3 rounded border border-brand-border">
                    {enq.notes.map((note) => (
                      <div key={note.id} className="text-xs border-b border-brand-border last:border-0 pb-2 last:pb-0">
                        <div className="flex items-center space-x-2 font-mono text-[10px] text-brand-muted">
                          <span className="font-bold text-brand-navy">{note.authorName}</span>
                          <span>•</span>
                          <span>{formatDate(note.createdAt)}</span>
                        </div>
                        <p className="text-brand-charcoal mt-0.5">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Note Form */}
                <form action={addNote} className="flex gap-2">
                  <input type="hidden" name="enquiryId" value={enq.id} />
                  <input
                    name="content"
                    required
                    placeholder="Log internal note, phone call summary, or tender status..."
                    className="flex-1 px-3 py-1.5 text-xs border rounded-sm focus:border-brand-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-brand-navy hover:bg-brand-slate text-white px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
