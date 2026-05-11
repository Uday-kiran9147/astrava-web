"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function WaitlistForm() {
  return (
    <section className="py-24 relative bg-card">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-4">
            JOIN THE WAITLIST
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground">
            Apply for membership.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans font-light">
            Tell us about what you're building. We review every application personally.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-background border border-border rounded-xl p-8 md:p-10">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-card border border-[#3A3020] rounded-lg text-foreground placeholder-[#4A4540] focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-card border border-[#3A3020] rounded-lg text-foreground placeholder-[#4A4540] focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">LinkedIn Profile URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/johndoe"
                className="w-full px-4 py-3 bg-card border border-[#3A3020] rounded-lg text-foreground placeholder-[#4A4540] focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">What are you building?</label>
              <textarea
                placeholder="Describe your product, stage, and what you're working on..."
                rows={4}
                maxLength={280}
                className="w-full px-4 py-3 bg-card border border-[#3A3020] rounded-lg text-foreground placeholder-[#4A4540] focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                required
              ></textarea>
              <p className="text-xs text-muted-foreground text-right mt-1 font-mono">Max 280 chars</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">Current Traction</label>
              <select
                className="w-full px-4 py-3 bg-card border border-[#3A3020] rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors font-sans text-sm"
                required
              >
                <option value="" disabled selected className="text-[#4A4540]">Select traction...</option>
                <option value="pre-revenue">Pre-revenue, but have users</option>
                <option value="0-5l">₹0–5L MRR</option>
                <option value="5-25l">₹5–25L MRR</option>
                <option value="25l+">₹25L+ MRR</option>
                <option value="raised">Raised funding (any stage)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-sans">How did you hear about Astrava Club? (Optional)</label>
              <input
                type="text"
                placeholder="Twitter, friend, etc."
                className="w-full px-4 py-3 bg-card border border-[#3A3020] rounded-lg text-foreground placeholder-[#4A4540] focus:outline-none focus:border-primary transition-colors font-sans text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-primary text-background font-medium rounded-lg hover:bg-[#E8C96A] transition-colors flex items-center justify-center gap-2 font-sans"
            >
              Submit Application
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6 font-sans font-light">
            We'll reply within 48 hours. Your information is never shared.
          </p>
        </div>
      </div>
    </section>
  );
}
