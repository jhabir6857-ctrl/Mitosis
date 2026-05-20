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
    <section
      className="hs-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image slider"
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
      <div className="hs-overlay" />

      {/* ── Text content ───────────────────────────────────── */}
      <div className="hs-content container" key={`text-${current}`}>
        <span className="hs-badge">{SLIDES[current].badge}</span>
        <h1 className="hs-headline">
          {SLIDES[current].heading[0]}
          <span className="hs-headline--accent">
            <br />{SLIDES[current].heading[1]}
          </span>
        </h1>
        <p className="hs-sub">{SLIDES[current].sub}</p>
      </div>

      {/* ── Dot navigation ─────────────────────────────────── */}
      <div className="hs-dots" role="tablist" aria-label="Slide navigation">
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
      <div className="hs-progress" aria-hidden="true">
        <div
          key={`prog-${current}`}
          className={`hs-progress-bar ${paused ? "is-paused" : ""}`}
          style={{ animationDuration: `${INTERVAL_MS}ms` }}
        />
      </div>
    </section>
  );
}
