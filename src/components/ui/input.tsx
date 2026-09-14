import { forwardRef, useId, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixElement?: ReactNode;
  suffixElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, prefixElement, suffixElement, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-slate-800 block mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixElement && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400 font-mono text-sm">
              {prefixElement}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-white text-slate-900 font-mono text-lg font-bold px-3.5 py-2.5 sm:py-3 rounded-[10px] border transition-all duration-150 tabular-nums focus:outline-none placeholder:text-slate-400 placeholder:font-normal',
              prefixElement ? 'pl-10' : '',
              suffixElement ? 'pr-14' : '',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-300 hover:border-slate-400 focus:border-[#1E50FF] focus:ring-2 focus:ring-blue-100',
              className
            )}
            {...props}
          />
          {suffixElement && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
              {suffixElement}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs font-medium text-red-600 mt-1.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-xs text-slate-500 mt-1">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
