"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export default function PathologyPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ flex: 1 }}>
        <ComingSoon
          title="Blood Tests & Pathology"
          description="Detailed service information coming soon."
          emoji="🧬"
        />
      </main>
      <Footer />
    </div>
  );
}
