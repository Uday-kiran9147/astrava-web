"use client";

import { motion } from "framer-motion";

const stories = [
  {
    label: "BOOTSTRAPPED EXIT",
    company: "Wingify",
    founder: "Paras Chopra",
    metric: "₹1,660 Cr exit · Zero funding raised · 15 years",
    quote: "\"His goal was ₹50,000 a month. He built a ₹1,660 crore company instead.\"",
    tag: "◆ Featured in Astrava Club Digest",
  },
  {
    label: "BOOTSTRAPPED UNICORN",
    company: "Zerodha",
    founder: "Nithin Kamath",
    metric: "₹15,000 Cr valuation · Zero ads · Zero VC",
    quote: "\"Built India's largest broker with ₹30 lakh of personal savings and zero advertising spend.\"",
    tag: "◆ Featured in Astrava Club Digest",
  },
];

export function FounderStories() {
  return (
    <section className="py-24 relative bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-4">
            REAL STORIES
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground">
            The founders we write about.
            <br />
            The kind who belong here.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="border border-border rounded-xl p-8 bg-card flex flex-col justify-between"
            >
              <div>
                <p className="text-xs text-primary font-mono mb-2">{story.label}</p>
                <h3 className="text-2xl font-bold font-display mb-1">{story.company}</h3>
                <p className="text-sm text-muted-foreground mb-4">Founder: {story.founder}</p>
                <p className="text-sm text-primary font-mono mb-4">{story.metric}</p>
                <p className="text-lg font-light text-foreground mb-6 font-sans">{story.quote}</p>
              </div>
              <p className="text-xs text-primary font-mono">{story.tag}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-sans font-light">
            Stories like these, every week. Only for members.
          </p>
        </div>
      </div>
    </section>
  );
}
