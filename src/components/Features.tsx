"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Compass, BarChart2, Megaphone } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Discover",
    description: "We uncover promising software products, diving deep into early traction, unique features, and the teams behind them.",
  },
  {
    icon: BarChart2,
    title: "Analyze",
    description: "We break down growth and distribution strategies, explaining exactly how products acquire their first 1,000 users.",
  },
  {
    icon: Megaphone,
    title: "Amplify",
    description: "We help great products reach new audiences by putting them in front of our network of founders, investors, and early adopters.",
  },
];

interface FeatureCardProps {
  step: typeof steps[0];
  index: number;
}

function FeatureCard({ step, index }: FeatureCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border border-border p-8 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] hover:-translate-y-1 transition-all duration-300 bg-card/60 flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Spotlight Border Glow Layer */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 border border-white/20 bg-white/[0.015]"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          maskImage: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      />
      
      {/* Subtle top border highlight on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 bg-primary/5 border border-primary/20 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/40 transition-colors">
          <step.icon className="w-5 h-5 text-accent-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-4 font-sans text-foreground">{step.title}</h3>
        <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">{step.description}</p>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="what-we-do" className="py-32 relative bg-background">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs text-primary font-mono uppercase tracking-[0.25em] mb-4 inline-block">
            Our Core Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-foreground leading-[1.1] tracking-tight">
            How Astrava shapes the future of software discovery.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FeatureCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

