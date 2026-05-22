"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ParallaxBanner from "@/components/ParallaxBanner";
import { useTestInfoStore } from "@/components/TestInfoStore";
import {
  FlaskConical, ClipboardList, DollarSign, BookOpen,
  Clock, Home, ShieldCheck, Microscope, Activity,
  Beaker, Heart, Brain, ArrowRight, CheckCircle2,
  Dna, Stethoscope, Search, ChevronLeft, ChevronRight,
  AlertCircle, XCircle, ChevronDown, Calendar,
} from "lucide-react";

// ── DATA FOR DEPARTMENTS ──────────────────────────────────────────────
const DEPARTMENTS = [
  { name: "Biochemistry",       icon: <Beaker size={22} />,      tests: 35,  color: "#006BB6", slug: "biochemistry" },
  { name: "Haematology",        icon: <Activity size={22} />,    tests: 14,  color: "#c53030", slug: "haematology" },
  { name: "Microbiology",       icon: <FlaskConical size={22} />,tests: 10,  color: "#276749", slug: "microbiology" },
  { name: "Immunology",         icon: <ShieldCheck size={22} />, tests: 14,  color: "#6b46c1", slug: "immunology" },
  { name: "Endocrinology",      icon: <Activity size={22} />,    tests: 15,  color: "#c05621", slug: "endocrinology" },
  { name: "Clinical Pathology", icon: <Stethoscope size={22} />, tests: 5,   color: "#975a16", slug: "clinical pathology" },
  { name: "Histopathology",     icon: <Microscope size={22} />,  tests: 9,   color: "#2b6cb0", slug: "histopathology" },
  { name: "Cardiology",         icon: <Heart size={22} />,       tests: 10,  color: "#9b2c2c", slug: "cardiology" },
  { name: "Neurology",          icon: <Brain size={22} />,       tests: 8,   color: "#0987a0", slug: "neurology" },
  { name: "Imaging",            icon: <Dna size={22} />,         tests: 20,  color: "#553c9a", slug: "imaging" },
];

const HIGHLIGHTS = [
  { icon: <Clock size={20} />,       label: "Reports in 4–24 hrs",      color: "#006BB6" },
  { icon: <Home size={20} />,        label: "Home Sample Collection",    color: "#3CA544" },
  { icon: <ShieldCheck size={20} />, label: "ISO Certified Lab",         color: "#805ad5" },
  { icon: <CheckCircle2 size={20} />,label: "Specialist Reviewed",       color: "#d69e2e" },
];

