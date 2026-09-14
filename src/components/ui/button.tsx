import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight select-none transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary:
        'min-h-[48px] sm:min-h-[50px] bg-[#1E50FF] hover:bg-[#0038D1] text-white rounded-[10px] shadow-[0_4px_14px_rgba(30,80,255,0.35)] hover:scale-[1.01] active:scale-[0.98] focus:ring-4 focus:ring-blue-100',
      secondary:
        'min-h-[42px] bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-[10px] active:scale-[0.98]',
      outline:
        'min-h-[42px] bg-white hover:bg-slate-50 text-slate-700 rounded-[10px] border border-slate-300 hover:border-slate-400 active:scale-[0.98]',
      ghost:
        'min-h-[38px] bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-[8px]',
      danger:
        'min-h-[42px] bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-[10px]',
    };

    const sizes = {
      sm: 'px-3.5 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3 text-sm sm:text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          variant === 'primary' ? 'px-7 py-3 text-sm sm:text-base' : sizes[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
