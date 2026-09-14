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
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-12 border-b border-border/60">
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
              High-precision academic calculators and study utilities engineered for students.
            </p>
            <div className="text-sm text-muted-foreground font-sans font-light mt-4">
              <p><strong>Contact Us:</strong></p>
              <p>123 Innovation Drive</p>
              <p>Tech Park, Suite 400</p>
              <p>San Francisco, CA 94107</p>
              <p>Email: hello@astrava.club</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 text-sm text-muted-foreground font-sans font-medium">
            <div className="flex flex-col gap-3">
              <h4 className="text-foreground font-semibold">Tools</h4>
              <button onClick={() => handleScroll("tools")} className="hover:text-primary transition-colors text-left">Calculators</button>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-foreground font-semibold">Legal</h4>
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-foreground font-semibold">Social</h4>
              <a href="https://twitter.com/astrava_club" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <span>© 2026 Astrava · All rights reserved.</span>
          <span className="text-[10px] uppercase tracking-wider">Student Utility Hub</span>
        </div>
      </div>
    </footer>
  );
}

