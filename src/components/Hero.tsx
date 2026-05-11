"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  const marqueeItems = [
    "Zerodha", "Wingify", "CRED", "Zepto", "boAt", "Sugar Cosmetics",
    "Lenskart", "Razorpay", "Groww", "BrowserStack", "Freshworks",
    "Mamaearth", "Meesho", "Slice"
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grain pt-20">
      <div className="container px-4 mx-auto text-center z-10 flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-6">
            INVITE ONLY · PRIVATE NETWORK
          </p>

          <h1 className="text-5xl md:text-7xl font-bold font-display text-foreground mb-6 leading-tight">
            {" "}
            <span className="text-primary italic font-display font-normal">Founders</span>
            <br />
            Private Network
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-sans font-light leading-relaxed">
            Astrava Club is a private network for founders with a live
            product and a real problem to solve. No pitch decks.
            No posturing. Just honest conversations.
          </p>

          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="px-8 py-4 rounded-full bg-primary text-background font-medium hover:bg-[#E8C96A] transition-all transform hover:scale-[1.02] duration-150 flex items-center gap-2 shadow-[0_0_24px_rgba(201,168,76,0.25)]">
              Apply for Membership
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 rounded-full border border-primary text-primary font-medium hover:bg-primary/10 transition-colors flex items-center gap-2">
              See What's Inside
              <ArrowDown className="w-4 h-4" />
            </button>
          </div> */}

          <p className="text-sm text-muted-foreground font-mono mb-12">
            fast filling waitlist · 25 founding member spots remaining
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="w-full border-t border-border py-6 overflow-hidden bg-card">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex gap-12 text-muted-foreground font-mono uppercase tracking-wider text-sm items-center">
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <span key={index} className="mx-4 flex items-center gap-2">
                <span className="text-primary">◆</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
