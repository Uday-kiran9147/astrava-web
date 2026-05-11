import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Astrava Club | Founder Network",
  description: "A curated, invite-only network for Indian founders who are actively building. No noise. No fluff. Apply for founding membership.",
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
        dmSans.variable,
        playfair.variable,
        jetbrains.variable,
        "font-sans antialiased bg-background text-foreground min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}
