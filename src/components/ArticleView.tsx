"use client";

import { Article } from "@/lib/articles";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Clock, ChevronRight } from "lucide-react";

interface ArticleViewProps {
  article: Article;
  nextArticle?: Article;
}

export function ArticleView({ article, nextArticle }: ArticleViewProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[9999]"
        style={{ scaleX }}
      />

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/80 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center max-w-4xl">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group font-mono"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/astrava.png"
              alt="Astrava Logo"
              width={26}
              height={26}
              className="h-6.5 w-auto filter brightness-110"
            />
            <span className="text-lg font-bold font-sans tracking-tight text-foreground">
              Astrava
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-32 pb-40 px-6">
        <article className="container mx-auto max-w-2xl">
          {/* Header Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-block text-xs font-mono tracking-widest text-primary font-bold">
              {article.category}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-foreground leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed font-sans border-l-2 border-border pl-4">
              {article.description}
            </p>

            <div className="pt-4 border-b border-border pb-6 flex flex-wrap gap-6 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2 sm:hidden">
                <Clock className="w-4 h-4 text-primary" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Article Sections */}
          <div className="mt-12 space-y-12 text-foreground/90 text-base md:text-lg font-light leading-relaxed font-sans">
            {article.sections.map((sect, sIdx) => (
              <motion.section
                key={sIdx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {sect.heading && (
                  <h2 className="text-2xl font-bold font-sans text-foreground tracking-tight mt-10">
                    {sect.heading}
                  </h2>
                )}
                {sect.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="first-of-type:text-foreground/95">
                    {para}
                  </p>
                ))}
              </motion.section>
            ))}
          </div>

          {/* Call to Action: Next Article */}
          {nextArticle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-24 pt-10 border-t border-border"
            >
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider block mb-4">
                Read next article
              </span>
              <Link
                href={`/articles/${nextArticle.slug}`}
                className="group block border border-border p-6 hover:border-primary/50 bg-card/20 hover:bg-card/40 transition-all duration-300"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-primary font-bold">
                      {nextArticle.category}
                    </span>
                    <h3 className="text-xl font-bold font-sans text-foreground group-hover:text-accent-foreground transition-colors leading-tight">
                      {nextArticle.title}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          )}
        </article>
      </main>
    </div>
  );
}
