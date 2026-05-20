"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Share2, Camera } from "lucide-react";

const services = [
  { label: "Blood Tests (Pathology)", href: "/services/pathology" },
  { label: "Imaging & MRI", href: "/services/imaging" },
  { label: "Microbiology", href: "/services/microbiology" },
  { label: "Hormone & Thyroid Tests", href: "/services/biochemistry" },
  { label: "Clinical Pathology", href: "/services/clinical" },
  { label: "Health Packages", href: "/packages" },
];

const quickLinks = [
  { label: "Find a Doctor", href: "/doctors" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Patient Portal", href: "/portal/login" },
  { label: "Download Lab Reports", href: "/portal/login" },
  { label: "MRD Services", href: "/mrd-services" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-dark)", color: "#c8d6e5", borderTop: "3px solid var(--color-primary)" }}>
      {/* CTA Strip */}
      <div style={{ backgroundColor: "var(--color-primary)", padding: "2.5rem 0" }}>
        <div
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div style={{ flex: "1 1 280px" }}>
            <h3 style={{ color: "white", fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 4vw, 1.5rem)", fontWeight: 800, marginBottom: "0.25rem" }}>
              Need urgent medical assistance?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>
              Our team is available 24/7 — including ambulance service.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flex: "1 1 auto", justifyContent: "flex-start" }}>
            <a href="tel:+8801898806050" className="btn-emergency">
              <Phone size={16} /> Call Now: +880 1898-806050
            </a>
            <Link prefetch={false} href="/appointment" style={{ background: "white", color: "var(--color-primary)", borderRadius: "var(--radius-lg)", padding: "0.75rem 1.75rem", fontWeight: 700, textDecoration: "none", minHeight: "3rem", display: "inline-flex", alignItems: "center" }}>
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: "2rem 0" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "2rem", marginBottom: "3rem", alignItems: "flex-start" }}>
          {/* Brand — Logo + tagline */}
          <div style={{ paddingRight: "2rem", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              {/* Transparent logo with monochrome white filter for enterprise look */}
              <div style={{ display: "inline-flex", flexShrink: 0 }}>
                <img
                  src="/mitosis-logo-transparent.png"
                  alt="Mitosis Lab Ltd"
                  width={60}
                  height={60}
                  style={{ display: "block", objectFit: "contain", filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div style={{ width: "1px", height: "2rem", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.15rem" }}>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  color: "white",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}>LAB LTD.</span>
                <div style={{ height: "2px", width: "100%", background: "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-green))", borderRadius: "2px", margin: "0.25rem 0" }} />
                <span style={{
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}>Precision Diagnostics</span>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "#8da0b3", marginBottom: "1.5rem" }}>
              A private diagnostic center in Uttar Badda, Dhaka, serving the community with world-class medical diagnostics and compassionate care — 24 hours a day.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { Icon: Camera, href: "https://www.instagram.com/mitosislabltd/" },
              { Icon: Share2, href: "#" }
            ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel={href !== "#" ? "noopener noreferrer" : undefined} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8da0b3", transition: "all 250ms ease", textDecoration: "none", minHeight: "unset", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.border = "1px solid var(--color-brand-green)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.10)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", borderLeft: "3px solid var(--color-primary)", paddingLeft: "0.6rem" }}>Our Services</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {services.map((s) => (
                <li key={s.label}>
                  <Link prefetch={false} href={s.href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.85rem", lineHeight: 1.5, transition: "all 250ms ease", display: "block", padding: "0.2rem 0" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateX(6px)"; (e.currentTarget as HTMLElement).style.color = "var(--color-brand-green)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", borderLeft: "3px solid var(--color-primary)", paddingLeft: "0.6rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link prefetch={false} href={l.href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.85rem", lineHeight: 1.5, transition: "all 250ms ease", display: "block", padding: "0.2rem 0" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateX(6px)"; (e.currentTarget as HTMLElement).style.color = "var(--color-brand-green)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", borderLeft: "3px solid var(--color-primary)", paddingLeft: "0.6rem" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { Icon: MapPin, text: "Uttar Badda, Dhaka, Bangladesh", isAddress: true },
                { Icon: Phone, text: "+880 1898-806050", href: "tel:+8801898806050" },
                { Icon: Mail, text: "mitosislabltd@gmail.com", href: "mailto:mitosislabltd@gmail.com" },
                { Icon: Clock, text: "Everyday: 7:30 AM – 11:00 PM" },
              ].map(({ Icon, text, href, isAddress }, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ width: "1.875rem", height: "1.875rem", borderRadius: "var(--radius-md)", background: "rgba(0,86,179,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem", minHeight: "unset" }}>
                      <Icon size={13} color="var(--color-secondary)" />
                    </div>
                    {href === "tel:+8801898806050" ? (
                      <a href={href} style={{ color: "white", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.6rem", background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-md)", transition: "background 200ms", fontSize: "0.85rem", lineHeight: 1.6, cursor: "pointer" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}>
                        {text}
                      </a>
                    ) : href === "mailto:mitosislabltd@gmail.com" ? (
                      <a href={href} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", textDecoration: "none", lineHeight: 1.6, transition: "text-decoration 200ms" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}>
                        {text}
                      </a>
                    ) : (
                      <span style={{ color: "#8da0b3", fontSize: "0.85rem", lineHeight: 1.6 }}>{text}</span>
                    )}
                  </div>
                  {isAddress && (
                    <a href="https://www.google.com/maps/place/Mitosis+Lab+Ltd/@23.7987161,90.3519292,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c100172e4cfd:0x6af678895c53a755!8m2!3d23.7987161!4d90.3519292!16s%2Fg%2F11wwgj972y"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--color-brand-green)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        marginTop: "0.25rem",
                        transition: "opacity 200ms",
                        marginLeft: "2.625rem",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
                      Get Directions →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "0.75rem 0",
          marginTop: "0",
        }}>
          <div className="container" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}>
            <span style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}>
              Accreditations & Partners
            </span>
            {["ISO 15189", "DGDA Approved", "WHO Standards", "CAP Certified"].map((badge) => (
              <div key={badge} style={{
                padding: "0.35rem 0.9rem",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
                transition: "all 200ms",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#5a7a99", fontSize: "0.85rem", flex: "1 1 auto" }}>
            © 2026 Mitosis Lab Ltd. All rights reserved. | Registered in Bangladesh
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((t) => (
              <Link prefetch={false} key={t} href="#" style={{ color: "#5a7a99", fontSize: "0.85rem", textDecoration: "none" }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
