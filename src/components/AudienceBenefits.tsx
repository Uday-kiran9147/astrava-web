"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

const audiences = [
  {
    title: "For Founders",
    description: "Launch your product directly to users who care about software quality.",
    benefits: [
      "Maximum product visibility",
      "Launch amplification support",
      "Direct distribution channels",
    ],
  },
  {
    title: "For Builders",
    description: "Learn how modern software companies grow and distribute.",
    benefits: [
      "Curated product discoveries",
      "Deep growth & SEO insights",
      "Startup intelligence updates",
    ],
  },
  {
    title: "For Early Adopters",
    description: "Test and use next-generation software products before anyone else.",
    benefits: [
      "Exclusive early-access keys",
      "Direct lines to product founders",
      "Private feedback roundtables",
    ],
  },
];

interface AudienceCardProps {
  aud: typeof audiences[0];
  index: number;
}

function AudienceCard({ aud, index }: AudienceCardProps) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border border-border p-8 bg-card/40 flex flex-col justify-between relative overflow-hidden group"
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

      <div className="relative z-10">
        <h3 className="text-2xl font-bold font-sans text-foreground mb-4">{aud.title}</h3>
        <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8">{aud.description}</p>
        
        <ul className="space-y-4">
          {aud.benefits.map((benefit, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-foreground/90 font-light">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-accent-foreground" />
              </div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function AudienceBenefits() {
  return (
    <section className="py-32 relative bg-card/20 border-b border-border">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs text-primary font-mono uppercase tracking-[0.25em] mb-4 inline-block">
            Target Audience
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-foreground leading-[1.1] tracking-tight">
            Designed for the builders of tomorrow.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((aud, index) => (
            <AudienceCard key={index} aud={aud} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
