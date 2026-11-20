"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Layers, ShieldCheck, CheckCircle2, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ConstructionStageData {
  id: number;
  stageNumber: string;
  phaseLabel: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  altText: string;
}

export const CONSTRUCTION_STAGES: ConstructionStageData[] = [
  {
    id: 1,
    stageNumber: "01",
    phaseLabel: "VISION",
    tagline: "STAGE 01 — VISION",
    title: "Every great project begins with a vision.",
    description: "Transforming ideas into opportunities through thoughtful planning and engineering.",
    image: "/images/hero/stage_01_vision.jpg",
    altText: "Stage 01: Raw surveyed development site ready for master planning",
  },
  {
    id: 2,
    stageNumber: "02",
    phaseLabel: "FOUNDATION",
    tagline: "STAGE 02 — FOUNDATION",
    title: "Built on precision. Grounded in excellence.",
    description: "Establishing the strength and stability behind every development.",
    image: "/images/hero/stage_02_foundation.jpg",
    altText: "Stage 02: Deep excavation and reinforced foundation groundwork",
  },
  {
    id: 3,
    stageNumber: "03",
    phaseLabel: "STRUCTURE",
    tagline: "STAGE 03 — STRUCTURE",
    title: "Engineering strength into every structure.",
    description: "Combining technical expertise, precision and quality construction.",
    image: "/images/hero/stage_03_structure.jpg",
    altText: "Stage 03: Concrete columns and multi-tier structural skeleton",
  },
  {
    id: 4,
    stageNumber: "04",
    phaseLabel: "FINISHING",
    tagline: "STAGE 04 — FINISHING",
    title: "Every detail matters. Every standard counts.",
    description: "Bringing architectural vision to life through careful execution.",
    image: "/images/hero/stage_04_finishing.jpg",
    altText: "Stage 04: Modern architectural facade and curtain wall installation",
  },
  {
    id: 5,
    stageNumber: "05",
    phaseLabel: "COMPLETION",
    tagline: "STAGE 05 — COMPLETION",
    title: "From vision to reality. Built to last.",
    description: "Delivering spaces and infrastructure designed to make a lasting impact.",
    image: "/images/hero/stage_05_completion.jpg",
    altText: "Stage 05: Completed modern corporate architectural development",
  },
];

