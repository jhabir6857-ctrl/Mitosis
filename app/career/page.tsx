import type { Metadata } from "next";
import ParallaxBanner from "@/components/ParallaxBanner";

export const metadata: Metadata = {
  title: { absolute: "Careers | Mitosis Lab Ltd" },
};

export default function CareerPage() {
  return (
    <main>
      {/* Hero Section */}
      <ParallaxBanner
        title="Join Our Team"
        subtitle="We are always looking for passionate healthcare professionals"
        imageSrc="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop"
      />

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
