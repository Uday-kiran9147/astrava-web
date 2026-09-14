'use client';

import { FC, useState, FormEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AttendanceCalculator } from '@/domains/attendance/attendance.service';
import { AttendanceConstants as C } from '@/domains/attendance/attendance.constants';
import { AttendanceResult } from '@/domains/attendance/attendance.types';
import { AttendanceResultView } from './attendance-result-panel';
import { cn } from '@/lib/utils';

export const AttendanceCalculatorForm: FC = () => {
  const [total, setTotal] = useState<string>('50');
  const [attended, setAttended] = useState<string>('38');
  const [targetPreset, setTargetPreset] = useState<number | 'custom'>(C.DEFAULT_TARGET_PERCENT);
  const [customTarget, setCustomTarget] = useState<string>('75');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AttendanceResult | null>(() => {
    try {
      return AttendanceCalculator.calculate({
        attended: 38,
        total: 50,
        targetPercent: C.DEFAULT_TARGET_PERCENT,
      });
    } catch {
      return null;
    }
  });

  const getEffectiveTarget = (): number => {
    if (targetPreset === 'custom') {
      return Number(customTarget);
    }
    return targetPreset;
  };

  const handleCalculate = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const totalNum = Number(total);
    const attendedNum = Number(attended);
    const targetNum = getEffectiveTarget();

    const validation = AttendanceCalculator.validate({
      total: totalNum,
      attended: attendedNum,
      targetPercent: targetNum,
    });

    if (!validation.isValid) {
      setError(validation.error || 'Invalid calculation parameters');
      setResult(null);
      return;
    }

    setError(null);
    try {
      const calculated = AttendanceCalculator.calculate({
        total: totalNum,
        attended: attendedNum,
        targetPercent: targetNum,
      });
      setResult(calculated);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Calculation failed');
      }
      setResult(null);
    }
  };

  const handlePresetSelect = (preset: number | 'custom') => {
    setTargetPreset(preset);
    const effective = preset === 'custom' ? Number(customTarget) : preset;

    const totalNum = Number(total);
    const attendedNum = Number(attended);
    if (!isNaN(totalNum) && !isNaN(attendedNum) && totalNum > 0 && attendedNum >= 0 && attendedNum <= totalNum) {
      try {
        const calculated = AttendanceCalculator.calculate({
          total: totalNum,
          attended: attendedNum,
          targetPercent: effective,
        });
        setResult(calculated);
        setError(null);
      } catch {
        // Leave previous state or clear on submit
      }
    }
  };

  const handleReset = () => {
    setTotal('');
    setAttended('');
    setTargetPreset(C.DEFAULT_TARGET_PERCENT);
    setCustomTarget('75');
    setError(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Calculator Form Card */}
      <Card variant="elevated" className="bg-white border-slate-200">
        <form onSubmit={handleCalculate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total Classes */}
            <Input
              label="Total classes held"
              type="number"
              min={1}
              step={1}
              required
              value={total}
              onChange={(e) => {
                setTotal(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. 50"
              suffixElement="classes"
            />

            {/* Classes Attended */}
            <Input
              label="Classes attended"
              type="number"
              min={0}
              step={1}
              required
              value={attended}
              onChange={(e) => {
                setAttended(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. 38"
              suffixElement="attended"
            />
          </div>

          {/* Target Percentage Selector */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">
                Target attendance
              </span>
              <span className="text-xs text-slate-500">Standard: 75%</span>
            </div>

            {/* Segmented Chips */}
            <div className="grid grid-cols-4 gap-2">
              {C.TARGET_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    'py-2 px-3 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer select-none',
                    targetPreset === preset
                      ? 'bg-[#1E50FF] text-white border-[#1E50FF] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  )}
                >
                  {preset}%
                </button>
              ))}

              <button
                type="button"
                onClick={() => handlePresetSelect('custom')}
                className={cn(
                  'py-2 px-3 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer select-none',
                  targetPreset === 'custom'
                    ? 'bg-[#1E50FF] text-white border-[#1E50FF] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                )}
              >
                Custom
              </button>
            </div>

            {/* Custom Target Slider / Input */}
            {targetPreset === 'custom' && (
              <div className="mt-2 p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  className="w-full accent-[#1E50FF] cursor-pointer"
                />
                <div className="flex items-center gap-1 shrink-0 bg-white px-2.5 py-1 rounded-md border border-slate-300">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={customTarget}
                    onChange={(e) => setCustomTarget(e.target.value)}
                    className="w-10 bg-transparent text-slate-900 font-mono font-bold text-sm text-right focus:outline-none"
                  />
                  <span className="text-xs text-slate-500 font-medium">%</span>
                </div>
              </div>
            )}
          </div>

          {/* Validation Error */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Primary CTA */}
          <div className="pt-1">
            <Button
              type="submit"
              variant="primary"
              fullWidth
            >
              <span>Calculate Attendance</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Result Panel */}
      <AttendanceResultView result={result} onReset={handleReset} />
    </div>
  );
};
