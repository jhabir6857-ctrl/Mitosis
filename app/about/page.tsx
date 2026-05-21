"use client";

import Link from "next/link";
import { ArrowRight, Heart, Target, Users } from "lucide-react";
import ParallaxBanner from "@/components/ParallaxBanner";

export default function AboutPage() {
  return (
    <main>
        {/* Hero Section */}
        <ParallaxBanner
          title="About Mitosis Lab Ltd"
          subtitle="World-class diagnostics with compassionate care, serving Mirpur and Dhaka 24/7"
          imageSrc="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
        />

        {/* Mission & History */}
        <div className="container" style={{ padding: "3rem 1rem" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
              Mitosis Lab Ltd is a premier diagnostic center in Mirpur, Dhaka, dedicated to providing accurate, reliable medical diagnostics with world-class standards. Founded on the principle of precision and compassion, we serve our community with state-of-the-art technology and expert specialists available round the clock.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--color-text-secondary)", marginBottom: "3rem" }}>
              Our mission is simple: make quality healthcare accessible to everyone through transparent pricing, rapid turnaround times, and a commitment to patient-centered care.
            </p>
          </div>
        </div>

        {/* Facility & Tech Tour Parallax */}
        <ParallaxBanner
          title="State-of-the-Art Facilities"
          subtitle="Experience our ultra-modern, brightly lit laboratory and active testing rooms. We use cutting-edge, sterile equipment to ensure the highest accuracy in every diagnosis."
          imageSrc="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2000&auto=format&fit=crop"
          heightClass="h-[50vh]"
          overlayClass="bg-blue-950/60"
        />

        <div className="container" style={{ padding: "3rem 1rem" }}>
          {/* Values Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { Icon: Target, title: "Precision", desc: "Accurate diagnostics using cutting-edge technology" },
              { Icon: Heart, title: "Compassion", desc: "Patient-centered care with empathy and respect" },
              { Icon: Users, title: "Expertise", desc: "Highly trained specialists and experienced staff" },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-xl)", background: "var(--color-primary-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <Icon size={32} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>
                  {title}
                </h3>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ background: "var(--color-primary)", color: "white", padding: "3rem 1.5rem", textAlign: "center" }}>
          <div className="container">
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Ready to Book Your Appointment?
            </h2>
            <p style={{ fontSize: "1.05rem", marginBottom: "2rem", color: "rgba(255,255,255,0.9)" }}>
              Get the care you need from our expert specialists.
            </p>
            <Link
              href="/appointment"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "white",
                color: "var(--color-primary)",
                padding: "1rem 2rem",
                borderRadius: "var(--radius-lg)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.05rem",
                transition: "all 200ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Book Appointment <ArrowRight size={18} />
            </Link>
          </div>
        </div>
    </main>
  );
}
