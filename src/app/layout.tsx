import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    template: "%s | Astrava",
    default: "Astrava — Student Utility Hub",
  },
  description: "High-precision academic calculators and study utilities engineered for students. 100% free, client-side, zero login.",
  metadataBase: new URL('https://astrava.club'),
  icons: {
    icon: "/utility.png",
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  themeColor: "#2D5BFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        "font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col"
      )}>
        {/* Google Analytics Placeholder */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
