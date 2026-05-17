"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

export default function EmergencyFloatingButton() {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <a
      href="tel:+8801898806050"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      aria-label="Call Emergency"
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        backgroundColor: "var(--color-danger)",
        color: "white",
        borderRadius: "var(--radius-full)",
        boxShadow: "0 4px 20px rgba(220,38,38,0.4)",
        padding: showLabel ? "0.875rem 1.5rem" : "1rem",
        minHeight: "3.5rem",
        textDecoration: "none",
        fontFamily: "var(--font-ui)",
        fontWeight: 700,
        fontSize: "0.95rem",
        transition: "all 300ms cubic-bezier(0.34,1.56,0.64,1)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <Phone size={20} style={{ flexShrink: 0, animation: "ring 2s infinite" }} />
      {showLabel && <span>Emergency: +880 1898-806050</span>}
      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(-15deg); }
          20%, 40% { transform: rotate(15deg); }
          50% { transform: rotate(0deg); }
        }
      `}</style>
    </a>
  );
}
