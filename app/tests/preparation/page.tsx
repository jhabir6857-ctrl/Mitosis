"use client";

import { useState, useEffect } from "react";
import ParallaxBanner from "@/components/ParallaxBanner";
import { ChevronDown, Search, Clock, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useTestInfoStore } from "@/components/TestInfoStore";

interface Prep {
  title: string;
  category: string;
  fastingHours?: number;
  duration?: string;
  instructions: { type: "do" | "dont" | "note"; text: string }[];
}

const PREPS: Prep[] = [
  {
    title: "Fasting Blood Glucose / Blood Sugar (Fasting)",
    category: "Biochemistry",
    fastingHours: 8,
    duration: "Same day",
    instructions: [
      { type: "do", text: "Fast for 8–10 hours before the test." },
      { type: "do", text: "Drink plain water during the fasting period — it is allowed and encouraged." },
      { type: "do", text: "Take your morning sample early (ideally between 7–9 AM)." },
      { type: "dont", text: "Do not eat or drink anything other than water for at least 8 hours." },
      { type: "dont", text: "Do not smoke or chew tobacco during the fasting period." },
      { type: "note", text: "If you are diabetic and on insulin, consult your doctor before fasting." },
    ],
  },
  {
    title: "HbA1c (Glycated Haemoglobin)",
    category: "Biochemistry",
    duration: "Same day",
    instructions: [
      { type: "do", text: "No fasting required — this test can be done at any time of day." },
      { type: "note", text: "Recent blood transfusion or haemolytic anaemia may affect the result. Inform the lab if applicable." },
    ],
  },
  {
    title: "Lipid Profile (Cholesterol / Triglycerides)",
    category: "Biochemistry",
    fastingHours: 12,
    duration: "Same day",
    instructions: [
      { type: "do", text: "Fast strictly for 12–14 hours before the test." },
      { type: "do", text: "Plain water is allowed during fasting." },
      { type: "dont", text: "Do not eat fatty or oily food the evening before the test." },
      { type: "dont", text: "Avoid alcohol for at least 24 hours before the test." },
      { type: "note", text: "Some guidelines allow non-fasting lipid profile — ask your doctor which type they ordered." },
    ],
  },
  {
    title: "Thyroid Profile (TSH / FT3 / FT4)",
    category: "Endocrinology",
    duration: "Same day",
    instructions: [
      { type: "do", text: "No fasting required. The test can be done at any time." },
      { type: "dont", text: "Do not take thyroid medication (e.g., thyroxine) before the blood is drawn — take it after." },
      { type: "note", text: "If you recently had a CT scan with contrast or took any iodine supplement, inform the doctor as it may affect the result." },
    ],
  },
  {
    title: "24 Hour Urinary Test (Any — Protein, Creatinine, Calcium etc.)",
    category: "Biochemistry",
    duration: "Next day",
    instructions: [
      { type: "do", text: "Collect urine in a clean 2–3 litre plastic container. Do not use a white or oily container." },
      { type: "do", text: "On the first morning, urinate in the toilet as usual and note the exact time (e.g. 8:00 AM). This first urine is discarded." },
      { type: "do", text: "From that point, collect every drop of urine for the next 24 hours — including the next morning at the same time." },
      { type: "do", text: "Add the preservative liquid provided by our lab into the container before starting collection." },
      { type: "do", text: "Keep the container refrigerated or in a cool place throughout the collection period." },
      { type: "dont", text: "Do not miss any urine — even one missed sample can invalidate the test." },
      { type: "dont", text: "Do not use a white or oily plastic container." },
      { type: "note", text: "Bring the fully collected container to the lab the next morning. Make sure you note the start and end times on the container." },
    ],
  },
  {
    title: "Semen Analysis",
    category: "Clinical Pathology",
    duration: "Same day",
    instructions: [
      { type: "do", text: "Abstain from sexual activity (including masturbation) for 2–5 days before the test." },
      { type: "do", text: "Collect the sample in the special sterile container provided by the lab." },
      { type: "do", text: "The sample must be collected by masturbation." },
      { type: "dont", text: "Do not collect via intercourse with a condom — condoms contain spermicidal agents." },
      { type: "dont", text: "Do not abstain for more than 7 days — this may also affect results." },
      { type: "note", text: "The sample must reach the lab within 30–60 minutes of collection. Keep it at body temperature (in your pocket) during transport." },
    ],
  },
  {
    title: "Stool Routine Examination (R/E) & Culture",
    category: "Microbiology",
    duration: "R/E: Same day | C/S: 48–72 hrs",
    instructions: [
      { type: "do", text: "Collect a fresh stool sample in the clean sterile container provided by the lab." },
      { type: "do", text: "A small matchstick-sized amount is sufficient (approx. 5–10 grams)." },
      { type: "dont", text: "Do not contaminate the sample with urine or toilet water." },
      { type: "dont", text: "Do not collect if you are currently on antibiotics — wait 3 days after finishing the course." },
      { type: "note", text: "Deliver the sample to the lab within 30 minutes of collection for accurate results." },
    ],
  },
  {
    title: "Urine Routine Examination (R/E) & Culture",
    category: "Clinical Pathology",
    duration: "R/E: Same day | C/S: 48–72 hrs",
    instructions: [
      { type: "do", text: "Collect mid-stream urine — let the first and last part go into the toilet." },
      { type: "do", text: "Use the sterile container provided by the lab." },
      { type: "do", text: "Clean the genital area thoroughly with water before collecting." },
      { type: "do", text: "First morning urine (mid-stream) is preferred for best results." },
      { type: "dont", text: "Do not touch the inside of the container or lid." },
      { type: "dont", text: "Do not collect if currently on antibiotics." },
      { type: "note", text: "Bring the sample to the lab within 1 hour of collection." },
    ],
  },
  {
    title: "Sputum AFB (Tuberculosis Test)",
    category: "Microbiology",
    duration: "1–2 days",
    instructions: [
      { type: "do", text: "Collect the early morning sputum — before eating or drinking anything." },
      { type: "do", text: "Take a few deep breaths, cough deeply from the chest and spit into the sterile container." },
      { type: "dont", text: "Do not submit saliva — the sample must come from deep in the chest." },
      { type: "dont", text: "Do not eat, drink, or use mouthwash before collecting." },
      { type: "note", text: "For TB, 3 consecutive early-morning sputum samples may be requested by your doctor." },
    ],
  },
  {
    title: "Fasting Insulin",
    category: "Endocrinology",
    fastingHours: 8,
    duration: "Same day",
    instructions: [
      { type: "do", text: "Fast for 8 hours before the test." },
      { type: "do", text: "Plain water is allowed." },
      { type: "dont", text: "Do not take insulin or diabetes medication before blood collection." },
      { type: "note", text: "Usually done alongside fasting blood glucose. Inform the lab if you need both." },
    ],
  },
  {
    title: "Vitamin D (25-OH) / Vitamin B12",
    category: "Endocrinology",
    duration: "Same day",
    instructions: [
      { type: "do", text: "No fasting required." },
      { type: "dont", text: "Do not take Vitamin D or B12 supplements on the day of the test — take them after blood is drawn." },
      { type: "note", text: "If you are on injectable Vitamin B12 treatment, wait at least 1 week after injection before testing." },
    ],
  },
  {
    title: "Dengue NS1 / IgM / IgG Antibody",
    category: "Immunology",
    duration: "Same day",
    instructions: [
      { type: "do", text: "No fasting required." },
      { type: "do", text: "Bring your fever timeline and any previous test results." },
      { type: "note", text: "NS1 antigen is most accurate in the first 5 days of fever. IgM/IgG is more reliable from day 5 onwards. Your doctor will decide which test to order based on timing." },
    ],
  },
  {
    title: "HBsAg (Hepatitis B) / Anti-HCV (Hepatitis C)",
    category: "Immunology",
    duration: "Same day",
    instructions: [
      { type: "do", text: "No fasting or special preparation required." },
      { type: "note", text: "Vaccination for Hepatitis B does not cause a false positive result in this test." },
    ],
  },
  {
    title: "Echocardiography (Echo / Heart Ultrasound)",
    category: "Imaging",
    duration: "Same day (results given on site)",
    instructions: [
      { type: "do", text: "Wear comfortable, loose-fitting clothing for easy access to the chest." },
      { type: "do", text: "Bring your previous ECG or echo reports if available." },
      { type: "dont", text: "Do not apply lotion, oil, or cream on the chest on the day of the test." },
      { type: "note", text: "No fasting required. The test is painless and takes about 30–45 minutes." },
    ],
  },
  {
    title: "Ultrasound (USG) — Whole / Upper Abdomen",
    category: "Imaging",
    fastingHours: 6,
    duration: "Same day",
    instructions: [
      { type: "do", text: "Fast for at least 6 hours before an abdominal ultrasound (water is allowed)." },
      { type: "do", text: "Wear loose, comfortable clothing." },
      { type: "dont", text: "Do not eat or chew gum before the test — it causes gas which affects image quality." },
      { type: "note", text: "For pelvic ultrasound, you may be asked to have a full bladder — drink 3–4 glasses of water 1 hour before and do not urinate." },
    ],
  },
  {
    title: "MRI (Brain / Spine / Knee)",
    category: "Imaging",
    duration: "Same day",
    instructions: [
      { type: "do", text: "Remove all metal objects: jewellery, hairpins, belts, watches before entering the MRI room." },
      { type: "do", text: "Inform the technician if you have any metal implants, pacemaker, cochlear implant, or surgical clips." },
      { type: "do", text: "Wear loose, comfortable clothing without metal fasteners." },
      { type: "dont", text: "Do not bring credit cards or phones inside the MRI room." },
      { type: "note", text: "For MRI with contrast, inform us if you have any kidney disease or allergy. Fasting for 4 hours is recommended for contrast MRI." },
    ],
  },
  {
    title: "Upper GI Endoscopy",
    category: "Gastroenterology",
    fastingHours: 8,
    duration: "Same day",
    instructions: [
      { type: "do", text: "Fast for at least 8 hours before the procedure (no food or drink, including water)." },
      { type: "do", text: "Bring a family member or companion — you will not be able to drive after sedation." },
      { type: "do", text: "Inform us of all medications you take, especially blood thinners (aspirin, warfarin)." },
      { type: "dont", text: "Do not eat, drink, or chew gum after midnight on the day of the procedure." },
      { type: "dont", text: "Do not drive or operate heavy machinery for 24 hours after the procedure." },
      { type: "note", text: "The procedure takes about 15–20 minutes. You will be given a local anaesthetic spray for the throat. Sedation is also available on request." },
    ],
  },
  {
    title: "CBC (Complete Blood Count)",
    category: "Haematology",
    duration: "Same day",
    instructions: [
      { type: "do", text: "No fasting required. Can be done at any time of day." },
      { type: "note", text: "Avoid strenuous exercise for 24 hours before the test as it can temporarily elevate white blood cell counts." },
    ],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PREPS.map(p => p.category)))];

