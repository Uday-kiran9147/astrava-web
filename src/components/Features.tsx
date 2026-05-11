"use client";

import { motion } from "framer-motion";
import { User, LayoutGrid, Coins, Briefcase, Mic, Newspaper } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Founder Profiles",
    description: "Verified profiles with your live product, traction metrics, and what you're working on right now. No fake follower counts.",
  },
  {
    icon: LayoutGrid,
    title: "Startup Showcase",
    description: "Feature your startup to a room of founders, angels, and operators who actually read it.",
  },
  {
    icon: Coins,
    title: "Investor Matching",
    description: "When you're ready, we introduce you directly. No cold emails. No LinkedIn spray-and-pray.",
  },
  {
    icon: Briefcase,
    title: "Hiring Board",
    description: "Post roles to a network of builders. Find your technical co-founder, first engineer, or growth hire.",
  },
  {
    icon: Mic,
    title: "Weekly Founder Rooms",
    description: "Private audio rooms every week. Real conversations about real problems — runway, pricing, product bets.",
  },
  {
    icon: Newspaper,
    title: "Founder Digest",
    description: "Weekly roundup of the most interesting Indian startup stories, curated by founders, for founders.",
  },
];

export function Features() {
  return (
    <section className="py-24 relative bg-card">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-4">
            INSIDE THE CLUB
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground">
            Everything a founder actually needs.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="border border-border rounded-xl p-8 hover:border-[#3A3020] hover:-translate-y-1 transition-all duration-200 bg-background"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
              <p className="text-muted-foreground font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
