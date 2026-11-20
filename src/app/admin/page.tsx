import React from "react";
import Link from "next/link";
import { 
  FolderKanban, 
  MessageSquareText, 
  FileSpreadsheet, 
  Users, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Building2,
  Calendar,
  Activity
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Dynamic real-time dashboard

export default async function AdminDashboardPage() {
  let stats = {
    totalProjects: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    newEnquiries: 0,
    totalEnquiries: 0,
    pendingRfqs: 0,
    totalRfqs: 0,
    activeVacancies: 0,
    totalApplications: 0,
  };

  let recentEnquiries: any[] = [];
  let recentRfqs: any[] = [];
  let auditLogs: any[] = [];

  try {
    const [
      totalProjects,
      completedProjects,
      ongoingProjects,
      newEnquiries,
      totalEnquiries,
      pendingRfqs,
      totalRfqs,
      activeVacancies,
      totalApplications,
      enquiriesList,
      rfqsList,
      logsList,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "Completed" } }),
      prisma.project.count({ where: { status: "Ongoing" } }),
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.enquiry.count(),
      prisma.quotationRequest.count({ where: { status: "PENDING" } }),
      prisma.quotationRequest.count(),
      prisma.jobVacancy.count({ where: { isActive: true } }),
      prisma.jobApplication.count(),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.quotationRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.auditLog.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    stats = {
      totalProjects,
      completedProjects,
      ongoingProjects,
      newEnquiries,
      totalEnquiries,
      pendingRfqs,
      totalRfqs,
      activeVacancies,
      totalApplications,
    };

    recentEnquiries = enquiriesList;
    recentRfqs = rfqsList;
    auditLogs = logsList;
  } catch (error) {
    console.error("Dashboard DB fetch error:", error);
  }

  return (
    <div className="space-y-10">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
            EXECUTIVE CONSOLE
          </span>
          <h1 className="font-heading text-3xl font-bold text-brand-navy">
            Corporate Operations Dashboard
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Real-time project statuses, tender quotations, client enquiries, and recruitment pipeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center space-x-2 bg-brand-navy hover:bg-brand-slate text-white px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-brand-gold" />
            <span>Manage Projects</span>
          </Link>
          <Link
            href="/admin/quotations"
            className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all shadow"
          >
            <span>Review RFQs ({stats.pendingRfqs})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Top Operational KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Projects */}
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-brand-muted">
              Project Portfolio
            </span>
            <div className="w-8 h-8 rounded bg-brand-navy/10 text-brand-navy flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-3xl font-bold text-brand-navy">
              {stats.totalProjects}
            </span>
            <span className="text-xs font-mono text-brand-success font-medium">
              {stats.completedProjects} Completed
            </span>
          </div>
          <p className="text-[11px] text-brand-muted">
            {stats.ongoingProjects} active construction sites
          </p>
        </div>

        {/* Metric 2: Enquiries */}
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-brand-muted">
              Client Enquiries
            </span>
            <div className="w-8 h-8 rounded bg-brand-gold/15 text-brand-gold flex items-center justify-center">
              <MessageSquareText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-3xl font-bold text-brand-navy">
              {stats.totalEnquiries}
            </span>
            {stats.newEnquiries > 0 ? (
              <span className="text-xs font-mono font-bold text-brand-error bg-red-50 px-2 py-0.5 rounded">
                {stats.newEnquiries} New
              </span>
            ) : (
              <span className="text-xs text-brand-muted">All Reviewed</span>
            )}
          </div>
          <p className="text-[11px] text-brand-muted">
            From website forms & direct tenders
          </p>
        </div>

        {/* Metric 3: Quotation Requests (RFQs) */}
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-brand-muted">
              Quotation (RFQ) Pipeline
            </span>
            <div className="w-8 h-8 rounded bg-brand-slate/15 text-brand-slate flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-3xl font-bold text-brand-navy">
              {stats.totalRfqs}
            </span>
            <span className="text-xs font-mono text-brand-warning font-semibold">
              {stats.pendingRfqs} Pending
            </span>
          </div>
          <p className="text-[11px] text-brand-muted">
            BOQ review & commercial estimation
          </p>
        </div>

        {/* Metric 4: Careers */}
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-brand-muted">
              Recruitment Pipeline
            </span>
            <div className="w-8 h-8 rounded bg-brand-navy/10 text-brand-navy flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-heading text-3xl font-bold text-brand-navy">
              {stats.totalApplications}
            </span>
            <span className="text-xs font-mono text-brand-gold font-semibold">
              {stats.activeVacancies} Vacancies
            </span>
          </div>
          <p className="text-[11px] text-brand-muted">
            Engineers, managers & interns
          </p>
        </div>
      </div>

      {/* 3. Middle Section: Recent Enquiries & RFQ Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enquiries Table Card */}
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
              <MessageSquareText className="w-4 h-4 text-brand-gold" />
              <span>Recent Client Enquiries</span>
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono text-brand-gold hover:underline uppercase tracking-wider"
            >
              View All →
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-brand-muted py-6 text-center">No recent enquiries recorded.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Ref #</th>
                    <th className="p-2.5">Contact</th>
                    <th className="p-2.5">Discipline</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-brand-charcoal">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-brand-ivory/50 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-brand-navy">
                        {enq.referenceNumber}
                      </td>
                      <td className="p-2.5">
                        <span className="font-semibold block">{enq.name}</span>
                        <span className="text-[10px] text-brand-muted">{enq.email}</span>
                      </td>
                      <td className="p-2.5 text-brand-muted">
                        {enq.category || "General"}
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            enq.status === "NEW"
                              ? "bg-red-100 text-red-800"
                              : enq.status === "CONTACTED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RFQ Submissions Card */}
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-brand-gold" />
              <span>Pending Quotation Requests (RFQ)</span>
            </h3>
            <Link
              href="/admin/quotations"
              className="text-xs font-mono text-brand-gold hover:underline uppercase tracking-wider"
            >
              View All →
            </Link>
          </div>

          {recentRfqs.length === 0 ? (
            <p className="text-xs text-brand-muted py-6 text-center">No RFQs submitted.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Ref #</th>
                    <th className="p-2.5">Project Title</th>
                    <th className="p-2.5">Location</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-brand-charcoal">
                  {recentRfqs.map((rfq) => (
                    <tr key={rfq.id} className="hover:bg-brand-ivory/50 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-brand-navy">
                        {rfq.referenceNumber}
                      </td>
                      <td className="p-2.5">
                        <span className="font-semibold block line-clamp-1">{rfq.projectTitle}</span>
                        <span className="text-[10px] text-brand-muted">{rfq.name}</span>
                      </td>
                      <td className="p-2.5 text-brand-muted line-clamp-1">
                        {rfq.location}
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            rfq.status === "PENDING"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {rfq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Activity & Audit Log Section */}
      <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border">
          <h3 className="font-heading text-base font-bold text-brand-navy flex items-center space-x-2">
            <Activity className="w-4 h-4 text-brand-gold" />
            <span>Recent Administrative & System Activity</span>
          </h3>
          <span className="text-xs font-mono text-brand-muted">
            Immutable Audit Trail
          </span>
        </div>

        {auditLogs.length === 0 ? (
          <p className="text-xs text-brand-muted py-4 text-center">No audit activity recorded.</p>
        ) : (
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-3 bg-brand-ivory/60 rounded border border-brand-border text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-brand-navy font-mono">
                      {log.action}
                    </span>
                    <span className="text-brand-muted">•</span>
                    <span className="text-brand-muted font-mono">{log.adminName}</span>
                  </div>
                  <p className="text-brand-charcoal">{log.details}</p>
                </div>
                <span className="text-[10px] font-mono text-brand-muted whitespace-nowrap ml-4">
                  {formatDate(log.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
