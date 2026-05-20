import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StickySidebar from "@/components/StickySidebar";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: {
    default: "Mitosis Lab Ltd | Precision Diagnostics in Dhaka",
    template: "%s | Mitosis Lab Ltd",
  },
  description:
    "Mitosis Lab Ltd is a leading private diagnostic center in Uttar Badda, Dhaka, offering 24/7 pathology, imaging, and diagnostic services. Book appointments and download reports online.",
  keywords: [
    "diagnostic center dhaka",
    "lab test uttar badda",
    "blood test dhaka",
    "mitosis lab",
    "CBC test",
    "MRI scan dhaka",
    "doctor appointment dhaka",
  ],
  authors: [{ name: "Mitosis Lab Ltd" }],

  // ── Favicon & App Icons ──────────────────────────────────────
  // Next.js serves app/icon.png automatically at /icon.png.
  // No need to manually define the icons object here.

  // ── Open Graph (Social Sharing) ──────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://www.mitosislabltd.com",
    siteName: "Mitosis Lab Ltd",
    title: "Mitosis Lab Ltd | Precision Diagnostics in Dhaka",
    description:
      "Book appointments, find specialist doctors, and access your diagnostic reports securely online.",
    images: [
      {
        url: "/mitosis-logo.png",
        width: 1080,
        height: 1080,
        alt: "Mitosis Lab Ltd — Precision Diagnostics",
      },
    ],
  },

  // ── Twitter Card ─────────────────────────────────────────────
  twitter: {
    card: "summary",
    title: "Mitosis Lab Ltd | Precision Diagnostics in Dhaka",
    description: "Book appointments and access your lab reports online.",
    images: ["/mitosis-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ overflowX: "clip" }}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <StickySidebar />
        <MobileBottomNav />
      </body>
    </html>
  );
}
