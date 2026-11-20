import React from "react";
import { 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  HardHat, 
  Users2, 
  Leaf, 
  CheckCircle2, 
  Award,
  Layers
} from "lucide-react";

export const PILLARS = [
  {
    icon: Cpu,
    title: "Advanced Technical Competence",
    description: "Multidisciplinary structural and civil calculations modeled through finite element software, geotechnical borehole data, and comprehensive load-case simulations.",
    badge: "Engineering Standard",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance & Material Testing",
    description: "Batch-by-batch concrete slump and compressive testing, ultrasonic steel weld inspection, and strict conformity to Eurocode and ASTM structural standards.",
    badge: "Zero Compromise",
  },
  {
    icon: Workflow,
    title: "Rigorous Project Governance",
    description: "Critical Path Method (CPM) scheduling, transparent procurement audits, and proactive risk mitigation to ensure on-time, on-budget project delivery.",
    badge: "Lifecycle Control",
  },
  {
    icon: HardHat,
    title: "Zero-Harm Health, Safety & Environment",
    description: "Comprehensive site safety plans, daily toolbox talks, mandatory PPE compliance, and active hazard monitoring protecting workers and the surrounding public.",
    badge: "HSE Protocol",
  },
  {
    icon: Users2,
    title: "Collaborative Value Engineering",
    description: "Working side-by-side with clients, investors, and municipal authorities to optimize material specifications and lower total cost of ownership without sacrificing structural design.",
    badge: "Client Centric",
  },
  {
    icon: Leaf,
    title: "Sustainable & Resilient Design",
    description: "Integration of passive solar ventilation, energy-efficient building skins, rainwater retention systems, and locally sourced aggregates to minimize carbon footprint.",
    badge: "Eco-Conscious",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-ivory text-brand-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-brand-gold uppercase">
            <span className="w-6 h-px bg-brand-gold"></span>
            <span>WHY OAKS AFRICA GROUP</span>
            <span className="w-6 h-px bg-brand-gold"></span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
            Engineered For Reliability. <br />
            Built On Uncompromising Standards.
          </h2>

          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            Our corporate reputation is forged on technical rigor, ethical delivery, and consistent engineering excellence across high-stakes commercial, residential, and infrastructure projects.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white p-8 rounded-sm border border-brand-border hover:border-brand-gold/60 transition-all duration-300 hover:shadow-architectural-lg group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-sm bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-brand-muted bg-brand-ivory px-2.5 py-1 rounded-sm border border-brand-border">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-border mt-6 flex items-center space-x-2 text-xs font-semibold text-brand-gold">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Verified Standard Operating Procedure</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
