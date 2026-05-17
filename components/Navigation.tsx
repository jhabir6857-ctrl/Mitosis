"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, User, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Mission & Vision", href: "/about" },
      { label: "MD's Message", href: "/about/md-message" },
      { label: "Management Team", href: "/about/management" },
    ],
  },
  { label: "Health Packages", href: "/packages" },
  { label: "Find a Doctor", href: "/doctors" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Blood Tests (Pathology)", href: "/services/pathology" },
      { label: "Imaging & MRI", href: "/services/imaging" },
      { label: "Microbiology", href: "/services/microbiology" },
      { label: "Hormone & Thyroid (Biochemistry)", href: "/services/biochemistry" },
    ],
  },
  { label: "News & Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "var(--color-surface)",
        boxShadow: scrolled ? "var(--shadow-nav)" : "none",
        borderBottom: "1px solid var(--color-surface-border)",
        transition: "box-shadow 200ms ease",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          fontSize: "0.8rem",
          padding: "0.4rem 0",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            📍 Mirpur-1, Dhaka &nbsp;|&nbsp; Open Everyday: 7:30 AM – 11:00 PM &nbsp;|&nbsp; 
            <span style={{ background: "var(--color-danger)", color: "white", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-sm)", fontWeight: 700, marginLeft: "0.5rem", display: "inline-flex", alignItems: "center", gap: "0.25rem", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
              🚨 24/7 Emergency & Ambulance
            </span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="tel:+8801898806050" style={{ color: "white", textDecoration: "none", fontWeight: 600 }}>
              📞 +880 1898-806050
            </a>
            {/* Bilingual Toggle */}
            <button
              onClick={() => setShowToast(true)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "white",
                borderRadius: "var(--radius-full)",
                padding: "0.2rem 0.75rem",
                fontWeight: 700,
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "background 200ms",
                minHeight: "unset",
              }}
            >
              English
            </button>
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4.5rem" }}>
        {/* Logo — Brand Identity Block */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.875rem" }}>
          {/* Logo — plain img for reliable rendering */}
          <img
            src="/mitosis-logo.png"
            alt="Mitosis Lab Ltd — Precision Diagnostics"
            width={68}
            height={68}
            style={{ display: "block", objectFit: "contain", flexShrink: 0 }}
          />
          {/* Structural Divider */}
          <div style={{ width: "1px", height: "2.25rem", background: "var(--color-surface-border)", flexShrink: 0 }} />
          {/* Corporate Modifier — legal entity + tagline only */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.15rem" }}>
            <span style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "1.2rem",
              color: "var(--color-dark)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}>LAB LTD.</span>
            <div style={{ height: "2px", width: "100%", background: "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-green))", borderRadius: "2px", margin: "0.25rem 0" }} />
            <span style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: "0.6rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}>Precision Diagnostics</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
          {navLinks.map((link) => (
            <div
              key={link.label}
              style={{ position: "relative" }}
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "all 200ms",
                  minHeight: "48px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.background = "var(--color-primary-50)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
                {link.children && <ChevronDown size={14} />}
              </Link>
              {/* Dropdown */}
              {link.children && openDropdown === link.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.25rem)",
                    left: 0,
                    minWidth: "220px",
                    background: "var(--color-surface)",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid var(--color-surface-border)",
                    padding: "0.5rem",
                    zIndex: 100,
                    animation: "fadeInDown 150ms ease",
                  }}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      style={{
                        display: "block",
                        padding: "0.65rem 1rem",
                        color: "var(--color-text-primary)",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        borderRadius: "var(--radius-md)",
                        transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "var(--color-primary-50)";
                        (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a href="tel:+8801898806050" className="btn-emergency emergency-nav-btn" style={{ fontSize: "0.85rem", padding: "0.6rem 1rem" }}>
            <Phone size={15} />
            Emergency
          </a>
          <Link href="/portal/login" className="btn-primary" style={{ fontSize: "0.9rem" }}>
            <User size={15} />
            Patient Login
          </Link>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--color-text-primary)",
              padding: "0.5rem",
              borderRadius: "var(--radius-md)",
              minHeight: "48px",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div
          style={{
            background: "var(--color-surface)",
            borderTop: "1px solid var(--color-surface-border)",
            padding: "1rem 1.5rem 1.5rem",
          }}
        >
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.875rem 0",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-surface-border)",
                }}
              >
                {link.label}
              </Link>
              {link.children &&
                link.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.65rem 1rem",
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--color-surface-alt)",
                    }}
                  >
                    → {child.label}
                  </Link>
                ))}
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
            <a href="tel:+8801898806050" className="btn-emergency" style={{ justifyContent: "center" }}>
              <Phone size={16} /> Call Emergency: +880 1898-806050
            </a>
            <Link href="/portal/login" className="btn-primary" style={{ justifyContent: "center" }}>
              <User size={16} /> Patient Login
            </Link>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.85)",
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "var(--radius-lg)",
            fontSize: "0.95rem",
            fontWeight: 600,
            zIndex: 2000,
            backdropFilter: "blur(4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            maxWidth: "90vw",
            animation: "slideUp 300ms cubic-bezier(0.4,0,0.2,1)",
            textAlign: "center",
          }}
        >
          বাংলা সংস্করণ শীঘ্রই আসছে — Bangla version coming in Phase 2 🚀
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
