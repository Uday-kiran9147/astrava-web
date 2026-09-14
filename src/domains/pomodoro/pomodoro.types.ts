export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface PomodoroPreset {
  id: string;
  label: string;
  focusMinutes: number;
  breakMinutes: number;
}

export interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
  formatted: string;
}

export interface TimerTickResult {
  remainingSeconds: number;
  isCompleted: boolean;
  progressPercent: number;
}
