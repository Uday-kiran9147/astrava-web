"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/80 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Image 
            src="/astrava.png" 
            alt="Astrava Logo" 
            width={32} 
            height={32} 
            className="h-8 w-auto filter brightness-110" 
          />
          <span className="text-xl font-bold font-sans tracking-tight text-foreground">
            Astrava
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleScroll("discover")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-medium"
          >
            What We Do
          </button>
          <button 
            onClick={() => handleScroll("network")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-medium"
          >
            Discovery Network
          </button>
          <button 
            onClick={() => handleScroll("insights")} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-medium"
          >
            Featured Insights
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleScroll("newsletter")}
            className="hidden sm:inline-block text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-medium"
          >
            Join Newsletter
          </button>
          <button 
            onClick={() => handleScroll("submit")}
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent-foreground transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:-translate-y-0.5"
          >
            Submit Product
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