// ── DATA FOR TESTS & COSTS ────────────────────────────────────────────
const TESTS = [
  // Biochemistry
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

  // Haematology
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

  // Microbiology
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

  // Immunology
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

  // Endocrinology
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

  // Clinical Pathology
  { dept: "Clinical Pathology", sub: "Urine", name: "Urine R/E (Routine Examination)", price: 150 },
  { dept: "Clinical Pathology", sub: "Urine", name: "Urine Pregnancy Test (UPT)", price: 100 },
  { dept: "Clinical Pathology", sub: "Urine", name: "Urine Microalbumin", price: 400 },
  { dept: "Clinical Pathology", sub: "Other", name: "Semen Analysis", price: 400 },
  { dept: "Clinical Pathology", sub: "Other", name: "Calorie Test (Stool)", price: 300 },

  // Histopathology
  { dept: "Histopathology", sub: "Biopsy", name: "Tissue Biopsy (Small)", price: 1500 },
  { dept: "Histopathology", sub: "Biopsy", name: "Tissue Biopsy (Large)", price: 2500 },
  { dept: "Histopathology", sub: "Biopsy", name: "Trucut Biopsy", price: 3000 },
  { dept: "Histopathology", sub: "Cytology", name: "FNAC (Fine Needle Aspiration Cytology)", price: 800 },
  { dept: "Histopathology", sub: "Cytology", name: "Pap Smear", price: 600 },
  { dept: "Histopathology", sub: "Cytology", name: "Sputum Cytology", price: 700 },
  { dept: "Histopathology", sub: "Cytology", name: "Urine Cytology", price: 700 },
  { dept: "Histopathology", sub: "Special Stains", name: "Immunohistochemistry (IHC)", price: 4000 },
  { dept: "Histopathology", sub: "Special Stains", name: "Special Staining (per stain)", price: 1200 },

  // Cardiology
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

  // Neurology
  { dept: "Neurology", sub: "Nerve Studies", name: "Nerve Conduction Study (NCS)", price: 4000 },
  { dept: "Neurology", sub: "Nerve Studies", name: "Electromyography (EMG)", price: 3500 },
  { dept: "Neurology", sub: "Brain Studies", name: "EEG (Electroencephalogram)", price: 3000 },
  { dept: "Neurology", sub: "Brain Studies", name: "Visual Evoked Potential (VEP)", price: 3500 },
  { dept: "Neurology", sub: "CSF Analysis", name: "CSF Routine Examination", price: 800 },
  { dept: "Neurology", sub: "CSF Analysis", name: "CSF Culture & Sensitivity", price: 1200 },
  { dept: "Neurology", sub: "Lab Markers", name: "Serum B12 (Neurological)", price: 1200 },
  { dept: "Neurology", sub: "Lab Markers", name: "Anti-NMDAR Antibody", price: 5000 },

  // Imaging
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

// ── DATA FOR PREPARATIONS ─────────────────────────────────────────────
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

const PREP_CATEGORIES = ["All", ...Array.from(new Set(PREPS.map(p => p.category)))];

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

// ── REUSABLE TESTS PAGE COMPONENT ─────────────────────────────────────
export function TestsPage({ defaultTab = "info" }: { defaultTab?: "info" | "costs" | "preparation" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLastVisited } = useTestInfoStore();

  const [activeTab, setActiveTab] = useState<"info" | "costs" | "preparation">(defaultTab);

  // Sync tab with URL search parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "info" || tabParam === "costs" || tabParam === "preparation") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Handle Tab Switch
  const handleTabChange = (tab: "info" | "costs" | "preparation") => {
    setActiveTab(tab);
    router.replace(`/tests?tab=${tab}`);
  };

  // Record visit for complementary recommendation engine
  useEffect(() => {
    if (activeTab === "costs" || activeTab === "preparation") {
      setLastVisited(activeTab);
    }
  }, [activeTab, setLastVisited]);

  // ── COSTS STATES & LOGIC ──────────────────────────────────────────
  const [costsSearch, setCostsSearch] = useState("");
  const [costsDept, setCostsDept] = useState("All Departments");
  const [costsSubDept, setCostsSubDept] = useState("All Sub-Departments");
  const [costsPage, setCostsPage] = useState(1);

  // Handle department filter trigger from homepage QAB / details
  useEffect(() => {
    const urlDept = searchParams.get("department");
    if (urlDept && activeTab === "costs") {
      const match = Array.from(new Set(TESTS.map(t => t.dept))).find(
        d => d.toLowerCase() === urlDept.toLowerCase()
      );
      if (match) {
        setCostsDept(match);
        setCostsSubDept("All Sub-Departments");
        setCostsPage(1);
      }
    }
  }, [searchParams, activeTab]);

  const costsDepartments = useMemo(
    () => ["All Departments", ...Array.from(new Set(TESTS.map(t => t.dept)))],
    []
  );

  const costsSubDepts = useMemo(() => {
    const subs = TESTS
      .filter(t => costsDept === "All Departments" || t.dept === costsDept)
      .map(t => t.sub);
    return ["All Sub-Departments", ...Array.from(new Set(subs))];
  }, [costsDept]);

  const filteredCosts = useMemo(() => {
    return TESTS.filter(t => {
      const matchDept = costsDept === "All Departments" || t.dept === costsDept;
      const matchSub = costsSubDept === "All Sub-Departments" || t.sub === costsSubDept;
      const matchSearch =
        t.name.toLowerCase().includes(costsSearch.toLowerCase()) ||
        t.sub.toLowerCase().includes(costsSearch.toLowerCase()) ||
        t.dept.toLowerCase().includes(costsSearch.toLowerCase());
      return matchDept && matchSub && matchSearch;
    });
  }, [costsSearch, costsDept, costsSubDept]);

  const totalCostsPages = Math.ceil(filteredCosts.length / PAGE_SIZE);
  const paginatedCosts = filteredCosts.slice((costsPage - 1) * PAGE_SIZE, costsPage * PAGE_SIZE);

  const handleCostsDeptChange = (val: string) => {
    setCostsDept(val);
    setCostsSubDept("All Sub-Departments");
    setCostsPage(1);
  };

  const handleCostsSubChange = (val: string) => {
    setCostsSubDept(val);
    setCostsPage(1);
  };

  const handleCostsSearch = (val: string) => {
    setCostsSearch(val);
    setCostsPage(1);
  };

  const getCostsPageNums = (): (number | "...")[] => {
    if (totalCostsPages <= 7) return Array.from({ length: totalCostsPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [];
    if (costsPage <= 4) pages.push(1, 2, 3, 4, 5, "...", totalCostsPages);
    else if (costsPage >= totalCostsPages - 3) pages.push(1, "...", totalCostsPages - 4, totalCostsPages - 3, totalCostsPages - 2, totalCostsPages - 1, totalCostsPages);
    else pages.push(1, "...", costsPage - 1, costsPage, costsPage + 1, "...", totalCostsPages);
    return pages;
  };

  const getDeptStyle = (d: string) => DEPT_COLORS[d] ?? { bg: "rgba(100,116,139,0.10)", color: "#475569" };

  // ── PREPARATION STATES & LOGIC ────────────────────────────────────
  const [prepSearch, setPrepSearch] = useState("");
  const [prepCategory, setPrepCategory] = useState("All");
  const [prepOpen, setPrepOpen] = useState<number | null>(0);

  const filteredPreps = PREPS.filter(p => {
    const matchCat = prepCategory === "All" || p.category === prepCategory;
    const matchSearch = p.title.toLowerCase().includes(prepSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(prepSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Banner details depend on active tab
  const activeBannerDetails = useMemo(() => {
    switch (activeTab) {
      case "costs":
        return {
          title: "Test Costs & Pricing",
          subtitle: "Transparent, upfront pricing for all diagnostic services. Search and filter packages.",
          image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000&auto=format&fit=crop"
        };
      case "preparation":
        return {
          title: "Test Preparation Guides",
          subtitle: "Instructions and guidelines to follow prior to your laboratory or imaging scans.",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2000&auto=format&fit=crop"
        };
      default:
        return {
          title: "Test Information",
          subtitle: "Everything you need to know about our diagnostic tests — departments, pricing, and guidelines.",
          image: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?q=80&w=2000&auto=format&fit=crop"
        };
    }
  }, [activeTab]);

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <ParallaxBanner
        title={activeBannerDetails.title}
        subtitle={activeBannerDetails.subtitle}
        imageSrc={activeBannerDetails.image}
        heightClass="h-[38vh]"
      />

      {/* Highlight Strip */}
      <div style={{ background: "var(--color-primary)", padding: "0.85rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontSize: "0.88rem", fontWeight: 600, fontFamily: "var(--font-ui)" }}>
              <span style={{ opacity: 0.85 }}>{h.icon}</span>
              {h.label}
            </div>
          ))}
        </div>
      </div>

      {/* Premium Tab Bar Row */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", position: "sticky", top: "4.25rem", zIndex: 10 }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", gap: "0.75rem", flexWrap: "nowrap", overflow: "hidden" }}>
          
          {/* Custom Tabs */}
          <div className="no-scrollbar" style={{ display: "flex", gap: "0.5rem", flexWrap: "nowrap", overflowX: "auto", WebkitOverflowScrolling: "touch", flex: "1 1 auto" }}>
            {[
              { id: "info" as const, label: "Test Information", icon: <FlaskConical size={16} />, color: "#006BB6", bg: "rgba(0,107,182,0.06)" },
              { id: "costs" as const, label: "Test Costs", icon: <DollarSign size={16} />, color: "#3CA544", bg: "rgba(60,165,68,0.06)" },
              { id: "preparation" as const, label: "How to Prepare", icon: <ClipboardList size={16} />, color: "#805ad5", bg: "rgba(128,90,213,0.06)" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.6rem 1.1rem",
                    borderRadius: "0.75rem",
                    border: "1.5px solid",
                    borderColor: isActive ? tab.color : "#e2e8f0",
                    background: isActive ? tab.bg : "white",
                    color: isActive ? tab.color : "var(--color-text-secondary)",
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 200ms ease",
                    boxShadow: isActive ? `0 4px 12px ${tab.color}15` : "none",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = tab.color;
                      (e.currentTarget as HTMLElement).style.color = tab.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                    }
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
 
          {/* Book Now Button */}
          <Link href="/appointment" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "linear-gradient(135deg, #0a1e3d 0%, var(--color-primary) 100%)",
                color: "white",
                padding: "0.65rem 1.25rem",
                borderRadius: "0.75rem",
                fontFamily: "var(--font-ui)",
                fontWeight: 800,
                fontSize: "0.88rem",
                boxShadow: "0 4px 14px rgba(0, 107, 182, 0.25)",
                transition: "all 200ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0, 107, 182, 0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(0, 107, 182, 0.25)";
              }}
            >
              <Calendar size={15} />
              Book Now
            </span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: "3rem 1rem 4rem" }}>
        
        {/* ── TAB CONTENT 1: INFO ───────────────────────────────────── */}
        {activeTab === "info" && (
          <div style={{ animation: "fadeInDown 200ms ease" }}>
            
            {/* Intro Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--color-dark)", marginBottom: "0.5rem" }}>
                What are you looking for?
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1rem", fontFamily: "var(--font-ui)" }}>
                Navigate to the section that helps you most.
              </p>
            </div>

            {/* Quick Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
              
              {/* Test Costs Card */}
              <div 
                onClick={() => handleTabChange("costs")}
                style={{
                  background: "rgba(0,107,182,0.07)",
                  border: "1.5px solid rgba(0,107,182,0.18)",
                  borderRadius: "1.25rem",
                  padding: "2rem 1.75rem",
                  transition: "transform 200ms, box-shadow 200ms",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.85rem", background: "rgba(0,107,182,0.07)", border: "1.5px solid rgba(0,107,182,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem", color: "#006BB6" }}>
                  <DollarSign size={28} />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", color: "var(--color-dark)", marginBottom: "0.5rem" }}>Test Costs</h3>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Browse all test prices. Search by name, department, or sub-department.
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#006BB6", fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-ui)" }}>
                  Go to Test Costs <ArrowRight size={15} />
                </span>
              </div>

              {/* Test Prep Card */}
              <div 
                onClick={() => handleTabChange("preparation")}
                style={{
                  background: "rgba(60,165,68,0.07)",
                  border: "1.5px solid rgba(60,165,68,0.18)",
                  borderRadius: "1.25rem",
                  padding: "2rem 1.75rem",
                  transition: "transform 200ms, box-shadow 200ms",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.85rem", background: "rgba(60,165,68,0.07)", border: "1.5px solid rgba(60,165,68,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem", color: "#3CA544" }}>
                  <ClipboardList size={28} />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", color: "var(--color-dark)", marginBottom: "0.5rem" }}>Test Preparation</h3>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Step-by-step preparation guides — what to eat, avoid, and bring before each test.
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#3CA544", fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-ui)" }}>
                  Go to Test Preparation <ArrowRight size={15} />
                </span>
              </div>

              {/* Book Now Card */}
              <Link href="/appointment" style={{ textDecoration: "none" }}>
                <div style={{
                  background: "rgba(128,90,213,0.07)",
                  border: "1.5px solid rgba(128,90,213,0.18)",
                  borderRadius: "1.25rem",
                  padding: "2rem 1.75rem",
                  transition: "transform 200ms, box-shadow 200ms",
                  cursor: "pointer",
                  height: "100%",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ width: "3.25rem", height: "3.25rem", borderRadius: "0.85rem", background: "rgba(128,90,213,0.07)", border: "1.5px solid rgba(128,90,213,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem", color: "#805ad5" }}>
                    <BookOpen size={28} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", color: "var(--color-dark)", marginBottom: "0.5rem" }}>Book a Test</h3>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                    Schedule your test online or call us. Walk-ins also welcome every day.
                  </p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#805ad5", fontWeight: 700, fontSize: "0.88rem", fontFamily: "var(--font-ui)" }}>
                    Book an Appointment <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </div>

            {/* Department grid */}
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-dark)", marginBottom: "0.4rem" }}>
                  Our Test Departments
                </h2>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", fontFamily: "var(--font-ui)" }}>
                  Browse tests organised by medical specialty — click any department to view its tests and prices.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
                {DEPARTMENTS.map((dept) => (
                  <div
                    key={dept.name}
                    onClick={() => {
                      setCostsDept(dept.name);
                      setCostsSubDept("All Sub-Departments");
                      setCostsPage(1);
                      handleTabChange("costs");
                    }}
                    style={{
                      background: "white",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "1rem",
                      padding: "1.4rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      transition: "all 200ms",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = dept.color;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.65rem", background: `${dept.color}14`, display: "flex", alignItems: "center", justifyContent: "center", color: dept.color, flexShrink: 0 }}>
                      {dept.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.88rem", color: "var(--color-dark)" }}>{dept.name}</div>
                      <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{dept.tests}+ tests</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialty Banner */}
            <div style={{ background: "linear-gradient(135deg, #0a1e3d 0%, #006BB6 100%)", borderRadius: "1.5rem", padding: "2.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "white", marginBottom: "0.4rem" }}>
                  Not sure which test you need?
                </h3>
                <p style={{ fontFamily: "var(--font-ui)", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem" }}>
                  Talk to our specialists — we&apos;ll guide you to the right test.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                <Link href="/doctors" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "white", color: "#006BB6", padding: "0.7rem 1.4rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-ui)" }}>
                  Find a Doctor <ArrowRight size={15} />
                </Link>
                <a href="tel:+8801898806050" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", color: "white", padding: "0.7rem 1.4rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-ui)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  Call Us Now
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB CONTENT 2: COSTS ──────────────────────────────────── */}
        {activeTab === "costs" && (
          <div style={{ animation: "fadeInDown 200ms ease" }}>
            
            {/* Summary statistics */}
            <div className="costs-stats" style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              {[
                { label: "Total Available Tests", value: TESTS.length },
                { label: "Clinical Departments", value: costsDepartments.length - 1 },
              ].map((s, idx) => (
                <div key={idx} className="costs-stat-box" style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "1rem", padding: "1.25rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", minWidth: "180px", flex: "1" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.6rem", color: "var(--color-primary)", marginBottom: "0.15rem" }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.02em" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filter Card */}
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.05rem", color: "var(--color-dark)", marginBottom: "1rem" }}>
                Filter &amp; Search Tests
              </h3>
              <div className="costs-filters" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {/* Search */}
                <div className="costs-search-wrap" style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="text"
                    placeholder="Search test name..."
                    value={costsSearch}
                    onChange={e => handleCostsSearch(e.target.value)}
                    style={{
                      width: "100%",
                      paddingLeft: "2.5rem",
                      paddingTop: "0.65rem",
                      paddingBottom: "0.65rem",
                      paddingRight: "1rem",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "0.65rem",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.9rem",
                      outline: "none",
                      color: "var(--color-dark)",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                {/* Dept */}
                <select 
                  value={costsDept} 
                  onChange={e => handleCostsDeptChange(e.target.value)} 
                  style={{
                    padding: "0.65rem 1rem",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "0.65rem",
                    background: "white",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.9rem",
                    color: "var(--color-dark)",
                    outline: "none"
                  }}
                >
                  {costsDepartments.map(d => <option key={d}>{d}</option>)}
                </select>
                {/* Sub-dept */}
                <select 
                  value={costsSubDept} 
                  onChange={e => handleCostsSubChange(e.target.value)} 
                  style={{
                    padding: "0.65rem 1rem",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "0.65rem",
                    background: "white",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.9rem",
                    color: "var(--color-dark)",
                    outline: "none"
                  }}
                >
                  {costsSubDepts.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                Showing <strong style={{ color: "var(--color-dark)" }}>{filteredCosts.length}</strong> tests
                {costsSearch && <> matching &quot;<strong>{costsSearch}</strong>&quot;</>}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                Page {costsPage} of {totalCostsPages || 1}
              </span>
            </div>

            {/* Table */}
            <div style={{ background: "white", borderRadius: "1.25rem", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "1.5rem" }}>
              <div style={{ overflowX: "auto" }}>
                <table className="costs-table" style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-ui)" }}>
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
                    {paginatedCosts.length === 0 ? (
                      <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.95rem" }}>No tests found matching your search.</td></tr>
                    ) : (
                      paginatedCosts.map((t, i) => {
                        const ds = getDeptStyle(t.dept);
                        return (
                          <tr key={i}
                            style={{ borderBottom: "1px solid #f1f5f9", transition: "background 150ms" }}
                            onMouseEnter={e => { if (window.innerWidth > 768) (e.currentTarget as HTMLElement).style.background = "#f8fafc"; }}
                            onMouseLeave={e => { if (window.innerWidth > 768) (e.currentTarget as HTMLElement).style.background = "white"; }}
                          >
                            <td className="costs-cell-index" style={{ padding: "0.85rem 1rem", color: "#94a3b8", fontSize: "0.8rem", width: "2.5rem" }}>
                              {(costsPage - 1) * PAGE_SIZE + i + 1}
                            </td>
                            <td className="costs-cell-dept" style={{ padding: "0.85rem 1rem" }}>
                              <span style={{ background: ds.bg, color: ds.color, padding: "0.2rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                                {t.dept.toUpperCase()}
                              </span>
                            </td>
                            <td className="costs-cell-sub" style={{ padding: "0.85rem 1rem", color: "#64748b", fontSize: "0.85rem", fontWeight: 500 }}>
                              {t.sub}
                            </td>
                            <td className="costs-cell-name" style={{ padding: "0.85rem 1rem", color: "var(--color-dark)", fontSize: "0.9rem", fontWeight: 600 }}>
                              {t.name}
                            </td>
                            <td className="costs-cell-price" style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
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
            {totalCostsPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.35rem", flexWrap: "wrap", margin: "2rem 0" }}>
                <button onClick={() => setCostsPage(p => Math.max(1, p - 1))} disabled={costsPage === 1}
                  style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.5rem 0.85rem", border: "1.5px solid #e2e8f0", borderRadius: "0.6rem", background: "white", cursor: costsPage === 1 ? "not-allowed" : "pointer", color: costsPage === 1 ? "#94a3b8" : "var(--color-dark)", fontFamily: "var(--font-ui)", fontSize: "0.85rem", fontWeight: 600 }}>
                  <ChevronLeft size={15} /> Prev
                </button>
                {getCostsPageNums().map((p, i) => (
                  <button key={i} onClick={() => typeof p === "number" && setCostsPage(p)} disabled={p === "..."}
                    style={{ padding: "0.5rem 0.8rem", border: "1.5px solid", borderColor: p === costsPage ? "var(--color-primary)" : "#e2e8f0", borderRadius: "0.6rem", background: p === costsPage ? "var(--color-primary)" : "white", color: p === costsPage ? "white" : p === "..." ? "#94a3b8" : "var(--color-dark)", fontFamily: "var(--font-ui)", fontSize: "0.85rem", fontWeight: 700, cursor: p === "..." ? "default" : "pointer", minWidth: "2.2rem" }}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setCostsPage(p => Math.min(totalCostsPages, p + 1))} disabled={costsPage === totalCostsPages}
                  style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.5rem 0.85rem", border: "1.5px solid #e2e8f0", borderRadius: "0.6rem", background: "white", cursor: costsPage === totalCostsPages ? "not-allowed" : "pointer", color: costsPage === totalCostsPages ? "#94a3b8" : "var(--color-dark)", fontFamily: "var(--font-ui)", fontSize: "0.85rem", fontWeight: 600 }}>
                  Next <ChevronRight size={15} />
                </button>
              </div>
            )}

            {/* Disclaimer */}
            <p style={{ textAlign: "center", marginTop: "2rem", fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "#94a3b8", maxWidth: "600px", margin: "2rem auto 0" }}>
              * Prices are indicative and may vary. Please contact us or visit the lab for the most current pricing. Discounts apply for packages.
            </p>
          </div>
        )}

        {/* ── TAB CONTENT 3: PREPARATION ────────────────────────────── */}
        {activeTab === "preparation" && (
          <div style={{ animation: "fadeInDown 200ms ease" }}>
            
            {/* Search + Filter */}
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0", marginBottom: "1.75rem" }}>
              <div className="prep-filters" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div className="prep-search" style={{ position: "relative", flex: 1, minWidth: "260px" }}>
                  <Search size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="text"
                    placeholder="Search test preparation..."
                    value={prepSearch}
                    onChange={e => { setPrepSearch(e.target.value); setPrepOpen(null); }}
                    style={{ width: "100%", paddingLeft: "2.5rem", padding: "0.7rem 0.85rem 0.7rem 2.5rem", border: "1.5px solid #e2e8f0", borderRadius: "0.65rem", fontFamily: "var(--font-ui)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "var(--color-dark)" }}
                  />
                </div>
                <select 
                  value={prepCategory} 
                  onChange={e => { setPrepCategory(e.target.value); setPrepOpen(null); }} 
                  style={{
                    padding: "0.7rem 1rem",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: "0.65rem",
                    background: "white",
                    fontFamily: "var(--font-ui)",
                    fontSize: "0.9rem",
                    color: "var(--color-dark)",
                    outline: "none",
                    minWidth: "180px"
                  }}
                >
                  {PREP_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Category pills */}
            <div className="prep-pills" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {PREP_CATEGORIES.map(c => (
                <button key={c} onClick={() => { setPrepCategory(c); setPrepOpen(null); }}
                  className="prep-pill-btn"
                  style={{
                    padding: "0.4rem 1rem", borderRadius: "2rem", fontSize: "0.85rem", fontWeight: 600,
                    fontFamily: "var(--font-ui)", cursor: "pointer", border: "1.5px solid",
                    borderColor: prepCategory === c ? "var(--color-primary)" : "#e2e8f0",
                    background: prepCategory === c ? "var(--color-primary)" : "white",
                    color: prepCategory === c ? "white" : "var(--color-text-muted)",
                    transition: "all 150ms",
                  }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
              {filteredPreps.length} preparation guide{filteredPreps.length !== 1 ? "s" : ""} found
            </p>

            {/* Accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {filteredPreps.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)", fontFamily: "var(--font-ui)" }}>
                  No preparation guides found for &quot;{prepSearch}&quot;.
                </div>
              )}
              {filteredPreps.map((prep, idx) => {
                const isOpen = prepOpen === idx;
                const color = tagColor[prep.category] ?? "#006BB6";
                return (
                  <div key={idx} style={{
                    background: "white", borderRadius: "1rem",
                    border: `1.5px solid ${isOpen ? color : "#e2e8f0"}`,
                    boxShadow: isOpen ? `0 4px 20px ${color}20` : "0 1px 4px rgba(0,0,0,0.05)",
                    overflow: "hidden", transition: "border-color 200ms, box-shadow 200ms",
                  }}>
                    {/* Header */}
                    <button onClick={() => setPrepOpen(isOpen ? null : idx)}
                      style={{ 
                        width: "100%",
                        padding: "1rem 1.25rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "none",
                        cursor: "pointer",
                        background: isOpen ? `${color}08` : "transparent",
                        textAlign: "left"
                      }}
                    >
                      <div className="prep-accordion-header" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
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
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
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
                                <Icon size={16} color={iconColor} style={{ flexShrink: 0, marginTop: "0.15rem" }} />
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
            <div style={{ marginTop: "3rem", background: "linear-gradient(135deg, #0a1e3d 0%, #006BB6 100%)", borderRadius: "1.25rem", padding: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "white", fontSize: "1.2rem", marginBottom: "0.3rem" }}>Have questions about your test?</h3>
                <p style={{ fontFamily: "var(--font-ui)", color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>Call us — our lab staff will guide you through every step.</p>
              </div>
              <a href="tel:+8801898806050" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "white", color: "#006BB6", padding: "0.75rem 1.5rem", borderRadius: "0.75rem", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>
                📞 +880 1898-806050
              </a>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

// ── DEFAULT EXPORT WITH SUSPENSE FOR NEXT.JS BUILD SAFETY ─────────────
export default function TestsPageContainer() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f8fafc" }} />}>
      <TestsPage />
    </Suspense>
  );
}
