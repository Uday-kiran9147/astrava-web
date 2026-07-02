"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Calendar, Bell } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 1000);
  };

  return (
    <section id="newsletter" className="py-32 relative bg-card/20 border-b border-border">
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-3xl mx-auto border border-border bg-card/80 p-8 md:p-16 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 text-center relative z-10"
              >
                <div className="space-y-4">
                  <span className="text-xs text-primary font-mono uppercase tracking-[0.25em]">
                    Newsletter
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold font-sans text-foreground leading-[1.1] tracking-tight">
                    Stay ahead of what&apos;s next.
                  </h2>
                  <p className="text-muted-foreground font-sans font-light max-w-xl mx-auto leading-relaxed text-sm md:text-base">
                    Get product discoveries, founder stories, and growth insights delivered straight to your inbox every week.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="flex-1 px-5 py-3.5 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/85 transition-all text-sm font-sans"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold hover:bg-accent-foreground transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] text-sm disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  >
                    {loading ? "Joining..." : "Join Astrava"}
                  </button>
                </form>

                {/* Trust Signals */}
                <div className="pt-4 flex flex-wrap justify-center items-center gap-6 md:gap-10 text-[10px] md:text-xs text-muted-foreground font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>Weekly Digest</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>No Spam Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-primary" />
                    <span>Unsubscribe Anytime</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center py-8 space-y-6 relative z-10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-2">
                  <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-sans text-foreground">
                  You&apos;re on the list.
                </h3>
                <p className="text-muted-foreground font-sans font-light max-w-sm mx-auto leading-relaxed text-sm">
                  Welcome to Astrava. We discover promising products and insights and share them every Tuesday.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-primary hover:text-accent-foreground underline transition-colors cursor-pointer"
                >
                  Sign up with another email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
