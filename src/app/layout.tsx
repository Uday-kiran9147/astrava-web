import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Astrava — Student Utility Hub",
  description: "High-precision academic calculators and study utilities engineered for students. 100% free, client-side, zero login.",
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
    <html lang="en">
      <body className={cn(
        inter.variable,
        jetbrains.variable,
        "font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}
