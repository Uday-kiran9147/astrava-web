import { FC } from 'react';
import Link from 'next/link';
import { SiteConstants } from '@/shared/site.constants';

export const Footer: FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-[5px] bg-[#1E50FF] flex items-center justify-center font-bold text-white text-xs">
                A
              </div>
              <span className="font-bold text-base tracking-tight text-slate-900">
                {SiteConstants.SITE_NAME}
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              {SiteConstants.SITE_DESCRIPTION}
            </p>
            <div className="text-[11px] text-slate-400 mt-1">
              100% Free · Client-Side Calculations · Zero Login
            </div>
          </div>

          {/* Tools Col */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Student Tools
            </span>
            <Link href="/tools/attendance-calculator" className="text-xs text-slate-600 hover:text-slate-900 transition-colors">
              Attendance Calculator
            </Link>
            <Link href="/tools/cgpa-calculator" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              CGPA Calculator
            </Link>
            <Link href="/tools/percentage-calculator" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Percentage Calculator
            </Link>
            <Link href="/tools" className="text-xs text-[#1E50FF] font-semibold hover:underline mt-1">
              Browse All 10 Tools →
            </Link>
          </div>

          {/* Legal Col */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Trust & Legal
            </span>
            {SiteConstants.LEGAL_NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-slate-600 hover:text-slate-900 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {SiteConstants.SITE_NAME}. All calculations run locally in your browser.
          </div>
          <div className="flex items-center gap-3">
            <span>No data tracking</span>
            <span>·</span>
            <span>Fast & lightweight</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
