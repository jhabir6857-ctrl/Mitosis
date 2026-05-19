"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Upload } from "lucide-react";

export default function MrdServicesClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    registrationNumber: "",
    dateOfLastVisit: "",
    purpose: "",
    nidFile: null as File | null,
    additionalNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate random 6-digit reference number
    const ref = Math.floor(100000 + Math.random() * 900000);
    setReferenceNumber(`MRD-${ref}`);
    setFormSubmitted(true);
    // Reset form after 2 seconds for demo
    setTimeout(() => {
      setFormData({ fullName: "", phone: "", registrationNumber: "", dateOfLastVisit: "", purpose: "", nidFile: null, additionalNotes: "" });
    }, 100);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setFormData({ fullName: "", phone: "", registrationNumber: "", dateOfLastVisit: "", purpose: "", nidFile: null, additionalNotes: "" });
  };

  return (
    <div>
      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0a1e3d 0%, var(--color-primary) 100%)",
          color: "white",
          padding: "4rem 1rem 5rem",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "var(--radius-lg)",
              padding: "0.5rem 1rem",
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            🏥 Medical Records Department
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 900,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Official Medical Records Services
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.9)",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.6,
            }}
          >
            Request certified copies of your complete medical history for visa applications, insurance claims, and hospital transfers.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="#request-form"
              style={{
                background: "white",
                color: "var(--color-primary)",
                padding: "0.875rem 2rem",
                borderRadius: "var(--radius-lg)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Request Online →
            </Link>
            <a
              href="tel:+8801898806050"
              style={{
                background: "transparent",
                color: "white",
                padding: "0.875rem 2rem",
                borderRadius: "var(--radius-lg)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1rem",
                border: "2px solid white",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 200ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ── WHO NEEDS THIS ──────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)", padding: "4rem 1rem" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            Who Needs MRD Services?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "🛂",
                title: "Visa Applications",
                description: "Embassies require certified medical records as part of your travel documentation.",
                bgColor: "#e0f2fe",
              },
              {
                icon: "🏦",
                title: "Insurance Claims",
                description: "Submit verified records to process health insurance reimbursements.",
                bgColor: "#dbeafe",
              },
              {
                icon: "🏥",
                title: "Hospital Transfers",
                description: "Transfer your complete medical history to another hospital or specialist.",
                bgColor: "#fef3c7",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: card.bgColor,
                  padding: "2rem",
                  borderRadius: "var(--radius-xl)",
                  textAlign: "center",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{card.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUIRED DOCUMENTS ──────────────────────────────────── */}
      <section style={{ background: "#f8fafc", padding: "4rem 1rem" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            What You Need to Bring
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              marginBottom: "2rem",
            }}
          >
            {/* Column 1 */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                  color: "#10b981",
                }}
              >
                For the Patient (Collecting Yourself)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "Original NID Card (National Identity Card)",
                  "Original payment receipt from Mitosis Lab",
                  "Patient registration number (found on your report)",
                  "Written request letter stating the purpose",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <CheckCircle2 size={20} style={{ color: "#10b981", flexShrink: 0, marginTop: "0.2rem" }} />
                    <span style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                  color: "#0ea5e9",
                }}
              >
                For Authorized Representative
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  "Patient's NID Card (photocopy)",
                  "Representative's original NID Card",
                  "Signed authorization letter from the patient",
                  "Original payment receipt",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <CheckCircle2 size={20} style={{ color: "#0ea5e9", flexShrink: 0, marginTop: "0.2rem" }} />
                    <span style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div
            style={{
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <AlertCircle size={24} style={{ color: "#d97706", flexShrink: 0 }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#78350f" }}>
              <strong>Incomplete documents will result in delayed processing.</strong> Please verify all requirements before visiting.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROCESSING TIME & FEES TABLE ──────────────────────────────────── */}
      <section style={{ background: "var(--color-surface)", padding: "4rem 1rem" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              marginBottom: "3rem",
              textAlign: "center",
            }}
          >
            Processing Time & Fees
          </h2>
          <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <thead>
                <tr style={{ background: "var(--color-primary)", color: "white" }}>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    Service Type
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: 700, fontSize: "0.95rem" }}>
                    Processing Time
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: 700, fontSize: "0.95rem" }}>
                    Fee
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: 700, fontSize: "0.95rem" }}>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    service: "Standard Request",
                    time: "3–5 Business Days",
                    fee: "৳ 500",
                    notes: "Printed & stamped copy",
                    highlight: false,
                  },
                  {
                    service: "Urgent Request",
                    time: "24 Hours",
                    fee: "৳ 1,200",
                    notes: "Subject to availability",
                    highlight: true,
                  },
                  {
                    service: "Digital Copy (PDF)",
                    time: "Same Day",
                    fee: "৳ 300",
                    notes: "Sent via email",
                    highlight: false,
                  },
                  {
                    service: "Complete History",
                    time: "5–7 Business Days",
                    fee: "৳ 1,500",
                    notes: "All records since registration",
                    highlight: false,
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "rgba(0,0,0,0.02)" : "white",
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                      borderLeft: row.highlight ? "4px solid #fbbf24" : "none",
                    }}
                  >
                    <td style={{ padding: "1rem", fontWeight: 600 }}>{row.service}</td>
                    <td style={{ padding: "1rem" }}>{row.time}</td>
                    <td style={{ padding: "1rem", fontWeight: 700 }}>{row.fee}</td>
                    <td style={{ padding: "1rem", color: "#64748b", fontSize: "0.9rem" }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
            * Fees are subject to change. Additional printing charges may apply for records exceeding 50 pages.
          </p>
        </div>
      </section>

      {/* ── ONLINE REQUEST FORM ──────────────────────────────────── */}
      <section id="request-form" style={{ background: "#f8fafc", padding: "4rem 1rem" }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Submit Your Request Online
          </h2>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: "3rem", fontSize: "1.05rem" }}>
            Fill out this form and we will prepare your documents before you arrive.
          </p>

          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              background: "white",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.75rem 1rem",
                        width: "100%",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,86,179,0.15)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.75rem 1rem",
                        width: "100%",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,86,179,0.15)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Patient Registration Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.registrationNumber}
                      onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                      style={{
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.75rem 1rem",
                        width: "100%",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,86,179,0.15)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      Date of Last Visit *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfLastVisit}
                      onChange={(e) => setFormData({ ...formData, dateOfLastVisit: e.target.value })}
                      style={{
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "var(--radius-md)",
                        padding: "0.75rem 1rem",
                        width: "100%",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,86,179,0.15)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Purpose of Request *
                  </label>
                  <select
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    style={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.75rem 1rem",
                      width: "100%",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                      background: "white",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,86,179,0.15)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <option value="">Select a purpose</option>
                    <option value="Visa Application">Visa Application</option>
                    <option value="Insurance Claim">Insurance Claim</option>
                    <option value="Hospital Transfer">Hospital Transfer</option>
                    <option value="Personal Record">Personal Record</option>
                    <option value="Legal Purpose">Legal Purpose</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Row 4 */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.75rem",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Upload NID Card *
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed rgba(0,86,179,0.3)",
                      borderRadius: "var(--radius-md)",
                      padding: "2rem",
                      cursor: "pointer",
                      transition: "all 200ms",
                      background: "rgba(0,86,179,0.02)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,86,179,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,86,179,0.02)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,86,179,0.3)";
                    }}
                  >
                    <input
                      type="file"
                      required
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFormData({ ...formData, nidFile: e.target.files[0] });
                        }
                      }}
                      style={{ display: "none" }}
                    />
                    <Upload size={24} style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }} />
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-primary)" }}>
                      {formData.nidFile ? formData.nidFile.name : "Click to upload or drag & drop your NID card"}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.5rem" }}>
                      (Image or PDF)
                    </span>
                  </label>
                </div>

                {/* Row 5 */}
                <div style={{ marginBottom: "2rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    rows={3}
                    placeholder="Any specific pages or date ranges you need..."
                    style={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "var(--radius-md)",
                      padding: "0.75rem 1rem",
                      width: "100%",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(0,86,179,0.15)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "var(--color-primary)",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 200ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.9";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Processing my Request →
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "1rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                    color: "#10b981",
                  }}
                >
                  Request Submitted Successfully!
                </h3>
                <p style={{ color: "#64748b", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  We will contact you at your phone number within 24 hours to confirm your request. Your reference number is <strong>{referenceNumber}</strong>.
                </p>
                <button
                  onClick={handleReset}
                  style={{
                    background: "var(--color-primary)",
                    color: "white",
                    padding: "0.875rem 2rem",
                    borderRadius: "var(--radius-md)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 200ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── VISIT US IN PERSON ──────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0a1e3d, var(--color-primary))",
          color: "white",
          padding: "4rem 1rem",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 800,
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Prefer to Visit in Person?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            {[
              { icon: "📍", text: "Mirpur-1, Dhaka" },
              { icon: "🕐", text: "Sat–Thu: 8:00 AM – 5:00 PM" },
              { icon: "📞", text: "+880 1898-806050" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <p style={{ fontSize: "1.05rem" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a
              href="https://www.google.com/maps/place/Mitosis+Lab+Ltd/@23.7987161,90.3519292,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c100172e4cfd:0x6af678895c53a755!8m2!3d23.7987161!4d90.3519292!16s%2Fg%2F11wwgj972y"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "white",
                color: "var(--color-primary)",
                padding: "0.875rem 2rem",
                borderRadius: "var(--radius-lg)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 200ms",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
