"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Stethoscope, CalendarCheck, Download, HeadphonesIcon, BookCheck, Building2, MessageCircle } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fade in on load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Hide when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => {
        setScrolling(false);
      }, 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const defaultItems = [
    {
      label: "Call",
      icon: <Phone size={22} />,
      href: "tel:+8801898806050",
      color: "var(--color-primary)",
      isExternal: true,
    },
    {
      label: "Doctor",
      icon: <Stethoscope size={22} />,
      href: "/doctors",
      color: "#8b5cf6", // Purple
    },
    {
      label: "Book",
      icon: <CalendarCheck size={22} />,
      href: "/appointment",
      color: "#10b981", // Green
    },
    {
      label: "Reports",
      icon: <Download size={22} />,
      href: "/portal/login",
      color: "#0ea5e9", // Light blue
    },
  ];

  const navItems = [...defaultItems];

  if (pathname === "/portal/login" || pathname.startsWith("/reports")) {
    navItems[3] = {
      label: "Support",
      icon: <HeadphonesIcon size={22} />,
      href: "/contact",
      color: "#f59e0b",
    };
  }

  if (pathname.startsWith("/appointment")) {
    navItems[2] = {
      label: "Bookings",
      icon: <BookCheck size={22} />,
      href: "/portal/login",
      color: "#10b981",
    };
  }

  if (pathname.startsWith("/doctors")) {
    navItems[1] = {
      label: "Depts",
      icon: <Building2 size={22} />,
      href: "/doctors",
      color: "#8b5cf6",
    };
  }

  if (pathname === "/contact") {
    navItems[0] = {
      label: "WhatsApp",
      icon: <MessageCircle size={22} />,
      href: "https://wa.me/8801898806050",
      color: "#25d366",
      isExternal: true,
    };
  }

  return (
    <div
      className="flex md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 998,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)", // For iOS home bar
        transform: !visible || scrolling ? "translateY(120%)" : "translateY(0)",
        transition: scrolling
          ? "transform 250ms cubic-bezier(0.4, 0, 1, 1)"
          : "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div style={{ display: "flex", width: "100%", justifyContent: "space-around", padding: "0.5rem 0" }}>
        {navItems.map((item, i) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "/";
          
          const content = (
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.35rem 0.5rem 0.2rem",
                color: isActive ? item.color : "var(--color-text-secondary)",
                transition: "color 200ms ease",
              }}
            >
              {/* Active top pill indicator — animates from 0 to full width */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  width: isActive ? "1.75rem" : "0",
                  height: "3px",
                  borderRadius: "0 0 4px 4px",
                  background: item.color,
                  transition: "width 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
              <div
                style={{
                  width: "2.4rem",
                  height: "2.4rem",
                  borderRadius: "0.75rem",
                  background: isActive ? item.color + "28" : item.color + "16",
                  border: `1.5px solid ${item.color}${isActive ? "55" : "35"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  transition: "all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: isActive ? item.color : "#64748b",
                  textAlign: "center",
                  lineHeight: 1.2,
                  letterSpacing: "0.02em",
                  maxWidth: "3.5rem",
                  whiteSpace: "nowrap",
                  transition: "color 200ms ease",
                }}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.isExternal) {
            return (
              <a
                key={i}
                href={item.href}
                style={{ textDecoration: "none", flex: 1 }}
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={i} href={item.href} style={{ textDecoration: "none", flex: 1 }}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
