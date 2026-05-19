"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Strategy 3: The "Glassmorphism Contact Form" - Now Apple-Style Light Glass */}
      <div 
        className="relative min-h-[70vh] py-16 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-teal-900/90"></div>
        <div className="container mx-auto px-4 w-full h-full flex flex-col md:flex-row items-center justify-center gap-12 z-10 relative">
          
          <div className="text-left max-w-lg">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl">
              Let&apos;s Connect
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md mb-8">
              We&apos;re here to help. Reach out to Mitosis Lab Ltd anytime for inquiries, support, or feedback.
            </p>
            <div className="hidden md:flex gap-6">
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg">
                <Phone className="text-green-400 w-8 h-8 mb-2" />
                <h3 className="text-white font-bold text-lg">Call Us</h3>
                <p className="text-white/80">+880 1898-806050</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg">
                <MapPin className="text-green-400 w-8 h-8 mb-2" />
                <h3 className="text-white font-bold text-lg">Visit Us</h3>
                <p className="text-white/80">Uttar Badda, Dhaka</p>
              </div>
            </div>
          </div>

          {/* Light Glassmorphism Form Card */}
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl text-left relative z-20">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:bg-white transition-all"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:bg-white transition-all"
                  required
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:bg-white transition-all"
                  required
                />
              </div>
              <div>
                <textarea 
                  placeholder="Your Message..." 
                  rows={4}
                  className="w-full bg-white/80 text-gray-900 placeholder-gray-500 border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:bg-white transition-all resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Contact Info */}
      <div className="container mx-auto" style={{ padding: "4rem 1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {[
            {
              Icon: MapPin,
              title: "Location",
              details: "Uttar Badda, Dhaka, Bangladesh",
              link: "https://maps.google.com/?q=Uttar+Badda+Dhaka",
            },
            {
              Icon: Phone,
              title: "Phone",
              details: "+880 1898-806050",
              link: "tel:+8801898806050",
            },
            {
              Icon: Mail,
              title: "Email",
              details: "mitosislabltd@gmail.com",
              link: "mailto:mitosislabltd@gmail.com",
            },
            {
              Icon: Clock,
              title: "Hours",
              details: "Everyday 7:30 AM – 11:00 PM",
              link: null,
            },
          ].map(({ Icon, title, details, link }, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <div style={{ width: "60px", height: "60px", borderRadius: "var(--radius-xl)", background: "rgba(34, 197, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Icon size={32} color="#22c55e" />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--color-text-primary)" }}>
                {title}
              </h3>
              {link ? (
                <a
                  href={link}
                  target={title === "Location" ? "_blank" : undefined}
                  rel={title === "Location" ? "noopener noreferrer" : undefined}
                  style={{
                    color: "var(--color-primary)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 200ms",
                  }}
                >
                  {details}
                </a>
              ) : (
                <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem", fontWeight: 600 }}>
                  {details}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--color-text-primary)", textAlign: "center" }}>
            Visit Us
          </h2>
          {/* TODO: Update Map Embed URL from Mirpur to Uttar Badda (Done) */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200" style={{ width: "100%", height: "450px" }}>
            <iframe 
              src="https://maps.google.com/maps?q=Mitosis+Lab+Ltd,+Ma+Plaza,+Mirpur+1,+Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full rounded-2xl shadow-xl border border-gray-200" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ background: "var(--color-primary-50)", padding: "3rem 2rem", borderRadius: "var(--radius-xl)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem", color: "var(--color-text-primary)" }}>
            Ready to Book?
          </h3>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem", fontSize: "1.1rem" }}>
            Schedule your appointment online or call us for assistance.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              Book Appointment <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+8801898806050"
              className="inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all"
            >
              <Phone size={18} /> Call Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
