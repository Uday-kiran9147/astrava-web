import { forwardRef, useId, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: readonly SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label htmlFor={selectId} className="text-sm font-semibold text-slate-800 block mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none bg-white text-slate-900 text-sm font-medium px-3.5 py-2.5 sm:py-3 rounded-[10px] border border-slate-300 hover:border-slate-400 focus:border-[#1E50FF] focus:ring-2 focus:ring-blue-100 transition-all duration-150 focus:outline-none cursor-pointer pr-10',
              error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-slate-900 py-1.5">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <span className="text-xs font-medium text-red-600 mt-1.5">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
