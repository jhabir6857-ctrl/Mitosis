import Link from "next/link";
import { Search, Calendar, Download, ArrowRight, CheckCircle, Clock, Users, Award, Shield, Activity } from "lucide-react";
import { mockDepartments } from "./api/mock/doctors/route";
import DoctorSlider from "@/components/DoctorSlider";
import TestimonialSlider from "@/components/TestimonialSlider";
import ParallaxStats from "@/components/ParallaxStats";
import HeroSlider from "@/components/HeroSlider";
import { getDeptMeta } from "@/lib/departmentIcons";

const healthPackages = [
  {
    name: "Diabetic Profile",
    price: "৳ 1,200",
    originalPrice: "৳ 1,800",
    tests: ["Fasting Blood Sugar", "HbA1c", "Lipid Profile", "Kidney Function", "Urine R/E"],
    badge: "Most Popular",
    badgeColor: "var(--color-primary)",
  },
  {
    name: "Whole Body Checkup",
    price: "৳ 2,500",
    originalPrice: "৳ 3,800",
    tests: ["CBC", "Blood Sugar", "Liver Function", "Kidney Function", "Thyroid (TSH)", "Chest X-Ray", "ECG"],
    badge: "Best Value",
    badgeColor: "var(--color-secondary)",
  },
  {
    name: "Women's Wellness",
    price: "৳ 1,800",
    originalPrice: "৳ 2,600",
    tests: ["CBC", "Thyroid Panel", "Calcium", "Vitamin D", "Iron Studies", "Pap Smear"],
    badge: "For Women",
    badgeColor: "#9333ea",
  },
  {
    name: "Heart Risk Screening",
    price: "৳ 1,500",
    originalPrice: "৳ 2,200",
    tests: ["Lipid Profile", "ECG", "Blood Sugar", "Blood Pressure", "Homocysteine"],
    badge: "Heart Health",
    badgeColor: "#dc2626",
  },
];


const stats = [
  { icon: Users, value: "50,000+", label: "Patients Served" },
  { icon: Award, value: "15+", label: "Years of Service" },
  { icon: CheckCircle, value: "200+", label: "Tests Available" },
  { icon: Clock, value: "24/7", label: "Emergency Service" },
];

