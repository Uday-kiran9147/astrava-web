import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--font-instrument-serif" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Astrava — Helping Great Software Products Get Discovered",
  description: "Discover promising software products, founder stories, and growth insights before everyone else.",
  icons: {
    icon: "/astrava.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        inter.variable,
        instrumentSerif.variable,
        jetbrains.variable,
        "font-sans antialiased bg-background text-foreground min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}

