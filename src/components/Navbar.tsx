"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/astrava.png" alt="Astrava Logo" className="h-8 w-auto" />
          <span className="text-sm font-light text-primary font-sans ml-1">club</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light">
            For Founders
          </Link>
          {/* <button className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded-full hover:bg-primary/10 transition-colors flex items-center gap-2">
            Join Waitlist
            <ArrowRight className="w-3 h-3" />
          </button> */}
        </div>
      </div>
    </nav>
  );
}
