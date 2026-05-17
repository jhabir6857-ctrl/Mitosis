"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Star, Calendar, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { mockDoctors } from "@/app/api/mock/doctors/route";

// Duplicate cards for seamless infinite loop
const DOCTORS = [...mockDoctors, ...mockDoctors];
const CARD_WIDTH = 280;
const CARD_GAP = 20;
const CARD_TOTAL = CARD_WIDTH + CARD_GAP;
const AUTO_SPEED = 0.6; // px per frame

export default function DoctorSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const animRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect prefers-reduced-motion on mount — permanently disable auto-scroll
  // for users with vestibular disorders (Animation Rule 3)
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion.current) isPausedRef.current = true;
    }
  }, []);

  // Auto-scroll animation loop
  useEffect(() => {
    const totalWidth = mockDoctors.length * CARD_TOTAL;

    const animate = () => {
      if (!isPausedRef.current && trackRef.current) {
        posRef.current += AUTO_SPEED;
        // Seamless loop: reset when first set is fully scrolled
        if (posRef.current >= totalWidth) {
          posRef.current = 0;
        }
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
        setActiveIndex(Math.round(posRef.current / CARD_TOTAL) % mockDoctors.length);
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    const totalWidth = mockDoctors.length * CARD_TOTAL;
    if (direction === "right") {
      posRef.current = Math.min(posRef.current + CARD_TOTAL, totalWidth - 1);
    } else {
      posRef.current = Math.max(posRef.current - CARD_TOTAL, 0);
    }
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 400ms cubic-bezier(0.4,0,0.2,1)";
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = "";
      }, 420);
    }
    setActiveIndex(Math.round(posRef.current / CARD_TOTAL) % mockDoctors.length);
  };

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>Our Specialists</div>
          <h2 className="section-title" style={{ marginBottom: "0.25rem" }}>Meet Our Doctors</h2>
          <p style={{ color: "var(--color-text-secondary)" }}>Experienced, caring specialists ready for your consultation.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => scrollBy("left")}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => (isPausedRef.current = false)}
            aria-label="Scroll left"
            style={{ width: "44px", height: "44px", borderRadius: "50%", border: "2px solid var(--color-surface-muted)", background: "var(--color-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 200ms", minHeight: "unset" }}
            onFocus={() => (isPausedRef.current = true)}
            onBlur={() => (isPausedRef.current = false)}
          >
            <ArrowLeft size={18} color="var(--color-primary)" />
          </button>
          <button
            onClick={() => scrollBy("right")}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => (isPausedRef.current = false)}
            aria-label="Scroll right"
            style={{ width: "44px", height: "44px", borderRadius: "50%", border: "2px solid var(--color-primary)", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 200ms", minHeight: "unset" }}
          >
            <ArrowRight size={18} color="white" />
          </button>
          <Link href="/doctors" className="btn-secondary" style={{ fontSize: "0.875rem" }}>
            View All <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Slider Viewport */}
      <div
        style={{ overflow: "hidden", position: "relative" }}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
      >
        {/* Fade edges */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "80px", height: "100%", background: "linear-gradient(to right, var(--color-surface-alt), transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "100%", background: "linear-gradient(to left, var(--color-surface-alt), transparent)", zIndex: 2, pointerEvents: "none" }} />

        {/* Sliding Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            willChange: "transform",
            paddingBottom: "1rem",
          }}
        >
          {DOCTORS.map((doc, idx) => (
            <div
              key={`${doc.id}-${idx}`}
              className="card"
              style={{
                width: `${CARD_WIDTH}px`,
                flexShrink: 0,
                padding: "1.5rem",
                cursor: "pointer",
                border: activeIndex === idx % mockDoctors.length ? "2px solid var(--color-primary)" : "1px solid var(--color-surface-border)",
                transition: "border-color 300ms",
              }}
            >
              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-xl)", background: "linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", flexShrink: 0 }}>
                  👨‍⚕️
                </div>
                <div>
                  {doc.isAvailableToday && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.2rem" }}>
                      <span className="status-dot" style={{ width: "7px", height: "7px" }} />
                      <span style={{ fontSize: "0.7rem", color: "var(--color-secondary-dark)", fontWeight: 600 }}>Available Today</span>
                    </div>
                  )}
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
                    {doc.name}
                  </h3>
                </div>
              </div>

              {/* Qualifications */}
              <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", marginBottom: "0.625rem", lineHeight: 1.4 }}>
                {doc.qualifications}
              </p>

              {/* Department Badge */}
              <div className="badge badge-primary" style={{ fontSize: "0.72rem", marginBottom: "1rem" }}>
                {doc.department}
              </div>

              {/* Stats Row */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", padding: "0.75rem", background: "var(--color-surface-alt)", borderRadius: "var(--radius-lg)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", justifyContent: "center" }}>
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{doc.rating}</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: "0.1rem" }}>Rating</div>
                </div>
                <div style={{ width: "1px", background: "var(--color-surface-border)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", justifyContent: "center" }}>
                    <Calendar size={12} color="var(--color-primary)" />
                    <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{doc.experience}</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: "0.1rem" }}>Yrs Exp</div>
                </div>
                <div style={{ width: "1px", background: "var(--color-surface-border)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", justifyContent: "center" }}>
                    <Users size={12} color="var(--color-secondary)" />
                    <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{(doc.totalPatients / 1000).toFixed(1)}k</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: "0.1rem" }}>Patients</div>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/appointment?doctor=${doc.id}`}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "0.65rem 1rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Calendar size={14} /> Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
        {mockDoctors.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              posRef.current = i * CARD_TOTAL;
              if (trackRef.current) {
                trackRef.current.style.transition = "transform 400ms cubic-bezier(0.4,0,0.2,1)";
                trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
                setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ""; }, 420);
              }
              setActiveIndex(i);
            }}
            style={{
              width: activeIndex === i ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: activeIndex === i ? "var(--color-primary)" : "var(--color-surface-muted)",
              border: "none",
              cursor: "pointer",
              transition: "all 300ms cubic-bezier(0.34,1.56,0.64,1)",
              padding: 0,
              minHeight: "unset",
            }}
            aria-label={`Go to doctor ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
