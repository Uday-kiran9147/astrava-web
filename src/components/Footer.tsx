export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/astrava.png" alt="Astrava Logo" className="h-8 w-auto" />
            <span className="text-sm font-light text-primary font-sans ml-1">club</span>
          </div>

          <div className="text-sm text-muted-foreground font-sans font-light">
            private founder network.
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground font-sans font-light">
            <a href="https://twitter.com/astrava_club" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter/X</a>
            <a href="https://www.linkedin.com/company/astrava-club" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            {/* astrava.club@gmail.com */}
            <a href="mailto:astrava.club@gmail.com" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground font-mono">
          © 2025 Astrava Club · astrava.club · All rights reserved
        </div>
      </div>
    </footer>
  );
}
