import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiteConstants } from '@/shared/site.constants';

export const metadata: Metadata = {
  title: 'Astrava — Free Student Utility Hub | High-Precision Academic Tools',
  description: 'Fast, free, 100% client-side academic calculators and study utilities for students. Calculate attendance, CGPA, GPA, and study with precision.',
  alternates: {
    canonical: SiteConstants.SITE_URL,
  },
};

export default function HomePage() {
  const academicTools = SiteConstants.ALL_TOOLS.filter((t) => t.category === 'academics');
  const studyTools = SiteConstants.ALL_TOOLS.filter((t) => t.category === 'study');
  const generalTools = SiteConstants.ALL_TOOLS.filter((t) => t.category === 'general');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
        {/* Clean Hero Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1E50FF]">
            <span>Free Student Utility Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Fast, Precise Tools for Everyday Student Tasks
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            100% free. No logins. No server tracking. Instant calculation tools built for college and school students.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/tools/attendance-calculator">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <span>Calculate Attendance</span>
                <span className="ml-1.5">→</span>
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <span>Explore All Tools</span>
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Tool Spotlight: Attendance Calculator */}
        <section aria-labelledby="featured-tool-heading" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 id="featured-tool-heading" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Featured Calculator
            </h2>
            <span className="text-xs text-emerald-600 font-semibold">● Ready to use</span>
          </div>

          <Card variant="elevated" className="bg-white border-slate-200 p-6 sm:p-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#1E50FF] border border-blue-200">
                    Academics
                  </span>
                  <span className="text-xs text-slate-500">75% & 80% Rule</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  College Attendance Calculator
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                  Find out exactly how many lectures you can safely skip or how many consecutive classes you must attend to meet your university attendance quota.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-500">
                  <span>✓ 75% standard</span>
                  <span>·</span>
                  <span>✓ 80% rule</span>
                  <span>·</span>
                  <span>✓ Custom targets</span>
                  <span>·</span>
                  <span>✓ Worked breakdown</span>
                </div>
              </div>

              <div className="flex flex-col justify-center items-start md:items-end">
                <Link href="/tools/attendance-calculator" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full">
                    <span>Calculate Now</span>
                    <span className="ml-1">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Academic Tools Grid */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Academic & Grade Calculators
            </h2>
            <Link href="/tools" className="text-xs font-semibold text-[#1E50FF] hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {academicTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.isAvailable ? tool.path : '#'}
                className={`group block focus:outline-none ${!tool.isAvailable ? 'opacity-65 cursor-not-allowed' : ''}`}
              >
                <Card
                  variant="default"
                  className="h-full bg-white border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-150 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {tool.category}
                      </span>
                      {tool.badge && (
                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                            tool.isAvailable
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1E50FF] transition-colors mb-1.5">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {tool.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className={tool.isAvailable ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                      {tool.isAvailable ? '● Ready to use' : '○ Launching soon'}
                    </span>
                    {tool.isAvailable && (
                      <span className="text-[#1E50FF] font-semibold">
                        Launch →
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Study & Productivity Tools Grid */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Study & Productivity Utilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {studyTools.map((tool) => (
              <div key={tool.slug} className="opacity-65">
                <Card variant="default" className="h-full bg-white border-slate-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {tool.category}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1.5">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.shortDescription}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                    ○ Phase 2
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* General & Conversion Tools Grid */}
        <section className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              General Math & Conversion Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {generalTools.map((tool) => (
              <div key={tool.slug} className="opacity-65">
                <Card variant="default" className="h-full bg-white border-slate-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {tool.category}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1.5">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{tool.shortDescription}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                    ○ Phase 2
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
