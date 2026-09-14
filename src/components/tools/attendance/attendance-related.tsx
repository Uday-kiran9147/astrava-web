import { FC } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { SiteConstants } from '@/shared/site.constants';

export const AttendanceRelated: FC = () => {
  const relatedTools = SiteConstants.ALL_TOOLS.filter(
    (t) => t.slug !== 'attendance-calculator'
  ).slice(0, 3);

  return (
    <section className="space-y-4" aria-labelledby="related-tools-heading">
      <div className="border-b border-slate-200 pb-2">
        <h2 id="related-tools-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Related Student Tools
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.path}
            className="group block focus:outline-none"
          >
            <Card
              variant="default"
              className="h-full bg-white border-slate-200 group-hover:border-slate-300 group-hover:shadow-md transition-all duration-150 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {tool.category}
                  </span>
                  {tool.badge && (
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-800 group-hover:text-[#1E50FF] transition-colors mb-1.5">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-[#1E50FF]">
                <span>Open tool →</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
