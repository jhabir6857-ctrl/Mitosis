"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Calendar, Users, ArrowRight } from "lucide-react";
import { mockDoctors } from "@/app/api/mock/doctors/route";

export default function DoctorSlider() {
  const [paused, setPaused] = useState(false);
  const displayDoctors = [...mockDoctors, ...mockDoctors];

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>Our Specialists</div>
          <h2 className="section-title" style={{ marginBottom: "0.25rem" }}>Meet Our Doctors</h2>
          <p style={{ color: "var(--color-text-secondary)" }}>Experienced, caring specialists ready for your consultation.</p>
        </div>
        <Link href="/doctors" className="btn-secondary" style={{ fontSize: "0.875rem" }}>
          View All <ArrowRight size={15} />
        </Link>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Doctors Slider */}
      <div
        style={{
          overflow: "hidden",
          width: "100%",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            animation: "scroll 30s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {displayDoctors.map((doc, index) => (
            <div
              key={`${doc.id}-${index}`}
              className="card"
              style={{
                minWidth: "320px", // Needed to keep cards from squishing in flex
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 200ms",
                border: "1px solid var(--color-surface-border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-xl)", background: "linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", flexShrink: 0 }}>
                  👨‍⚕️
                </div>
                <div>
                  {doc.isAvailableToday && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.2rem" }}>
                      <span className="status-dot" style={{ width: "7px", height: "7px" }} />
                      <span style={{ fontSize: "0.7rem", color: "var(--color-secondary-dark)", fontWeight: 600 }}>Available Today</span>
                    </div>
                  )}
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 800, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
                    {doc.name}
                  </h3>
                </div>
              </div>

              {/* Qualifications */}
              <p style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", marginBottom: "0.625rem", lineHeight: 1.4 }}>
                {doc.qualifications}
              </p>

              {/* Department Badge */}
              <div className="badge badge-primary" style={{ fontSize: "0.72rem", marginBottom: "1rem" }}>
                {doc.department}
              </div>

              {/* Stats Row */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", padding: "0.75rem", background: "var(--color-surface-alt)", borderRadius: "var(--radius-lg)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", justifyContent: "center" }}>
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{doc.rating}</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: "0.1rem" }}>Rating</div>
                </div>
                <div style={{ width: "1px", background: "var(--color-surface-border)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", justifyContent: "center" }}>
                    <Calendar size={12} color="var(--color-primary)" />
                    <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{doc.experience}</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: "0.1rem" }}>Yrs Exp</div>
                </div>
                <div style={{ width: "1px", background: "var(--color-surface-border)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", justifyContent: "center" }}>
                    <Users size={12} color="var(--color-secondary)" />
                    <span style={{ fontWeight: 800, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{(doc.totalPatients / 1000).toFixed(1)}k</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", marginTop: "0.1rem" }}>Patients</div>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/appointment?doctor=${doc.id}`}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "0.65rem 1rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Calendar size={14} /> Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}