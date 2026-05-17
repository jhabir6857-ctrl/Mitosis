"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
  emoji?: string;
}

export default function ComingSoon({
  title,
  description = "We're working hard on this page. Check back soon!",
  emoji = "🏗️",
}: ComingSoonProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)",
        padding: "1.5rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "500px" }}>
        {/* Emoji */}
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>{emoji}</div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2.5rem",
            fontWeight: 900,
            color: "var(--color-text-primary)",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--color-text-secondary)",
            marginBottom: "2.5rem",
            lineHeight: 1.8,
          }}
        >
          {description}
        </p>

        {/* Divider */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            margin: "2rem 0",
          }}
        />

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexDirection: "column", marginTop: "2rem" }}>
          <Link
            href="/appointment"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: "var(--color-primary)",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "var(--radius-lg)",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1rem",
              transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
              minHeight: "48px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px rgba(13, 27, 46, 0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Book Appointment <ArrowRight size={18} />
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: "transparent",
              color: "var(--color-primary)",
              padding: "1rem 2rem",
              borderRadius: "var(--radius-lg)",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1rem",
              border: "2px solid var(--color-primary)",
              transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
              minHeight: "48px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-primary-50)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>

        {/* Footer note */}
        <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
          Stay tuned for updates. In the meantime, feel free to{" "}
          <Link href="/appointment" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
            book an appointment
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
