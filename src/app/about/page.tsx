import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Astrava — The Student Utility Hub',
  description: 'Learn about Astrava, our mission, zero-tracking philosophy, and academic utility suite for students.',
};

export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            About Astrava
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Astrava is a fast, clean collection of free academic calculators and study tools built to give students instant answers without intrusive ads or confusing interfaces.
          </p>
        </div>

        <Card variant="default" className="bg-white border-slate-200 p-6 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">Our Core Principles</h2>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <span aria-hidden="true" className="material-icons mt-0.5 text-base text-emerald-600">check</span>
              <span><strong>100% Client-Side Calculations:</strong> All math formulas run directly inside your web browser. No student marks, attendance numbers, or essays are ever sent to a server.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span aria-hidden="true" className="material-icons mt-0.5 text-base text-emerald-600">check</span>
              <span><strong>Zero Login Friction:</strong> No account creation, no passwords, no forced newsletters. Land, calculate in 10 seconds, and get back to your study.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span aria-hidden="true" className="material-icons mt-0.5 text-base text-emerald-600">check</span>
              <span><strong>Exact Mathematical Precision:</strong> Every tool is audited for exact university formula standards and edge cases.</span>
            </li>
          </ul>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
