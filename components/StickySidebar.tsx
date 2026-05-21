"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  Download,
  CalendarCheck,
  Stethoscope,
  HeadphonesIcon,
  BookCheck,
  Building2,
  MessageCircle,
  FlaskConical,
  DollarSign,
  ClipboardList,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { useTestInfoStore, useSuggestedNext } from "./TestInfoStore";

type SidebarButton = {
  icon: React.ReactNode;
  label: string;
  shortLabel: string;
  href: string;
  color: string;
  isExternal?: boolean;
};

export default function StickySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [testsOpen, setTestsOpen] = useState(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { lastVisited } = useTestInfoStore();
  const suggestedNext = useSuggestedNext();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setScrolling(false), 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  // Close tests panel when on a tests page
  useEffect(() => {
    if (pathname.startsWith("/tests")) setTestsOpen(false);
  }, [pathname]);

  const defaultButtons: SidebarButton[] = [
    { icon: <Phone size={18} />, label: "Call Us", shortLabel: "Call", href: "tel:+8801898806050", color: "var(--color-primary)", isExternal: true },
    { icon: <Download size={18} />, label: "My Reports", shortLabel: "Report", href: "/portal/login", color: "#0ea5e9" },
    { icon: <CalendarCheck size={18} />, label: "Appointment", shortLabel: "Book", href: "/appointment", color: "#10b981" },
    { icon: <Stethoscope size={18} />, label: "Find Doctor", shortLabel: "Doctor", href: "/doctors", color: "#8b5cf6" },
  ];

  const buttons = [...defaultButtons];

  if (pathname === "/portal/login" || pathname.startsWith("/reports")) {
    buttons[1] = { icon: <HeadphonesIcon size={18} />, label: "Support", shortLabel: "Support", href: "/contact", color: "#f59e0b" };
  }
  if (pathname.startsWith("/appointment")) {
    buttons[2] = { icon: <BookCheck size={18} />, label: "My Bookings", shortLabel: "Bookings", href: "/portal/login", color: "#10b981" };
  }
  if (pathname.startsWith("/doctors")) {
    buttons[3] = { icon: <Building2 size={18} />, label: "Departments", shortLabel: "Depts", href: "/doctors", color: "#8b5cf6" };
  }
  if (pathname === "/contact") {
    buttons[0] = { icon: <MessageCircle size={18} />, label: "WhatsApp", shortLabel: "Chat", href: "https://wa.me/8801898806050", color: "#25d366", isExternal: true };
  }

  const TEST_BUTTONS = [
    {
      key: "costs" as const,
      href: "/tests/costs",
      icon: <DollarSign size={15} />,
      label: "Test Costs",
      shortLabel: "Costs",
      color: "#006BB6",
    },
    {
      key: "preparation" as const,
      href: "/tests/preparation",
      icon: <ClipboardList size={15} />,
      label: "Test Preparation",
      shortLabel: "Prep",
      color: "#0d9488",
    },
  ];

  const buttonInner = (btn: SidebarButton, pulseRing: boolean) => (
    <div
      onMouseEnter={(e) => {
        const wrap = e.currentTarget;
        wrap.style.background = btn.color + "12";
        const iconEl = wrap.querySelector("[data-sidebar-icon]") as HTMLElement | null;
        if (iconEl) { iconEl.style.transform = "scale(1.15)"; iconEl.style.background = btn.color + "30"; }
      }}
      onMouseLeave={(e) => {
        const wrap = e.currentTarget;
        wrap.style.background = "transparent";
        const iconEl = wrap.querySelector("[data-sidebar-icon]") as HTMLElement | null;
        if (iconEl) { iconEl.style.transform = "scale(1)"; iconEl.style.background = btn.color + "22"; }
      }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", padding: "0.5rem 0.4rem", borderRadius: "0.75rem", cursor: "pointer", transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)", minWidth: "3rem" }}
    >
      {pulseRing ? (
        <div style={{ position: "relative", width: "2.4rem", height: "2.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: "-3px", borderRadius: "0.85rem", border: `2.5px solid ${btn.color}`, animation: "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite", animationDelay: "0.5s", opacity: 0, pointerEvents: "none" }} />
          <div data-sidebar-icon style={{ width: "2.4rem", height: "2.4rem", borderRadius: "0.75rem", background: btn.color + "22", border: `1.5px solid ${btn.color}45`, display: "flex", alignItems: "center", justifyContent: "center", color: btn.color, transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            {btn.icon}
          </div>
        </div>
      ) : (
        <div data-sidebar-icon style={{ width: "2.4rem", height: "2.4rem", borderRadius: "0.75rem", background: btn.color + "22", border: `1.5px solid ${btn.color}45`, display: "flex", alignItems: "center", justifyContent: "center", color: btn.color, transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          {btn.icon}
        </div>
      )}
      <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#334155", textAlign: "center", lineHeight: 1.2, letterSpacing: "0.02em", maxWidth: "3rem", whiteSpace: "nowrap" }}>
        {btn.shortLabel}
      </span>
    </div>
  );

  return (
    <div
      className="hidden md:flex flex-col"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: !visible ? "translateY(-50%) translateX(120%)" : scrolling ? "translateY(-50%) translateX(120%)" : "translateY(-50%) translateX(0)",
        opacity: !visible ? 0 : scrolling ? 0 : 1,
        transition: scrolling ? "all 250ms cubic-bezier(0.4, 0, 1, 1)" : "all 700ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        zIndex: 999,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "1rem 0 0 1rem",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.15), -2px 0 8px rgba(0,0,0,0.08), inset 1px 0 0 rgba(255,255,255,0.9)",
        padding: "0.6rem 0.4rem",
        gap: "0.25rem",
      }}
    >
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateX(20px); }
          60% { opacity: 1; transform: scale(1.1) translateX(-2px); }
          100% { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes subBtnIn {
          0% { opacity: 0; transform: translateX(12px) scale(0.9); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>

      {/* Gradient top accent */}
      <div style={{ width: "100%", height: "3px", background: "linear-gradient(180deg, var(--color-primary), #10b981)", borderRadius: "1rem 0 0 0", marginBottom: "0.35rem", flexShrink: 0 }} />

      {/* Main buttons */}
      {buttons.map((btn, i) => (
        <div key={i} style={{ position: "relative", animation: !scrolling && visible ? `popIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms both` : "none" }}>
          {btn.isExternal ? (
            <a href={btn.href} aria-label={btn.label} target={btn.href.startsWith("http") ? "_blank" : undefined} rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              {buttonInner(btn, i === 0)}
            </a>
          ) : (
            <Link href={btn.href} aria-label={btn.label} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              {buttonInner(btn, i === 0)}
            </Link>
          )}
          {i < buttons.length - 1 && (
            <div style={{ height: "1px", background: "rgba(0,0,0,0.04)", margin: "0 0.3rem" }} />
          )}
        </div>
      ))}

      {/* Divider before Tests */}
      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "0.15rem 0.3rem" }} />

      {/* Tests expandable button */}
      <div style={{ animation: !scrolling && visible ? `popIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${buttons.length * 80}ms both` : "none" }}>
        {/* Tests toggle button */}
        <button
          onClick={() => setTestsOpen(o => !o)}
          aria-label="Test Information"
          aria-expanded={testsOpen}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem",
            padding: "0.5rem 0.4rem", borderRadius: "0.75rem", cursor: "pointer",
            width: "100%", border: "none",
            background: testsOpen ? "rgba(13,148,136,0.08)" : "transparent",
            transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            minWidth: "3rem",
          }}
          onMouseEnter={e => { (e.currentTarget).style.background = "rgba(13,148,136,0.10)"; }}
          onMouseLeave={e => { (e.currentTarget).style.background = testsOpen ? "rgba(13,148,136,0.08)" : "transparent"; }}
        >
          <div style={{
            width: "2.4rem", height: "2.4rem", borderRadius: "0.75rem",
            background: testsOpen ? "rgba(13,148,136,0.25)" : "rgba(13,148,136,0.18)",
            border: `1.5px solid rgba(13,148,136,${testsOpen ? "0.5" : "0.35"})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#0d9488",
            transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: testsOpen ? "scale(1.08)" : "scale(1)",
            position: "relative",
          }}>
            <FlaskConical size={18} />
            {/* Pulse dot if there's a suggestion */}
            {lastVisited && !testsOpen && (
              <div style={{
                position: "absolute", top: "-3px", right: "-3px",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#f59e0b", border: "2px solid white",
              }} />
            )}
          </div>
          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: testsOpen ? "#0d9488" : "#334155", textAlign: "center", lineHeight: 1.2, letterSpacing: "0.02em", maxWidth: "3rem", whiteSpace: "nowrap", transition: "color 200ms" }}>
            Tests
          </span>
        </button>

        {/* Expanded sub-buttons */}
        {testsOpen && (
          <div style={{
            display: "flex", flexDirection: "column", gap: "0.3rem",
            marginTop: "0.3rem",
            paddingTop: "0.3rem",
            borderTop: "1px dashed rgba(13,148,136,0.2)",
          }}>
            {/* Collapse chevron hint */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.1rem" }}>
              <ChevronUp size={12} color="rgba(13,148,136,0.5)" />
            </div>

            {TEST_BUTTONS.map((tb, idx) => {
              const isRecommended = lastVisited !== null && tb.key === suggestedNext;
              return (
                <button
                  key={tb.key}
                  onClick={() => { setTestsOpen(false); router.push(tb.href); }}
                  title={tb.label}
                  aria-label={tb.label}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem",
                    padding: "0.4rem 0.3rem", borderRadius: "0.65rem",
                    border: isRecommended ? `1.5px solid ${tb.color}55` : "1.5px solid transparent",
                    background: isRecommended ? `${tb.color}10` : "transparent",
                    cursor: "pointer", width: "100%",
                    animation: `subBtnIn 250ms cubic-bezier(0.34,1.56,0.64,1) ${idx * 60}ms both`,
                    transition: "all 200ms",
                    position: "relative",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${tb.color}18`;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${tb.color}70`;
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = isRecommended ? `${tb.color}10` : "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = isRecommended ? `${tb.color}55` : "transparent";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                >
                  {isRecommended && (
                    <div style={{
                      position: "absolute", top: "-4px", right: "0px",
                      background: tb.color, borderRadius: "2rem",
                      padding: "0.05rem 0.3rem",
                      display: "flex", alignItems: "center", gap: "0.15rem",
                    }}>
                      <Sparkles size={7} color="white" />
                      <span style={{ fontSize: "0.5rem", color: "white", fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1 }}>NEXT</span>
                    </div>
                  )}
                  <div style={{
                    width: "2rem", height: "2rem", borderRadius: "0.5rem",
                    background: `${tb.color}20`,
                    border: `1px solid ${tb.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: tb.color,
                  }}>
                    {tb.icon}
                  </div>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, color: tb.color, textAlign: "center", lineHeight: 1.2, maxWidth: "3rem", whiteSpace: "nowrap" }}>
                    {tb.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom dot */}
      <div style={{ marginTop: "0.35rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), #10b981)" }} />
      </div>
    </div>
  );
}
