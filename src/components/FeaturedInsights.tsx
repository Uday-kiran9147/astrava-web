"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { articles } from "@/lib/articles";

export function FeaturedInsights() {
  return (
    <section id="insights" className="py-32 relative bg-background border-b border-border">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs text-primary font-mono uppercase tracking-[0.25em] mb-4 inline-block">
              Editorial Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-foreground leading-[1.1] tracking-tight">
              Featured Insights
            </h2>
          </div>
          <button className="text-sm font-semibold text-accent-foreground hover:text-primary flex items-center gap-1 group transition-colors self-start md:self-auto">
            View All Editorial
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, index) => (
            <Link key={index} href={`/articles/${art.slug}`} className="flex flex-col h-full">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group border border-border p-8 bg-card/40 flex flex-col justify-between hover:border-primary/45 transition-colors cursor-pointer h-full w-full"
              >
                <div className="space-y-6">
                  <span className="text-[10px] font-mono tracking-widest text-primary font-bold">
                    {art.category}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-bold font-sans text-foreground leading-tight group-hover:text-accent-foreground transition-colors">
                    {art.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    {art.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground font-mono">
                  <span>{art.readTime}</span>
                  <span className="group-hover:text-accent-foreground font-semibold flex items-center gap-0.5 transition-colors">
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
