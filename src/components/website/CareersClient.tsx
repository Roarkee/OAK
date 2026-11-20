"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Upload, 
  AlertCircle,
  ShieldCheck,
  GraduationCap,
  Sparkles
} from "lucide-react";

export interface VacancyItem {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export function CareersClient({ vacancies }: { vacancies: VacancyItem[] }) {
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyItem | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeFileName: "Curriculum-Vitae.pdf",
    resumeUrl: "/uploads/resumes/sample-cv.pdf",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleApply = (vacancy: VacancyItem) => {
    setSelectedVacancy(vacancy);
    setIsApplying(true);
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy) return;
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vacancyId: selectedVacancy.id,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          coverLetter: form.coverLetter,
          resumeFileName: form.resumeFileName,
          resumeUrl: form.resumeUrl,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult({ success: true, message: data.message });
        setForm({
          fullName: "",
          email: "",
          phone: "",
          coverLetter: "",
          resumeFileName: "Curriculum-Vitae.pdf",
          resumeUrl: "/uploads/resumes/sample-cv.pdf",
        });
      } else {
        setResult({ success: false, message: data.message || "Failed to submit application." });
      }
    } catch (err) {
      setResult({ success: false, message: "Network error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-20">
      {/* 1. Culture & Working at OAKS Africa Group */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-sm border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-sm bg-brand-gold/10 text-brand-gold flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-brand-navy">
            Technical Precision & Rigor
          </h3>
          <p className="text-sm text-brand-charcoal/80 leading-relaxed">
            Collaborate with licensed structural engineers and architectural innovators executing landmark structures under international Eurocode standards.
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-sm bg-brand-gold/10 text-brand-gold flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-brand-navy">
            Professional Development
          </h3>
          <p className="text-sm text-brand-charcoal/80 leading-relaxed">
            Continuous technical training in advanced finite element modeling (ETABS), BIM Revit, NEC/FIDIC contract management, and NEBOSH safety governance.
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-brand-border space-y-4">
          <div className="w-12 h-12 rounded-sm bg-brand-gold/10 text-brand-gold flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-brand-navy">
            Transformative Legacy
          </h3>
          <p className="text-sm text-brand-charcoal/80 leading-relaxed">
            Contribute to critical civic and commercial developments that elevate cities, create local employment, and foster sustainable economic resilience.
          </p>
        </div>
      </div>

      {/* 2. Open Vacancies Section */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold">
              OPPORTUNITIES
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-navy">
              Current Open Vacancies
            </h2>
          </div>
          <span className="text-xs font-mono text-brand-muted">
            {vacancies.length} Active Positions
          </span>
        </div>

        {vacancies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-sm border border-brand-border p-8 text-brand-muted">
            No vacancies are currently active. Please check back soon or submit a general CV to careers@oaksafricagroup.com.
          </div>
        ) : (
          <div className="space-y-6">
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="bg-white p-8 rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all shadow-sm space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-gold">
                      {vacancy.department}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-brand-navy">
                      {vacancy.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-muted pt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{vacancy.location}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{vacancy.employmentType}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApply(vacancy)}
                    className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-6 py-3 rounded-sm font-semibold text-xs uppercase tracking-wider shadow transition-all active:scale-95 shrink-0"
                  >
                    <span>Apply For Position</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                  {vacancy.description}
                </p>

                {/* Responsibilities & Requirements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-border text-xs">
                  <div>
                    <h4 className="font-mono font-bold uppercase tracking-wider text-brand-navy mb-2.5">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-1.5 text-brand-charcoal/80">
                      {vacancy.responsibilities.map((r, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono font-bold uppercase tracking-wider text-brand-navy mb-2.5">
                      Qualifications & Requirements:
                    </h4>
                    <ul className="space-y-1.5 text-brand-charcoal/80">
                      {vacancy.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Application Modal */}
      {isApplying && selectedVacancy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-sm border border-brand-border shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6 relative animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-brand-border">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-gold">
                  POSITION APPLICATION
                </span>
                <h3 className="font-heading text-xl font-bold text-brand-navy">
                  {selectedVacancy.title}
                </h3>
                <span className="text-xs text-brand-muted">
                  {selectedVacancy.department} • {selectedVacancy.location}
                </span>
              </div>
              <button
                onClick={() => setIsApplying(false)}
                className="p-1 text-brand-muted hover:text-brand-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {result && (
              <div
                className={`p-4 rounded-sm border flex items-start space-x-3 text-sm ${
                  result.success
                    ? "bg-brand-success/10 border-brand-success/30 text-brand-navy"
                    : "bg-brand-error/10 border-brand-error/30 text-brand-charcoal"
                }`}
              >
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-brand-error shrink-0" />
                )}
                <span>{result.message}</span>
              </div>
            )}

            {!result?.success ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Bethelhem Alemu"
                    className="w-full px-3.5 py-2 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="b.alemu@domain.com"
                      className="w-full px-3.5 py-2 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+251 ..."
                      className="w-full px-3.5 py-2 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1">
                    Curriculum Vitae / Resume File *
                  </label>
                  <div className="p-3 bg-brand-ivory rounded-sm border border-brand-border flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4 text-brand-gold" />
                      <span className="font-semibold text-brand-navy">{form.resumeFileName}</span>
                    </div>
                    <span className="text-brand-muted text-[11px]">(PDF, DOCX max 10MB)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-brand-navy mb-1">
                    Cover Letter / Statement of Suitability
                  </label>
                  <textarea
                    rows={4}
                    value={form.coverLetter}
                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                    placeholder="Briefly explain your structural/engineering experience and relevant credentials..."
                    className="w-full px-3.5 py-2 rounded-sm border border-brand-border text-sm focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="px-5 py-2.5 rounded-sm border border-brand-border text-xs font-semibold uppercase text-brand-muted hover:text-brand-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-brand-navy hover:bg-brand-slate text-white px-6 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider shadow disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Candidacy"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setIsApplying(false)}
                  className="bg-brand-navy text-white px-6 py-2.5 rounded-sm text-xs font-semibold uppercase"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
