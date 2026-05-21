"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useTestInfoStore } from "@/components/TestInfoStore";
import { useSearchParams } from "next/navigation";
import ParallaxBanner from "@/components/ParallaxBanner";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const TESTS = [
  // ── BIOCHEMISTRY ──────────────────────────────────────────────────────
  { dept: "Biochemistry", sub: "Blood Sugar", name: "Blood Glucose (Fasting)", price: 80 },
  { dept: "Biochemistry", sub: "Blood Sugar", name: "Blood Glucose (Random)", price: 80 },
  { dept: "Biochemistry", sub: "Blood Sugar", name: "Blood Glucose (2 hrs After Meal)", price: 80 },
  { dept: "Biochemistry", sub: "Blood Sugar", name: "HbA1c (Glycated Haemoglobin)", price: 500 },
  { dept: "Biochemistry", sub: "Kidney Function", name: "Serum Creatinine", price: 150 },
  { dept: "Biochemistry", sub: "Kidney Function", name: "Blood Urea", price: 150 },
  { dept: "Biochemistry", sub: "Kidney Function", name: "Uric Acid", price: 200 },
  { dept: "Biochemistry", sub: "Kidney Function", name: "GFR (Glomerular Filtration Rate)", price: 1500 },
  { dept: "Biochemistry", sub: "Liver Function", name: "SGPT (ALT)", price: 200 },
  { dept: "Biochemistry", sub: "Liver Function", name: "SGOT (AST)", price: 200 },
  { dept: "Biochemistry", sub: "Liver Function", name: "Serum Bilirubin (Total)", price: 200 },
  { dept: "Biochemistry", sub: "Liver Function", name: "Serum Bilirubin (Direct)", price: 200 },
  { dept: "Biochemistry", sub: "Liver Function", name: "Alkaline Phosphatase (ALP)", price: 200 },
  { dept: "Biochemistry", sub: "Liver Function", name: "Serum Albumin", price: 200 },
  { dept: "Biochemistry", sub: "Liver Function", name: "Total Protein", price: 200 },
  { dept: "Biochemistry", sub: "Lipid Profile", name: "Cholesterol (Total)", price: 200 },
  { dept: "Biochemistry", sub: "Lipid Profile", name: "Triglycerides", price: 250 },
  { dept: "Biochemistry", sub: "Lipid Profile", name: "HDL Cholesterol", price: 250 },
  { dept: "Biochemistry", sub: "Lipid Profile", name: "LDL Cholesterol", price: 250 },
  { dept: "Biochemistry", sub: "Lipid Profile", name: "Lipid Profile (Full)", price: 700 },
  { dept: "Biochemistry", sub: "Electrolytes", name: "Serum Sodium (Na+)", price: 200 },
  { dept: "Biochemistry", sub: "Electrolytes", name: "Serum Potassium (K+)", price: 200 },
  { dept: "Biochemistry", sub: "Electrolytes", name: "Serum Calcium", price: 200 },
  { dept: "Biochemistry", sub: "Electrolytes", name: "Serum Phosphate", price: 200 },
  { dept: "Biochemistry", sub: "Electrolytes", name: "Serum Magnesium", price: 300 },
  { dept: "Biochemistry", sub: "Iron Studies", name: "Serum Iron", price: 300 },
  { dept: "Biochemistry", sub: "Iron Studies", name: "TIBC", price: 400 },
  { dept: "Biochemistry", sub: "Iron Studies", name: "Serum Ferritin", price: 700 },
  { dept: "Biochemistry", sub: "Urinary Tests", name: "24 hrs Urinary Albumin", price: 600 },
  { dept: "Biochemistry", sub: "Urinary Tests", name: "24 hrs Urinary Creatinine", price: 500 },
  { dept: "Biochemistry", sub: "Urinary Tests", name: "24 hrs Urinary Calcium", price: 800 },
  { dept: "Biochemistry", sub: "Others", name: "Plasma Ammonia (Fasting)", price: 1400 },
  { dept: "Biochemistry", sub: "Others", name: "C-Reactive Protein (CRP)", price: 500 },
  { dept: "Biochemistry", sub: "Others", name: "hs-CRP", price: 900 },
  { dept: "Biochemistry", sub: "Others", name: "LDH (Lactate Dehydrogenase)", price: 400 },

  // ── HAEMATOLOGY ───────────────────────────────────────────────────────
  { dept: "Haematology", sub: "CBC & Film", name: "Complete Blood Count (CBC)", price: 300 },
  { dept: "Haematology", sub: "CBC & Film", name: "Peripheral Blood Film", price: 300 },
  { dept: "Haematology", sub: "CBC & Film", name: "Haemoglobin (Hb)", price: 100 },
  { dept: "Haematology", sub: "CBC & Film", name: "Reticulocyte Count", price: 200 },
  { dept: "Haematology", sub: "CBC & Film", name: "Platelet Count", price: 150 },
  { dept: "Haematology", sub: "Inflammation", name: "ESR", price: 150 },
  { dept: "Haematology", sub: "Blood Group", name: "Blood Grouping & Rh Typing", price: 150 },
  { dept: "Haematology", sub: "Coagulation", name: "Prothrombin Time (PT)", price: 300 },
  { dept: "Haematology", sub: "Coagulation", name: "APTT", price: 350 },
  { dept: "Haematology", sub: "Coagulation", name: "Bleeding Time / Clotting Time", price: 150 },
  { dept: "Haematology", sub: "Coagulation", name: "D-Dimer", price: 1500 },
  { dept: "Haematology", sub: "Special Tests", name: "HbA2 (Haemoglobin Electrophoresis)", price: 1200 },
  { dept: "Haematology", sub: "Special Tests", name: "Sickling Test", price: 200 },
  { dept: "Haematology", sub: "Special Tests", name: "G6PD", price: 600 },

  // ── MICROBIOLOGY ─────────────────────────────────────────────────────
  { dept: "Microbiology", sub: "Culture & Sensitivity", name: "Urine C/S (Culture & Sensitivity)", price: 600 },
  { dept: "Microbiology", sub: "Culture & Sensitivity", name: "Stool C/S", price: 600 },
  { dept: "Microbiology", sub: "Culture & Sensitivity", name: "Sputum C/S", price: 600 },
  { dept: "Microbiology", sub: "Culture & Sensitivity", name: "Blood C/S", price: 1000 },
  { dept: "Microbiology", sub: "Routine Examination", name: "Stool R/E (Routine Examination)", price: 150 },
  { dept: "Microbiology", sub: "Routine Examination", name: "Sputum AFB (for TB)", price: 200 },
  { dept: "Microbiology", sub: "Antigen Tests", name: "H. pylori Antigen (Stool)", price: 800 },
  { dept: "Microbiology", sub: "Antigen Tests", name: "Widal Test", price: 200 },
  { dept: "Microbiology", sub: "Antigen Tests", name: "Malaria Antigen (RDT)", price: 400 },
  { dept: "Microbiology", sub: "Antigen Tests", name: "Kala-Azar Antigen (rK39)", price: 500 },

  // ── IMMUNOLOGY / SEROLOGY ─────────────────────────────────────────────
  { dept: "Immunology", sub: "Hepatitis", name: "HBsAg (Hepatitis B Surface Antigen)", price: 300 },
  { dept: "Immunology", sub: "Hepatitis", name: "Anti-HCV (Hepatitis C Antibody)", price: 500 },
  { dept: "Immunology", sub: "Viral Infections", name: "HIV I & II Antibody", price: 500 },
  { dept: "Immunology", sub: "Viral Infections", name: "Dengue NS1 Antigen", price: 700 },
  { dept: "Immunology", sub: "Viral Infections", name: "Dengue IgM / IgG", price: 700 },
  { dept: "Immunology", sub: "Viral Infections", name: "Typhoid IgM (Typhidot)", price: 400 },
  { dept: "Immunology", sub: "Viral Infections", name: "COVID-19 Antigen (RAT)", price: 500 },
  { dept: "Immunology", sub: "Viral Infections", name: "COVID-19 Antibody (IgG)", price: 800 },
  { dept: "Immunology", sub: "Autoimmune", name: "ANA (Antinuclear Antibody)", price: 1200 },
  { dept: "Immunology", sub: "Autoimmune", name: "Anti-dsDNA", price: 1500 },
  { dept: "Immunology", sub: "Autoimmune", name: "RA Factor (Rheumatoid Factor)", price: 400 },
  { dept: "Immunology", sub: "Autoimmune", name: "ASO Titre", price: 400 },
  { dept: "Immunology", sub: "STI Screening", name: "VDRL (Syphilis)", price: 200 },
  { dept: "Immunology", sub: "STI Screening", name: "TPHA", price: 400 },

  // ── ENDOCRINOLOGY / HORMONES ─────────────────────────────────────────
  { dept: "Endocrinology", sub: "Thyroid", name: "TSH (Thyroid Stimulating Hormone)", price: 500 },
  { dept: "Endocrinology", sub: "Thyroid", name: "Free T3", price: 500 },
  { dept: "Endocrinology", sub: "Thyroid", name: "Free T4", price: 500 },
  { dept: "Endocrinology", sub: "Thyroid", name: "Thyroid Profile (TSH + FT3 + FT4)", price: 1200 },
  { dept: "Endocrinology", sub: "Pancreas & Diabetes", name: "Insulin (Fasting)", price: 800 },
  { dept: "Endocrinology", sub: "Adrenal", name: "Cortisol (Morning)", price: 900 },
  { dept: "Endocrinology", sub: "Reproductive Hormones", name: "FSH", price: 600 },
  { dept: "Endocrinology", sub: "Reproductive Hormones", name: "LH", price: 600 },
  { dept: "Endocrinology", sub: "Reproductive Hormones", name: "Prolactin", price: 600 },
  { dept: "Endocrinology", sub: "Reproductive Hormones", name: "Testosterone (Total)", price: 800 },
  { dept: "Endocrinology", sub: "Reproductive Hormones", name: "Estradiol (E2)", price: 800 },
  { dept: "Endocrinology", sub: "Reproductive Hormones", name: "Progesterone", price: 800 },
  { dept: "Endocrinology", sub: "Vitamins & Minerals", name: "Vitamin D (25-OH)", price: 1500 },
  { dept: "Endocrinology", sub: "Vitamins & Minerals", name: "Vitamin B12", price: 1200 },
  { dept: "Endocrinology", sub: "Vitamins & Minerals", name: "PTH (Parathyroid Hormone)", price: 1800 },

  // ── CLINICAL PATHOLOGY ───────────────────────────────────────────────
  { dept: "Clinical Pathology", sub: "Urine", name: "Urine R/E (Routine Examination)", price: 150 },
  { dept: "Clinical Pathology", sub: "Urine", name: "Urine Pregnancy Test (UPT)", price: 100 },
  { dept: "Clinical Pathology", sub: "Urine", name: "Urine Microalbumin", price: 400 },
  { dept: "Clinical Pathology", sub: "Other", name: "Semen Analysis", price: 400 },
  { dept: "Clinical Pathology", sub: "Other", name: "Calorie Test (Stool)", price: 300 },

  // ── HISTOPATHOLOGY ───────────────────────────────────────────────────
  { dept: "Histopathology", sub: "Biopsy", name: "Tissue Biopsy (Small)", price: 1500 },
  { dept: "Histopathology", sub: "Biopsy", name: "Tissue Biopsy (Large)", price: 2500 },
  { dept: "Histopathology", sub: "Biopsy", name: "Trucut Biopsy", price: 3000 },
  { dept: "Histopathology", sub: "Cytology", name: "FNAC (Fine Needle Aspiration Cytology)", price: 800 },
  { dept: "Histopathology", sub: "Cytology", name: "Pap Smear", price: 600 },
  { dept: "Histopathology", sub: "Cytology", name: "Sputum Cytology", price: 700 },
  { dept: "Histopathology", sub: "Cytology", name: "Urine Cytology", price: 700 },
  { dept: "Histopathology", sub: "Special Stains", name: "Immunohistochemistry (IHC)", price: 4000 },
  { dept: "Histopathology", sub: "Special Stains", name: "Special Staining (per stain)", price: 1200 },

  // ── CARDIOLOGY ──────────────────────────────────────────────────────
  { dept: "Cardiology", sub: "ECG", name: "ECG (12 Lead)", price: 300 },
  { dept: "Cardiology", sub: "Echocardiography", name: "Echocardiography (2D Echo)", price: 3500 },
  { dept: "Cardiology", sub: "Echocardiography", name: "Colour Doppler Echo", price: 4500 },
  { dept: "Cardiology", sub: "Stress Test", name: "Treadmill Test (TMT/ETT)", price: 3500 },
  { dept: "Cardiology", sub: "Holter", name: "Holter Monitoring (24 hr)", price: 3000 },
  { dept: "Cardiology", sub: "Cardiac Markers", name: "Troponin I (Rapid)", price: 1200 },
  { dept: "Cardiology", sub: "Cardiac Markers", name: "Troponin T (Rapid)", price: 1200 },
  { dept: "Cardiology", sub: "Cardiac Markers", name: "CK-MB", price: 800 },
  { dept: "Cardiology", sub: "Cardiac Markers", name: "BNP (Brain Natriuretic Peptide)", price: 2500 },
  { dept: "Cardiology", sub: "Cardiac Markers", name: "D-Dimer", price: 1500 },

  // ── NEUROLOGY ────────────────────────────────────────────────────────
  { dept: "Neurology", sub: "Nerve Studies", name: "Nerve Conduction Study (NCS)", price: 4000 },
  { dept: "Neurology", sub: "Nerve Studies", name: "Electromyography (EMG)", price: 3500 },
  { dept: "Neurology", sub: "Brain Studies", name: "EEG (Electroencephalogram)", price: 3000 },
  { dept: "Neurology", sub: "Brain Studies", name: "Visual Evoked Potential (VEP)", price: 3500 },
  { dept: "Neurology", sub: "CSF Analysis", name: "CSF Routine Examination", price: 800 },
  { dept: "Neurology", sub: "CSF Analysis", name: "CSF Culture & Sensitivity", price: 1200 },
  { dept: "Neurology", sub: "Lab Markers", name: "Serum B12 (Neurological)", price: 1200 },
  { dept: "Neurology", sub: "Lab Markers", name: "Anti-NMDAR Antibody", price: 5000 },

  // ── IMAGING ─────────────────────────────────────────────────────────
  { dept: "Imaging", sub: "X-Ray", name: "Chest X-Ray (PA View)", price: 400 },
  { dept: "Imaging", sub: "X-Ray", name: "Chest X-Ray (AP View)", price: 400 },
  { dept: "Imaging", sub: "X-Ray", name: "Spine X-Ray (Cervical)", price: 500 },
  { dept: "Imaging", sub: "X-Ray", name: "Spine X-Ray (Lumbar)", price: 500 },
  { dept: "Imaging", sub: "X-Ray", name: "Abdomen X-Ray", price: 450 },
  { dept: "Imaging", sub: "X-Ray", name: "Pelvis X-Ray", price: 450 },
  { dept: "Imaging", sub: "Ultrasound", name: "USG Whole Abdomen", price: 1200 },
  { dept: "Imaging", sub: "Ultrasound", name: "USG Upper Abdomen", price: 800 },
  { dept: "Imaging", sub: "Ultrasound", name: "USG Lower Abdomen / Pelvis", price: 800 },
  { dept: "Imaging", sub: "Ultrasound", name: "USG Neck / Thyroid", price: 800 },
  { dept: "Imaging", sub: "Ultrasound", name: "USG Breast (Both)", price: 1000 },
  { dept: "Imaging", sub: "Ultrasound", name: "Obstetric USG (Dating Scan)", price: 1000 },
  { dept: "Imaging", sub: "Ultrasound", name: "Foetal Echo", price: 2500 },
  { dept: "Imaging", sub: "MRI", name: "MRI Brain (Plain)", price: 7000 },
  { dept: "Imaging", sub: "MRI", name: "MRI Brain (With Contrast)", price: 9000 },
  { dept: "Imaging", sub: "MRI", name: "MRI Spine (Cervical)", price: 7500 },
  { dept: "Imaging", sub: "MRI", name: "MRI Spine (Lumbar)", price: 7500 },
  { dept: "Imaging", sub: "MRI", name: "MRI Knee (Plain)", price: 7000 },
  { dept: "Imaging", sub: "Endoscopy", name: "Upper GI Endoscopy", price: 4000 },
  { dept: "Imaging", sub: "Endoscopy", name: "Colonoscopy", price: 5000 },
];

