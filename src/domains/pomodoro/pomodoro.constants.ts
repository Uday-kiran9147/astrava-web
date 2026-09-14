import { PomodoroPreset } from './pomodoro.types';

export class PomodoroConstants {
  static readonly PRESETS: readonly PomodoroPreset[] = [
    {
      id: '15-5',
      label: '15 min / 5 min (Quick)',
      focusMinutes: 15,
      breakMinutes: 5,
    },
    {
      id: '25-5',
      label: '25 min / 5 min (Classic)',
      focusMinutes: 25,
      breakMinutes: 5,
    },
    {
      id: '50-10',
      label: '50 min / 10 min (Deep Work)',
      focusMinutes: 50,
      breakMinutes: 10,
    },
  ] as const;

  static readonly DEFAULT_PRESET_ID = '25-5';
  static readonly DEFAULT_FOCUS_MINUTES = 25;
  static readonly DEFAULT_BREAK_MINUTES = 5;

  static readonly MIN_CUSTOM_MINUTES = 1;
  static readonly MAX_CUSTOM_MINUTES = 180;

  static readonly MODE_LABELS: Record<string, string> = {
    focus: 'Focus Session',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };
}
