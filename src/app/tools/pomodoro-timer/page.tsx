import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { PomodoroTimerComponent } from '@/components/tools/pomodoro-timer/pomodoro-timer';

export const metadata: Metadata = {
  title: 'Pomodoro Focus Timer | Astrava',
  description: 'A simple, precise Pomodoro focus timer for study sessions.',
  alternates: {
    canonical: 'https://astrava.club/tools/pomodoro-timer',
  },
};

export default function PomodoroTimerPage() {
  return (
    <main
      className="min-h-screen bg-[#020006] px-4 py-6 text-white sm:px-6 sm:py-10"
      style={{
        backgroundImage: 'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.55) 0 1px, transparent 1.5px), radial-gradient(circle at 28% 42%, rgba(255,255,255,0.35) 0 1px, transparent 1.5px), radial-gradient(circle at 72% 18%, rgba(255,255,255,0.45) 0 1px, transparent 1.5px), radial-gradient(circle at 89% 64%, rgba(255,255,255,0.3) 0 1px, transparent 1.5px), radial-gradient(circle at 56% 82%, rgba(255,255,255,0.3) 0 1px, transparent 1.5px)',
      }}
    >
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          className="text-violet-300/70 [&_span[aria-current='page']]:text-violet-100 [&_span.text-slate-300]:text-violet-500/50"
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Pomodoro Timer', href: '/tools/pomodoro-timer' },
          ]}
        />

        <div className="mx-auto mt-8 max-w-4xl">
          <h1 className="mb-6 text-center text-lg font-semibold tracking-tight text-violet-100 sm:text-xl">
            Pomodoro Timer
          </h1>
          <PomodoroTimerComponent />
        </div>
      </div>
    </main>
  );
}