const tagColor: Record<string, string> = {
  Biochemistry: "#006BB6",
  Endocrinology: "#ed8936",
  Microbiology: "#3CA544",
  Immunology: "#805ad5",
  Imaging: "#0bc5ea",
  Haematology: "#e53e3e",
  "Clinical Pathology": "#d69e2e",
  Gastroenterology: "#38a169",
};

export default function TestPreparationPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { setLastVisited } = useTestInfoStore();

  // Record this visit for cross-suggestion logic
  useEffect(() => { setLastVisited("preparation"); }, [setLastVisited]);

  const filtered = PREPS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <ParallaxBanner
        title="Test Preparation Guides"
        subtitle="Follow these instructions carefully before your test for the most accurate results."
        imageSrc="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2000&auto=format&fit=crop"
        heightClass="h-[38vh]"
      />

      <div className="container prep-container" style={{ padding: "2.5rem 1rem 4rem" }}>
        <style>{`
          .prep-filters { display: flex; gap: 0.85rem; flex-wrap: wrap; }
          .prep-search { position: relative; flex: 1; min-width: 220px; }
          .prep-select { padding: 0.7rem 0.85rem; border: 1.5px solid #e2e8f0; border-radius: 0.65rem; font-family: var(--font-ui); font-size: 0.9rem; color: var(--color-dark); background: white; outline: none; cursor: pointer; }
          .prep-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
          .prep-accordion-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.4rem; border: none; cursor: pointer; gap: 1rem; text-align: left; transition: background 200ms; }
          .prep-accordion-header { display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 0; }
          
          @media (max-width: 768px) {
            .prep-container { padding: 1.5rem 1rem 3rem !important; }
            .prep-filters { flex-direction: column; }
            .prep-search { min-width: 100%; }
            .prep-select { width: 100%; }
            .prep-pills { flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 0.5rem; scrollbar-width: none; margin-left: -1rem; margin-right: -1rem; padding-left: 1rem; padding-right: 1rem; }
            .prep-pills::-webkit-scrollbar { display: none; }
            .prep-accordion-btn { padding: 0.85rem 1rem !important; align-items: flex-start; }
            .prep-accordion-header { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
          }
        `}</style>


        {/* Search + Filter */}
        <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", marginBottom: "1.75rem" }}>
          <div className="prep-filters">
            <div className="prep-search">
              <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search test preparation..."
                value={search}
                onChange={e => { setSearch(e.target.value); setOpen(null); }}
                style={{ width: "100%", paddingLeft: "2.5rem", padding: "0.7rem 0.85rem 0.7rem 2.5rem", border: "1.5px solid #e2e8f0", borderRadius: "0.65rem", fontFamily: "var(--font-ui)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "var(--color-dark)" }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--color-primary)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
              />
            </div>
            <select value={category} onChange={e => { setCategory(e.target.value); setOpen(null); }} className="prep-select">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="prep-pills">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => { setCategory(c); setOpen(null); }}
              style={{
                padding: "0.35rem 0.9rem", borderRadius: "2rem", fontSize: "0.8rem", fontWeight: 600,
                fontFamily: "var(--font-ui)", cursor: "pointer", border: "1.5px solid",
                borderColor: category === c ? "var(--color-primary)" : "#e2e8f0",
                background: category === c ? "var(--color-primary)" : "white",
                color: category === c ? "white" : "var(--color-text-muted)",
                transition: "all 150ms",
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
          {filtered.length} preparation guide{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)" }}>
              No preparation guides found for "{search}".
            </div>
          )}
          {filtered.map((prep, idx) => {
            const isOpen = open === idx;
            const color = tagColor[prep.category] ?? "#006BB6";
            return (
              <div key={idx} style={{
                background: "white", borderRadius: "1rem",
                border: `1.5px solid ${isOpen ? color : "#e2e8f0"}`,
                boxShadow: isOpen ? `0 4px 20px ${color}20` : "0 1px 4px rgba(0,0,0,0.05)",
                overflow: "hidden", transition: "border-color 200ms, box-shadow 200ms",
              }}>
                {/* Header */}
                <button onClick={() => setOpen(isOpen ? null : idx)}
                  className="prep-accordion-btn"
                  style={{ background: isOpen ? `${color}08` : "transparent" }}>
                  <div className="prep-accordion-header">
                    <span style={{
                      background: `${color}15`, color, padding: "0.2rem 0.65rem",
                      borderRadius: "0.4rem", fontSize: "0.72rem", fontWeight: 700,
                      fontFamily: "var(--font-ui)", whiteSpace: "nowrap", flexShrink: 0,
                      textTransform: "uppercase", letterSpacing: "0.04em",
                    }}>{prep.category}</span>
                    <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-dark)" }}>
                      {prep.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0, alignSelf: "center" }}>
                    {prep.fastingHours && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "rgba(237,137,54,0.1)", color: "#c05621", padding: "0.2rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>
                        <Clock size={12} /> {prep.fastingHours}h fast
                      </span>
                    )}
                    <ChevronDown size={18} color="#94a3b8" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease", flexShrink: 0 }} />
                  </div>
                </button>

                {/* Body */}
                {isOpen && (
                  <div style={{ padding: "0 1.4rem 1.4rem", borderTop: `1px solid ${color}20` }}>
                    {prep.duration && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 0", marginBottom: "0.75rem", borderBottom: "1px solid #f1f5f9" }}>
                        <Clock size={14} color="#94a3b8" />
                        <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "#64748b" }}>
                          <strong>Report delivery:</strong> {prep.duration}
                        </span>
                      </div>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {prep.instructions.map((ins, j) => {
                        const Icon = ins.type === "do" ? CheckCircle2 : ins.type === "dont" ? XCircle : AlertCircle;
                        const iconColor = ins.type === "do" ? "#3CA544" : ins.type === "dont" ? "#e53e3e" : "#d69e2e";
                        const bg = ins.type === "do" ? "rgba(60,165,68,0.06)" : ins.type === "dont" ? "rgba(229,62,62,0.06)" : "rgba(214,158,46,0.06)";
                        const border = ins.type === "do" ? "rgba(60,165,68,0.2)" : ins.type === "dont" ? "rgba(229,62,62,0.2)" : "rgba(214,158,46,0.2)";
                        return (
                          <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", background: bg, border: `1px solid ${border}`, borderRadius: "0.65rem", padding: "0.7rem 0.9rem" }}>
                            <Icon size={16} color={iconColor} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.88rem", color: "var(--color-dark)", lineHeight: 1.6 }}>{ins.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: "3rem", background: "linear-gradient(135deg, #0a1e3d 0%, #006BB6 100%)", borderRadius: "1.25rem", padding: "2rem 2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "white", fontSize: "1.2rem", marginBottom: "0.3rem" }}>Have questions about your test?</h3>
            <p style={{ fontFamily: "var(--font-ui)", color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>Call us — our lab staff will guide you through every step.</p>
          </div>
          <a href="tel:+8801898806050" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "white", color: "#006BB6", padding: "0.75rem 1.5rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>
            📞 +880 1898-806050
          </a>
        </div>
      </div>
    </main>
  );
}
