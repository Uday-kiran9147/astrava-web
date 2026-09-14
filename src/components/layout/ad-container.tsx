import { FC } from 'react';
import { cn } from '@/lib/utils';

export interface AdContainerProps {
  slotId?: string;
  format?: 'banner' | 'rectangle' | 'responsive';
  className?: string;
}

export const AdContainer: FC<AdContainerProps> = ({
  format = 'responsive',
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 py-4 px-2 min-h-[90px] select-none',
        format === 'banner' && 'min-h-[90px]',
        format === 'rectangle' && 'min-h-[250px]',
        className
      )}
      aria-label="Advertisement Area"
    >
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-1">
        Advertisement
      </span>
      <div className="text-xs text-slate-400">
        [Ad Space Reserved — AdSense Safe Placement]
      </div>
    </div>
  );
};
