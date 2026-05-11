"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "Is this just another WhatsApp group?",
    a: "No. Astrava Club has structured founder profiles, a startup showcase, a hiring board, investor matching, and weekly moderated founder rooms. WhatsApp groups don't vet members or create structured value. We do.",
  },
  {
    q: "What happens after I apply?",
    a: "We review your application manually — usually within 48 hours. If you're a fit, we send you a payment link for the founding member rate. If we're not sure, we might ask a follow-up question.",
  },
  {
    q: "What if I'm pre-revenue?",
    a: "We look at the full picture. Pre-revenue founders with real users and a clear market thesis get in. Pre-revenue founders with an idea and no execution don't — yet.",
  },
  {
    q: "Do I need to be based in a metro city?",
    a: "No. Astrava Club is India-wide. Some of the best builders we know are in Pune, Jaipur, Kochi, and Ahmedabad.",
  },
  {
    q: "Can I cancel my membership?",
    a: "Yes, anytime. Founding members keep their locked rate for as long as they stay active. There are no auto-renewals without advance notice.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-mono mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground">
            Straight answers.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-border rounded-lg bg-card">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-display font-bold text-foreground">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground font-sans font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