// Colour palette for department badges
const DEPT_COLORS: Record<string, { bg: string; color: string }> = {
  Biochemistry:        { bg: "rgba(0,107,182,0.10)",   color: "#006BB6" },
  Haematology:         { bg: "rgba(229,62,62,0.10)",    color: "#c53030" },
  Microbiology:        { bg: "rgba(60,165,68,0.10)",    color: "#276749" },
  Immunology:          { bg: "rgba(128,90,213,0.10)",   color: "#6b46c1" },
  Endocrinology:       { bg: "rgba(237,137,54,0.10)",   color: "#c05621" },
  "Clinical Pathology":{ bg: "rgba(214,158,46,0.10)",   color: "#975a16" },
  Histopathology:      { bg: "rgba(49,130,206,0.10)",   color: "#2b6cb0" },
  Cardiology:          { bg: "rgba(229,62,62,0.12)",    color: "#9b2c2c" },
  Neurology:           { bg: "rgba(11,197,234,0.10)",   color: "#0987a0" },
  Imaging:             { bg: "rgba(128,90,213,0.10)",   color: "#553c9a" },
};

const PAGE_SIZE = 15;

function TestCostsContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [subDept, setSubDept] = useState("All Sub-Departments");
  const [page, setPage] = useState(1);
  const { setLastVisited } = useTestInfoStore();

  // Record this visit for cross-suggestion logic
  useEffect(() => { setLastVisited("costs"); }, [setLastVisited]);

  // Read department from URL query param on mount
  useEffect(() => {
    const urlDept = searchParams.get("department");
    if (urlDept) {
      const match = Array.from(new Set(TESTS.map(t => t.dept))).find(
        d => d.toLowerCase() === urlDept.toLowerCase()
      );
      if (match) setDept(match);
    }
  }, [searchParams]);

  const departments = useMemo(
    () => ["All Departments", ...Array.from(new Set(TESTS.map(t => t.dept)))],
    []
  );
  const subDepts = useMemo(() => {
    const subs = TESTS
      .filter(t => dept === "All Departments" || t.dept === dept)
      .map(t => t.sub);
    return ["All Sub-Departments", ...Array.from(new Set(subs))];
  }, [dept]);

  const filtered = useMemo(() => {
    return TESTS.filter(t => {
      const matchDept = dept === "All Departments" || t.dept === dept;
      const matchSub = subDept === "All Sub-Departments" || t.sub === subDept;
      const matchSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.sub.toLowerCase().includes(search.toLowerCase()) ||
        t.dept.toLowerCase().includes(search.toLowerCase());
      return matchDept && matchSub && matchSearch;
    });
  }, [search, dept, subDept]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDeptChange = (val: string) => {
    setDept(val);
    setSubDept("All Sub-Departments");
    setPage(1);
  };
  const handleSubChange = (val: string) => {
    setSubDept(val);
    setPage(1);
  };
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const getPageNums = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [];
    if (page <= 4) pages.push(1, 2, 3, 4, 5, "...", totalPages);
    else if (page >= totalPages - 3) pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    else pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    return pages;
  };

  const deptStyle = (d: string) => DEPT_COLORS[d] ?? { bg: "rgba(100,116,139,0.10)", color: "#475569" };

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <ParallaxBanner
        title="Test Costs"
        subtitle="Transparent pricing for all diagnostic tests. Search by test name or filter by department."
        imageSrc="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000&auto=format&fit=crop"
        heightClass="h-[38vh]"
      />

      <div className="container" style={{ padding: "2.5rem 1rem 4rem" }}>

        {/* Summary stats */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {[
            { label: "Total Tests", value: TESTS.length },
            { label: "Departments", value: departments.length - 1 },
          ].map(s => (
            <div key={s.label} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "0.85rem", padding: "0.75rem 1.25rem", display: "flex", gap: "0.5rem", alignItems: "baseline", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.4rem", color: "var(--color-primary)" }}>{s.value}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filter Card */}
        <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.05rem", color: "var(--color-dark)", marginBottom: "1rem" }}>
            Filter & Search
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search test name..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                style={{ width: "100%", paddingLeft: "2.5rem", padding: "0.7rem 0.85rem 0.7rem 2.5rem", border: "1.5px solid #e2e8f0", borderRadius: "0.65rem", fontFamily: "var(--font-ui)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "var(--color-dark)" }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--color-primary)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
              />
            </div>
            {/* Dept */}
            <select value={dept} onChange={e => handleDeptChange(e.target.value)}
              style={{ padding: "0.7rem 0.85rem", border: "1.5px solid #e2e8f0", borderRadius: "0.65rem", fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--color-dark)", background: "white", outline: "none", cursor: "pointer" }}>
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
            {/* Sub-dept */}
            <select value={subDept} onChange={e => handleSubChange(e.target.value)}
              style={{ padding: "0.7rem 0.85rem", border: "1.5px solid #e2e8f0", borderRadius: "0.65rem", fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--color-dark)", background: "white", outline: "none", cursor: "pointer" }}>
              {subDepts.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
            Showing <strong style={{ color: "var(--color-dark)" }}>{filtered.length}</strong> tests
            {search && <> matching &quot;<strong>{search}</strong>&quot;</>}
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            Page {page} of {totalPages || 1}
          </span>
        </div>

        {/* Table */}
        <div style={{ background: "white", borderRadius: "1.25rem", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "1.5rem" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-ui)" }}>
              <thead>
                <tr style={{ background: "linear-gradient(90deg, #0a1e3d 0%, #006BB6 100%)" }}>
                  {["#", "Department", "Sub-Department", "Test Name", "Price (৳)"].map((h, i) => (
                    <th key={h} style={{
                      padding: "0.9rem 1rem", textAlign: i === 4 ? "right" : "left",
                      color: "white", fontWeight: 700, fontSize: "0.8rem",
                      letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.95rem" }}>No tests found matching your search.</td></tr>
                ) : (
                  paginated.map((t, i) => {
                    const ds = deptStyle(t.dept);
                    return (
                      <tr key={i}
                        style={{ borderBottom: "1px solid #f1f5f9", transition: "background 150ms" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                      >
                        <td style={{ padding: "0.85rem 1rem", color: "#94a3b8", fontSize: "0.8rem", width: "2.5rem" }}>
                          {(page - 1) * PAGE_SIZE + i + 1}
                        </td>
                        <td style={{ padding: "0.85rem 1rem" }}>
                          <span style={{ background: ds.bg, color: ds.color, padding: "0.2rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                            {t.dept.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: "0.85rem 1rem", color: "#64748b", fontSize: "0.85rem", fontWeight: 500 }}>
                          {t.sub}
                        </td>
                        <td style={{ padding: "0.85rem 1rem", color: "var(--color-dark)", fontSize: "0.9rem", fontWeight: 600 }}>
                          {t.name}
                        </td>
                        <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                          <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#3CA544" }}>৳ {t.price.toLocaleString()}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.5rem 0.85rem", border: "1.5px solid #e2e8f0", borderRadius: "0.6rem", background: "white", cursor: page === 1 ? "not-allowed" : "pointer", color: page === 1 ? "#94a3b8" : "var(--color-dark)", fontFamily: "var(--font-ui)", fontSize: "0.85rem", fontWeight: 600 }}>
              <ChevronLeft size={15} /> Prev
            </button>
            {getPageNums().map((p, i) => (
              <button key={i} onClick={() => typeof p === "number" && setPage(p)} disabled={p === "..."}
                style={{ padding: "0.5rem 0.8rem", border: "1.5px solid", borderColor: p === page ? "var(--color-primary)" : "#e2e8f0", borderRadius: "0.6rem", background: p === page ? "var(--color-primary)" : "white", color: p === page ? "white" : p === "..." ? "#94a3b8" : "var(--color-dark)", fontFamily: "var(--font-ui)", fontSize: "0.85rem", fontWeight: 700, cursor: p === "..." ? "default" : "pointer", minWidth: "2.2rem" }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.5rem 0.85rem", border: "1.5px solid #e2e8f0", borderRadius: "0.6rem", background: "white", cursor: page === totalPages ? "not-allowed" : "pointer", color: page === totalPages ? "#94a3b8" : "var(--color-dark)", fontFamily: "var(--font-ui)", fontSize: "0.85rem", fontWeight: 600 }}>
              Next <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <p style={{ textAlign: "center", marginTop: "2rem", fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "#94a3b8", maxWidth: "600px", margin: "2rem auto 0" }}>
          * Prices are indicative and may vary. Please contact us or visit the lab for the most current pricing. Discounts apply for packages.
        </p>
      </div>
    </main>
  );
}

export default function TestCostsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f8fafc" }} />}>
      <TestCostsContent />
    </Suspense>
  );
}
