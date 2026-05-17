"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <div style={{ background: "linear-gradient(135deg, #0d1b2e, #0a2a5e)", color: "white", padding: "6rem 1.5rem", textAlign: "center" }}>
          <div className="container">
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: 900, marginBottom: "1rem", lineHeight: 1.2 }}>
              Get In Touch
            </h1>
            <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.85)", maxWidth: "600px", margin: "0 auto" }}>
              We're here to help. Reach out to Mitosis Lab Ltd anytime.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="container" style={{ padding: "4rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
            {[
              {
                Icon: MapPin,
                title: "Location",
                details: "Mirpur-1, Dhaka City, Bangladesh",
                link: "https://maps.google.com/?q=Mirpur+1+Dhaka",
              },
              {
                Icon: Phone,
                title: "Phone",
                details: "+880 1898-806050",
                link: "tel:+8801898806050",
              },
              {
                Icon: Mail,
                title: "Email",
                details: "mitosislabltd@gmail.com",
                link: "mailto:mitosislabltd@gmail.com",
              },
              {
                Icon: Clock,
                title: "Hours",
                details: "Everyday 7:30 AM – 11:00 PM",
                link: null,
              },
            ].map(({ Icon, title, details, link }, i) => (
              <div key={i} className="card" style={{ padding: "2rem", textAlign: "center", cursor: link ? "pointer" : "default" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-xl)", background: "var(--color-primary-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <Icon size={32} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                  {title}
                </h3>
                {link ? (
                  <a
                    href={link}
                    target={title === "Location" ? "_blank" : undefined}
                    rel={title === "Location" ? "noopener noreferrer" : undefined}
                    style={{
                      color: "var(--color-primary)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 200ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.textDecoration = "none";
                    }}
                  >
                    {details}
                  </a>
                ) : (
                  <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem", fontWeight: 600 }}>
                    {details}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>
              Visit Us
            </h2>
            <div style={{ width: "100%", height: "400px", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: "none" }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.4563894649637!2d90.35267!3d23.8143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a8c8e8e8e9%3A0x1234567890123456!2sMirpur-1%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ background: "var(--color-primary-50)", padding: "2rem", borderRadius: "var(--radius-xl)", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", color: "var(--color-text-primary)" }}>
              Ready to Book?
            </h3>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem", fontSize: "1rem" }}>
              Schedule your appointment online or call us for assistance.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/appointment"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--color-primary)",
                  color: "white",
                  padding: "0.875rem 1.75rem",
                  borderRadius: "var(--radius-lg)",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1rem",
                  transition: "all 200ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Book Appointment <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+8801898806050"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "white",
                  color: "var(--color-primary)",
                  padding: "0.875rem 1.75rem",
                  borderRadius: "var(--radius-lg)",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1rem",
                  border: "2px solid var(--color-primary)",
                  transition: "all 200ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-primary-50)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "white";
                }}
              >
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
