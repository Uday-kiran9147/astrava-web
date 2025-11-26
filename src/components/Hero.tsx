"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      
      <div className="container px-4 mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm font-medium text-primary-foreground/80">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Welcome to the future</span>
          </div> */}
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 font-display">
            <span className="text-gradient">Astrava</span>
            <br />
            {/* <span className="text-foreground">Beyond Limits.</span> */}
          </h1>
          
          {/* <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We build digital experiences that defy expectations. Elevate your brand with cutting-edge technology and stunning design.
          </p> */}
          
          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.6)]">
              Get Started
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full glass-card hover:bg-white/10 transition-colors font-semibold text-lg">
              Learn More
            </button>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
