import { FC } from 'react';
import Link from 'next/link';
import { BreadcrumbItem } from '@/shared/site.types';
import { cn } from '@/lib/utils';

export interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-slate-500 py-1', className)}>
      <ol className="flex items-center space-x-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center space-x-2">
              {index > 0 && <span className="text-slate-300 select-none">/</span>}
              {isLast ? (
                <span className="font-semibold text-slate-800" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#1E50FF] transition-colors duration-150"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
