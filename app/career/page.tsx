import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Careers | Mitosis Lab Ltd" },
};

export default function CareerPage() {
  return (
    <main>
      {/* Hero Section */}
      <div style={{ background: "linear-gradient(135deg, #0d1b2e, #0a2a5e)", color: "white", padding: "clamp(3rem, 10vw, 6rem) 1.5rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 7vw, 3rem)", fontWeight: 900, marginBottom: "1rem", lineHeight: 1.2 }}>
            Join Our Team
          </h1>
          <p style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)", color: "rgba(255,255,255,0.85)", maxWidth: "600px", margin: "0 auto" }}>
            We are always looking for passionate healthcare professionals
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container" style={{ padding: "4rem 1rem", minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "var(--color-background-alt)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "3rem 2rem", textAlign: "center", maxWidth: "600px", width: "100%" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-text-primary)" }}>
            No open positions at the moment
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--color-text-secondary)", marginBottom: "2rem", lineHeight: 1.6 }}>
            Please check back later or send your CV to <a href="mailto:mitosislabltd@gmail.com" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>mitosislabltd@gmail.com</a>
          </p>
          <a
            href="mailto:mitosislabltd@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-primary)",
              color: "white",
              padding: "0.875rem 1.75rem",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Email Your CV
          </a>
        </div>
      </div>
    </main>
  );
}
