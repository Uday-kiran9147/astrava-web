"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const lookingFor = [
  "Founders with a live product (doesn't need to be profitable)",
  "Founders who've raised ₹10L+ (doesn't need to be VC)",
  "Solo builders with paying customers",
  "Second or third-time founders",
  "Operators who've led significant teams at startups",
];

const notFor = [
  "People building their \"first MVP\" with no users yet",
  "Founders who primarily network for intros, not value",
  "Agency owners without a product business",
  "Students without a live company",
  "Anyone here to pitch, not to help",
];

export function Criteria() {
  return (
    <section className="py-24 relative bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-4">
            WHO GETS IN
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground">
            This isn&apos;t for everyone.
            <br />
            That&apos;s the point.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
          {/* We're looking for */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border border-border rounded-xl p-8 bg-card"
          >
            <h3 className="text-xl font-bold font-display mb-6 text-foreground">We&apos;re looking for</h3>
            <ul className="space-y-4">
              {lookingFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground font-light">
                  <Check className="w-5 h-5 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* This isn't for */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border border-border rounded-xl p-8 bg-card"
          >
            <h3 className="text-xl font-bold font-display mb-6 text-foreground">This isn&apos;t for</h3>
            <ul className="space-y-4">
              {notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-light">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-sans font-light italic">
            Applications are reviewed manually. We reply within 48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
