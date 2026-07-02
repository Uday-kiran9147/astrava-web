"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";

function Counter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const end = value;
    const totalFrames = Math.min(Math.floor(duration * 60), 120);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const current = Math.floor(easeOut * end);
      
      setCount(current);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export function Problem() {
  const funnelSteps = [
    { label: "Products Built", value: 1000, color: "from-primary/20 to-primary/5", width: "w-full" },
    { label: "Seen & Evaluated", value: 100, color: "from-primary/30 to-primary/10", width: "w-[80%]" },
    { label: "Remembered", value: 10, color: "from-primary/45 to-primary/15", width: "w-[60%]" },
    { label: "Wins Market share", value: 1, color: "from-primary to-primary-foreground/30", width: "w-[40%]" },
  ];

  return (
    <section id="discover" className="py-32 relative bg-card/40 border-y border-border">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />

      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs text-primary font-mono uppercase tracking-[0.25em]">
                The Distribution Gap
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans text-foreground leading-[1.1] tracking-tight">
                Most products don&apos;t fail because they&apos;re bad.
              </h2>
            </div>
            
            <div className="space-y-6 text-base md:text-lg text-muted-foreground font-sans font-light leading-relaxed">
              <p>
                Most products fail because <strong className="text-foreground font-semibold">nobody discovers them.</strong>
              </p>
              <p>
                Founders spend months building, polishing, and perfecting features. But when it comes to launches, SEO, and distribution—the core channels are ignored or treated as an afterthought.
              </p>
              <p className="text-foreground/90 font-medium">
                Astrava exists to change that. We bring editorial quality and distribution power together, ensuring your product reaches the audience it deserves.
              </p>
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-lg space-y-4">
              <div className="text-center mb-6">
                <span className="text-xs uppercase font-mono tracking-widest text-muted-foreground">Typical Product Funnel</span>
              </div>

              {funnelSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`${step.width} h-20 bg-gradient-to-r ${step.color} border border-primary/20 flex items-center justify-between px-6 shadow-inner relative overflow-hidden`}
                  >
                    {/* Subtle glow/line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    
                    <span className="text-sm md:text-base font-sans text-muted-foreground font-medium">
                      {step.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-mono font-bold text-foreground">
                      <Counter value={step.value} />
                    </span>
                  </motion.div>
                  
                  {idx < funnelSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.5 }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                      viewport={{ once: true }}
                      className="my-1.5"
                    >
                      <ArrowDown className="w-4 h-4 text-primary/60" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

