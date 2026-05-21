"use client";

import Link from "next/link";
import ParallaxBanner from "@/components/ParallaxBanner";
import {
  FlaskConical, ClipboardList, DollarSign, BookOpen,
  Clock, Home, ShieldCheck, Microscope, Activity,
  Beaker, Heart, Brain, ArrowRight, CheckCircle2,
} from "lucide-react";

const DEPARTMENTS = [
  { name: "Biochemistry", icon: <Beaker size={22} />, tests: 120, color: "#006BB6" },
  { name: "Haematology", icon: <Activity size={22} />, tests: 45, color: "#e53e3e" },
  { name: "Microbiology", icon: <FlaskConical size={22} />, tests: 60, color: "#3CA544" },
  { name: "Immunology", icon: <ShieldCheck size={22} />, tests: 38, color: "#805ad5" },
  { name: "Histopathology", icon: <Microscope size={22} />, tests: 30, color: "#d69e2e" },
  { name: "Cardiology", icon: <Heart size={22} />, tests: 22, color: "#e53e3e" },
  { name: "Neurology", icon: <Brain size={22} />, tests: 18, color: "#0bc5ea" },
  { name: "Endocrinology", icon: <Activity size={22} />, tests: 35, color: "#ed8936" },
];

const HIGHLIGHTS = [
  { icon: <Clock size={20} />, label: "Reports in 4–24 hrs", color: "#006BB6" },
  { icon: <Home size={20} />, label: "Home Sample Collection", color: "#3CA544" },
  { icon: <ShieldCheck size={20} />, label: "ISO Certified Lab", color: "#805ad5" },
  { icon: <CheckCircle2 size={20} />, label: "Specialist Reviewed", color: "#d69e2e" },
];

const QUICK_LINKS = [
  {
    href: "/tests/costs",
    icon: <DollarSign size={28} />,
    title: "Test Costs",
    desc: "Browse all test prices. Search by name, department or sub-department.",
    color: "#006BB6",
    bg: "rgba(0,107,182,0.07)",
    border: "rgba(0,107,182,0.18)",
  },
  {
    href: "/tests/preparation",
    icon: <ClipboardList size={28} />,
    title: "Test Preparation",
    desc: "Step-by-step preparation guides — what to eat, avoid, and bring before each test.",
    color: "#3CA544",
    bg: "rgba(60,165,68,0.07)",
    border: "rgba(60,165,68,0.18)",
  },
  {
    href: "/appointment",
    icon: <BookOpen size={28} />,
    title: "Book a Test",
    desc: "Schedule your test online or call us. Walk-ins also welcome every day.",
    color: "#805ad5",
    bg: "rgba(128,90,213,0.07)",
    border: "rgba(128,90,213,0.18)",
  },
];

export default function TestsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <ParallaxBanner
        title="Test Information"
        subtitle="Everything you need to know about our diagnostic tests — costs, preparation guides, departments and more."
        imageSrc="https://images.unsplash.com/photo-1579165466949-3180a3d056d5?q=80&w=2000&auto=format&fit=crop"
        heightClass="h-[42vh]"
      />

      {/* Highlight strip */}
      <div style={{ background: "var(--color-primary)", padding: "0.85rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontSize: "0.88rem", fontWeight: 600, fontFamily: "var(--font-ui)" }}>
              <span style={{ opacity: 0.85 }}>{h.icon}</span>
              {h.label}
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "3.5rem 1rem" }}>

        {/* Quick Links */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--color-dark)", marginBottom: "0.5rem" }}>
            What are you looking for?
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", fontFamily: "var(--font-ui)" }}>
            Navigate to the section that helps you most.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          {QUICK_LINKS.map((card) => (
            <Link key={card.href} href={card.href} style={{ textDecoration: "none" }}>
              <div style={{
                background: card.bg,
                border: `1.5px solid ${card.border}`,
                borderRadius: "1.25rem",
                padding: "2rem 1.75rem",
                transition: "transform 200ms, box-shadow 200ms",
                cursor: "pointer",
                height: "100%",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.85rem", background: card.bg, border: `1.5px solid ${card.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem", color: card.color }}>
                  {card.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", color: "var(--color-dark)", marginBottom: "0.5rem" }}>{card.title}</h3>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>{card.desc}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: card.color, fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-ui)" }}>
                  Go to {card.title} <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Departments */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-dark)", marginBottom: "0.4rem" }}>
              Our Test Departments
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", fontFamily: "var(--font-ui)" }}>
              Tests organized by medical specialty
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {DEPARTMENTS.map((dept) => (
              <Link key={dept.name} href={`/tests/costs?department=${dept.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "white",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "1rem",
                  padding: "1.4rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  transition: "all 200ms",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = dept.color;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.65rem", background: `${dept.color}14`, display: "flex", alignItems: "center", justifyContent: "center", color: dept.color, flexShrink: 0 }}>
                    {dept.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.88rem", color: "var(--color-dark)" }}>{dept.name}</div>
                    <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{dept.tests}+ tests</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div style={{ background: "linear-gradient(135deg, #0a1e3d 0%, #006BB6 100%)", borderRadius: "1.5rem", padding: "2.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "white", marginBottom: "0.4rem" }}>
              Not sure which test you need?
            </h3>
            <p style={{ fontFamily: "var(--font-ui)", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
              Talk to our specialists — we'll guide you to the right test.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
            <Link href="/doctors" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "white", color: "#006BB6", padding: "0.7rem 1.4rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-ui)" }}>
              Find a Doctor <ArrowRight size={15} />
            </Link>
            <a href="tel:+8801898806050" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", color: "white", padding: "0.7rem 1.4rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-ui)", border: "1px solid rgba(255,255,255,0.3)" }}>
              Call Us Now
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
