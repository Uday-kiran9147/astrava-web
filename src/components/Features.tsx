"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, Cpu } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and performance, ensuring your users never wait.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Enterprise-grade security built into every layer of the application.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy anywhere, reach everyone. Built to scale effortlessly.",
  },
  {
    icon: Cpu,
    title: "AI Powered",
    description: "Leverage the power of artificial intelligence to automate and enhance.",
  },
];

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
            Why <span className="text-gradient">Astrava?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We provide the tools and infrastructure you need to build the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
