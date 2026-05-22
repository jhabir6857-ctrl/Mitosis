"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, User, ChevronDown, MapPin, ChevronRight, Clock, LayoutGrid } from "lucide-react";

const navLinks = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Mitosis Lab", href: "/about", section: "cta" },
      { label: "Our Mission & Vision", href: "/about", section: "item" },
      { label: "MD's Message", href: "/about/md-message", section: "item" },
      { label: "Management Team", href: "/about/management", section: "item" },
    ],
  },
  {
    label: "Medical Care",
    href: "#",
    children: [
      { label: "Find a Doctor", href: "/doctors", section: "cta" },
      { label: "Imaging & MRI", href: "/doctors?department=dept-001", section: "dept" },
      { label: "Pathology", href: "/doctors?department=dept-002", section: "dept" },
      { label: "Microbiology", href: "/doctors?department=dept-003", section: "dept" },
      { label: "Clinical Pathology", href: "/doctors?department=dept-004", section: "dept" },
      { label: "Child Health (Pediatrics)", href: "/doctors?department=dept-005", section: "dept" },
      { label: "Gastroenterology", href: "/doctors?department=dept-006", section: "dept" },
      { label: "Skin & Dermatology", href: "/doctors?department=dept-007", section: "dept" },
      { label: "Hormone & Thyroid", href: "/doctors?department=dept-008", section: "dept" },
    ],
  },
  {
    label: "Visitors & Patients",
    href: "#",
    children: [
      { label: "All Services", href: "/services", section: "cta" },
      { label: "Test Information", href: "/tests", section: "item" },
      { label: "Facilities", href: "/facilities", section: "item" },
      { label: "Health Check Up", href: "/health-checkup", section: "item" },
      { label: "Packages", href: "/packages", section: "item" },
      { label: "MRD Services", href: "/mrd-services", section: "item" },
      { label: "Room Rent", href: "/room-rent", section: "item" },
      { label: "Equipments", href: "/equipments", section: "item" },
      { label: "Health Tips", href: "/health-tips", section: "item" },
      { label: "Visitors Policy", href: "/visitors-policy", section: "item" },
      { label: "Feedback", href: "/feedback", section: "item" },
    ],
  },
  {
    label: "News & Media",
    href: "#",
    children: [
      { label: "All News & Media", href: "/news", section: "cta" },
      { label: "Mitosis News", href: "/news", section: "item" },
      { label: "Mitosis Gallery", href: "/gallery", section: "item" },
      { label: "Mitosis Publications", href: "/publications", section: "item" },
    ],
  },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

const VISITORS_PATIENTS_GROUPS = [
  {
    title: "TESTS & REPORTS",
    color: "#006BB6",
    bg: "rgba(0,107,182,0.06)",
    items: [
      { label: "Test Information", href: "/tests", desc: "Costs & prep guides unified in one place" },
      { label: "MRD Services", href: "/mrd-services", desc: "Medical records department & reports" },
    ],
  },
  {
    title: "HEALTH PACKAGES",
    color: "#006BB6",
    bg: "rgba(0,107,182,0.06)",
    items: [
      { label: "Health Check Up", href: "/health-checkup", desc: "Routine wellness examinations" },
      { label: "Packages", href: "/packages", desc: "Comprehensive family health plans" },
    ],
  },
  {
    title: "HOSPITAL INFO",
    color: "#006BB6",
    bg: "rgba(0,107,182,0.06)",
    items: [
      { label: "Facilities", href: "/facilities", desc: "Diagnostics & patient amenities" },
      { label: "Room Rent", href: "/room-rent", desc: "Cabin & ward pricing details" },
      { label: "Equipments", href: "/equipments", desc: "Our advanced diagnostic machines" },
    ],
  },
  {
    title: "SUPPORT",
    color: "#006BB6",
    bg: "rgba(0,107,182,0.06)",
    items: [
      { label: "Health Tips", href: "/health-tips", desc: "Wellness advice & guidelines" },
      { label: "Visitors Policy", href: "/visitors-policy", desc: "Visiting hours & guest regulations" },
      { label: "Feedback", href: "/feedback", desc: "Share your experience with us" },
    ],
  },
];