export function ConstructionJourneyHero() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;

    // Register GSAP plugins safely on client
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const stageElements = gsap.utils.toArray<HTMLElement>(".stage-layer");
      const textElements = gsap.utils.toArray<HTMLElement>(".stage-text-block");
      const totalStages = stageElements.length;

      // Master scroll-driven timeline using pure CSS sticky for pinning
      // and GSAP ScrollTrigger purely for scroll interpolation (ZERO DOM reparenting)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            const stageIndex = Math.min(
              totalStages - 1,
              Math.floor(self.progress * totalStages)
            );
            setActiveStage(stageIndex);
          },
        },
      });

      // Initially set up first stage active, others transparent
      stageElements.forEach((el, index) => {
        gsap.set(el, { opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 1.05 });
      });

      textElements.forEach((el, index) => {
        gsap.set(el, {
          opacity: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 30,
          pointerEvents: index === 0 ? "auto" : "none",
        });
      });

      // Animate transitions sequentially across scroll intervals
      for (let i = 0; i < totalStages - 1; i++) {
        const nextIdx = i + 1;

        // Crossfade image layers with subtle scale
        tl.to(
          stageElements[i],
          {
            opacity: 0,
            scale: 1.04,
            duration: 1,
            ease: "power2.inOut",
          },
          `stage-${i}`
        );

        tl.to(
          stageElements[nextIdx],
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          `stage-${i}`
        );

        // Crossfade text narratives
        tl.to(
          textElements[i],
          {
            opacity: 0,
            y: -25,
            duration: 0.6,
            ease: "power2.in",
            pointerEvents: "none",
          },
          `stage-${i}`
        );

        tl.fromTo(
          textElements[nextIdx],
          { opacity: 0, y: 30, pointerEvents: "none" },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            pointerEvents: "auto",
          },
          `stage-${i}+=0.3`
        );
      }
    }, wrapper);

    return () => {
      ctx.revert(); // GSAP context cleanup
    };
  }, [isMounted, prefersReducedMotion]);

  // Reduced motion alternative: Interactive tabbed view
  if (isMounted && prefersReducedMotion) {
    return (
      <section className="relative min-h-[90vh] bg-brand-navy flex flex-col justify-center px-4 py-20 text-white">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">
              {CONSTRUCTION_STAGES[activeStage].tagline}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {CONSTRUCTION_STAGES[activeStage].title}
            </h1>
            <p className="text-brand-ivory/80 text-lg leading-relaxed">
              {CONSTRUCTION_STAGES[activeStage].description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/projects"
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-6 py-3 rounded-sm font-semibold text-sm transition-all"
              >
                Explore Our Projects
              </Link>
              <Link
                href="/contact?tab=rfq"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-sm font-semibold text-sm transition-all"
              >
                Request a Consultation
              </Link>
            </div>
            {/* Step Selector for Accessible Mode */}
            <div className="flex flex-wrap gap-2 pt-6">
              {CONSTRUCTION_STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(idx)}
                  className={`px-3 py-1.5 text-xs font-mono rounded ${
                    activeStage === idx
                      ? "bg-brand-gold text-brand-navy font-bold"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {s.stageNumber} {s.phaseLabel}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-[480px] rounded-lg overflow-hidden border border-white/10">
            <Image
              src={CONSTRUCTION_STAGES[activeStage].image}
              alt={CONSTRUCTION_STAGES[activeStage].altText}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  const totalStages = CONSTRUCTION_STAGES.length;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${totalStages * 100}vh` }}
    >
      {/* Sticky Viewport: Natively pinned at top: 0 while scrolling through 500vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-brand-navy select-none">
        {/* 5 Layered Full-bleed Background Images */}
        <div className="absolute inset-0 w-full h-full">
          {CONSTRUCTION_STAGES.map((stage, index) => (
            <div
              key={stage.id}
              className="stage-layer absolute inset-0 w-full h-full will-change-transform"
            >
              <Image
                src={stage.image}
                alt={stage.altText}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={index === 0}
              />
              {/* Architectural Dark Gradient Overlay for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/50" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-navy/20 to-brand-navy/60" />
            </div>
          ))}
        </div>

        {/* Hero Narrative Overlay & Storytelling Content */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-12 sm:py-16">
          {/* Top Badges: Brand Standard */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 bg-brand-navy/70 backdrop-blur-md border border-brand-gold/30 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-brand-gold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CERTIFIED ENGINEERING & GENERAL CONTRACTING</span>
            </div>
            <div className="hidden md:flex items-center space-x-3 text-xs text-white/70 font-mono">
              <span>SCROLL PROGRESSION</span>
              <span className="text-brand-gold font-bold">
                {CONSTRUCTION_STAGES[activeStage].stageNumber} / 05
              </span>
            </div>
          </div>

          {/* Center: Stage Content Animations with absolute overlay */}
          <div className="relative max-w-2xl my-auto min-h-[380px] sm:min-h-[320px]">
            {CONSTRUCTION_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="stage-text-block absolute inset-0 space-y-4 sm:space-y-6"
              >
                {/* Stage Subtitle / Tagline */}
                <div className="inline-block">
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-brand-gold uppercase bg-brand-gold/10 px-3 py-1 rounded-sm border border-brand-gold/25">
                    {stage.tagline}
                  </span>
                </div>

                {/* Main Stage Headline */}
                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-md">
                  {stage.title}
                </h1>

                {/* Supporting Text */}
                <p className="text-brand-ivory/85 text-base sm:text-lg sm:leading-relaxed font-normal max-w-xl">
                  {stage.description}
                </p>

                {/* Calls to Action */}
                <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/projects"
                    className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-navy px-6 py-3.5 rounded-sm font-semibold text-sm tracking-wide shadow-xl transition-all duration-200 hover:shadow-2xl active:scale-95 group"
                  >
                    <span>Explore Our Projects</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact?tab=rfq"
                    className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/25 hover:border-brand-gold px-6 py-3.5 rounded-sm font-medium text-sm transition-all"
                  >
                    <span>Request a Consultation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section: Construction Stage Progress Indicator */}
          <div className="pt-6 border-t border-white/15">
            {/* Desktop Timeline Stepper */}
            <div className="hidden md:grid grid-cols-5 gap-3">
              {CONSTRUCTION_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isPast = activeStage > idx;
                return (
                  <div
                    key={stage.id}
                    className={`group cursor-default transition-all duration-300 p-2.5 rounded-sm border ${
                      isActive
                        ? "bg-brand-slate/90 border-brand-gold shadow-lg"
                        : isPast
                        ? "bg-brand-navy/60 border-white/20"
                        : "bg-brand-navy/40 border-white/10 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? "text-brand-gold" : isPast ? "text-white" : "text-white/50"
                        }`}
                      >
                        {stage.stageNumber}
                      </span>
                      {isPast ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                      ) : (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive ? "bg-brand-gold animate-ping" : "bg-white/20"
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={`text-xs font-heading font-semibold uppercase tracking-wider ${
                        isActive ? "text-white" : "text-white/60"
                      }`}
                    >
                      {stage.phaseLabel}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Compact Progress Bar */}
            <div className="md:hidden flex items-center justify-between space-x-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-brand-gold">
                <span className="font-bold">{CONSTRUCTION_STAGES[activeStage].stageNumber}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/70">{CONSTRUCTION_STAGES[activeStage].phaseLabel}</span>
              </div>
              {/* Visual Step Bar */}
              <div className="flex-1 flex items-center space-x-1.5 max-w-[180px]">
                {CONSTRUCTION_STAGES.map((s, i) => (
                  <div
                    key={s.id}
                    className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                      i <= activeStage ? "bg-brand-gold" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-1 text-[11px] text-white/50 font-mono">
                <span>Scroll</span>
                <ChevronDown className="w-3 h-3 animate-bounce text-brand-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
