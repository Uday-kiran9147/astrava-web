import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'muted';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-slate-200 text-slate-900 shadow-sm',
      elevated: 'bg-white border border-slate-200/90 text-slate-900 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.06),0_1px_3px_0_rgba(0,0,0,0.04)]',
      muted: 'bg-slate-50 border border-slate-200/80 text-slate-900',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-xl p-5 sm:p-6 relative overflow-hidden', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