function dropdownSectionLabel(parentLabel: string): string {
  switch (parentLabel) {
    case "About":
      return "ABOUT US";
    case "Visitors & Patients":
      return "QUICK LINKS";
    case "News & Media":
      return "MEDIA";
    case "Medical Care":
      return "OUR DEPARTMENTS";
    default:
      return "";
  }
}

export default function Navigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    router.push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const goingDown = y > lastY;
          setScrolled((prev) => {
            if (!prev && goingDown && y > 120) return true;
            if (prev && !goingDown && y < 20) return false;
            return prev;
          });
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Close drawer when ESC is pressed
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "var(--color-surface)",
        boxShadow: scrolled ? "var(--shadow-nav)" : "none",
        transition: "box-shadow 200ms ease",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div
        className={`nav-topbar ${scrolled ? 'topbar-scrolled' : ''}`}
        style={{
          background: "linear-gradient(90deg, #0a1e3d 0%, var(--color-primary) 100%)",
          color: "white",
          fontSize: "0.72rem",
          transition: "all 300ms ease",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}
        >
          {/* Left — Address + Phone */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", flex: 1, minWidth: 0 }}>
            {/* Address — clickable button */}
            <a
              href="https://www.google.com/maps/place/Mitosis+Lab+Ltd/@23.7987161,90.3519292,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c100172e4cfd:0x6af678895c53a755!8m2!3d23.7987161!4d90.3519292!16s%2Fg%2F11wwgj972y"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "white",
                borderRadius: "var(--radius-full)",
                padding: "0.2rem 0.8rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background 200ms",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontWeight: 700,
                fontSize: "0.75rem",
                minHeight: "unset",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}
              className="hidden md:flex"
              title="View Mitosis Lab Ltd on Google Maps"
            >
              <MapPin size={11} style={{ flexShrink: 0 }} />
              Location
            </a>

            {/* Divider — desktop only */}
            <span className="hidden md:flex" style={{ alignItems: "center", color: "rgba(255,255,255,0.25)", userSelect: "none" }}>|</span>

            {/* Phone — always visible */}
            <a
              href="tel:+8801898806050"
              className="nav-topbar-phone"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
            >
              <Phone size={11} style={{ flexShrink: 0 }} />
              +880 1898-806050
            </a>

            {/* Hours — desktop only */}
            <span className="hidden lg:flex" style={{ alignItems: "center", gap: "0.75rem", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-ui)" }}>
              <span style={{ color: "rgba(255,255,255,0.25)", userSelect: "none" }}>|</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", paddingTop: "1px" }}>
                <Clock size={11} color="var(--color-brand-green)" style={{ flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Open Everyday:</span>
                <span style={{ color: "white", fontWeight: 700, letterSpacing: "0.02em" }}>7:30 AM – 11:30 PM</span>
              </span>
            </span>

            {/* Emergency badge — desktop only */}
            <span
              className="hidden md:inline-flex"
              style={{
                background: "var(--color-danger)",
                color: "white",
                padding: "0.15rem 0.5rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: 700,
                alignItems: "center",
                gap: "0.25rem",
                textTransform: "uppercase",
                fontSize: "0.68rem",
                letterSpacing: "0.05em",
              }}
            >
              🚨 24/7 Emergency
            </span>
          </div>

          {/* Right — Language button */}
          <button
            onClick={() => setShowToast(true)}
            className="nav-topbar-lang"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white",
              borderRadius: "var(--radius-full)",
              padding: "0.2rem 0.8rem",
              fontWeight: 700,
              fontSize: "0.75rem",
              cursor: "pointer",
              transition: "background 200ms",
              minHeight: "unset",
              whiteSpace: "nowrap",
              flexShrink: 0,
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}
          >
            🌐 English
          </button>
        </div>
      </div>

      {/* ── MAIN NAV BAR ────────────────────────────────────────── */}
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4.25rem" }}
      >
        {/* Logo — click always goes to home + scrolls to top */}
        <a href="/" onClick={handleLogoClick} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, cursor: "pointer" }}>
          <img
            src="/mitosis-logo.png"
            alt="Mitosis Lab Ltd — Precision Diagnostics"
            width={60}
            height={60}
            style={{ display: "block", objectFit: "contain", flexShrink: 0 }}
          />
          <div style={{ width: "1px", height: "2rem", background: "var(--color-surface-border)", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.15rem" }}>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1,
                display: "flex",
                gap: "0.35rem",
              }}
            >
              <span style={{ color: "var(--color-primary)" }}>MITOSIS</span>
              <span style={{ color: "var(--color-dark)" }}>LAB LTD.</span>
            </span>
            <div
              style={{
                height: "2px",
                width: "100%",
                background: "linear-gradient(90deg, var(--color-brand-blue), var(--color-brand-green))",
                borderRadius: "2px",
                margin: "0.2rem 0",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: "0.58rem",
                color: "var(--color-text-muted)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Precision Diagnostics
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0" }} className="desktop-nav">
          {navLinks.map((link) => (
            <div
              key={link.label}
              style={{ position: "relative" }}
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                if (link.children) setOpenDropdown(link.label);
                else setOpenDropdown(null);
              }}
              onMouseLeave={() => {
                dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
              }}
            >
              <Link prefetch={false}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                  padding: "0.45rem 0.45rem",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 500,
                  fontSize: "0.82rem",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  transition: "all 200ms",
                  minHeight: "44px",
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
                {link.children && <ChevronDown size={13} />}
              </Link>

              {/* Desktop Dropdown */}
              {link.children && openDropdown === link.label && (
                link.label === "Visitors & Patients" ? (
                  /* Custom 2x2 Mega Menu */
                  <div
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 0.25rem)",
                      left: "-200px",
                      width: "600px",
                      background: "var(--color-surface)",
                      borderRadius: "var(--radius-xl)",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                      border: "1px solid var(--color-surface-border)",
                      padding: "1.25rem",
                      zIndex: 100,
                      animation: "fadeInDown 150ms ease",
                      marginTop: "-6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {/* CTA Banner full-width at top */}
                    <Link prefetch={false}
                      href="/services"
                      onClick={() => setOpenDropdown(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.75rem 1.25rem",
                        background: "linear-gradient(90deg, var(--color-primary-50) 0%, rgba(13,148,136,0.06) 100%)",
                        color: "var(--color-primary)",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        textDecoration: "none",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid rgba(0,107,182,0.15)",
                        transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "linear-gradient(90deg, var(--color-primary-100) 0%, rgba(13,148,136,0.12) 100%)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "linear-gradient(90deg, var(--color-primary-50) 0%, rgba(13,148,136,0.06) 100%)";
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <LayoutGrid size={15} style={{ flexShrink: 0 }} /> Explore All Services &amp; Patient Resources
                      </span>
                      <span style={{ fontWeight: 800 }}>Go to Services →</span>
                    </Link>

                    {/* 2x2 Grid of Groups with 1px Center Dividers */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                      {VISITORS_PATIENTS_GROUPS.map((group, idx) => {
                        const isRightCol = idx % 2 === 1;
                        const isBottomRow = idx >= 2;
                        const cellStyle: React.CSSProperties = {
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.4rem",
                          paddingLeft: isRightCol ? "1.25rem" : "0",
                          paddingRight: isRightCol ? "0" : "1.25rem",
                          paddingTop: isBottomRow ? "1.25rem" : "0",
                          paddingBottom: isBottomRow ? "0" : "1.25rem",
                          borderLeft: isRightCol ? "1px solid var(--color-surface-border)" : "none",
                          borderTop: isBottomRow ? "1px solid var(--color-surface-border)" : "none",
                        };
                        return (
                          <div key={group.title} style={cellStyle}>
                            <span
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: 800,
                                color: group.color,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                display: "block",
                                borderBottom: `2px solid ${group.color}25`,
                                paddingBottom: "0.25rem",
                                marginBottom: "0.25rem",
                              }}
                            >
                              {group.title}
                            </span>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                              {group.items.map((item) => (
                                <Link prefetch={false}
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setOpenDropdown(null)}
                                  style={{
                                    display: "block",
                                    padding: "0.45rem 0.6rem",
                                    borderRadius: "var(--radius-md)",
                                    textDecoration: "none",
                                    transition: "all 150ms",
                                    borderLeft: "2px solid transparent",
                                  }}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = group.bg;
                                    (e.currentTarget as HTMLElement).style.borderLeft = `2px solid ${group.color}`;
                                    const titleEl = (e.currentTarget as HTMLElement).querySelector(".item-title") as HTMLElement;
                                    if (titleEl) titleEl.style.color = group.color;
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = "transparent";
                                    (e.currentTarget as HTMLElement).style.borderLeft = "2px solid transparent";
                                    const titleEl = (e.currentTarget as HTMLElement).querySelector(".item-title") as HTMLElement;
                                    if (titleEl) titleEl.style.color = "var(--color-dark)";
                                  }}
                                >
                                  <div className="item-title" style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-dark)", transition: "color 150ms", marginBottom: "0.05rem" }}>
                                    {item.label}
                                  </div>
                                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", color: "var(--color-text-muted)", lineHeight: 1.3 }}>
                                    {item.desc}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Regular Dropdown */
                  <div
                    onMouseEnter={() => setOpenDropdown(link.label)}
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
                      marginTop: "-6px",
                      paddingTop: "10px",
                    }}
                  >
                    {link.children
                      .filter((child) => child.section === "cta")
                      .map((child) => (
                        <Link prefetch={false}
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.65rem 1rem",
                            background: "var(--color-primary-50)",
                            color: "var(--color-primary)",
                            fontFamily: "var(--font-ui)",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            textDecoration: "none",
                            borderRadius: "var(--radius-md)",
                            transition: "all 150ms",
                          }}
                        >
                          {child.label}
                          <span>→</span>
                        </Link>
                      ))}
                    <div style={{ margin: "0.35rem 0", height: "1px", background: "var(--color-surface-border)" }} />
                    <span
                      style={{
                        padding: "0.4rem 1rem",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "var(--color-text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                      }}
                    >
                      {dropdownSectionLabel(link.label)}
                    </span>
                    {link.children
                      .filter((child) => child.section === "item" || child.section === "dept")
                      .map((child) => (
                        <Link prefetch={false}
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          style={{
                            display: "block",
                            padding: "0.65rem 1rem",
                            paddingLeft: "0.85rem",
                            borderLeft: "2px solid transparent",
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
                            (e.currentTarget as HTMLElement).style.borderLeft = "2px solid var(--color-primary)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                            (e.currentTarget as HTMLElement).style.borderLeft = "2px solid transparent";
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                )
              )}
            </div>
          ))}
        </nav>

        {/* Right side actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Emergency call — desktop only */}
          <a
            href="tel:+8801898806050"
            className="btn-emergency emergency-nav-btn"
            style={{ fontSize: "0.82rem", padding: "0.55rem 0.9rem" }}
          >
            <Phone size={14} />
            Emergency
          </a>

          {/* Patient Login — mobile: icon+text button; desktop: full btn-primary */}
          <Link prefetch={false}
            href="/portal/login"
            className="btn-primary desktop-login-btn"
            style={{ fontSize: "0.875rem", padding: "0.6rem 1.1rem" }}
          >
            <User size={14} />
            Patient Login
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              background: isOpen ? "var(--color-primary-50)" : "none",
              border: "1.5px solid",
              borderColor: isOpen ? "var(--color-primary)" : "var(--color-surface-border)",
              color: isOpen ? "var(--color-primary)" : "var(--color-text-primary)",
              padding: "0.45rem",
              borderRadius: "var(--radius-md)",
              minHeight: "44px",
              minWidth: "44px",
              cursor: "pointer",
              transition: "all 200ms",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ───────────────────────────────────────── */}
      {isOpen && (
        <>
          {/* Click-away backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              animation: "fadeIn 200ms ease",
            }}
            aria-hidden="true"
          />
          <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 999,
            background: "rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "2px solid var(--color-primary)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            maxHeight: "calc(100vh - 7rem)",
            overflowY: "auto",
            boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
          }}
        >

          {/* Nav Links */}
          <div style={{ padding: "0.5rem 0" }}>
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.875rem 1.25rem",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                        color: "white",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        textAlign: "left",
                        minHeight: "unset",
                        transition: "background 150ms",
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        color="rgba(255,255,255,0.7)"
                        style={{
                          transform: mobileExpanded === link.label ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 200ms ease",
                          flexShrink: 0,
                        }}
                      />
                    </button>
                    {mobileExpanded === link.label && (
                      <div style={{ background: "rgba(0,0,0,0.2)" }}>
                        {link.label === "Visitors & Patients" ? (
                          <>
                            {/* All Services CTA */}
                            <Link prefetch={false}
                              key="all-services-mobile"
                              href="/services"
                              onClick={() => setIsOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.8rem 1.25rem",
                                margin: "0.75rem 1.25rem 0.25rem",
                                color: "var(--color-primary)",
                                fontFamily: "var(--font-ui)",
                                fontSize: "0.9rem",
                                fontWeight: 800,
                                textDecoration: "none",
                                background: "rgba(0, 107, 182, 0.14)",
                                border: "1px solid rgba(0, 107, 182, 0.3)",
                                borderLeft: "4px solid var(--color-primary)",
                                borderRadius: "var(--radius-md)",
                              }}
                            >
                              <ChevronRight size={14} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                              All Services &amp; Resources
                            </Link>

                            {/* Grouped lists */}
                            {VISITORS_PATIENTS_GROUPS.map((group) => (
                              <div key={group.title} style={{ padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                                <span
                                  style={{
                                    padding: "0.4rem 1.25rem 0.2rem 2rem",
                                    fontSize: "0.8rem",
                                    fontWeight: 800,
                                    color: group.color,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    display: "block",
                                  }}
                                >
                                  {group.title}
                                </span>
                                {group.items.map((item) => (
                                  <Link prefetch={false}
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.5rem",
                                      padding: "0.45rem 1.25rem 0.45rem 2.25rem",
                                      color: "rgba(255,255,255,0.9)",
                                      fontFamily: "var(--font-ui)",
                                      fontSize: "0.85rem",
                                      fontWeight: 500,
                                      textDecoration: "none",
                                      transition: "color 150ms",
                                    }}
                                  >
                                    <ChevronRight size={12} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0 }} />
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {link.children
                              .filter((child) => child.section === "cta")
                              .map((child) => (
                                <Link prefetch={false}
                                  key={`${child.label}-${child.href}`}
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.25rem 0.75rem 2rem",
                                    color: "var(--color-primary)",
                                    fontFamily: "var(--font-ui)",
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                                    transition: "color 150ms",
                                  }}
                                >
                                  <ChevronRight size={13} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                  {child.label}
                                </Link>
                              ))}
                            <span
                              style={{
                                padding: "0.5rem 1.25rem 0.25rem 2rem",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                color: "rgba(255,255,255,0.45)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                display: "block",
                              }}
                            >
                              {dropdownSectionLabel(link.label)}
                            </span>
                            {link.children
                              .filter((child) => child.section === "item" || child.section === "dept")
                              .map((child) => (
                                <Link prefetch={false}
                                  key={`${child.label}-${child.href}`}
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.25rem 0.75rem 2rem",
                                    color: "rgba(255,255,255,0.85)",
                                    fontFamily: "var(--font-ui)",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                                    transition: "color 150ms",
                                  }}
                                >
                                  <ChevronRight size={13} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                                  {child.label}
                                </Link>
                              ))}
                          </>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link prefetch={false}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.875rem 1.25rem",
                      color: "white",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                      transition: "color 150ms",
                    }}
                  >
                    {link.label}
                    <ChevronRight size={16} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Patient Login CTA inside drawer */}
          <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <Link prefetch={false}
              href="/portal/login"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.85rem 1rem",
                background: "var(--color-primary)",
                color: "white",
                borderRadius: "var(--radius-lg)",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              }}
            >
              <User size={16} />
              Patient Login
            </Link>
          </div>

          {/* Location */}
          <div style={{ padding: "0.75rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <a
              href="https://www.google.com/maps/place/Mitosis+Lab+Ltd/@23.7987161,90.3519292,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c100172e4cfd:0x6af678895c53a755!8m2!3d23.7987161!4d90.3519292!16s%2Fg%2F11wwgj972y"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none" }}
            >
              <div style={{
                width: "2.25rem", height: "2.25rem", borderRadius: "50%",
                background: "rgba(0,86,179,0.18)",
                border: "1px solid rgba(0,86,179,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <MapPin size={15} color="var(--color-secondary)" />
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontWeight: 500, marginBottom: "0.1rem", fontFamily: "var(--font-ui)" }}>Our Location</div>
                <div style={{ fontSize: "0.88rem", color: "white", fontWeight: 600, fontFamily: "var(--font-ui)" }}>Mirpur 1, Dhaka, Bangladesh</div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-brand-green)", fontWeight: 600, marginTop: "0.15rem", fontFamily: "var(--font-ui)" }}>Get Directions →</div>
              </div>
            </a>
          </div>

          {/* Emergency CTA at bottom */}
          <div style={{ padding: "1rem 1.25rem 1.5rem" }}>
            <a
              href="tel:+8801898806050"
              className="btn-emergency"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.95rem" }}
            >
              <Phone size={16} />
              Call Emergency: +880 1898-806050
            </a>
          </div>
        </div>
        </>
      )}

      {/* ── TOAST NOTIFICATION ──────────────────────────────────── */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10, 30, 61, 0.95)",
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "var(--radius-lg)",
            fontSize: "0.95rem",
            fontWeight: 600,
            zIndex: 2000,
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            maxWidth: "90vw",
            animation: "slideUp 300ms cubic-bezier(0.4,0,0.2,1)",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          বাংলা সংস্করণ শীঘ্রই আসছে — Bangla version coming in Phase 2 🚀
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .nav-topbar {
          max-height: 50px;
          opacity: 1;
          padding: 0.25rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: max-height 300ms ease, opacity 300ms ease, padding 300ms ease, border-color 300ms ease;
          will-change: max-height, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .topbar-scrolled {
          max-height: 0 !important;
          opacity: 0 !important;
          padding: 0 !important;
          border-bottom: 1px solid transparent !important;
        }
        @media (max-width: 1024px) {
          .desktop-nav        { display: none !important; }
          .mobile-menu-btn    { display: flex !important; }
          .emergency-nav-btn  { display: none !important; }
          .desktop-login-btn  { display: none !important; }
        }
        @media (max-width: 767px) {
          /* Restore topbar on mobile but make it very thin */
          .nav-topbar { 
            padding: 0 !important; 
          }
          .nav-topbar .container {
            padding-top: 0.35rem;
            padding-bottom: 0.35rem;
            flex-wrap: nowrap !important;
          }
          .nav-topbar-phone {
            font-size: 0.72rem !important;
          }
          .nav-topbar-lang {
            padding: 0.2rem 0.6rem !important;
            font-size: 0.68rem !important;
          }
        }
        @media (max-width: 394px) {
          /* Scale down slightly on very small screens to avoid wrapping */
          .nav-topbar .container {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            gap: 0.25rem !important;
          }
          .nav-topbar-phone {
            font-size: 0.68rem !important;
            letter-spacing: -0.02em !important;
          }
          .nav-topbar-lang {
            padding: 0.15rem 0.5rem !important;
            font-size: 0.64rem !important;
          }
        }
      `}</style>
    </header>
  );
}
