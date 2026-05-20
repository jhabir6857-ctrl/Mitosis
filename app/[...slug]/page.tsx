"use client";

import Link from "next/link";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      backgroundColor: "var(--color-bg)",
      backgroundImage: "radial-gradient(circle at center, rgba(0,86,179,0.05) 0%, transparent 70%)"
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: "500px",
        width: "100%",
        padding: "3rem 2rem",
        borderRadius: "var(--radius-xl)",
        backgroundColor: "rgba(10, 30, 61, 0.4)",
        border: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        <div style={{
          width: "5rem",
          height: "5rem",
          margin: "0 auto 1.5rem",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 86, 179, 0.15)",
          border: "1px solid rgba(0, 86, 179, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-primary)"
        }}>
          <Construction size={40} strokeWidth={1.5} />
        </div>
        
        <h1 style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          fontWeight: 800,
          fontFamily: "var(--font-heading)",
          color: "white",
          marginBottom: "1rem",
          letterSpacing: "-0.02em"
        }}>
          Page Under Development
        </h1>
        
        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "1rem",
          lineHeight: 1.6,
          marginBottom: "2.5rem"
        }}>
          We're currently building out this section of the Mitosis Lab platform. 
          It will be fully functional and available in our Phase 2 release.
        </p>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center"
        }}>
          <Link prefetch={false} href="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "var(--color-primary)",
            color: "white",
            padding: "0.875rem 2rem",
            borderRadius: "var(--radius-lg)",
            fontWeight: 700,
            textDecoration: "none",
            transition: "transform 200ms, box-shadow 200ms",
            boxShadow: "0 4px 14px rgba(0, 86, 179, 0.4)"
          }}>
            <Home size={18} />
            Return to Home
          </Link>
          
          <button 
            onClick={() => router.back()}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "0.5rem"
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
