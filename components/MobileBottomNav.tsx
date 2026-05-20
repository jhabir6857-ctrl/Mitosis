"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Stethoscope, CalendarCheck, Download } from "lucide-react";

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

  const navItems = [
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.25rem 0.5rem",
                color: isActive ? item.color : "var(--color-text-secondary)",
                transition: "color 200ms ease",
              }}
            >
              <div 
                style={{ 
                  color: isActive ? item.color : "inherit",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  transition: "transform 200ms ease"
                }}
              >
                {item.icon}
              </div>
              <span style={{ fontSize: "0.65rem", fontWeight: isActive ? 700 : 500 }}>
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
