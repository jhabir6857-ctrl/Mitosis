"use client";

import { useEffect, useRef, useState } from "react";
import { HeartPulse, Award, FlaskConical, ShieldCheck } from "lucide-react";

const stats = [
  { icon: HeartPulse, value: 50000, suffix: "+", label: "Happy Patients", color: "#10b981" },
  { icon: Award, value: 15, suffix: "+", label: "Years of Excellence", color: "#10b981" },
  { icon: FlaskConical, value: 200, suffix: "+", label: "Diagnostic Tests", color: "#10b981" },
  { icon: ShieldCheck, value: 24, suffix: "/7", label: "Emergency Service", color: "#10b981" },
];

export default function ParallaxStats() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState([50000, 15, 200, 24]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hydration fix: ensure component is mounted before running IntersectionObserver
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile detection
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection observer for count-up animation
  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          stats.forEach((stat, i) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                setCounts((prev) => {
                  const n = [...prev];
                  n[i] = stat.value;
                  return n;
                });
                clearInterval(timer);
              } else {
                setCounts((prev) => {
                  const n = [...prev];
                  n[i] = Math.floor(current);
                  return n;
                });
              }
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, mounted]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80')",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        WebkitBackgroundAttachment: isMobile ? "scroll" : "fixed",
        imageRendering: "auto",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        padding: "5rem 0",
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitTransform: "translateZ(0)",
      }}
    >
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(15px); }
          60% { opacity: 1; transform: translateY(-3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(10,30,61,0.92) 0%, rgba(10,30,61,0.75) 50%, rgba(0,100,60,0.65) 100%)",
          zIndex: 0,
        }}
      />

      {/* Subtle grid texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          zIndex: 1,
        }}
      />

      {/* Content container */}
      <div className="container" style={{ position: "relative", zIndex: 2, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", perspective: 1000 }}>
        {/* Section title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-brand-green)",
            }}
          >
            Trusted by Thousands
          </span>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 800,
              color: "white",
              marginTop: "0.5rem",
              fontFamily: "var(--font-heading)",
            }}
          >
            Precision You Can Count On
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                {/* Stat Card */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0",
                  position: "relative",
                  zIndex: 2,
                  width: "100%",
                }}>
                  {/* Icon circle — fully isolated, no animation at all */}
                  <div style={{
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "50%",
                    background: `${stat.color}25`,
                    border: `2px solid ${stat.color}60`,
                    boxShadow: `0 0 30px ${stat.color}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    marginBottom: "1rem",
                    flexShrink: 0,
                    animation: "none",
                    transform: "none",
                    willChange: "auto",
                  }}>
                    <IconComponent size={28} />
                  </div>

                  {/* ANIMATED ROW — only number animates */}
                  <div style={{
                    display: "inline-block",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 900,
                    color: "white",
                    fontFamily: "var(--font-heading)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    animationName: mounted && hasAnimated ? "popIn" : "none",
                    animationDuration: "400ms",
                    animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: "both",
                  }}>
                    {mounted ? counts[index].toLocaleString() : stat.value.toLocaleString()}{stat.suffix}
                  </div>

                  {/* Colored line — static */}
                  <div style={{
                    width: "2rem",
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                    borderRadius: "1px",
                    margin: "0.5rem 0",
                    animation: "none",
                  }} />

                  {/* Label — static */}
                  <div style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    textAlign: "center",
                    animation: "none",
                  }}>
                    {stat.label}
                  </div>
                </div>

                {/* Vertical divider (hidden on mobile, not shown after last item) */}
                {index < stats.length - 1 && (
                  <div
                    className="hidden md:block"
                    style={{
                      width: "1px",
                      height: "80px",
                      background: "rgba(255,255,255,0.12)",
                      alignSelf: "center",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
