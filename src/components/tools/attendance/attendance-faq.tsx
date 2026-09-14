'use client';

import { FC, useState } from 'react';
import { Card } from '@/components/ui/card';
import { AttendanceConstants as C } from '@/domains/attendance/attendance.constants';

export const AttendanceFaq: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-4" aria-labelledby="faq-heading">
      <div className="border-b border-slate-200 pb-2">
        <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-2.5">
        {C.FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <Card
              key={faq.question}
              variant="default"
              className="p-4 sm:p-5 bg-white border-slate-200"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-slate-800 hover:text-slate-900 transition-colors">
                  {faq.question}
                </span>
                <span className="text-slate-400 font-bold text-base shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
};
