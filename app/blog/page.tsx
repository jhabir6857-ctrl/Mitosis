"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export default function BlogPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />
      <main style={{ flex: 1 }}>
        <ComingSoon
          title="News & Health Blog"
          description="Health tips, news, and updates from our doctors. Coming soon."
          emoji="📰"
        />
      </main>
      <Footer />
    </div>
  );
}
