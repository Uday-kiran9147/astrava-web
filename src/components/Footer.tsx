"use client";

import Image from "next/image";

export function Footer() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-16 border-t border-border bg-background">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-border/60">
          <div className="flex flex-col items-center md:items-start gap-4">
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
            <p className="text-sm text-muted-foreground font-sans font-light">
              Helping great software products get discovered.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground font-sans font-medium">
            <button onClick={() => handleScroll("discover")} className="hover:text-primary transition-colors cursor-pointer">About</button>
            <button onClick={() => handleScroll("newsletter")} className="hover:text-primary transition-colors cursor-pointer">Newsletter</button>
            <a href="https://twitter.com/astrava_hq" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
            <a href="https://linkedin.com/company/astrava" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <span>© 2026 Astrava · All rights reserved.</span>
          <span className="text-[10px] uppercase tracking-wider">Premium Curation & Distribution</span>
        </div>
      </div>
    </footer>
  );
}

