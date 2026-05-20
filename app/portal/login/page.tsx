"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Shield, Lock, RefreshCw, CheckCircle, ChevronLeft } from "lucide-react";
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
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#040b17",
      backgroundImage: `
        radial-gradient(circle at 15% 50%, rgba(0, 163, 108, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 85% 30%, rgba(0, 86, 179, 0.12) 0%, transparent 50%),
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
      position: "relative",
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "2rem 1.5rem" 
    }}>

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 10 }}>
        
        {/* Back to Home Link */}
        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.6rem 1.2rem",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "var(--radius-full)",
          color: "rgba(255,255,255,0.8)",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: 600,
          marginBottom: "2.5rem",
          transition: "all 200ms",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
        >
          <ChevronLeft size={16} /> Back to main site
        </Link>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ 
            background: "white",
            padding: "1rem 2rem 1rem 1.5rem",
            borderRadius: "var(--radius-xl)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            boxShadow: "0 15px 35px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,1)"
          }}>
            <Image 
              src="/mitosis-logo.png" 
              alt="Mitosis Lab Ltd" 
              width={55} 
              height={55} 
              style={{ display: "block", objectFit: "contain", flexShrink: 0 }}
              priority
            />
            <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, textAlign: "left" }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 900, lineHeight: 1.1, color: "var(--color-primary)", letterSpacing: "-0.01em", textTransform: "uppercase" }}>Mitosis <span style={{ color: "var(--color-secondary)", fontWeight: 900 }}>Lab Ltd.</span></span>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0.15rem 0 0 0" }}>Precision Diagnostics</span>
            </div>
          </div>
          <div style={{ 
            display: "inline-block",
            fontSize: "0.75rem", 
            color: "var(--color-brand-green)", 
            letterSpacing: "0.2em",
            fontWeight: 800,
            marginTop: "1.25rem",
            textTransform: "uppercase",
            background: "rgba(0, 163, 108, 0.15)",
            padding: "0.4rem 1rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid rgba(0, 163, 108, 0.3)"
          }}>
            Secure Patient Portal
          </div>
        </div>

        {/* Glassmorphic Card */}
        <div style={{ 
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          borderRadius: "24px",
          padding: "2.5rem 2rem",
        }}>
          {step === "phone" ? (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 900, color: "white", marginBottom: "0.5rem" }}>
                  Welcome back! 👋
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Enter your mobile number. We&apos;ll send you a 4-digit code — no password needed.
                </p>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.9)", marginBottom: "0.6rem" }}>
                  <Phone size={15} color="var(--color-brand-green)" /> Mobile Number
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "1.25rem", top: "50%", transform: "translateY(-50%)", fontWeight: 700, color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", zIndex: 2 }}>
                    🇧🇩 +880
                  </div>
                  <input
                    type="tel"
                    placeholder="1812345678"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setPhoneError(""); }}
                    onKeyDown={e => e.key === "Enter" && handleSendOtp()}
                    className="glass-input"
                    style={{ 
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.2)",
                      border: `1px solid ${phoneError ? "var(--color-danger)" : "rgba(255,255,255,0.15)"}`,
                      borderRadius: "var(--radius-lg)",
                      padding: "1.1rem 1rem 1.1rem 5.75rem", 
                      fontSize: "1.1rem", 
                      letterSpacing: "0.05em",
                      color: "white",
                      outline: "none",
                      transition: "all 200ms",
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    autoFocus
                  />
                </div>
                {phoneError && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", marginTop: "0.5rem", fontWeight: 600 }}>⚠ {phoneError}</p>}
              </div>

              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                style={{ 
                  width: "100%", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", 
                  gap: "0.5rem",
                  fontSize: "1.05rem", 
                  fontWeight: 800,
                  padding: "1.1rem",
                  borderRadius: "var(--radius-lg)",
                  background: "linear-gradient(135deg, var(--color-primary), #0073e6)",
                  color: "white",
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.8 : 1,
                  boxShadow: "0 10px 20px rgba(0, 86, 179, 0.3)",
                  transition: "transform 200ms, box-shadow 200ms"
                }}
                onMouseOver={(e) => { if (!isLoading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 86, 179, 0.4)"; } }}
                onMouseOut={(e) => { if (!isLoading) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 86, 179, 0.3)"; } }}
              >
                {isLoading ? (
                  <><RefreshCw size={18} style={{ animation: "spin 1s linear infinite" }} /> Sending OTP...</>
                ) : (
                  <>Send OTP <ArrowRight size={18} /></>
                )}
              </button>

              <div style={{ marginTop: "1.75rem", padding: "1rem 1.25rem", background: "rgba(0, 163, 108, 0.08)", border: "1px solid rgba(0, 163, 108, 0.2)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                <Shield size={18} color="var(--color-brand-green)" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  Your phone number is used only for secure login — like bKash. We never share your data.
                </p>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", margin: "0 auto 1.25rem", borderRadius: "50%", background: "rgba(0, 163, 108, 0.15)", border: "1px solid rgba(0, 163, 108, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={30} color="var(--color-brand-green)" />
                </div>
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 900, color: "white", marginBottom: "0.5rem" }}>
                  Enter Secure Code
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We sent a 4-digit code to <strong style={{ color: "white", fontWeight: 700 }}>+880 {phone}</strong>
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
                    style={{ 
                      width: "65px", 
                      height: "75px", 
                      textAlign: "center", 
                      fontSize: "2rem", 
                      fontWeight: 800, 
                      fontFamily: "var(--font-ui)", 
                      background: digit ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.2)",
                      border: `1px solid ${digit ? "var(--color-brand-green)" : "rgba(255,255,255,0.15)"}`, 
                      borderRadius: "var(--radius-lg)", 
                      outline: "none", 
                      color: digit ? "var(--color-brand-green)" : "white", 
                      transition: "all 200ms",
                      boxShadow: digit ? "0 0 15px rgba(0, 163, 108, 0.2)" : "inset 0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    autoFocus={i === 0}
                  />
                ))}
              </div>
              {otpError && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", fontWeight: 600, textAlign: "center", marginBottom: "1.25rem" }}>⚠ {otpError}</p>}

              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                style={{ 
                  width: "100%", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "1.05rem", 
                  fontWeight: 800,
                  padding: "1.1rem",
                  borderRadius: "var(--radius-lg)",
                  background: "linear-gradient(135deg, var(--color-brand-green), #008f5d)",
                  color: "white",
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.8 : 1,
                  marginBottom: "1.5rem",
                  boxShadow: "0 10px 20px rgba(0, 163, 108, 0.3)",
                  transition: "transform 200ms, box-shadow 200ms"
                }}
                onMouseOver={(e) => { if (!isLoading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 163, 108, 0.4)"; } }}
                onMouseOut={(e) => { if (!isLoading) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 163, 108, 0.3)"; } }}
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
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", padding: 0 }}
                >
                  ← Change number
                </button>
                {resendCount < 3 ? (
                  <button
                    onClick={() => setResendCount(c => c + 1)}
                    style={{ background: "none", border: "none", color: "var(--color-brand-green)", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", padding: 0 }}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Max attempts reached</span>
                )}
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: "2rem", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
          <Lock size={12} />
          Secured with 256-bit SSL encryption
        </p>
        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .glass-input:focus { border-color: rgba(255,255,255,0.4) !important; outline: none; }
        `}</style>
      </div>
    </div>
  );
}
