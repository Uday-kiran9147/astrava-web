import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { PomodoroTimerComponent } from '@/components/tools/pomodoro-timer/pomodoro-timer';

export const metadata: Metadata = {
  title: 'Pomodoro Focus Timer | Astrava',
  description: 'Boost your study productivity with Astrava Pomodoro Timer. Features drift-free background precision, customizable focus/break intervals, and quick presets.',
  alternates: {
    canonical: 'https://astrava.club/tools/pomodoro-timer',
  },
};

export default function PomodoroTimerPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Pomodoro Timer', href: '/tools/pomodoro-timer', active: true },
          ]}
        />

        <div className="mt-8 mb-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Pomodoro Focus Timer
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Stay focused and avoid burnout with interval-based study sessions. Accurate timestamp tracking guarantees no timer drift when switching tabs.
          </p>
        </div>

        <PomodoroTimerComponent />
      </div>
    </div>
  );
}
