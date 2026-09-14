import { FC } from 'react';
import { Card } from '@/components/ui/card';

export const AttendanceExplanation: FC = () => {
  return (
    <section className="space-y-5" aria-labelledby="how-it-works-heading">
      <div className="border-b border-slate-200 pb-2">
        <h2 id="how-it-works-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          How the Attendance Formula Works
        </h2>
      </div>

      <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
        <p>
          Most universities, engineering colleges, and high schools (including VTU, Anna University, JNTU, and CBSE) enforce a strict <strong>75% or 80% minimum attendance policy</strong> to remain eligible for semester examinations.
        </p>
        <p>
          Calculating how many classes you can afford to skip — or how many you must attend to recover from a shortfall — involves a moving denominator: every future class increases the total class count.
        </p>
      </div>

      {/* Formula Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="muted" className="p-4 sm:p-5 bg-slate-50 border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
            1. Safe Miss Margin Formula
          </span>
          <p className="text-xs text-slate-500 mb-2.5">
            The maximum number of consecutive classes \(x\) you can miss without dropping below your target:
          </p>
          <div className="bg-white p-2.5 rounded-md border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 font-semibold">
            x = ⌊ (Attended × 100) / Target% − Total ⌋
          </div>
        </Card>

        <Card variant="muted" className="p-4 sm:p-5 bg-slate-50 border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block mb-1">
            2. Class Recovery Quota Formula
          </span>
          <p className="text-xs text-slate-500 mb-2.5">
            The minimum consecutive classes \(y\) you must attend to elevate your percentage back to target:
          </p>
          <div className="bg-white p-2.5 rounded-md border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 font-semibold">
            y = ⌈ (t × Total − Attended) / (1 − t) ⌉
          </div>
          <span className="text-[11px] text-slate-400 block mt-1.5">
            where t = Target% / 100
          </span>
        </Card>
      </div>

      {/* Worked Example */}
      <Card variant="default" className="p-5 bg-white border-slate-200">
        <h3 className="text-sm font-bold text-slate-800 mb-2">
          Step-by-Step Worked Example
        </h3>

        <div className="text-xs sm:text-sm text-slate-600 space-y-2">
          <p>
            Suppose you attended <strong>38 classes</strong> out of <strong>50 total held</strong> with a <strong>75% target</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              <strong>Current Attendance:</strong> (38 / 50) × 100 = <span className="font-mono font-bold text-slate-900">76.00%</span> (Above 75% target).
            </li>
            <li>
              <strong>If you miss the next class:</strong> Total becomes 51, attended remains 38: (38 / 51) × 100 = <span className="font-mono font-bold text-amber-700">74.51%</span> (Below 75%).
            </li>
            <li>
              <strong>Safe Miss Margin:</strong> You can safely miss <strong>0 classes</strong> right now. Attending just one more class (39 / 51 = 76.47%) increases your margin.
            </li>
          </ul>
        </div>
      </Card>
    </section>
  );
};
