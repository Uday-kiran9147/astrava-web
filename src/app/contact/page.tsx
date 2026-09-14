import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact — Astrava',
  description: 'Get in touch with the Astrava team for feedback, bug reports, or formula suggestions.',
};

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Contact Astrava
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Have a suggestion for a new calculator, found a formula bug, or want to share feedback? We would love to hear from you.
          </p>
        </div>

        <Card variant="default" className="bg-white border-slate-200 p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900">Direct Contact</h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@astrava.club" className="text-[#1E50FF] hover:underline font-medium">
                support@astrava.club
              </a>
            </p>
            <p className="text-xs text-slate-500">
              We aim to respond to calculator inquiries and suggestions within 24–48 hours.
            </p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
