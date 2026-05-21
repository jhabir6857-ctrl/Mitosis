"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Phone, Stethoscope, CalendarCheck, Download,
  HeadphonesIcon, BookCheck, Building2, MessageCircle,
  FlaskConical, DollarSign, ClipboardList, X, Sparkles, ChevronRight,
} from "lucide-react";
import { useTestInfoStore, useSuggestedNext } from "./TestInfoStore";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { lastVisited } = useTestInfoStore();
  const suggestedNext = useSuggestedNext();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setScrolling(false), 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  // Close sheet on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowSheet(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Close sheet when navigating
  useEffect(() => {
    setShowSheet(false);
  }, [pathname]);

  const defaultItems = [
    { label: "Call",    icon: <Phone size={20} />,       href: "tel:+8801898806050", color: "var(--color-primary)", isExternal: true },
    { label: "Doctor",  icon: <Stethoscope size={20} />, href: "/doctors",           color: "#8b5cf6" },
    { label: "Book",    icon: <CalendarCheck size={20} />,href: "/appointment",      color: "#10b981" },
    { label: "Reports", icon: <Download size={20} />,    href: "/portal/login",      color: "#0ea5e9" },
  ];

  const navItems = [...defaultItems];

  if (pathname === "/portal/login" || pathname.startsWith("/reports")) {
    navItems[3] = { label: "Support", icon: <HeadphonesIcon size={20} />, href: "/contact", color: "#f59e0b" };
  }
  if (pathname.startsWith("/appointment")) {
    navItems[2] = { label: "Bookings", icon: <BookCheck size={20} />, href: "/portal/login", color: "#10b981" };
  }
  if (pathname.startsWith("/doctors")) {
    navItems[1] = { label: "Depts", icon: <Building2 size={20} />, href: "/doctors", color: "#8b5cf6" };
  }
  if (pathname === "/contact") {
    navItems[0] = { label: "WhatsApp", icon: <MessageCircle size={20} />, href: "https://wa.me/8801898806050", color: "#25d366", isExternal: true };
  }

  const TEST_OPTIONS = [
    {
      key: "costs" as const,
      href: "/tests/costs",
      icon: <DollarSign size={28} />,
      label: "Test Costs",
      desc: "Browse our full price list for all departments and tests.",
      color: "#006BB6",
      border: "rgba(0,107,182,0.2)",
      bg: "rgba(0,107,182,0.05)",
    },
    {
      key: "preparation" as const,
      href: "/tests/preparation",
      icon: <ClipboardList size={28} />,
      label: "Test Preparation",
      desc: "Step-by-step guides on how to prepare before each test.",
      color: "#0d9488",
      border: "rgba(13,148,136,0.2)",
      bg: "rgba(13,148,136,0.05)",
    },
  ];

  const navHeight = "4.25rem"; // approximate bottom nav height

  // Page-aware filtering — only show the OTHER option when already on a tests page
  const isOnCostsPage = pathname === "/tests/costs";
  const isOnPrepPage  = pathname === "/tests/preparation";
  const isOnTestsPage = isOnCostsPage || isOnPrepPage;

  const visibleOptions = TEST_OPTIONS.filter(opt => {
    if (isOnCostsPage) return opt.key === "preparation";
    if (isOnPrepPage)  return opt.key === "costs";
    return true;
  });

  // Hint text: page-context takes priority over cross-suggestion history
  const sheetHint = isOnCostsPage
    ? { text: "You're on Test Costs — view preparation guides:", color: "#0d9488", bg: "rgba(13,148,136,0.08)", border: "rgba(13,148,136,0.2)" }
    : isOnPrepPage
    ? { text: "You're on Test Preparation — check pricing:", color: "#006BB6", bg: "rgba(0,107,182,0.08)", border: "rgba(0,107,182,0.2)" }
    : lastVisited
    ? { text: suggestedNext === "preparation" ? "You checked Test Costs — try Preparation next!" : "You checked Preparation — see Test Costs next!", color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" }
    : null;

  return (
    <>
      {/* ── BOTTOM SHEET OVERLAY ─────────────────────────────────── */}
      {showSheet && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowSheet(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 996,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              animation: "mobileSheetFadeIn 200ms ease",
            }}
            aria-hidden="true"
          />
          {/* Sheet */}
          <div
            ref={sheetRef}
            style={{
              position: "fixed",
              bottom: navHeight,
              left: 0,
              right: 0,
              zIndex: 997,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1.5rem 1.5rem 0 0",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
              padding: "0 1rem 1.25rem",
              animation: "mobileSheetSlideUp 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "0.75rem 0 0.5rem" }}>
              <div style={{ width: "2.5rem", height: "4px", borderRadius: "2px", background: "rgba(0,0,0,0.12)" }} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{
                  width: "2.25rem", height: "2.25rem", borderRadius: "0.6rem",
                  background: "linear-gradient(135deg, #006BB6, #0d9488)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FlaskConical size={15} color="white" />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--color-dark)", lineHeight: 1.2 }}>
                    Test Information
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "#94a3b8", fontWeight: 500 }}>
                    Choose what you need
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowSheet(false)}
                aria-label="Close"
                style={{
                  width: "2rem", height: "2rem", borderRadius: "50%",
                  background: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#64748b",
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Context-aware hint */}
            {sheetHint && (
              <div style={{
                background: sheetHint.bg, border: `1px solid ${sheetHint.border}`,
                borderRadius: "0.65rem", padding: "0.5rem 0.75rem",
                marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem",
              }}>
                <Sparkles size={13} color={sheetHint.color} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.73rem", color: "var(--color-dark)", fontWeight: 600 }}>
                  {sheetHint.text}
                </span>
              </div>
            )}

            {/* Option Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {visibleOptions.map(opt => {
                const isRecommended = !isOnTestsPage && lastVisited !== null && opt.key === suggestedNext;
                return (
                  <button
                    key={opt.key}
                    onClick={() => { setShowSheet(false); router.push(opt.href); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1rem 1.1rem",
                      background: isRecommended ? opt.bg : "rgba(248,250,252,0.9)",
                      border: `1.5px solid ${isRecommended ? opt.color + "55" : "#e2e8f0"}`,
                      borderRadius: "1rem",
                      cursor: "pointer", textAlign: "left", width: "100%",
                      boxShadow: isRecommended ? `0 4px 20px ${opt.color}18` : "none",
                      position: "relative",
                    }}
                  >
                    {isRecommended && (
                      <div style={{
                        position: "absolute", top: "-8px", right: "12px",
                        background: opt.color, borderRadius: "2rem",
                        padding: "0.15rem 0.6rem",
                        display: "flex", alignItems: "center", gap: "0.25rem",
                      }}>
                        <Sparkles size={9} color="white" />
                        <span style={{ fontSize: "0.62rem", color: "white", fontWeight: 800, letterSpacing: "0.04em" }}>TRY NEXT</span>
                      </div>
                    )}
                    <div style={{
                      width: "3rem", height: "3rem", borderRadius: "0.85rem", flexShrink: 0,
                      background: `${opt.color}15`,
                      border: `1.5px solid ${opt.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: opt.color,
                    }}>
                      {opt.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-dark)", marginBottom: "0.2rem" }}>
                        {opt.label}
                      </div>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "#64748b", lineHeight: 1.4 }}>
                        {opt.desc}
                      </div>
                    </div>
                    <ChevronRight size={18} color={opt.color} style={{ flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ── BOTTOM NAV BAR ───────────────────────────────────────── */}
      <div
        className="flex md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          zIndex: 998,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          transform: !visible || scrolling ? "translateY(120%)" : "translateY(0)",
          transition: scrolling ? "transform 250ms cubic-bezier(0.4, 0, 1, 1)" : "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div style={{ display: "flex", width: "100%", justifyContent: "space-around", padding: "0.45rem 0" }}>

          {/* Regular 4 nav items */}
          {navItems.map((item, i) => {
            const isActive = item.href !== "/" && !item.isExternal && pathname.startsWith(item.href);
            const content = (
              <div style={{
                position: "relative", display: "flex", flexDirection: "column",
                alignItems: "center", gap: "0.2rem",
                padding: "0.3rem 0.4rem 0.15rem",
                color: isActive ? item.color : "var(--color-text-secondary)",
                transition: "color 200ms ease",
              }}>
                <div style={{ position: "absolute", top: 0, width: isActive ? "1.5rem" : "0", height: "3px", borderRadius: "0 0 4px 4px", background: item.color, transition: "width 350ms cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
                <div style={{
                  width: "2.2rem", height: "2.2rem", borderRadius: "0.65rem",
                  background: isActive ? item.color + "28" : item.color + "14",
                  border: `1.5px solid ${item.color}${isActive ? "55" : "30"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.color,
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: "0.58rem", fontWeight: 700, color: isActive ? item.color : "#64748b", textAlign: "center", lineHeight: 1.2, letterSpacing: "0.02em", maxWidth: "3.5rem", whiteSpace: "nowrap", transition: "color 200ms ease" }}>
                  {item.label}
                </span>
              </div>
            );

            if (item.isExternal) {
              return <a key={i} href={item.href} style={{ textDecoration: "none", flex: 1 }}>{content}</a>;
            }
            return <Link key={i} href={item.href} style={{ textDecoration: "none", flex: 1 }}>{content}</Link>;
          })}

          {/* 5th: Tests button */}
          <button
            onClick={() => setShowSheet(o => !o)}
            aria-label="Test Information"
            aria-expanded={showSheet}
            style={{
              flex: 1, border: "none", cursor: "pointer",
              background: "transparent",
              display: "flex", flexDirection: "column",
              alignItems: "center", padding: 0,
            }}
          >
            <div style={{
              position: "relative", display: "flex", flexDirection: "column",
              alignItems: "center", gap: "0.2rem",
              padding: "0.3rem 0.4rem 0.15rem",
              transition: "color 200ms ease",
            }}>
              {/* Active indicator */}
              <div style={{ position: "absolute", top: 0, width: showSheet ? "1.5rem" : "0", height: "3px", borderRadius: "0 0 4px 4px", background: "#0d9488", transition: "width 350ms cubic-bezier(0.34, 1.56, 0.64, 1)" }} />

              <div style={{
                width: "2.2rem", height: "2.2rem", borderRadius: "0.65rem",
                background: showSheet ? "rgba(13,148,136,0.28)" : "rgba(13,148,136,0.14)",
                border: `1.5px solid rgba(13,148,136,${showSheet ? "0.55" : "0.30"})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0d9488",
                transform: showSheet ? "scale(1.08)" : "scale(1)",
                transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                position: "relative",
              }}>
                <FlaskConical size={18} />
                {/* Suggestion dot */}
                {lastVisited && !showSheet && (
                  <div style={{
                    position: "absolute", top: "-3px", right: "-3px",
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "#f59e0b", border: "2px solid white",
                    animation: "suggDotPulse 2s ease infinite",
                  }} />
                )}
              </div>
              <span style={{ fontSize: "0.58rem", fontWeight: 700, color: showSheet ? "#0d9488" : "#64748b", textAlign: "center", lineHeight: 1.2, letterSpacing: "0.02em", maxWidth: "3.5rem", whiteSpace: "nowrap", transition: "color 200ms ease" }}>
                Tests
              </span>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes mobileSheetFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mobileSheetSlideUp {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes suggDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </>
  );
}
