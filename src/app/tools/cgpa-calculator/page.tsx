import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CgpaCalculatorComponent } from '@/components/tools/cgpa-calculator/cgpa-calculator';

export const metadata: Metadata = {
  title: 'CGPA to Percentage Calculator | Astrava',
  description: 'Calculate your college CGPA and convert it to percentage. Supports multiple 10-point scales and formulas including CBSE, Mumbai University, and direct conversion.',
  alternates: {
    canonical: 'https://astrava.club/tools/cgpa-calculator',
  },
};

export default function CgpaCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'CGPA Calculator', href: '/tools/cgpa-calculator', active: true },
          ]}
        />

        <div className="mt-8 mb-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            CGPA Calculator
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Calculate your semester or cumulative GPA on a 10-point scale, and instantly see the equivalent percentage using standard university formulas.
          </p>
        </div>

        <CgpaCalculatorComponent />
      </div>
    </div>
  );
}
