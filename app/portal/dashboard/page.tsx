"use client";

import Link from "next/link";
import { Download, Bell, FileText, Calendar, LayoutDashboard, ClipboardList, LogOut, ChevronRight, Eye, TrendingUp } from "lucide-react";

const mockPatient = {
  name: "Rahim Ahmed",
  phone: "+880 1812345678",
  id: "P-90DF-412A",
};

const mockReports = [
  { id: "rep-001", testName: "Complete Blood Count (CBC)", uploadDate: "2026-05-15", doctor: "Dr. Kaiser Ahmed", isViewed: true, status: "Ready" },
  { id: "rep-002", testName: "Thyroid Function Test (TSH, T3, T4)", uploadDate: "2026-05-10", doctor: "Dr. Nasrin Akter", isViewed: false, status: "Ready" },
  { id: "rep-003", testName: "Lipid Profile", uploadDate: "2026-04-28", doctor: "Dr. Kaiser Ahmed", isViewed: true, status: "Ready" },
  { id: "rep-004", testName: "Blood Sugar (Fasting & PP)", uploadDate: "2026-04-15", doctor: "Dr. Rezaul Karim", isViewed: true, status: "Ready" },
  { id: "rep-005", testName: "Urine R/E", uploadDate: "2026-03-30", doctor: "Dr. Farida Khanam", isViewed: true, status: "Ready" },
];

const mockAppointments = [
  { id: "appt-001", doctor: "Dr. Mahmudul Hasan", department: "Gastroenterology", date: "2026-05-20", time: "10:30 AM", status: "CONFIRMED" },
  { id: "appt-002", doctor: "Dr. Nasrin Akter", department: "Pediatrics", date: "2026-05-22", time: "9:00 AM", status: "CONFIRMED" },
];

export default function DashboardPage() {
  const newReports = mockReports.filter(r => !r.isViewed);

  const handleDownload = (reportId: string) => {
    // In production: call GET /api/reports/:reportId/download to get presigned URL
    alert(`Generating secure download link for report ${reportId}...\n\nIn production, this calls /api/reports/${reportId}/download which returns a 5-minute presigned URL.`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface-alt)", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: "240px", background: "#0d1b2e", flexShrink: 0, padding: "1.5rem 0", position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Brand */}
        <div style={{ padding: "0 1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "white", fontSize: "1rem" }}>Mitosis Lab</div>
          <div style={{ fontSize: "0.7rem", color: "var(--color-secondary)", letterSpacing: "0.05em" }}>PATIENT PORTAL</div>
        </div>

        {/* Patient Info */}
        <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.625rem" }}>
            {mockPatient.name[0]}
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, color: "white", fontSize: "0.9rem" }}>{mockPatient.name}</div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>ID: {mockPatient.id}</div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "0.75rem 0" }}>
          {[
            { Icon: LayoutDashboard, label: "Dashboard", href: "/portal/dashboard", active: true },
            { Icon: FileText, label: "My Reports", href: "/portal/dashboard", active: false },
            { Icon: Calendar, label: "Appointments", href: "/portal/dashboard", active: false },
            { Icon: ClipboardList, label: "Prescriptions", href: "/portal/dashboard", active: false },
          ].map(({ Icon, label, href, active }) => (
            <Link
              key={label}
              href={href}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1.25rem", color: active ? "white" : "rgba(255,255,255,0.5)", background: active ? "rgba(0,86,179,0.35)" : "transparent", borderLeft: active ? "3px solid var(--color-secondary)" : "3px solid transparent", fontFamily: "var(--font-ui)", fontWeight: active ? 700 : 400, fontSize: "0.875rem", textDecoration: "none", transition: "all 150ms" }}
            >
              <Icon size={17} />
              {label}
              {label === "My Reports" && newReports.length > 0 && (
                <span style={{ marginLeft: "auto", background: "var(--color-danger)", color: "white", borderRadius: "var(--radius-full)", padding: "0.1rem 0.5rem", fontSize: "0.7rem", fontWeight: 700 }}>{newReports.length}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/portal/login" style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-ui)", fontSize: "0.875rem", textDecoration: "none" }}>
            <LogOut size={16} /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem 2.5rem", overflowY: "auto" }}>
        {/* Welcome Banner */}
        {newReports.length > 0 && (
          <div style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", borderRadius: "var(--radius-xl)", padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bell size={22} color="white" />
              </div>
              <div>
                <div style={{ color: "white", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.05rem" }}>
                  Welcome back, {mockPatient.name}! 👋
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem" }}>
                  Your <strong>{mockReports.find(r => !r.isViewed)?.testName}</strong> results are ready.
                </div>
              </div>
            </div>
            <button className="btn-primary" style={{ background: "white", color: "var(--color-primary)", boxShadow: "none", whiteSpace: "nowrap" }}>
              <Eye size={16} /> View Report
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          {[
            { Icon: FileText, label: "Total Reports", value: mockReports.length, color: "var(--color-primary)", bg: "var(--color-primary-50)" },
            { Icon: Bell, label: "New Reports", value: newReports.length, color: "var(--color-danger)", bg: "var(--color-danger-light)" },
            { Icon: Calendar, label: "Upcoming Appts", value: mockAppointments.length, color: "var(--color-secondary)", bg: "var(--color-secondary-50)" },
            { Icon: TrendingUp, label: "Health Score", value: "Good", color: "var(--color-success)", bg: "var(--color-success-light)" },
          ].map(({ Icon, label, value, color, bg }) => (
            <div key={label} className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-xl)", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={22} color={color} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color: "var(--color-text-primary)" }}>{value}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Reports Table */}
        <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800 }}>Recent Lab Reports</h2>
            <span className="badge badge-primary">Secure Download</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-surface-border)" }}>
                  {["Test Name", "Doctor", "Date", "Status", "Action"].map(h => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontFamily: "var(--font-ui)", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockReports.map(report => (
                  <tr key={report.id} style={{ borderBottom: "1px solid var(--color-surface-border)", background: !report.isViewed ? "rgba(0,86,179,0.03)" : "transparent" }}>
                    <td style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-md)", background: "var(--color-primary-50)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <FileText size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-primary)" }}>{report.testName}</div>
                        {!report.isViewed && <span style={{ fontSize: "0.7rem", background: "var(--color-danger)", color: "white", borderRadius: "var(--radius-full)", padding: "0.1rem 0.4rem", fontWeight: 700 }}>NEW</span>}
                      </div>
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{report.doctor}</td>
                    <td style={{ padding: "1rem", fontSize: "0.875rem", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>{report.uploadDate}</td>
                    <td style={{ padding: "1rem" }}>
                      <span className="badge badge-success" style={{ fontSize: "0.72rem" }}>✓ {report.status}</span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <button onClick={() => handleDownload(report.id)} className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", gap: "0.4rem" }}>
                        <Download size={14} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800 }}>Upcoming Appointments</h2>
            <Link href="/appointment" className="btn-secondary" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
              Book New
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {mockAppointments.map(appt => (
              <div key={appt.id} style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem", background: "var(--color-surface-alt)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-surface-border)" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-xl)", background: "var(--color-primary-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Calendar size={22} color="var(--color-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", fontFamily: "var(--font-ui)" }}>{appt.doctor}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>{appt.department}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{appt.date}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)" }}>{appt.time}</div>
                </div>
                <span className="badge badge-success" style={{ fontSize: "0.72rem" }}>✓ Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
