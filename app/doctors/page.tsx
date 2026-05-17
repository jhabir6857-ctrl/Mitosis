"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Star, Filter, ChevronDown, Calendar, Users } from "lucide-react";
import { mockDoctors, mockDepartments } from "@/app/api/mock/doctors/route";

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockDoctors.filter((doc) => {
      const matchSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = selectedDept === "all" || doc.departmentId === selectedDept;
      const matchAvail =
        availabilityFilter === "all" ||
        (availabilityFilter === "today" && doc.isAvailableToday);
      return matchSearch && matchDept && matchAvail;
    });
  }, [searchQuery, selectedDept, availabilityFilter]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface-alt)" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0d1b2e, #0a2a5e)", padding: "3rem 0 2rem" }}>
        <div className="container">
          <div className="badge badge-online" style={{ background: "rgba(32,178,170,0.15)", color: "var(--color-secondary)", marginBottom: "1rem" }}>
            Our Specialists
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.75rem", fontWeight: 900, color: "white", marginBottom: "0.75rem" }}>
            Find a Doctor
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "520px" }}>
            Search by name, specialty, or department to find the right specialist for you.
          </p>

          {/* Search Bar */}
          <div style={{ marginTop: "1.75rem", position: "relative", maxWidth: "600px" }}>
            <Search size={20} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              className="input-field"
              type="text"
              placeholder='Search by doctor name or specialty (e.g., "Cardiology")'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "3rem", fontSize: "1rem", borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.95)" }}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>

          {/* LEFT: Filters Sidebar */}
          <aside style={{ width: "260px", flexShrink: 0, position: "sticky", top: "5.5rem" }}>
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <Filter size={16} color="var(--color-primary)" />
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)" }}>
                  Filter Results
                </h2>
              </div>

              {/* Availability */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                  ⏰ Availability
                </h3>
                {[
                  { value: "all", label: "All Doctors" },
                  { value: "today", label: "Available Today" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.75rem", borderRadius: "var(--radius-md)", cursor: "pointer", marginBottom: "0.25rem", background: availabilityFilter === opt.value ? "var(--color-primary-50)" : "transparent", transition: "background 150ms" }}
                  >
                    <input
                      type="radio"
                      name="availability"
                      value={opt.value}
                      checked={availabilityFilter === opt.value}
                      onChange={() => setAvailabilityFilter(opt.value)}
                      style={{ accentColor: "var(--color-primary)", width: "1rem", height: "1rem" }}
                    />
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: availabilityFilter === opt.value ? 600 : 400, color: availabilityFilter === opt.value ? "var(--color-primary)" : "var(--color-text-primary)" }}>
                      {opt.label}
                    </span>
                    {opt.value === "today" && (
                      <span className="status-dot" style={{ marginLeft: "auto" }} />
                    )}
                  </label>
                ))}
              </div>

              {/* Department */}
              <div>
                <h3 style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                  🏥 Department
                </h3>
                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.75rem", borderRadius: "var(--radius-md)", cursor: "pointer", marginBottom: "0.25rem", background: selectedDept === "all" ? "var(--color-primary-50)" : "transparent" }}>
                  <input type="radio" name="dept" value="all" checked={selectedDept === "all"} onChange={() => setSelectedDept("all")} style={{ accentColor: "var(--color-primary)", width: "1rem", height: "1rem" }} />
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", fontWeight: selectedDept === "all" ? 600 : 400, color: selectedDept === "all" ? "var(--color-primary)" : "var(--color-text-primary)" }}>All Departments</span>
                </label>
                {mockDepartments.map((dept) => (
                  <label
                    key={dept.id}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.75rem", borderRadius: "var(--radius-md)", cursor: "pointer", marginBottom: "0.25rem", background: selectedDept === dept.id ? "var(--color-primary-50)" : "transparent", transition: "background 150ms" }}
                  >
                    <input type="radio" name="dept" value={dept.id} checked={selectedDept === dept.id} onChange={() => setSelectedDept(dept.id)} style={{ accentColor: "var(--color-primary)", width: "1rem", height: "1rem" }} />
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.875rem", fontWeight: selectedDept === dept.id ? 600 : 400, color: selectedDept === dept.id ? "var(--color-primary)" : "var(--color-text-primary)", lineHeight: 1.3 }}>
                      {dept.icon} {dept.name}
                    </span>
                  </label>
                ))}
              </div>

              {/* Reset */}
              {(selectedDept !== "all" || availabilityFilter !== "all" || searchQuery) && (
                <button
                  onClick={() => { setSelectedDept("all"); setAvailabilityFilter("all"); setSearchQuery(""); }}
                  style={{ marginTop: "1.25rem", width: "100%", background: "none", border: "1px solid var(--color-surface-muted)", borderRadius: "var(--radius-md)", padding: "0.6rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-ui)", fontSize: "0.875rem", cursor: "pointer" }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* RIGHT: Doctor Cards */}
          <div style={{ flex: 1 }}>
            {/* Results header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-text-primary)" }}>
                  {filtered.length} Doctor{filtered.length !== 1 ? "s" : ""} Found
                </span>
                {selectedDept !== "all" && (
                  <span style={{ marginLeft: "0.5rem", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                    in {mockDepartments.find(d => d.id === selectedDept)?.name}
                  </span>
                )}
              </div>
              <div className="badge badge-online">
                <span className="status-dot" style={{ marginRight: "0.4rem" }} />
                {mockDoctors.filter(d => d.isAvailableToday).length} Available Today
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>No doctors found</h3>
                <p style={{ color: "var(--color-text-secondary)" }}>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {filtered.map((doc) => (
                  <div key={doc.id} className="card" style={{ padding: "1.75rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    {/* Avatar */}
                    <div style={{ width: "88px", height: "88px", borderRadius: "var(--radius-xl)", background: "linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", flexShrink: 0 }}>
                      👨‍⚕️
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                          {doc.name}
                        </h2>
                        {doc.isAvailableToday && (
                          <span className="badge badge-online" style={{ fontSize: "0.72rem" }}>
                            <span className="status-dot" style={{ marginRight: "0.3rem", width: "7px", height: "7px" }} />
                            Available Today
                          </span>
                        )}
                      </div>
                      <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{doc.qualifications}</p>
                      <div className="badge badge-primary" style={{ marginBottom: "0.75rem", fontSize: "0.78rem" }}>{doc.department}</div>

                      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Star size={14} color="#f59e0b" fill="#f59e0b" />
                          <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>{doc.rating}</span>
                          <span style={{ color: "var(--color-text-muted)", fontSize: "0.82rem" }}>rating</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Calendar size={14} color="var(--color-primary)" />
                          <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{doc.experience} yrs experience</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Users size={14} color="var(--color-secondary)" />
                          <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{doc.totalPatients.toLocaleString()} patients</span>
                        </div>
                      </div>

                      {/* Available Slots Preview */}
                      {doc.isAvailableToday && (
                        <div style={{ marginTop: "1rem" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                            🕐 Today&apos;s Available Slots:
                          </span>
                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {doc.slots.slice(0, 4).map((slot) => (
                              <span key={slot} style={{ padding: "0.3rem 0.75rem", borderRadius: "var(--radius-full)", background: "var(--color-secondary-50)", color: "var(--color-secondary-dark)", fontSize: "0.8rem", fontWeight: 600, border: "1px solid var(--color-secondary)", fontFamily: "var(--font-ui)" }}>
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-end", flexShrink: 0 }}>
                      <Link href={`/appointment?doctor=${doc.id}`} className="btn-primary" style={{ whiteSpace: "nowrap", fontSize: "0.9rem" }}>
                        <Calendar size={15} /> Book Appointment
                      </Link>
                      <Link href={`/doctors/${doc.id}`} className="btn-secondary" style={{ whiteSpace: "nowrap", fontSize: "0.875rem" }}>
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
