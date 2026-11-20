import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatDate, formatCurrency } from "@/lib/utils";
import { 
  FileSpreadsheet, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  FileText, 
  ArrowRight,
  Download
} from "lucide-react";

export const revalidate = 0;

export default async function AdminQuotationsPage() {
  const rfqs = await prisma.quotationRequest.findMany({
    include: { documents: true },
    orderBy: { createdAt: "desc" },
  });

  // Server Action: Update RFQ Status & Record Quotation
  async function updateQuotation(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as any;
    const quotationRef = (formData.get("quotationRef") as string) || null;
    const rawAmount = formData.get("quotationAmount") as string;
    const notes = (formData.get("notes") as string) || null;

    const quotationAmount = rawAmount ? parseFloat(rawAmount) : null;

    await prisma.quotationRequest.update({
      where: { id },
      data: {
        status,
        quotationRef,
        quotationAmount,
        notes,
      },
    });

    revalidatePath("/admin/quotations");
    revalidatePath("/admin");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
            COMMERCIAL ESTIMATING DESK
          </span>
          <h1 className="font-heading text-3xl font-bold text-brand-navy">
            Quotation Requests (RFQ) & Cost Estimates
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Review detailed contractor BOQs, register formal commercial estimate numbers, and record approved bid valuations.
          </p>
        </div>
        <div className="text-xs font-mono bg-white px-3 py-2 border rounded-sm">
          Total RFQs: <span className="font-bold text-brand-navy">{rfqs.length}</span>
        </div>
      </div>

      {/* RFQ Stream */}
      <div className="space-y-6">
        {rfqs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-sm border border-brand-border text-brand-muted text-sm">
            No quotation requests received yet.
          </div>
        ) : (
          rfqs.map((rfq) => (
            <div
              key={rfq.id}
              className="bg-white rounded-sm border border-brand-border shadow-sm p-6 space-y-6"
            >
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 bg-brand-gold text-brand-navy font-mono font-bold text-xs rounded-sm">
                    {rfq.referenceNumber}
                  </span>
                  <span className="font-heading font-bold text-base text-brand-navy">
                    {rfq.projectTitle}
                  </span>
                </div>
                <div className="text-xs font-mono text-brand-muted">
                  Submitted: {formatDate(rfq.createdAt)}
                </div>
              </div>

              {/* RFQ Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Client / Proponent */}
                <div className="bg-brand-ivory/50 p-4 rounded-sm border border-brand-border space-y-2">
                  <h4 className="font-mono font-bold uppercase text-[10px] text-brand-muted">
                    Client & Proponent
                  </h4>
                  <p className="font-bold text-sm text-brand-navy">{rfq.name}</p>
                  {rfq.company && <p className="text-brand-muted font-medium">{rfq.company}</p>}
                  <p className="text-brand-charcoal">{rfq.email}</p>
                  <p className="text-brand-charcoal">{rfq.phone}</p>
                </div>

                {/* Parameters */}
                <div className="bg-brand-ivory/50 p-4 rounded-sm border border-brand-border space-y-2">
                  <h4 className="font-mono font-bold uppercase text-[10px] text-brand-muted">
                    Project Parameters
                  </h4>
                  <p><strong>Discipline:</strong> {rfq.category}</p>
                  <p><strong>Site Location:</strong> {rfq.location}</p>
                  <p><strong>Target Commence:</strong> {formatDate(rfq.expectedCommenceDate)}</p>
                  <p><strong>Target Complete:</strong> {formatDate(rfq.expectedCompletionDate)}</p>
                  <p><strong>Estimated Budget:</strong> {rfq.estimatedBudget || "Tender specified"}</p>
                </div>

                {/* Scope of Work */}
                <div className="bg-brand-ivory/50 p-4 rounded-sm border border-brand-border space-y-2">
                  <h4 className="font-mono font-bold uppercase text-[10px] text-brand-muted">
                    Scope of Work & Requirements
                  </h4>
                  <p className="text-brand-charcoal leading-relaxed whitespace-pre-line text-xs">
                    {rfq.scopeOfWork}
                  </p>
                  {rfq.technicalSpecs && (
                    <p className="text-brand-muted text-[11px] pt-1">
                      <strong>Specs:</strong> {rfq.technicalSpecs}
                    </p>
                  )}
                </div>
              </div>

              {/* Commercial Estimation Form & Status */}
              <div className="bg-brand-navy/5 p-4 rounded-sm border border-brand-gold/30">
                <form action={updateQuotation} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs items-end">
                  <input type="hidden" name="id" value={rfq.id} />
                  
                  <div>
                    <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
                      Quotation Status *
                    </label>
                    <select
                      name="status"
                      defaultValue={rfq.status}
                      className="w-full p-2 border rounded-sm font-mono font-semibold bg-white text-brand-navy"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="UNDER_REVIEW">UNDER REVIEW</option>
                      <option value="QUOTED">QUOTED</option>
                      <option value="ACCEPTED">ACCEPTED</option>
                      <option value="DECLINED">DECLINED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
                      Formal Estimate Ref #
                    </label>
                    <input
                      name="quotationRef"
                      defaultValue={rfq.quotationRef || ""}
                      placeholder="e.g. OAK-EST-2024-089"
                      className="w-full p-2 border rounded-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-mono uppercase text-[10px] text-brand-muted mb-1 font-bold">
                      Total Quoted Amount ($ USD)
                    </label>
                    <input
                      type="number"
                      step="1000"
                      name="quotationAmount"
                      defaultValue={rfq.quotationAmount ? Number(rfq.quotationAmount) : ""}
                      placeholder="e.g. 14500000"
                      className="w-full p-2 border rounded-sm bg-white"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-navy font-semibold uppercase tracking-wider py-2 rounded-sm text-xs transition-colors shadow"
                    >
                      Update Quotation Data
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
