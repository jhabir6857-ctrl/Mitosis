"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FlaskConical, DollarSign, ClipboardList, X, ChevronRight, Sparkles } from "lucide-react";
import { useTestInfoStore, useSuggestedNext } from "./TestInfoStore";

const OPTIONS = [
  {
    key: "costs" as const,
    href: "/tests/costs",
    icon: <DollarSign size={26} />,
    label: "Test Costs",
    desc: "Browse our full price list for all departments.",
    color: "#006BB6",
    bg: "rgba(0,107,182,0.06)",
    border: "rgba(0,107,182,0.18)",
    activeBorder: "#006BB6",
  },
  {
    key: "preparation" as const,
    href: "/tests/preparation",
    icon: <ClipboardList size={26} />,
    label: "Test Preparation",
    desc: "Step-by-step guides on how to prepare for each test.",
    color: "#0d9488",
    bg: "rgba(13,148,136,0.06)",
    border: "rgba(13,148,136,0.18)",
    activeBorder: "#0d9488",
  },
];

export default function TestInfoFloatingTile() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { lastVisited } = useTestInfoStore();
  const suggestedNext = useSuggestedNext();

  // Delay mount animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Close on outside click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  // Page detection — on a tests page, only show the OTHER option
  const isOnCostsPage = pathname === "/tests/costs";
  const isOnPrepPage  = pathname === "/tests/preparation";
  const isOnTestsPage = isOnCostsPage || isOnPrepPage;

  // Filter to only show the complementary option when already on a tests page
  const visibleOptions = OPTIONS.filter(opt => {
    if (isOnCostsPage) return opt.key === "preparation";
    if (isOnPrepPage)  return opt.key === "costs";
    return true;
  });

  // Context-aware hint text inside the panel
  const hintText = isOnCostsPage
    ? "You're viewing Test Costs — check preparation guides too:"
    : isOnPrepPage
    ? "You're viewing Test Preparation — check pricing too:"
    : lastVisited
    ? suggestedNext === "preparation"
      ? "✨ Based on your last visit — try Test Preparation next"
      : "✨ Based on your last visit — try Test Costs next"
    : null;

  const navigate = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Backdrop when open */}
      {isOpen && (
        <div
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1997,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            animation: "testTileFadeIn 200ms ease",
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating Tile Anchor */}
      <div
        style={{
          position: "fixed",
          bottom: "1.75rem",
          left: "1.75rem",
          zIndex: 1998,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.75rem",
        }}
      >
        {/* Expanded Panel */}
        {isOpen && (
          <div
            ref={panelRef}
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1.25rem",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.9)",
              padding: "1.25rem",
              width: "min(320px, calc(100vw - 3.5rem))",
              animation: "testTileSlideUp 280ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "2rem", height: "2rem", borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, #006BB6, #0d9488)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FlaskConical size={14} color="white" />
                </div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: "var(--color-dark)" }}>
                  Test Information
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  width: "1.75rem", height: "1.75rem", borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#64748b", transition: "background 150ms",
                }}
                onMouseEnter={e => { (e.currentTarget).style.background = "rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { (e.currentTarget).style.background = "rgba(0,0,0,0.05)"; }}
              >
                <X size={13} />
              </button>
            </div>

            {/* Context hint */}
            {hintText && (
              <p style={{
                fontSize: "0.72rem", color: isOnTestsPage ? "#475569" : "#94a3b8",
                fontFamily: "var(--font-ui)", marginBottom: "0.75rem", fontWeight: 600,
                lineHeight: 1.5,
              }}>
                {hintText}
              </p>
            )}

            {/* Option Cards — only the relevant one(s) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {visibleOptions.map(opt => {
                const isRecommended = !isOnTestsPage && lastVisited !== null && opt.key === suggestedNext;
                return (
                  <button
                    key={opt.key}
                    onClick={() => navigate(opt.href)}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.85rem",
                      padding: "0.9rem 1rem",
                      background: (isRecommended || isOnTestsPage) ? opt.bg : "rgba(248,250,252,0.8)",
                      border: `1.5px solid ${(isRecommended || isOnTestsPage) ? opt.activeBorder : "#e2e8f0"}`,
                      borderRadius: "0.85rem",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      transition: "all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: (isRecommended || isOnTestsPage) ? `0 4px 16px ${opt.color}22` : "none",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px ${opt.color}25`;
                      (e.currentTarget as HTMLButtonElement).style.borderColor = opt.activeBorder;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = (isRecommended || isOnTestsPage) ? `0 4px 16px ${opt.color}22` : "none";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = (isRecommended || isOnTestsPage) ? opt.activeBorder : "#e2e8f0";
                    }}
                  >
                    <div style={{
                      width: "2.6rem", height: "2.6rem", borderRadius: "0.65rem", flexShrink: 0,
                      background: `${opt.color}16`,
                      border: `1.5px solid ${opt.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: opt.color,
                    }}>
                      {opt.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                        <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.88rem", color: "var(--color-dark)" }}>
                          {opt.label}
                        </span>
                        {isRecommended && (
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: "0.2rem",
                            fontSize: "0.6rem", fontWeight: 700, color: opt.color,
                            background: `${opt.color}15`, padding: "0.1rem 0.4rem",
                            borderRadius: "2rem", letterSpacing: "0.04em",
                          }}>
                            <Sparkles size={8} /> TRY NEXT
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                        {opt.desc}
                      </p>
                    </div>
                    <ChevronRight size={16} color={opt.color} style={{ flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* The floating pill button */}
        <button
          onClick={() => setIsOpen(o => !o)}
          aria-label="Test Information"
          aria-expanded={isOpen}
          style={{
            display: "flex",
            alignItems: "center",
            gap: isOpen ? "0rem" : "0.5rem",
            padding: isOpen ? "0.85rem" : "0.75rem 1.1rem",
            background: isOpen
              ? "linear-gradient(135deg, #006BB6, #0d9488)"
              : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: isOpen ? "none" : "1.5px solid rgba(0,107,182,0.25)",
            borderRadius: "2rem",
            boxShadow: isOpen
              ? "0 8px 32px rgba(0,107,182,0.35)"
              : "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
            cursor: "pointer",
            color: isOpen ? "white" : "#006BB6",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: "0.85rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => {
            if (!isOpen) {
              (e.currentTarget).style.transform = "translateY(-2px) scale(1.03)";
              (e.currentTarget).style.boxShadow = "0 8px 28px rgba(0,107,182,0.2), 0 2px 8px rgba(0,0,0,0.08)";
            }
          }}
          onMouseLeave={e => {
            if (!isOpen) {
              (e.currentTarget).style.transform = "translateY(0) scale(1)";
              (e.currentTarget).style.boxShadow = "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)";
            }
          }}
        >
          {isOpen ? <X size={18} /> : (
            <>
              <FlaskConical size={18} />
              {/* Label adapts to context */}
              <span>
                {isOnCostsPage ? "Test Prep" : isOnPrepPage ? "Test Costs" : "Test Info"}
              </span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes testTileFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes testTileSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
