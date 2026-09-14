import { FC } from 'react';
import Link from 'next/link';
import { SiteConstants } from '@/shared/site.constants';

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-[7px] bg-[#1E50FF] flex items-center justify-center font-black text-white text-sm shadow-sm group-hover:bg-[#0038D1] transition-colors">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-[#1E50FF] transition-colors leading-none">
              {SiteConstants.SITE_NAME}
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-wide mt-0.5">
              Student Utility Hub
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {SiteConstants.NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/tools"
            className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            All Tools
          </Link>
        </div>
      </div>
    </header>
  );
};
