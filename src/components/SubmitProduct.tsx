"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

export function SubmitProduct() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productName: "",
    productUrl: "",
    description: "",
    traction: "pre-launch",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="submit" className="py-32 relative bg-background">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-xs text-primary font-mono uppercase tracking-[0.25em] mb-4 inline-block">
            Distribution Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-sans text-foreground leading-[1.1] tracking-tight mb-6">
            Ready to get discovered?
          </h2>
          <p className="text-muted-foreground font-sans font-light max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Submit your software product. If verified by our curation team, we&apos;ll showcase it to over 15,000 founders, investors, and early adopters.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card/40 border border-border p-8 md:p-12 relative shadow-2xl backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2 font-sans">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/80 transition-colors text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2 font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/80 transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2 font-sans">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Astrava"
                      required
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/80 transition-colors text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2 font-sans">
                      Product URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://astrava.club"
                      required
                      value={formData.productUrl}
                      onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/80 transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2 font-sans">
                    What does it do?
                  </label>
                  <textarea
                    placeholder="Briefly describe the product, core functionality, and unique value proposition..."
                    rows={4}
                    maxLength={280}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/80 transition-colors text-sm font-sans resize-none"
                  />
                  <p className="text-[10px] text-muted-foreground text-right mt-1 font-mono">
                    {formData.description.length}/280 characters max
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2 font-sans">
                    Current Traction
                  </label>
                  <div className="relative">
                    <select
                      value={formData.traction}
                      onChange={(e) => setFormData({ ...formData, traction: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-primary/80 transition-colors text-sm font-sans appearance-none"
                    >
                      <option value="pre-launch">Pre-launch / Concept Stage</option>
                      <option value="mvp-live">MVP live with active beta users</option>
                      <option value="early-revenue">Paying Customers / Steady MRR</option>
                      <option value="scaling">Scaling / Venture Backed</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold hover:bg-accent-foreground transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                >
                  {loading ? "Submitting..." : "Submit Product for Curation"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-2">
                  <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-sans text-foreground">
                  Submission Received
                </h3>
                <p className="text-muted-foreground font-sans font-light max-w-sm mx-auto leading-relaxed text-sm">
                  Thank you for submitting <strong className="text-foreground">{formData.productName}</strong>. Our editorial curation team reviews entries weekly and will reach out if we need any additional details.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      productName: "",
                      productUrl: "",
                      description: "",
                      traction: "pre-launch",
                    });
                  }}
                  className="text-xs font-semibold text-primary hover:text-accent-foreground underline transition-colors cursor-pointer"
                >
                  Submit another product
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
