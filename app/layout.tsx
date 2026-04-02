
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import PersistentHeader from "@/components/persistent-header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: "Supply Chain Academy - Build Faster. Spend Smarter.",
  description: "Master construction supply chain management with this intensive 8-module course. Learn procurement strategy, vendor management, cost optimization, and logistics from industry experts.",
  keywords: ["supply chain", "construction", "procurement", "logistics", "training", "course", "homebuilder"],
  authors: [{ name: "Strategem" }],
  openGraph: {
    title: "Supply Chain Academy - Build Faster. Spend Smarter.",
    description: "Master construction supply chain management with this intensive 8-module course.",
    url: "/",
    siteName: "Supply Chain Academy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Supply Chain Academy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supply Chain Academy - Build Faster. Spend Smarter.",
    description: "Master construction supply chain management with this intensive 8-module course.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={cn(inter.className, "antialiased font-sans flex flex-col min-h-screen")}>
        <Providers>
          <PersistentHeader />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
