"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ChevronRight, Calendar, Clock, User, Phone, FileText, ArrowLeft } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { mockDepartments, mockDoctors, mockSlots } from "@/app/api/mock/doctors/route";
import { getDeptMeta } from "@/lib/departmentIcons";
import ParallaxBanner from "@/components/ParallaxBanner";

export const dynamic = 'force-dynamic';

const STEPS = [
  { num: 1, label: "Department" },
  { num: 2, label: "Doctor" },
  { num: 3, label: "Date & Time" },
  { num: 4, label: "Your Details" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
      {STEPS.map((step, i) => (
        <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
            <div
              className={`step-circle ${current === step.num ? "active" : current > step.num ? "completed" : ""}`}
            >
              {current > step.num ? <CheckCircle size={16} /> : step.num}
            </div>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, fontFamily: "var(--font-ui)", color: current >= step.num ? "var(--color-primary)" : "var(--color-text-muted)", whiteSpace: "nowrap" }}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`step-line ${current > step.num ? "completed" : ""}`} style={{ margin: "0 0.25rem", marginBottom: "1.2rem", width: "2.5rem" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── STEP 1 ──────────────────────────────────────────────────────────────────
function Step1Department() {
  const { setDepartment, setStep } = useBookingStore();
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
        What kind of help do you need?
      </h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
        Select a department and we will show you the right specialists.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.875rem" }}>
        {mockDepartments.map((dept) => {
          const { Icon, color, bg } = getDeptMeta(dept.id);
          return (
            <button
              key={dept.id}
              onClick={() => { setDepartment(dept.id, dept.name); setStep(2); }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                gap: "0.875rem", padding: "1.75rem 1rem",
                background: "var(--color-surface)",
                border: "2px solid var(--color-surface-border)",
                borderRadius: "var(--radius-xl)", cursor: "pointer",
                transition: "all 250ms cubic-bezier(0.4,0,0.2,1)",
                minHeight: "56px",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = color;
                el.style.background = bg;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 6px 20px ${color}22`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-surface-border)";
                el.style.background = "var(--color-surface)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ width: "52px", height: "52px", borderRadius: "var(--radius-xl)", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={26} color={color} strokeWidth={1.75} />
              </div>
              <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.875rem", color: "var(--color-text-primary)", lineHeight: 1.3 }}>{dept.name}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", fontWeight: 500 }}>{dept.doctorCount} Specialists</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── STEP 2 ──────────────────────────────────────────────────────────────────
function Step2Doctor() {
  const { selectedDepartmentId, selectedDepartmentName, selectedDoctorId, setDoctor, setStep } = useBookingStore();
  const doctors = mockDoctors.filter(d => d.departmentId === selectedDepartmentId);

  return (
    <div>
      <button onClick={() => setStep(1)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", marginBottom: "1.25rem", padding: 0, minHeight: "unset" }}>
        <ArrowLeft size={16} /> Back
      </button>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
        Choose Your Doctor
      </h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
        Specialists in <strong>{selectedDepartmentName}</strong>
      </p>
      {doctors.length === 0 ? (
        <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--color-text-secondary)" }}>No doctors found for this department yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {doctors.map((doc) => (
            <button
              key={doc.id}
              onClick={() => { setDoctor(doc.id, doc.name); setStep(3); }}
              style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.5rem", background: selectedDoctorId === doc.id ? "var(--color-primary-50)" : "var(--color-surface)", border: `2px solid ${selectedDoctorId === doc.id ? "var(--color-primary)" : "var(--color-surface-border)"}`, borderRadius: "var(--radius-xl)", cursor: "pointer", textAlign: "left", transition: "all var(--transition-base)", minHeight: "56px", width: "100%" }}
            >
              <div style={{ width: "64px", height: "64px", borderRadius: "var(--radius-xl)", background: "linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", flexShrink: 0 }}>
                👨‍⚕️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)" }}>{doc.name}</span>
                  {doc.isAvailableToday && <span className="status-dot" />}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginBottom: "0.4rem" }}>{doc.qualifications}</p>
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{doc.experience} yrs experience · ⭐ {doc.rating}</span>
              </div>
              <ChevronRight size={20} color="var(--color-text-muted)" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── STEP 3 ──────────────────────────────────────────────────────────────────
function Step3DateTime() {
  const { selectedDate, selectedSlotId, selectedDoctorId, setDate, setSlot, setStep } = useBookingStore();
  const [slots, setSlots] = useState(mockSlots);

  // Generate next 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().split("T")[0],
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-BD", { weekday: "short", day: "numeric", month: "short" }),
      full: d.toLocaleDateString("en-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    };
  });

  useEffect(() => {
    if (selectedDate && selectedDoctorId) {
      // Simulate fetching fresh slots
      setSlots(mockSlots.map(s => ({ ...s, isBooked: Math.random() > 0.65 })));
    }
  }, [selectedDate, selectedDoctorId]);

  return (
    <div>
      <button onClick={() => setStep(2)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", marginBottom: "1.25rem", padding: 0, minHeight: "unset" }}>
        <ArrowLeft size={16} /> Back
      </button>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
        Pick a Date & Time
      </h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>Choose when you'd like to visit.</p>

      {/* Calendar Strip */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <Calendar size={16} color="var(--color-primary)" />
          <span style={{ fontWeight: 700, fontFamily: "var(--font-ui)", fontSize: "0.9rem" }}>Select Date</span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {days.map((day) => (
            <button
              key={day.value}
              onClick={() => setDate(day.value)}
              style={{ flexShrink: 0, padding: "0.875rem 1.25rem", borderRadius: "var(--radius-xl)", border: `2px solid ${selectedDate === day.value ? "var(--color-primary)" : "var(--color-surface-border)"}`, background: selectedDate === day.value ? "var(--color-primary)" : "var(--color-surface)", color: selectedDate === day.value ? "white" : "var(--color-text-primary)", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", transition: "all var(--transition-base)", minHeight: "56px", minWidth: "90px" }}
            >
              {day.label}
            </button>
          ))}
        </div>
        {selectedDate && <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>📅 {days.find(d => d.value === selectedDate)?.full}</p>}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <Clock size={16} color="var(--color-primary)" />
            <span style={{ fontWeight: 700, fontFamily: "var(--font-ui)", fontSize: "0.9rem" }}>Select Time Slot</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {slots.map((slot) => (
              <button
                key={slot.slotId}
                disabled={slot.isBooked}
                onClick={() => !slot.isBooked && setSlot(slot.slotId, slot.startTime)}
                style={{ padding: "0.75rem 0.5rem", borderRadius: "var(--radius-lg)", border: `2px solid ${slot.isBooked ? "var(--color-surface-muted)" : selectedSlotId === slot.slotId ? "var(--color-secondary)" : "var(--color-surface-border)"}`, background: slot.isBooked ? "var(--color-surface-alt)" : selectedSlotId === slot.slotId ? "var(--color-secondary)" : "var(--color-surface)", color: slot.isBooked ? "var(--color-text-muted)" : selectedSlotId === slot.slotId ? "white" : "var(--color-text-primary)", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.82rem", cursor: slot.isBooked ? "not-allowed" : "pointer", transition: "all var(--transition-base)", minHeight: "56px", position: "relative", textDecoration: slot.isBooked ? "line-through" : "none" }}
              >
                {slot.startTime}
                {slot.isBooked && <span style={{ display: "block", fontSize: "0.65rem", fontWeight: 400, color: "var(--color-text-muted)", marginTop: "0.1rem" }}>Booked</span>}
              </button>
            ))}
          </div>
          {selectedSlotId && (
            <button onClick={() => setStep(4)} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Continue to Your Details <ChevronRight size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── STEP 4 ──────────────────────────────────────────────────────────────────
function Step4Details({ onConfirm }: { onConfirm: () => void }) {
  const store = useBookingStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!store.patientName.trim()) errs.patientName = "Please enter the patient's full name.";
    if (!store.patientPhone.trim()) errs.patientPhone = "Please enter your mobile number so we can send your appointment confirmation.";
    else if (!/^\+880 1[3-9]\d{2}-\d{6}$/.test(store.patientPhone)) errs.patientPhone = "Please enter a valid Bangladeshi mobile number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formatPhone = (val: string) => {
    let cleaned = val.replace(/\D/g, "");
    if (cleaned.startsWith("880")) cleaned = cleaned.substring(3);
    else if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
    
    if (cleaned.length === 0) return "";
    
    let formatted = "+880 " + cleaned.substring(0, 4);
    if (cleaned.length > 4) {
      formatted += "-" + cleaned.substring(4, 10);
    }
    return formatted;
  };

  const isPhoneValid = /^\+880 1[3-9]\d{2}-\d{6}$/.test(store.patientPhone);

  return (
    <div>
      <button onClick={() => store.setStep(3)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", marginBottom: "1.25rem", padding: 0, minHeight: "unset" }}>
        <ArrowLeft size={16} /> Back
      </button>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
        Almost done! Just a few details.
      </h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
        We only need your name and phone number to confirm your booking.
      </p>

      {/* Booking Summary */}
      <div style={{ background: "var(--color-primary-50)", border: "1px solid var(--color-primary-100)", borderRadius: "var(--radius-xl)", padding: "1.25rem", marginBottom: "2rem" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9rem", color: "var(--color-primary)", marginBottom: "0.75rem" }}>📋 Your Booking Summary</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {[
            { icon: "🏥", label: "Department", value: store.selectedDepartmentName },
            { icon: "👨‍⚕️", label: "Doctor", value: store.selectedDoctorName },
            { icon: "📅", label: "Date", value: store.selectedDate ? new Date(store.selectedDate).toLocaleDateString("en-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : null },
            { icon: "🕐", label: "Time", value: store.selectedSlotTime },
          ].map(({ icon, label, value }) => value && (
            <div key={label} style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem" }}>
              <span>{icon}</span>
              <span style={{ color: "var(--color-text-secondary)", minWidth: "80px" }}>{label}:</span>
              <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.75rem" }}>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <User size={15} color="var(--color-primary)" /> Patient Full Name
          </label>
          <input
            className={`input-field ${errors.patientName ? "input-error" : ""}`}
            type="text"
            placeholder="e.g. Rahim Ahmed"
            value={store.patientName}
            onChange={e => store.setPatientField("patientName", e.target.value)}
          />
          {errors.patientName && <p className="error-message">⚠ {errors.patientName}</p>}
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <Phone size={15} color="var(--color-primary)" /> Mobile Number
          </label>
          <input
            className={`input-field ${errors.patientPhone ? "input-error" : ""}`}
            type="tel"
            placeholder="e.g. +880 1812-345678"
            value={store.patientPhone}
            onChange={e => {
              const formatted = formatPhone(e.target.value);
              store.setPatientField("patientPhone", formatted);
              if (errors.patientPhone) {
                const newErrs = { ...errors };
                delete newErrs.patientPhone;
                setErrors(newErrs);
              }
            }}
            style={isPhoneValid ? { borderColor: "var(--color-success)", borderWidth: "2px", transition: "border-color 0.2s ease" } : {}}
          />
          {errors.patientPhone && <p className="error-message">⚠ {errors.patientPhone}</p>}
        </div>
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <FileText size={15} color="var(--color-primary)" /> Notes for Doctor <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>(Optional)</span>
          </label>
          <textarea
            className="input-field"
            placeholder="Any specific symptoms or reason for visit..."
            rows={3}
            value={store.patientNotes}
            onChange={e => store.setPatientField("patientNotes", e.target.value)}
            style={{ resize: "none" }}
          />
        </div>
      </div>

      <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem" }} onClick={() => validate() && onConfirm()}>
        <CheckCircle size={18} /> Confirm Booking
      </button>
      <p style={{ marginTop: "0.875rem", textAlign: "center", fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
        🔒 Your details are encrypted and never shared. An SMS confirmation will be sent to your mobile.
      </p>
    </div>
  );
}

// ─── CONFIRMATION SCREEN ──────────────────────────────────────────────────────
function ConfirmationScreen() {
  const store = useBookingStore();
  return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-success-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", animation: "scaleIn 400ms var(--transition-bounce)" }}>
        <CheckCircle size={44} color="var(--color-success)" strokeWidth={2.5} />
      </div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 900, color: "var(--color-success)", marginBottom: "0.5rem" }}>
        Booking Confirmed! 🎉
      </h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
        An SMS confirmation has been sent to your phone. Need to reschedule?<br/>Call us anytime at <strong>+880 1898-806050</strong>.
      </p>

      {/* Summary Card */}
      <div className="card" style={{ padding: "1.75rem", textAlign: "left", maxWidth: "480px", margin: "0 auto 2rem", border: "2px solid var(--color-success-light)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { label: "Doctor", value: store.selectedDoctorName },
            { label: "Department", value: store.selectedDepartmentName },
            { label: "Date", value: store.selectedDate ? new Date(store.selectedDate).toLocaleDateString("en-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "" },
            { label: "Time", value: store.selectedSlotTime },
            { label: "Patient", value: store.patientName },
            { label: "Phone", value: store.patientPhone },
          ].map(({ label, value }) => value && (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-surface-border)", paddingBottom: "0.5rem" }}>
              <span style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>{label}</span>
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-text-primary)" }}>{value}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.78rem", color: "var(--color-text-muted)", textAlign: "center" }}>
          📸 Screenshot this to show at reception
        </p>
      </div>

      <button className="btn-primary" onClick={store.resetBooking} style={{ margin: "0 auto" }}>
        Book Another Appointment
      </button>
      <style>{`@keyframes scaleIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
function BookingWizard() {
  const { currentStep, setStep } = useBookingStore();
  const [confirmed, setConfirmed] = useState(false);
  const searchParams = useSearchParams();

  const doctorParam = searchParams.get("doctor");
  useEffect(() => {
    if (doctorParam) {
      const doc = mockDoctors.find(d => d.id === doctorParam);
      if (doc) {
        useBookingStore.getState().setDepartment(doc.departmentId, doc.department);
        useBookingStore.getState().setDoctor(doc.id, doc.name);
        setStep(3);
      }
    }
  }, [doctorParam, setStep]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-surface-alt)" }}>
      {/* Header */}
      <ParallaxBanner
        imageSrc="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop"
        heightClass="h-[35vh]"
        overlayClass="bg-blue-950/70"
      >
        <div className="container text-center">
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 6vw, 2.5rem)", fontWeight: 900, color: "white", marginBottom: "0.5rem" }} className="drop-shadow-lg">
            Book an Appointment
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }} className="drop-shadow-md">
            It only takes 2 minutes. No account needed.
          </p>
        </div>
      </ParallaxBanner>

      <div className="container" style={{ padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {!confirmed && <StepIndicator current={currentStep} />}
          <div className="card" style={{ padding: "clamp(1.25rem, 5vw, 2.5rem)" }}>
            {confirmed ? (
              <ConfirmationScreen />
            ) : (
              <>
                {/* Step counter */}
                {!confirmed && (
                  <div style={{ marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-primary)", fontFamily: "var(--font-ui)", background: "var(--color-primary-50)", padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)" }}>
                      Step {currentStep} of 4
                    </span>
                  </div>
                )}
                {currentStep === 1 && <Step1Department />}
                {currentStep === 2 && <Step2Doctor />}
                {currentStep === 3 && <Step3DateTime />}
                {currentStep === 4 && <Step4Details onConfirm={() => setConfirmed(true)} />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "var(--color-surface-alt)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="skeleton" style={{ height: "2rem", width: "280px", margin: "0 auto 1rem" }} />
          <div className="skeleton" style={{ height: "1rem", width: "180px", margin: "0 auto" }} />
        </div>
      </div>
    }>
      <BookingWizard />
    </Suspense>
  );
}
