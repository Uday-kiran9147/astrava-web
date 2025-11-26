export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-display text-gradient">Astrava</span>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Astrava Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
