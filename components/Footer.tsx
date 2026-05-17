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
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-dark)", color: "#c8d6e5" }}>
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
          <div>
            <h3 style={{ color: "white", fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
              Need urgent medical assistance?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>
              Our team is available 24/7 — including ambulance service.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="tel:+8801898806050" className="btn-emergency">
              <Phone size={16} /> Call Now: +880 1898-806050
            </a>
            <Link href="/appointment" style={{ background: "white", color: "var(--color-primary)", borderRadius: "var(--radius-lg)", padding: "0.75rem 1.75rem", fontWeight: 700, textDecoration: "none", minHeight: "3rem", display: "inline-flex", alignItems: "center" }}>
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: "3rem", marginBottom: "3rem", alignItems: "flex-start" }}>
          {/* Brand — Logo + tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.5rem" }}>
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
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1rem", color: "white", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }}>Lab Ltd.</div>
                <div style={{ fontSize: "0.6rem", color: "var(--color-brand-blue)", letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1, marginTop: "0.3rem", fontWeight: 600 }}>Precision Diagnostics</div>
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "#8da0b3", marginBottom: "1.5rem" }}>
              A private diagnostic center in Mirpur, Dhaka, serving the community with world-class medical diagnostics and compassionate care — 24 hours a day.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { Icon: Camera, href: "https://www.instagram.com/mitosislabltd/" },
              { Icon: Share2, href: "#" }
            ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel={href !== "#" ? "noopener noreferrer" : undefined} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8da0b3", transition: "all 200ms", textDecoration: "none", minHeight: "unset" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#8da0b3"; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Our Services</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} style={{ color: "#8da0b3", textDecoration: "none", fontSize: "0.875rem", lineHeight: 1.5, transition: "color 150ms", display: "block" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--color-secondary)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#8da0b3"}>
                    → {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ color: "#8da0b3", textDecoration: "none", fontSize: "0.875rem", lineHeight: 1.5, transition: "color 150ms", display: "block" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--color-secondary)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#8da0b3"}>
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { Icon: MapPin, text: "Mirpur-1, Dhaka City, Bangladesh" },
                { Icon: Phone, text: "+880 1898-806050", href: "tel:+8801898806050" },
                { Icon: Mail, text: "mitosislabltd@gmail.com", href: "mailto:mitosislabltd@gmail.com" },
                { Icon: Clock, text: "Everyday: 7:30 AM – 11:00 PM" },
              ].map(({ Icon, text, href }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{ width: "1.875rem", height: "1.875rem", borderRadius: "var(--radius-md)", background: "rgba(0,86,179,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem", minHeight: "unset" }}>
                    <Icon size={13} color="var(--color-secondary)" />
                  </div>
                  {href ? (
                    <a href={href} style={{ color: "#8da0b3", fontSize: "0.875rem", textDecoration: "none", lineHeight: 1.6 }}>{text}</a>
                  ) : (
                    <span style={{ color: "#8da0b3", fontSize: "0.875rem", lineHeight: 1.6 }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#5a7a99", fontSize: "0.85rem" }}>
            © 2026 Mitosis Lab Ltd. All rights reserved. | Registered in Bangladesh
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((t) => (
              <Link key={t} href="#" style={{ color: "#5a7a99", fontSize: "0.85rem", textDecoration: "none" }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
