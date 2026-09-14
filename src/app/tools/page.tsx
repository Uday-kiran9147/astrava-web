import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Card } from '@/components/ui/card';
import { SiteConstants } from '@/shared/site.constants';

export const metadata: Metadata = {
  title: 'Free Student Utility Tools & Academic Calculators | Astrava',
  description: 'Directory of fast, precision-engineered study tools, academic calculators, and student converters. 100% free and client-side.',
  alternates: {
    canonical: `${SiteConstants.SITE_URL}/tools`,
  },
};

export default function ToolsDirectoryPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
  ] as const;

  const categories = [
    { id: 'academics', title: 'Academic & Grade Calculators' },
    { id: 'study', title: 'Study & Productivity Tools' },
    { id: 'general', title: 'General Math & Converters' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Directory Header */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Student Utility Tools
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Fast, client-side academic calculators and productivity utilities built for students.
          </p>
        </div>

        {/* Categorized Tools Grid */}
        <div className="space-y-8">
          {categories.map((cat) => {
            const toolsInCat = SiteConstants.ALL_TOOLS.filter((t) => t.category === cat.id);
            if (toolsInCat.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {cat.title}
                  </h2>
                  <span className="text-xs text-slate-400 font-medium">
                    {toolsInCat.length} tools
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {toolsInCat.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.isAvailable ? tool.path : '#'}
                      className={`group block focus:outline-none ${
                        !tool.isAvailable ? 'opacity-65 cursor-not-allowed' : ''
                      }`}
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
                          <span
                            className={
                              tool.isAvailable
                                ? 'text-emerald-600 font-semibold'
                                : 'text-slate-400'
                            }
                          >
                            {tool.isAvailable ? '● Ready to use' : '○ In development'}
                          </span>
                          {tool.isAvailable && (
                            <span className="text-[#1E50FF] font-semibold">
                              Open →
                            </span>
                          )}
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
