import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/utils";
import { Settings, ShieldCheck, Activity, Bell, Globe } from "lucide-react";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const settings = await prisma.siteSetting.findMany();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-brand-border">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
          SYSTEM CONFIGURATION & SECURITY
        </span>
        <h1 className="font-heading text-3xl font-bold text-brand-navy">
          Platform Settings & Security Audit Logs
        </h1>
        <p className="text-xs text-brand-muted mt-1">
          Review system configuration defaults and the immutable security audit trail of administrative operations.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase font-mono">
            <Globe className="w-4 h-4" />
            <span>SEO & Domain Configuration</span>
          </div>
          <div className="text-xs space-y-1.5 text-brand-charcoal">
            <p><strong>Primary Domain:</strong> oaksafricagroup.com</p>
            <p><strong>Indexing:</strong> Enabled (Googlebot & Bingbot)</p>
            <p><strong>Sitemap:</strong> /sitemap.xml (Dynamic)</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase font-mono">
            <Bell className="w-4 h-4" />
            <span>Email Notification Gateway</span>
          </div>
          <div className="text-xs space-y-1.5 text-brand-charcoal">
            <p><strong>Provider:</strong> Resend API Integration</p>
            <p><strong>Enquiry Dispatch:</strong> info@oaksafricagroup.com</p>
            <p><strong>RFQ Dispatch:</strong> estimating@oaksafricagroup.com</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-brand-border shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Authentication</span>
          </div>
          <div className="text-xs space-y-1.5 text-brand-charcoal">
            <p><strong>Auth Model:</strong> NextAuth.js JWT Session</p>
            <p><strong>Password Hashing:</strong> Bcrypt (10 salt rounds)</p>
            <p><strong>Access Control:</strong> SuperAdmin & Role-Based</p>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-sm border border-brand-border shadow-sm overflow-hidden space-y-4">
        <div className="p-4 bg-brand-ivory/50 border-b border-brand-border flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-brand-navy flex items-center space-x-2">
            <Activity className="w-4 h-4 text-brand-gold" />
            <span>System Audit Trail ({auditLogs.length} Events)</span>
          </span>
          <span className="text-[11px] font-mono text-brand-muted">
            Tamper-Evident Chronological Ledger
          </span>
        </div>

        {auditLogs.length === 0 ? (
          <p className="text-xs text-brand-muted p-8 text-center">No audit logs recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-brand-ivory text-brand-muted font-mono uppercase text-[10px] border-b border-brand-border">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Actor / Origin</th>
                  <th className="p-3">Action Type</th>
                  <th className="p-3">Entity</th>
                  <th className="p-3">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-charcoal font-mono">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-brand-ivory/40 transition-colors">
                    <td className="p-3 text-brand-muted whitespace-nowrap">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="p-3 font-semibold text-brand-navy">
                      {log.adminName}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-brand-ivory text-brand-navy border border-brand-border text-[10px] font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-brand-muted">
                      {log.entityType}
                    </td>
                    <td className="p-3 text-brand-charcoal max-w-md font-sans text-xs">
                      {log.details}
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