export default function HomePage() {
  return (
    <div>

      {/* ======= HERO SLIDER ======= */}
      <HeroSlider />

      {/* ======= QUICK ACTION TILES — overlap the hero bottom edge ======= */}
      <section className="qab-section">
        <div className="container">
          <div className="qab-grid">
            {[
              {
                icon: Search,
                title: "Find a Doctor",
                desc: "Search 50+ specialists across all departments",
                href: "/doctors",
                color: "#006BB6",
                bg: "rgba(0,107,182,0.08)",
                id: "qab-find-doctor",
              },
              {
                icon: Calendar,
                title: "Book Appointment",
                desc: "Home collection & walk-in, same day",
                href: "/appointment",
                color: "#3CA544",
                bg: "rgba(60,165,68,0.08)",
                id: "qab-book-appointment",
              },
              {
                icon: Download,
                title: "Download Reports",
                desc: "Instant, secure access to your results",
                href: "/portal/login",
                color: "#7c3aed",
                bg: "rgba(124,58,237,0.08)",
                id: "qab-download-reports",
              },
              {
                icon: Activity,
                title: "MRD Services",
                desc: "Medical records & digital report access",
                href: "/mrd-services",
                color: "#dc2626",
                bg: "rgba(220,38,38,0.08)",
                id: "qab-mrd-service",
              },
            ].map(({ icon: Icon, title, desc, href, color, bg, id }) => (
              <Link key={id} id={id} href={href} className="qab-tile"
                style={{ "--tile-color": color, "--tile-bg": bg } as React.CSSProperties}>
                {/* Colored top accent bar */}
                <div className="qab-tile-top-bar" style={{ background: color }} />
                {/* Icon circle */}
                <div className="qab-tile-icon-wrap" style={{ background: bg }}>
                  <Icon size={30} color={color} strokeWidth={1.75} />
                </div>
                <div className="qab-tile-body">
                  <span className="qab-tile-title">{title}</span>
                  <span className="qab-tile-desc">{desc}</span>
                </div>
                <div className="qab-tile-arrow" style={{ color }}>
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======= STATS STRIP ======= */}
      <section className="stats-strip-section">
        <div className="container">
          <div className="stats-strip-grid">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="stats-strip-item">
                <div className="stats-strip-icon-wrap">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <div className="stats-strip-value">{value}</div>
                <div className="stats-strip-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= HERO SCROLL REVEAL - Precision Diagnostics Text ======= */}
      <section className="hero-scroll-reveal section" style={{ background: "linear-gradient(135deg, #0d1b2e 0%, #0a2a5e 50%, #0d3a7a 100%)", position: "relative", overflow: "hidden" }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(60,165,68,0.10) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-30%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,107,182,0.15) 0%, transparent 70%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left: Copy */}
            <div className="w-full md:w-1/2">
              <div className="badge badge-online" style={{ marginBottom: "1.25rem" }}>
                <span className="status-dot" style={{ marginRight: "0.5rem" }} />
                Trusted by 50,000+ patients
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  color: "white",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                }}
              >
                Precision
                <span style={{ display: "block" }}>Diagnostics.</span>
                <span style={{ display: "block", background: "linear-gradient(90deg, var(--color-secondary), #48e8e0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Compassionate Care.
                </span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(1rem, 3vw, 1.15rem)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "480px" }}>
                From a simple blood test to a full-body MRI — we deliver world-class diagnostic accuracy with results you can access instantly, from anywhere.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/appointment" className="btn-primary" style={{ fontSize: "1rem" }}>
                  Book Appointment <ArrowRight size={18} />
                </Link>
                <a href="tel:+8801898806050" className="btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>
                  📞 Call Us
                </a>
              </div>
            </div>

            {/* Right: Action Card */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div
                className="card w-full max-w-md"
                style={{
                  padding: "2rem",
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--color-text-primary)" }}>
                  How can we help you today?
                </h3>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Choose what you need — we will guide you from here.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { icon: Search, title: "Find a Test or Doctor", desc: "Search 200+ tests & 50+ specialists", href: "/doctors", color: "var(--color-primary)" },
                    { icon: Calendar, title: "Book Home Sample Collection", desc: "We come to you — free pickup in Dhaka", href: "/appointment?type=home", color: "var(--color-secondary)" },
                    { icon: Download, title: "Download Lab Reports", desc: "Securely access your test results", href: "/portal/login", color: "#9333ea" },
                  ].map(({ icon: Icon, title, desc, href, color }) => (
                    <Link
                      key={title}
                      href={href}
                      className="card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1.1rem 1.25rem",
                        textDecoration: "none",
                        border: `2px solid var(--color-surface-border)`,
                        minHeight: "56px",
                      }}
                    >
                      <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "var(--radius-lg)", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={20} color={color} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)" }}>{title}</div>
                        <div style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>{desc}</div>
                      </div>
                      <ArrowRight size={16} color="var(--color-text-muted)" style={{ marginLeft: "auto", flexShrink: 0 }} />
                    </Link>
                  ))}
                </div>
                <div style={{ marginTop: "1.25rem", padding: "0.875rem 1rem", borderRadius: "var(--radius-lg)", background: "var(--color-surface-alt)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Shield size={18} color="var(--color-success)" />
                  <span style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>
                    <strong style={{ color: "var(--color-text-primary)" }}>SSL Secured</strong> — Your health data is always encrypted and private.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= DEPARTMENTS GRID ======= */}
      <section className="section" style={{ background: "var(--color-surface-alt)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>Centers of Excellence</div>
            <h2 className="section-title">Find Care By Department</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              We use plain language so you can find exactly what you need — fast.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {mockDepartments.map((dept) => {
              const { Icon, color, bg } = getDeptMeta(dept.id);
              return (
                <Link
                  key={dept.id}
                  href={`/doctors?department=${dept.id}`}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "1.75rem 1.25rem",
                    textDecoration: "none",
                    gap: "0.875rem",
                    minHeight: "56px",
                    transition: "all 250ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div style={{ width: "52px", height: "52px", borderRadius: "var(--radius-xl)", background: bg, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 250ms cubic-bezier(0.4,0,0.2,1)" }}>
                    <Icon size={26} color={color} strokeWidth={1.75} />
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.875rem", color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                    {dept.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                    {dept.doctorCount} Specialists
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/doctors" className="btn-secondary">
              View All Departments & Doctors <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======= HEALTH PACKAGES ======= */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="badge badge-success" style={{ marginBottom: "1rem" }}>Smart Health Packages</div>
            <h2 className="section-title">Affordable Wellness Packages</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Everything bundled. No hidden costs. Book online and get tested at home or at our center.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {healthPackages.map((pkg) => (
              <div key={pkg.name} className="card" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    {pkg.name}
                  </h3>
                  <span style={{ background: pkg.badgeColor, color: "white", borderRadius: "var(--radius-full)", padding: "0.2rem 0.65rem", fontSize: "0.7rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                    {pkg.badge}
                  </span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {pkg.tests.map((test) => (
                    <li key={test} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                      <CheckCircle size={14} color="var(--color-success)" style={{ flexShrink: 0 }} />
                      {test}
                    </li>
                  ))}
                </ul>
                <div style={{ borderTop: "1px solid var(--color-surface-border)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.4rem", color: "var(--color-primary)" }}>{pkg.price}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", textDecoration: "line-through" }}>{pkg.originalPrice}</div>
                  </div>
                  <Link href="/appointment" className="btn-primary" style={{ padding: "0.65rem 1.25rem", fontSize: "0.875rem" }}>
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PARALLAX STATS ======= */}
      <ParallaxStats />

      {/* ======= FEATURED DOCTORS SLIDER ======= */}
      <section className="section" style={{ background: "var(--color-surface-alt)", overflow: "hidden" }}>
        <div className="container">
          <DoctorSlider />
        </div>
      </section>

      {/* ======= TRUST & TECHNOLOGY ======= */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <div className="badge badge-primary" style={{ marginBottom: "1rem" }}>Why Choose Us</div>
              <h2 className="section-title">Technology You Can Trust</h2>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                We use the world&apos;s latest diagnostic equipment to deliver accuracy you can rely on.
              </p>
              {[
                { icon: "🔬", title: "Digital Pathology Analyzers", desc: "Automated CBC, blood chemistry, and urine analysis with ±2% accuracy." },
                { icon: "🏥", title: "High-Resolution MRI & CT Scan", desc: "1.5 Tesla MRI for precise neurological and orthopedic imaging." },
                { icon: "🧫", title: "ISO-Certified Laboratory", desc: "All tests follow international quality control standards." },
                { icon: "📱", title: "Instant Digital Reports", desc: "Results delivered securely to your patient portal within hours." },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "var(--radius-xl)", background: "var(--color-primary-50)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0, minHeight: "unset" }}>{icon}</div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "0.25rem" }}>{title}</h4>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              {[
                { label: "ISO 15189", sub: "Medical Laboratories", color: "var(--color-primary)" },
                { label: "DGDA", sub: "Bangladesh Approved", color: "var(--color-secondary)" },
                { label: "CAP", sub: "College of American Pathologists", color: "#9333ea" },
                { label: "24/7", sub: "Emergency Diagnostics", color: "var(--color-danger)" },
              ].map(({ label, sub, color }) => (
                <div key={label} className="card" style={{ padding: "1.75rem", textAlign: "center", background: `${color}08`, borderColor: `${color}30` }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.75rem", color }}>{label}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "0.5rem", lineHeight: 1.4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======= TESTIMONIALS ======= */}
      <section className="section" style={{ background: "var(--color-surface-alt)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="badge badge-success" style={{ marginBottom: "1rem" }}>Patient Reviews</div>
            <h2 className="section-title">What Our Patients Say</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Real experiences from real patients in Dhaka.
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* ======= BOOKING CTA ======= */}
      <section style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, #003d82 100%)", padding: "5rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 6vw, 2.5rem)", fontWeight: 900, color: "white", marginBottom: "1rem" }}>
            Ready to take control of your health?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Book an appointment in under 2 minutes — no passwords, no complications.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/appointment" style={{ background: "white", color: "var(--color-primary)", borderRadius: "var(--radius-lg)", padding: "1rem 2.25rem", fontWeight: 800, textDecoration: "none", fontSize: "1.05rem", minHeight: "3rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
              <Calendar size={18} /> Book Appointment
            </Link>
            <Link href="/portal/login" className="btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)", fontSize: "1.05rem" }}>
              <Download size={18} /> Download My Reports
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
