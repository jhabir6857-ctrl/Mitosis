"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kausar Ali",
    location: "Mohammadpur",
    rating: 5,
    text: "My experience at Mitosis Lab was excellent. The staff were very professional and caring. I received my report on time, and they answered all my questions. I am truly satisfied!",
  },
  {
    name: "Mamun Elahi",
    location: "Dhaka",
    rating: 5,
    text: "I visited Mitosis Lab for my health check-up. I was impressed by their test accuracy and service. They gave me ample time and were ready to listen to my concerns.",
  },
  {
    name: "Rashida Begum",
    location: "Mirpur",
    rating: 5,
    text: "As an elderly patient, I was nervous about using an online portal. The staff helped me step by step. Now I download my reports myself. Very easy and secure.",
  },
  {
    name: "Tanvir Hossain",
    location: "Pallabi",
    rating: 5,
    text: "Fast, accurate, and affordable. I got my CBC results within hours. The online portal makes it so easy to share reports with my doctor. Highly recommended!",
  },
  {
    name: "Fatema Khatun",
    location: "Mirpur-10",
    rating: 5,
    text: "Wonderful service! The lab is very clean and the technicians are gentle and professional. I booked my home sample collection in just 2 minutes. Will come back!",
  },
  {
    name: "Shahinur Rahman",
    location: "Kazipara",
    rating: 5,
    text: "Best diagnostic center in Mirpur. Reports are accurate, staff is polite, and the waiting time is minimal. They truly care about patients. Five stars!",
  },
];

// Duplicate for seamless infinite loop
const displayTestimonials = [...testimonials, ...testimonials];

export default function TestimonialSlider() {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <style>{`
        @keyframes scrollReverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Overflow container with fade edges */}
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            /* Left-to-right: start at -50% (right side) → move to 0 (left side) */
            animation: "scrollReverse 50s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {displayTestimonials.map((t, index) => (
            <div
              key={`${t.name}-${index}`}
              className="card"
              style={{
                minWidth: "280px",
                maxWidth: "300px",
                padding: "1.75rem",
                cursor: "default",
                flexShrink: 0,
                position: "relative",
              }}
            >
              {/* Quote icon */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  opacity: 0.08,
                }}
              >
                <Quote size={40} color="var(--color-primary)" />
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>

              {/* Review text */}
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontFamily: "var(--font-ui)", fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                    📍 {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pause hint */}
      <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "1.25rem" }}>
        Hover to pause · Showing real patient reviews
      </p>
    </div>
  );
}
