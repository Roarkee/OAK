"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Calendar, 
  DollarSign, 
  MessageSquare,
  Upload,
  ArrowRight
} from "lucide-react";

export function ContactPageClient() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "rfq" ? "rfq" : "general";
  const initialService = searchParams.get("service") || "";
  const initialProjectRef = searchParams.get("projectRef") || "";

  const [activeTab, setActiveTab] = useState<"general" | "rfq">(initialTab);

  // General Enquiry State
  const [generalForm, setGeneralForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    category: initialService || "Commercial",
    location: "",
    budget: "",
    description: initialProjectRef ? `Inquiry regarding similar scope to: ${initialProjectRef}` : "",
  });

  // RFQ State
  const [rfqForm, setRfqForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectTitle: initialProjectRef ? `Proposed Development - ${initialProjectRef}` : "",
    category: initialService || "Commercial",
    location: "",
    scopeOfWork: "",
    technicalSpecs: "",
    estimatedBudget: "",
    expectedCommenceDate: "",
    expectedCompletionDate: "",
    documents: [] as { fileName: string; fileUrl: string; fileSize?: number }[],
  });

  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceNumber?: string;
    message?: string;
  } | null>(null);

  // Handle General Enquiry submit
  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generalForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionResult({
          success: true,
          referenceNumber: data.referenceNumber,
          message: data.message,
        });
        setGeneralForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          category: "Commercial",
          location: "",
          budget: "",
          description: "",
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.message || "Failed to submit enquiry. Please check the fields.",
        });
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        message: "Network error occurred while submitting. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle RFQ submit
  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionResult(null);

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rfqForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionResult({
          success: true,
          referenceNumber: data.referenceNumber,
          message: data.message,
        });
        setRfqForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectTitle: "",
          category: "Commercial",
          location: "",
          scopeOfWork: "",
          technicalSpecs: "",
          estimatedBudget: "",
          expectedCommenceDate: "",
          expectedCompletionDate: "",
          documents: [],
        });
      } else {
        setSubmissionResult({
          success: false,
          message: data.message || "Failed to submit RFQ. Please check the fields.",
        });
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        message: "Network error occurred while submitting RFQ. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "251911234567";
  const defaultMsg = encodeURIComponent(
    "Hello OAKS AFRICA GROUP, I would like to schedule an engineering consultation."
  );
  const waUrl = `https://wa.me/${phone}?text=${defaultMsg}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Corporate Information & Location (5 cols) */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white p-8 rounded-sm border border-brand-border shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
              HEADQUARTERS
            </span>
            <h3 className="font-heading text-2xl font-bold text-brand-navy">
              Corporate Office & Engineering Center
            </h3>
            <p className="text-sm text-brand-charcoal/80 leading-relaxed">
              We welcome prospective clients, institutional investors, and municipal delegations to visit our headquarters in Addis Ababa.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-brand-border text-sm">
            <div className="flex items-start space-x-3.5">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-navy block">Physical Address</span>
                <span className="text-brand-muted">
                  Oaks Tower, 7th Floor, Bole Commercial Corridor, Addis Ababa, Ethiopia
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-navy block">Direct Inquiries</span>
                <a href="tel:+251911234567" className="text-brand-charcoal hover:text-brand-gold transition-colors">
                  +251 91 123 4567
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-navy block">Email Correspondence</span>
                <a href="mailto:info@oaksafricagroup.com" className="text-brand-charcoal hover:text-brand-gold transition-colors">
                  info@oaksafricagroup.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-navy block">Business Hours</span>
                <span className="text-brand-muted">
                  Monday – Friday: 8:00 AM – 5:30 PM (EAT)<br />
                  Saturday: 8:30 AM – 1:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="pt-4 border-t border-brand-border">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-sm font-semibold text-xs uppercase tracking-wider transition-all shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="bg-white p-3 rounded-sm border border-brand-border shadow-sm overflow-hidden">
          <div className="relative h-64 w-full rounded overflow-hidden">
            <iframe
              title="OAKS Africa Group Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.540114757672!2d38.789123!3d8.995432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504f275e7a9%3A0x6b7724bc24bf8f6b!2sBole%20Rd%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Forms (7 cols) */}
      <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-sm border border-brand-border shadow-sm space-y-8">
        {/* Tab Selection */}
        <div className="flex border-b border-brand-border">
          <button
            type="button"
            onClick={() => {
              setActiveTab("general");
              setSubmissionResult(null);
            }}
            className={`pb-3.5 px-4 text-sm font-heading font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "general"
                ? "text-brand-navy border-b-2 border-brand-gold"
                : "text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            General Enquiry
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("rfq");
              setSubmissionResult(null);
            }}
            className={`pb-3.5 px-4 text-sm font-heading font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "rfq"
                ? "text-brand-navy border-b-2 border-brand-gold"
                : "text-brand-muted hover:text-brand-charcoal"
            }`}
          >
            Request a Quote (RFQ)
          </button>
        </div>

        {/* Feedback Alert */}
        {submissionResult && (
          <div
            className={`p-5 rounded-sm border flex items-start space-x-3 text-sm ${
              submissionResult.success
                ? "bg-brand-success/10 border-brand-success/30 text-brand-navy"
                : "bg-brand-error/10 border-brand-error/30 text-brand-charcoal"
            }`}
          >
            {submissionResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-brand-error shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <span className="font-bold block">
                {submissionResult.success
                  ? `Submission Confirmed (Ref: ${submissionResult.referenceNumber})`
                  : "Submission Unsuccessful"}
              </span>
              <p className="text-xs text-brand-charcoal/80">
                {submissionResult.message}
              </p>
            </div>
          </div>
        )}

        {/* 1. General Enquiry Form */}
        {activeTab === "general" && (
          <form onSubmit={handleGeneralSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={generalForm.name}
                  onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                  placeholder="e.g. Eng. Samuel Tesfaye"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={generalForm.email}
                  onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                  placeholder="s.tesfaye@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Telephone / Mobile *
                </label>
                <input
                  type="tel"
                  required
                  value={generalForm.phone}
                  onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                  placeholder="+251 91 ..."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={generalForm.company}
                  onChange={(e) => setGeneralForm({ ...generalForm, company: e.target.value })}
                  placeholder="Company Name"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Project Discipline
                </label>
                <select
                  value={generalForm.category}
                  onChange={(e) => setGeneralForm({ ...generalForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-white"
                >
                  <option value="Commercial">Commercial Development</option>
                  <option value="Residential">Residential High-Rise / Villas</option>
                  <option value="Industrial">Industrial Plant / Logistics Hub</option>
                  <option value="Infrastructure">Civil Infrastructure / Roadways</option>
                  <option value="Consultancy">Project Management & Consultancy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Project Location
                </label>
                <input
                  type="text"
                  value={generalForm.location}
                  onChange={(e) => setGeneralForm({ ...generalForm, location: e.target.value })}
                  placeholder="e.g. Addis Ababa, Bole"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                Enquiry Details & Description *
              </label>
              <textarea
                required
                rows={4}
                value={generalForm.description}
                onChange={(e) => setGeneralForm({ ...generalForm, description: e.target.value })}
                placeholder="Please outline your proposed development, site status, or engineering questions..."
                className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-slate text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-wide shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{submitting ? "Transmitting..." : "Send Corporate Enquiry"}</span>
              <Send className="w-4 h-4 text-brand-gold" />
            </button>
          </form>
        )}

        {/* 2. Request for Quotation (RFQ) Form */}
        {activeTab === "rfq" && (
          <form onSubmit={handleRfqSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={rfqForm.name}
                  onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={rfqForm.email}
                  onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Telephone *
                </label>
                <input
                  type="tel"
                  required
                  value={rfqForm.phone}
                  onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                  placeholder="+251 ..."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={rfqForm.projectTitle}
                  onChange={(e) => setRfqForm({ ...rfqForm, projectTitle: e.target.value })}
                  placeholder="e.g. 18-Storey Office Complex"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Discipline Category *
                </label>
                <select
                  value={rfqForm.category}
                  onChange={(e) => setRfqForm({ ...rfqForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-white"
                >
                  <option value="Commercial">Commercial Building</option>
                  <option value="Residential">Residential Tower / Estate</option>
                  <option value="Industrial">Industrial & Logistics</option>
                  <option value="Infrastructure">Civil Infrastructure & Roadways</option>
                  <option value="Structural Design">Structural & Civil Engineering Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Site Location *
                </label>
                <input
                  type="text"
                  required
                  value={rfqForm.location}
                  onChange={(e) => setRfqForm({ ...rfqForm, location: e.target.value })}
                  placeholder="City, District, Parcel ID"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Target Commencement Date
                </label>
                <input
                  type="date"
                  value={rfqForm.expectedCommenceDate}
                  onChange={(e) => setRfqForm({ ...rfqForm, expectedCommenceDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Estimated Budget (Optional)
                </label>
                <input
                  type="text"
                  value={rfqForm.estimatedBudget}
                  onChange={(e) => setRfqForm({ ...rfqForm, estimatedBudget: e.target.value })}
                  placeholder="e.g. $5M – $10M or in ETB"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                Detailed Scope of Work & BOQ Overview *
              </label>
              <textarea
                required
                rows={4}
                value={rfqForm.scopeOfWork}
                onChange={(e) => setRfqForm({ ...rfqForm, scopeOfWork: e.target.value })}
                placeholder="Describe project footprint (sq meters), number of levels, geotechnical conditions, structural requirements, or special specifications..."
                className="w-full px-3.5 py-2.5 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            {/* Simulated Document Upload Note */}
            <div className="p-4 bg-brand-ivory rounded-sm border border-brand-border flex items-start space-x-3 text-xs text-brand-charcoal">
              <Upload className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-navy block">Architectural Drawings & Tender Documents</span>
                <span>
                  You may also email complete CAD / BIM models or confidential BOQs directly to <strong>estimating@oaksafricagroup.com</strong> referencing your generated submission number.
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-wide shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{submitting ? "Processing RFQ..." : "Submit Request for Quotation"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
