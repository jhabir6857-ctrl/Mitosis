"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Shield, Lock, RefreshCw, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const validatePhone = () => {
    if (!phone.trim()) { setPhoneError("Please enter your mobile number."); return false; }
    if (!/^(\+?880|0)?1[3-9]\d{8}$/.test(phone.replace(/\s/g, ""))) {
      setPhoneError("Please enter a valid Bangladeshi mobile number (e.g. 01812345678).");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSendOtp = async () => {
    if (!validatePhone()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate API call
    setIsLoading(false);
    setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-advance focus
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 4) { setOtpError("Please enter the 4-digit code sent to your phone."); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    // Mock: accept any 4-digit code
    router.push("/portal/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0d1b2e 0%, #0a2a5e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.5rem" }}>
            <div style={{ width: "3rem", height: "3rem", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: "1.25rem" }}>
              M
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "white" }}>Mitosis Lab Ltd</div>
              <div style={{ fontSize: "0.7rem", color: "var(--color-secondary)", letterSpacing: "0.05em" }}>PATIENT PORTAL</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: "2.5rem" }}>
          {step === "phone" ? (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 900, color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>
                  Welcome back! 👋
                </h1>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Enter your mobile number. We&apos;ll send you a 4-digit code — no password needed.
                </p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                  <Phone size={15} color="var(--color-primary)" /> Mobile Number
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontWeight: 700, color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
                    🇧🇩 +880
                  </div>
                  <input
                    className={`input-field ${phoneError ? "input-error" : ""}`}
                    type="tel"
                    placeholder="1812345678"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
                    onKeyDown={e => e.key === "Enter" && handleSendOtp()}
                    style={{ paddingLeft: "5.5rem", fontSize: "1.1rem", letterSpacing: "0.05em" }}
                    autoFocus
                  />
                </div>
                {phoneError && <p className="error-message">⚠ {phoneError}</p>}
              </div>

              <button
                className="btn-primary"
                onClick={handleSendOtp}
                disabled={isLoading}
                style={{ width: "100%", justifyContent: "center", fontSize: "1rem", opacity: isLoading ? 0.8 : 1 }}
              >
                {isLoading ? (
                  <><RefreshCw size={18} style={{ animation: "spin 1s linear infinite" }} /> Sending OTP...</>
                ) : (
                  <>Send OTP <ArrowRight size={18} /></>
                )}
              </button>

              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--color-surface-alt)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <Shield size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  Your phone number is used only for secure login — like bKash or Pathao. We never share your data.
                </p>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--color-primary-50)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Phone size={24} color="var(--color-primary)" />
                </div>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 900, marginBottom: "0.5rem" }}>
                  Enter Your Code
                </h1>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We sent a 4-digit code to <strong style={{ color: "var(--color-text-primary)" }}>+880 {phone}</strong>
                </p>
              </div>

              {/* OTP Input */}
              <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    style={{ width: "70px", height: "70px", textAlign: "center", fontSize: "1.75rem", fontWeight: 800, fontFamily: "var(--font-ui)", border: `2px solid ${digit ? "var(--color-primary)" : "var(--color-surface-muted)"}`, borderRadius: "var(--radius-xl)", outline: "none", background: digit ? "var(--color-primary-50)" : "var(--color-surface)", color: "var(--color-primary)", transition: "all var(--transition-base)" }}
                    autoFocus={i === 0}
                  />
                ))}
              </div>
              {otpError && <p className="error-message" style={{ justifyContent: "center", marginBottom: "1rem" }}>⚠ {otpError}</p>}

              <button
                className="btn-primary"
                onClick={handleVerifyOtp}
                disabled={isLoading}
                style={{ width: "100%", justifyContent: "center", fontSize: "1rem", marginBottom: "1rem" }}
              >
                {isLoading ? (
                  <><RefreshCw size={18} style={{ animation: "spin 1s linear infinite" }} /> Verifying...</>
                ) : (
                  <><CheckCircle size={18} /> Verify & Login</>
                )}
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  onClick={() => setStep("phone")}
                  style={{ background: "none", border: "none", color: "var(--color-text-secondary)", fontSize: "0.875rem", cursor: "pointer", padding: 0, minHeight: "unset" }}
                >
                  ← Change number
                </button>
                {resendCount < 3 ? (
                  <button
                    onClick={() => setResendCount(c => c + 1)}
                    style={{ background: "none", border: "none", color: "var(--color-primary)", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", padding: 0, minHeight: "unset" }}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Max attempts reached</span>
                )}
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
          <Lock size={12} style={{ marginRight: "0.25rem" }} />
          Secured with 256-bit SSL encryption
        </p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
