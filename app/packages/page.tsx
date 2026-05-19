"use client";

import ComingSoon from "@/components/ComingSoon";
import ParallaxBanner from "@/components/ParallaxBanner";
import Link from "next/link";
import { ArrowRight, FileText, HeartPulse, Activity, ShieldCheck } from "lucide-react";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <ParallaxBanner
        title="Health Packages"
        subtitle="Comprehensive checkups designed to keep you and your family healthy."
        imageSrc="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2000&auto=format&fit=crop"
        heightClass="h-[40vh]"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Wellness Plan</h2>
          <p className="text-slate-600 text-lg">
            Our full catalogue of wellness packages is being updated with new pricing, but you can explore our core diagnostic packages below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Basic Health Check", icon: <HeartPulse className="w-8 h-8 text-blue-600 mb-4"/>, price: "Coming Soon" },
            { title: "Diabetic Profile", icon: <Activity className="w-8 h-8 text-blue-600 mb-4"/>, price: "Coming Soon" },
            { title: "Cardiac Risk Assessment", icon: <ShieldCheck className="w-8 h-8 text-blue-600 mb-4"/>, price: "Coming Soon" },
            { title: "Senior Citizen Panel", icon: <FileText className="w-8 h-8 text-blue-600 mb-4"/>, price: "Coming Soon" },
          ].map((pkg, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              {pkg.icon}
              <h3 className="font-bold text-xl mb-2 text-slate-800">{pkg.title}</h3>
              <p className="text-blue-600 font-semibold mb-6">{pkg.price}</p>
              <button disabled className="w-full py-2 px-4 rounded-lg bg-slate-100 text-slate-400 font-medium cursor-not-allowed">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy 2: The "Home Sample Collection" Break */}
      <ParallaxBanner
        imageSrc="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop"
        heightClass="h-[50vh]"
        overlayClass="bg-blue-950/70"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
            Can&apos;t come to the lab?<br className="hidden md:block"/> We&apos;ll come to you.
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
            Experience premium healthcare from the comfort of your home. Our expert technicians ensure safe, hygienic, and precise sample collection.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Book Home Collection <ArrowRight size={20} />
          </Link>
        </div>
      </ParallaxBanner>
    </main>
  );
}
