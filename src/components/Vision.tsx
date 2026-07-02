"use client";

import { motion } from "framer-motion";

export function Vision() {
  return (
    <section className="py-40 relative bg-card/10 border-b border-border overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-6 mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Large decorative serif quote mark */}
          <span className="block text-primary font-display text-8xl md:text-9xl leading-none opacity-50 select-none">
            &ldquo;
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-foreground leading-[1.25] max-w-3xl mx-auto">
            We believe great products shouldn&apos;t lose to better marketing.
          </h2>

          <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-light text-accent-foreground leading-normal max-w-2xl mx-auto pt-4 border-t border-border/50">
            The future belongs to products that deserve to be discovered.
          </h3>

          <span className="block text-primary font-display text-8xl md:text-9xl leading-none opacity-50 select-none transform rotate-180 translate-y-6">
            &ldquo;
          </span>
        </motion.div>
      </div>
    </section>
  );
}
