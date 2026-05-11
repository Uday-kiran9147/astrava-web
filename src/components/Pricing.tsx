"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const includes = [
  "Full community access",
  "Founder profile + startup showcase",
  "Weekly founder rooms",
  "Investor matching (when ready)",
  "Hiring board",
  "Weekly digest",
];

export function Pricing() {
  return (
    <section className="py-24 relative bg-card">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-4">
            MEMBERSHIP
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground">
            Two ways in.
            <br />
            One waitlist.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border-2 border-primary rounded-xl p-8 bg-background relative flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 bg-primary text-background text-xs font-mono px-3 py-1 uppercase font-bold rounded-bl-lg rounded-tr-lg">
              25 SPOTS ONLY
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display mb-2">Founding Member</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold font-mono">₹4,999</span>
                <span className="text-muted-foreground text-sm">/year</span>
                <span className="text-muted-foreground text-sm line-through ml-2">₹9,999/year</span>
              </div>
              <p className="text-muted-foreground text-sm font-light mb-6">
                Lock in the lowest rate ever. Founding members shape what Astrava Club becomes.
              </p>
              <ul className="space-y-3 mb-8">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground font-light">
                    <Check className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-sm text-foreground font-light">
                  <Check className="w-4 h-4 text-primary" />
                  Founding member badge (permanent)
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground font-light">
                  <Check className="w-4 h-4 text-primary" />
                  Direct access to founding team
                </li>
              </ul>
            </div>
            <div>
              <button className="w-full px-6 py-3 rounded-full bg-primary text-background font-medium hover:bg-[#E8C96A] transition-colors mb-4">
                Apply as Founding Member →
              </button>
              <p className="text-xs text-center text-primary font-mono">14 of 25 spots remaining</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="border border-border rounded-xl p-8 bg-background flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold font-display mb-2">Club Member</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold font-mono">₹9,999</span>
                <span className="text-muted-foreground text-sm">/year</span>
              </div>
              <p className="text-muted-foreground text-sm font-light mb-6">
                Full access to everything Astrava Club offers, when doors reopen.
              </p>
              <ul className="space-y-3 mb-8">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground font-light">
                    <Check className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button className="w-full px-6 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary/10 transition-colors mb-4">
                Join Waitlist →
              </button>
              <p className="text-xs text-center text-muted-foreground font-mono">Doors reopen after founding cohort fills</p>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-sans font-light">
            No auto-renewals without notice. Cancel anytime. Founding member rate locked for life.
          </p>
        </div>
      </div>
    </section>
  );
}
