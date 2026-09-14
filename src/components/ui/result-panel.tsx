import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ResultPanelProps extends HTMLAttributes<HTMLDivElement> {
  headlineValue: string | number;
  headlineUnit?: string;
  headlineLabel: string;
  statusType?: 'success' | 'warning' | 'error' | 'neutral';
  statusLabel?: string;
  actionButtons?: ReactNode;
}

export const ResultPanel: FC<ResultPanelProps> = ({
  headlineValue,
  headlineUnit,
  headlineLabel,
  statusType = 'neutral',
  statusLabel,
  actionButtons,
  className,
  children,
  ...props
}) => {
  const statusStyles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const statusDot = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    neutral: 'bg-slate-400',
  };

  const borderAccent = {
    success: 'border-l-4 border-l-emerald-500',
    warning: 'border-l-4 border-l-amber-500',
    error: 'border-l-4 border-l-rose-500',
    neutral: 'border-l-4 border-l-blue-500',
  };

  return (
    <div
      className={cn(
        'rounded-xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm overflow-hidden',
        borderAccent[statusType],
        className
      )}
      {...props}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            {headlineLabel}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 tabular-nums">
              {headlineValue}
            </span>
            {headlineUnit && (
              <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-500">
                {headlineUnit}
              </span>
            )}
          </div>
        </div>

        {statusLabel && (
          <div className="flex sm:justify-end">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-md border',
                statusStyles[statusType]
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', statusDot[statusType])} />
              {statusLabel}
            </span>
          </div>
        )}
      </div>

      {children && <div className="mt-4">{children}</div>}

      {actionButtons && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
          {actionButtons}
        </div>
      )}
    </div>
  );
};
