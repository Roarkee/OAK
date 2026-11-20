import React from "react";
import Link from "next/link";
import { Download, FileText, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Documents & Capability Statements | OAKS AFRICA GROUP",
  description:
    "Download verified OAKS AFRICA GROUP corporate profiles, engineering capability statements, HSE manuals, and ISO compliance credentials.",
};

export const revalidate = 60;

const FALLBACK_DOCUMENTS = [
  {
    id: "doc-1",
    title: "OAKS AFRICA GROUP Corporate Profile & Portfolio (2024–2025)",
    description: "Comprehensive corporate brochure including corporate governance, structural engineering track record, plant & machinery fleet inventories, and completed project photography.",
    category: "PROFILE",
    fileUrl: "/documents/Oaks-Africa-Group-Corporate-Profile-2024.pdf",
    fileName: "Oaks-Africa-Group-Corporate-Profile-2024.pdf",
    fileSize: "14.2 MB",
    isPublished: true,
  },
  {
    id: "doc-2",
    title: "Technical Capability Statement: Structural & Heavy Civil Works",
    description: "Detailed engineering dossier covering finite element software licenses, chartered engineer CVs, post-tensioning equipment, and quality control lab protocols.",
    category: "CAPABILITY",
    fileUrl: "/documents/Oaks-Technical-Capability-Statement.pdf",
    fileName: "Oaks-Technical-Capability-Statement.pdf",
    fileSize: "8.6 MB",
    isPublished: true,
  },
  {
    id: "doc-3",
    title: "Health, Safety & Environmental (HSE) Policy & Site Governance Manual",
    description: "Corporate safety protocols detailing zero-harm operational objectives, mandatory PPE standards, hazardous material handling, and ISO 45001 compliance standards.",
    category: "CERTIFICATION",
    fileUrl: "/documents/Oaks-HSE-Policy-Governance.pdf",
    fileName: "Oaks-HSE-Policy-Governance.pdf",
    fileSize: "4.1 MB",
    isPublished: true,
  },
  {
    id: "doc-4",
    title: "Commercial Development & Residential Construction Brochure",
    description: "Client showcase brochure detailing turnkey project delivery models, turnkey fit-out capabilities, and sustainable LEED/EDGE-ready building enclosures.",
    category: "BROCHURE",
    fileUrl: "/documents/Oaks-Commercial-Residential-Brochure.pdf",
    fileName: "Oaks-Commercial-Residential-Brochure.pdf",
    fileSize: "11.8 MB",
    isPublished: true,
  },
];

export default async function DocumentsPage() {
  let docs = FALLBACK_DOCUMENTS;

  try {
    const dbDocs = await prisma.companyDocument.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    if (dbDocs.length > 0) {
      docs = dbDocs.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description || "",
        category: d.category,
        fileUrl: d.fileUrl,
        fileName: d.fileName,
        fileSize: d.fileSize || "PDF",
        isPublished: d.isPublished,
      }));
    }
  } catch (e) {
    console.error("Failed to load documents from DB:", e);
  }

  return (
    <div className="bg-white text-brand-charcoal min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-pattern opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
              <span className="w-6 h-px bg-brand-gold"></span>
              <span>VERIFIED CORPORATE CREDENTIALS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Corporate Documents & Brochures
            </h1>
            <p className="text-white/80 text-lg sm:text-xl font-normal leading-relaxed">
              Access and download official corporate brochures, technical capability statements, and quality compliance manuals for institutional tenders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Documents Grid */}
      <section className="py-20 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-8 rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all shadow-sm hover:shadow-architectural-lg flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-sm bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-brand-muted bg-brand-ivory px-2.5 py-1 rounded-sm border border-brand-border">
                      {doc.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-brand-navy">
                    {doc.title}
                  </h3>

                  <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                  <span className="text-xs font-mono text-brand-muted">
                    Format: PDF ({doc.fileSize})
                  </span>
                  <a
                    href={doc.fileUrl}
                    download={doc.fileName}
                    className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-5 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all shadow active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Verification Callout */}
          <div className="bg-brand-navy text-white p-8 rounded-sm border border-brand-gold/30 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="w-8 h-8 text-brand-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Need Confidential Tender Submissions or Specific Prequalification Dossiers?
                </h4>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Our commercial bid management team can assemble tailored prequalification packages and audited financial disclosures upon formal request.
                </p>
              </div>
            </div>
            <Link
              href="/contact?tab=rfq"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              Contact Bid Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
