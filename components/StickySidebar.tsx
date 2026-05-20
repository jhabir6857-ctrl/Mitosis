"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

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
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        setScrolling(false);
      }, 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const defaultButtons: SidebarButton[] = [
    {
      icon: <Phone size={18} />,
      label: "Call Us",
      shortLabel: "Call",
      href: "tel:+8801898806050",
      color: "var(--color-primary)",
      isExternal: true,
    },
    {
      icon: <Download size={18} />,
      label: "My Reports",
      shortLabel: "Report",
      href: "/portal/login",
      color: "#0ea5e9",
    },
    {
      icon: <CalendarCheck size={18} />,
      label: "Appointment",
      shortLabel: "Book",
      href: "/appointment",
      color: "#10b981",
    },
    {
      icon: <Stethoscope size={18} />,
      label: "Find Doctor",
      shortLabel: "Doctor",
      href: "/doctors",
      color: "#8b5cf6",
    },
  ];

  // Context-aware button overrides
  const buttons = [...defaultButtons];

  if (pathname === "/portal/login" || pathname.startsWith("/reports")) {
    buttons[1] = {
      icon: <HeadphonesIcon size={18} />,
      label: "Support",
      shortLabel: "Support",
      href: "/contact",
      color: "#f59e0b",
    };
  }

  if (pathname.startsWith("/appointment")) {
    buttons[2] = {
      icon: <BookCheck size={18} />,
      label: "My Bookings",
      shortLabel: "Bookings",
      href: "/portal/login",
      color: "#10b981",
    };
  }

  if (pathname.startsWith("/doctors")) {
    buttons[3] = {
      icon: <Building2 size={18} />,
      label: "Departments",
      shortLabel: "Depts",
      href: "/doctors",
      color: "#8b5cf6",
    };
  }

  if (pathname === "/contact") {
    buttons[0] = {
      icon: <MessageCircle size={18} />,
      label: "WhatsApp",
      shortLabel: "Chat",
      href: "https://wa.me/8801898806050",
      color: "#25d366",
      isExternal: true,
    };
  }

  const buttonInner = (btn: SidebarButton, pulseRing: boolean) => (
    <div
      onMouseEnter={(e) => {
        const wrap = e.currentTarget;
        wrap.style.background = btn.color + "12";
        const iconEl = wrap.querySelector("[data-sidebar-icon]") as HTMLElement | null;
        if (iconEl) {
          iconEl.style.transform = "scale(1.15)";
          iconEl.style.background = btn.color + "30";
        }
      }}
      onMouseLeave={(e) => {
        const wrap = e.currentTarget;
        wrap.style.background = "transparent";
        const iconEl = wrap.querySelector("[data-sidebar-icon]") as HTMLElement | null;
        if (iconEl) {
          iconEl.style.transform = "scale(1)";
          iconEl.style.background = btn.color + "22";
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.2rem",
        padding: "0.5rem 0.4rem",
        borderRadius: "0.75rem",
        cursor: "pointer",
        transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        minWidth: "3rem",
      }}
    >
      {pulseRing ? (
        <div
          style={{
            position: "relative",
            width: "2.4rem",
            height: "2.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-3px",
              borderRadius: "0.85rem",
              border: `2.5px solid ${btn.color}`,
              animation: "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
              animationDelay: "0.5s",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
          <div
            data-sidebar-icon
            style={{
              width: "2.4rem",
              height: "2.4rem",
              borderRadius: "0.75rem",
              background: btn.color + "22",
              border: `1.5px solid ${btn.color}45`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: btn.color,
              transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {btn.icon}
          </div>
        </div>
      ) : (
        <div
          data-sidebar-icon
          style={{
            width: "2.4rem",
            height: "2.4rem",
            borderRadius: "0.75rem",
            background: btn.color + "22",
            border: `1.5px solid ${btn.color}45`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: btn.color,
            transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {btn.icon}
        </div>
      )}
      <span
        style={{
          fontSize: "0.62rem",
          fontWeight: 700,
          color: "#334155",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: "0.02em",
          maxWidth: "3rem",
          whiteSpace: "nowrap",
        }}
      >
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
        transform: !visible
          ? "translateY(-50%) translateX(120%)"
          : scrolling
          ? "translateY(-50%) translateX(120%)"
          : "translateY(-50%) translateX(0)",
        opacity: !visible ? 0 : scrolling ? 0 : 1,
        transition: scrolling
          ? "all 250ms cubic-bezier(0.4, 0, 1, 1)"
          : "all 700ms cubic-bezier(0.34, 1.56, 0.64, 1)",
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
          0% {
            opacity: 0;
            transform: scale(0.5) translateX(20px);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) translateX(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          height: "3px",
          background: "linear-gradient(180deg, var(--color-primary), #10b981)",
          borderRadius: "1rem 0 0 0",
          marginBottom: "0.35rem",
          flexShrink: 0,
        }}
      />
      {buttons.map((btn, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            animation: !scrolling && visible ? `popIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms both` : "none",
          }}
        >
          {btn.isExternal ? (
            <a
              href={btn.href}
              aria-label={btn.label}
              target={btn.href.startsWith("http") ? "_blank" : undefined}
              rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              {buttonInner(btn, i === 0)}
            </a>
          ) : (
            <Link
              href={btn.href}
              aria-label={btn.label}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              {buttonInner(btn, i === 0)}
            </Link>
          )}

          {i < buttons.length - 1 && (
            <div style={{ height: "1px", background: "rgba(0,0,0,0.04)", margin: "0 0.3rem" }} />
          )}
        </div>
      ))}
      <div
        style={{
          marginTop: "0.35rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary), #10b981)",
          }}
        />
      </div>
    </div>
  );
}
