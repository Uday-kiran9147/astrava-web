'use client';

import { FC, useState } from 'react';
import { AttendanceResult } from '@/domains/attendance/attendance.types';
import { AttendanceConstants as C } from '@/domains/attendance/attendance.constants';
import { ResultPanel } from '@/components/ui/result-panel';
import { Button } from '@/components/ui/button';

export interface AttendanceResultViewProps {
  result: AttendanceResult | null;
  onReset: () => void;
}

export const AttendanceResultView: FC<AttendanceResultViewProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[180px] shadow-sm">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-700 mb-1">
          Ready to Calculate
        </h3>
        <p className="text-xs text-slate-500 max-w-xs">
          Enter your total classes and attended classes above to see your attendance breakdown.
        </p>
      </div>
    );
  }

  const {
    currentPercent,
    targetPercent,
    attended,
    total,
    missed,
    status,
    statusLabel,
    maxMissable,
    classesNeeded,
    is100PercentTarget,
    note,
  } = result;

  const statusTypeMap = {
    on_track: 'success' as const,
    margin: 'warning' as const,
    deficit: 'error' as const,
  };

  const handleCopySummary = async () => {
    const summaryText = `Astrava Attendance Report:\n• Attendance: ${currentPercent}% (${attended}/${total} classes)\n• Target: ${targetPercent}%\n• Status: ${statusLabel}\n• ${
      classesNeeded > 0
        ? `Recovery: Attend ${classesNeeded} consecutive classes`
        : `Safe Margin: You can miss ${maxMissable} classes`
    }\nCalculated at https://astrava.club/tools/attendance-calculator`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed
    }
  };

  return (
    <div className="space-y-4">
      <ResultPanel
        headlineValue={currentPercent}
        headlineUnit="%"
        headlineLabel="Current Attendance"
        statusType={statusTypeMap[status]}
        statusLabel={statusLabel}
        actionButtons={
          <>
            <Button variant="outline" size="sm" onClick={handleCopySummary}>
              {copied ? <><span aria-hidden="true" className="material-icons text-base">check</span> Copied</> : 'Copy Summary'}
            </Button>
            <Button variant="ghost" size="sm" onClick={onReset}>
              Reset
            </Button>
          </>
        }
      >
        {/* Primary Insight */}
        <div className="my-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
          {is100PercentTarget ? (
            <div className="text-sm text-slate-700 font-medium leading-relaxed">
              {note}
            </div>
          ) : classesNeeded > 0 ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-rose-700 block mb-0.5">
                  Classes Needed to Reach {targetPercent}%
                </span>
                <p className="text-xs text-slate-600">
                  {C.DESC_MUST_ATTEND}
                </p>
              </div>
              <div className="shrink-0 flex items-baseline gap-1 bg-rose-100/70 border border-rose-200 px-3.5 py-1.5 rounded-lg">
                <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 tabular-nums">
                  +{classesNeeded}
                </span>
                <span className="text-xs font-semibold text-rose-800">
                  classes
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 block mb-0.5">
                  Safe Absence Margin
                </span>
                <p className="text-xs text-slate-600">
                  {maxMissable > 0 ? C.DESC_CAN_MISS : C.DESC_TARGET_ACHIEVED}
                </p>
              </div>
              <div className="shrink-0 flex items-baseline gap-1 bg-emerald-100/70 border border-emerald-200 px-3.5 py-1.5 rounded-lg">
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 tabular-nums">
                  {maxMissable}
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  classes
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Clean horizontal metrics row */}
        <div className="flex items-stretch divide-x divide-slate-200 border-t border-slate-100 mt-4 pt-4">
          <div className="flex-1 px-3 first:pl-0">
            <div className="text-xs text-slate-500 font-medium mb-0.5">Attended</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">{attended}</div>
          </div>

          <div className="flex-1 px-3">
            <div className="text-xs text-slate-500 font-medium mb-0.5">Missed</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">{missed}</div>
          </div>

          <div className="flex-1 px-3">
            <div className="text-xs text-slate-500 font-medium mb-0.5">Total Held</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">{total}</div>
          </div>
        </div>
      </ResultPanel>
    </div>
  );
};
