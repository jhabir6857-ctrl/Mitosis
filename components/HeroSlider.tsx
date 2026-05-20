"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Slide data ──────────────────────────────────────────────────────────────
const SLIDES = [
  {
    src:     "/slide-1.webp",
    alt:     "State-of-the-art ICU monitoring at Mitosis Lab Ltd",
    badge:   "Critical Care",
    heading: ["24/7 Emergency", "Diagnostics"],
    sub:     "Round-the-clock critical care monitoring with the most advanced equipment in Dhaka.",
  },
  {
    src:     "/slide-2.webp",
    alt:     "Precision blood sample analysis at Mitosis Lab Ltd",
    badge:   "ISO Certified Lab",
    heading: ["Precision", "Diagnostics"],
    sub:     "ISO-certified laboratory processing 200+ tests with same-day results.",
  },
  {
    src:     "/slide-3.webp",
    alt:     "Expert pathology microscopy at Mitosis Lab Ltd",
    badge:   "Specialist Pathology",
    heading: ["Expert", "Pathology"],
    sub:     "Our specialist pathologists examine every sample personally for the right answer.",
  },
];

const INTERVAL_MS = 5000;
const FADE_MS     = 900;

// ────────────────────────────────────────────────────────────────────────────
export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev,    setPrev]    = useState<number | null>(null);
  const [fading,  setFading]  = useState(false);
  const [paused,  setPaused]  = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (target: number) => {
      if (fading || target === current) return;
      setPrev(current);
      setCurrent(target);
      setFading(true);
      setTimeout(() => {
        setPrev(null);
        setFading(false);
      }, FADE_MS);
    },
    [fading, current],
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => goTo((current + 1) % SLIDES.length), INTERVAL_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, paused, goTo]);

  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes overlayPulse {
          from { opacity: 0.8; }
          to { opacity: 1; }
        }
        @keyframes slideProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      <section
        className="hs-section"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Hero image slider"
        style={{ position: "relative" }}
      >
      {/* ── Previous slide (fades out) ─────────────────────── */}
      {prev !== null && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`prev-${prev}`}
          src={SLIDES[prev].src}
          alt=""
          aria-hidden="true"
          className="hs-bg hs-bg--out"
        />
      )}

      {/* ── Current slide (fades in) ───────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={`cur-${current}`}
        src={SLIDES[current].src}
        alt={SLIDES[current].alt}
        className={`hs-bg hs-bg--in ${fading ? "is-fading" : "is-visible"}`}
      />

      {/* ── Gradient overlay ───────────────────────────────── */}
      <div 
        className="hs-overlay" 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, rgba(10,30,61,0.92) 0%, rgba(10,30,61,0.75) 40%, rgba(10,30,61,0.20) 70%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* ── Animated secondary overlay ─────────────────────– */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,30,61,0.4) 0%, transparent 40%, rgba(10,30,61,0.6) 100%)",
          zIndex: 3,
          animation: "overlayPulse 4s ease-in-out infinite alternate",
        }}
      />

      {/* ── Text content ───────────────────────────────────── */}
      <div className="hs-content container" key={`text-${current}`} style={{ position: "relative", zIndex: 4 }}>
        <span 
          className="hs-badge"
          style={{ animation: "heroFadeIn 600ms ease 200ms both" }}
        >
          {SLIDES[current].badge}
        </span>
        <h1 
          className="hs-headline"
          style={{ animation: "heroFadeUp 700ms ease 400ms both" }}
        >
          {SLIDES[current].heading[0]}
          <span 
            className="hs-headline--accent"
            style={{ 
              animation: "heroFadeUp 700ms ease 550ms both",
              textShadow: "0 0 40px rgba(0,200,100,0.4), 0 0 80px rgba(0,200,100,0.15)",
              display: "inline-block",
            }}
          >
            <br />{SLIDES[current].heading[1]}
          </span>
        </h1>
        <p 
          className="hs-sub"
          style={{ animation: "heroFadeUp 600ms ease 700ms both" }}
        >
          {SLIDES[current].sub}
        </p>
      </div>

      {/* ── Slide dots navigation ──────────────────────────── */}
      <div 
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
          zIndex: 10,
          animation: "heroFadeUp 600ms ease 850ms both",
        }}
        role="tablist" 
        aria-label="Slide navigation"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            id={`hs-dot-${i}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => { if (timer.current) clearTimeout(timer.current); goTo(i); }}
            style={{
              width: i === current ? "1.5rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "1rem",
              background: i === current ? "var(--color-brand-green)" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 400ms ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Dot navigation (legacy hs-dots for compatibility) ──────── */}
      <div className="hs-dots" role="tablist" aria-label="Slide navigation" style={{ display: "none" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            id={`hs-dot-${i}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`hs-dot ${i === current ? "is-active" : ""}`}
            onClick={() => { if (timer.current) clearTimeout(timer.current); goTo(i); }}
          />
        ))}
      </div>

      {/* ── Progress bar ───────────────────────────────────── */}
      <div 
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(255,255,255,0.15)",
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <div
          key={`prog-${current}`}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, var(--color-primary), var(--color-brand-green))",
            animation: paused ? "none" : `slideProgress ${INTERVAL_MS}ms linear forwards`,
            transformOrigin: "left",
          }}
        />
      </div>
      </section>
    </>
  );
}
