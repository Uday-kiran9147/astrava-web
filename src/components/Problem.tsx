"use client";

import { motion } from "framer-motion";
import { MessageSquare, Tent, Trophy } from "lucide-react";

const problems = [
  {
    icon: MessageSquare,
    title: "300-person WhatsApp groups",
    description: "2 people respond. The rest are lurkers waiting to pitch their startup.",
  },
  {
    icon: Tent,
    title: "Networking events",
    description: "Sponsored by a coworking space. Everyone has a pitch deck. Nobody has a real problem.",
  },
  {
    icon: Trophy,
    title: "LinkedIn \"communities\"",
    description: "Mostly people posting fundraise announcements and congratulating each other.",
  },
];

export function Problem() {
  return (
    <section className="py-24 relative bg-card">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-4">
            THE PROBLEM
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground">
            Every founder community
            <br />
            looks the same.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {problems.map((prob, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="border border-border rounded-xl p-8 bg-background"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-6">
                <prob.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{prob.title}</h3>
              <p className="text-muted-foreground font-light">{prob.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-display font-light text-foreground leading-relaxed">
            "Astrava Club was built because none of these worked for founders who are actually building."
          </p>
        </div>
      </div>
    </section>
  );
}
