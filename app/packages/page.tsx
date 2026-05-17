"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export default function PackagesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ flex: 1 }}>
        <ComingSoon
          title="Health Packages"
          description="Our full catalogue of wellness packages is being updated with new pricing. Coming very soon."
          emoji="💊"
        />
      </main>
      <Footer />
    </div>
  );
}
