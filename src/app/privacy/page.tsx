import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy — Astrava',
  description: 'Astrava privacy policy explaining our 100% client-side calculation model, zero user data collection, and advertising cookie disclosures.',
};

export default function PrivacyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Last updated: September 14, 2026
          </p>
        </div>

        <Card variant="default" className="bg-white border-slate-200 p-6 space-y-5 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-1.5">
            <h2 className="text-base font-bold text-slate-900">1. Zero Calculation Data Collection</h2>
            <p>
              Astrava calculators execute 100% locally inside your web browser via client-side JavaScript. No student marks, class counts, or custom notes are ever transmitted to or stored on our servers.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-base font-bold text-slate-900">2. Cookies & Advertising Disclosures</h2>
            <p>
              We use third-party advertising partners (such as Google AdSense) to serve ads when you visit our website. These companies may use cookies and web beacons to serve ads based on prior visits to this or other websites. You may opt out of personalized advertising by visiting Google Ads Settings.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="text-base font-bold text-slate-900">3. Analytics & Compliance</h2>
            <p>
              We may collect anonymized page-level traffic telemetry to measure site performance and Core Web Vitals. We comply with applicable data protection regulations including DPDP and GDPR guidelines.
            </p>
          </section>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
