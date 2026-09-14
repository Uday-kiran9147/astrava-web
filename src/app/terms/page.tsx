import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service — Astrava',
  description: 'Terms of service and usage conditions for Astrava student calculators and utilities.',
};

export default function TermsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service', href: '/terms' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Last updated: September 14, 2026
          </p>
        </div>

        <Card variant="default" className="bg-white border-slate-200 p-6 space-y-5 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="text-base font-bold text-slate-900">1. Educational & Estimation Purposes</h2>
            <p>
              Astrava tools and calculators are provided free of charge for informational and educational estimation purposes. Always verify critical academic eligibility criteria with your institution's official registrar or examination board.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-base font-bold text-slate-900">2. Disclaimer of Warranties</h2>
            <p>
              The services are provided on an "as is" and "as available" basis without warranties of any kind. Astrava does not guarantee that calculations will be error-free or uninterrupted.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
