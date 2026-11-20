import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/website/WhatsAppButton";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "OAKS AFRICA GROUP | Engineering & General Construction",
    template: "%s | OAKS AFRICA GROUP",
  },
  description:
    "OAKS AFRICA GROUP is a premier engineering, architectural design, and general construction enterprise delivering commercial towers, residential estates, and civil infrastructure.",
  keywords: [
    "OAKS Africa Group",
    "Engineering company Ethiopia",
    "General Construction East Africa",
    "Structural engineering Addis Ababa",
    "Commercial building contractors",
    "Civil infrastructure Africa",
    "Architectural design",
  ],
  authors: [{ name: "OAKS AFRICA GROUP" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oaksafricagroup.com",
    siteName: "OAKS AFRICA GROUP",
    title: "OAKS AFRICA GROUP | Engineering Solutions. Lasting Impact.",
    description:
      "Premier engineering, architectural design, and general contracting delivering transformative commercial, residential, and infrastructure developments.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "OAKS AFRICA GROUP Corporate Headquarters & Engineering Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OAKS AFRICA GROUP | Engineering & Construction",
    description: "Engineering Solutions. Lasting Impact. Building world-class infrastructure and commercial developments.",
    images: ["https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-brand-charcoal antialiased selection:bg-brand-gold selection:text-brand-navy">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
