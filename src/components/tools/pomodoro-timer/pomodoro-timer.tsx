'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResultPanel } from '@/components/ui/result-panel';
import { PomodoroService } from '@/domains/pomodoro/pomodoro.service';
import { PomodoroConstants as C } from '@/domains/pomodoro/pomodoro.constants';
import { TimerMode, TimerState } from '@/domains/pomodoro/pomodoro.types';

export const PomodoroTimerComponent: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(C.DEFAULT_PRESET_ID);
  const [mode, setMode] = useState<TimerMode>('focus');

  const [focusMinutes, setFocusMinutes] = useState<number>(C.DEFAULT_FOCUS_MINUTES);
  const [breakMinutes, setBreakMinutes] = useState<number>(C.DEFAULT_BREAK_MINUTES);

  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [remainingSeconds, setRemainingSeconds] = useState<number>(C.DEFAULT_FOCUS_MINUTES * 60);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState<number>(C.DEFAULT_FOCUS_MINUTES * 60);

  // References for drift-free timestamp calculation
  const endTimestampRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate current mode target duration
  const getModeDurationSeconds = useCallback(
    (currentMode: TimerMode, focusMins: number, breakMins: number) => {
      const mins = currentMode === 'focus' ? focusMins : breakMins;
      return mins * 60;
    },
    []
  );

  const clearTimerInterval = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  const stopTimer = useCallback(() => {
    clearTimerInterval();
    endTimestampRef.current = null;
  }, [clearTimerInterval]);

  const updateRemainingTime = useCallback(() => {
    if (!endTimestampRef.current) return;

    const now = Date.now();
    const remaining = PomodoroService.calculateRemainingSeconds(endTimestampRef.current, now);

    setRemainingSeconds(remaining);

    if (remaining <= 0) {
      stopTimer();
      setTimerState('completed');
    }
  }, [stopTimer]);

  // Handle start/resume
  const handleStart = useCallback(() => {
    clearTimerInterval();
    const now = Date.now();
    const targetEnd = PomodoroService.getEndTimestampMs(remainingSeconds, now);
    endTimestampRef.current = targetEnd;

    setTimerState('running');
    timerIntervalRef.current = setInterval(updateRemainingTime, 250);
  }, [remainingSeconds, clearTimerInterval, updateRemainingTime]);

  // Handle pause
  const handlePause = useCallback(() => {
    if (endTimestampRef.current) {
      const now = Date.now();
      const currentRemaining = PomodoroService.calculateRemainingSeconds(endTimestampRef.current, now);
      setRemainingSeconds(currentRemaining);
    }
    stopTimer();
    setTimerState('paused');
  }, [stopTimer]);

  // Handle reset
  const handleReset = useCallback(() => {
    stopTimer();
    const duration = getModeDurationSeconds(mode, focusMinutes, breakMinutes);
    setRemainingSeconds(duration);
    setTotalDurationSeconds(duration);
    setTimerState('idle');
  }, [stopTimer, getModeDurationSeconds, mode, focusMinutes, breakMinutes]);

  // Handle preset change
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId === 'custom') return;

    const preset = C.PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setFocusMinutes(preset.focusMinutes);
      setBreakMinutes(preset.breakMinutes);

      stopTimer();
      const duration = mode === 'focus' ? preset.focusMinutes * 60 : preset.breakMinutes * 60;
      setFocusMinutes(preset.focusMinutes);
      setBreakMinutes(preset.breakMinutes);
      setRemainingSeconds(duration);
      setTotalDurationSeconds(duration);
      setTimerState('idle');
    }
  };

  // Handle mode switch (Focus vs Break)
  const handleModeSwitch = (newMode: TimerMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    stopTimer();

    const duration = getModeDurationSeconds(newMode, focusMinutes, breakMinutes);
    setRemainingSeconds(duration);
    setTotalDurationSeconds(duration);
    setTimerState('idle');
  };

  // Custom minutes update
  const handleCustomFocusChange = (val: number) => {
    const sanitized = PomodoroService.sanitizeCustomMinutes(val);
    setFocusMinutes(sanitized);
    setSelectedPresetId('custom');
    if (mode === 'focus') {
      stopTimer();
      setRemainingSeconds(sanitized * 60);
      setTotalDurationSeconds(sanitized * 60);
      setTimerState('idle');
    }
  };

  const handleCustomBreakChange = (val: number) => {
    const sanitized = PomodoroService.sanitizeCustomMinutes(val);
    setBreakMinutes(sanitized);
    setSelectedPresetId('custom');
    if (mode === 'shortBreak') {
      stopTimer();
      setRemainingSeconds(sanitized * 60);
      setTotalDurationSeconds(sanitized * 60);
      setTimerState('idle');
    }
  };

  // Handle window visibility change to prevent background tab drift
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && timerState === 'running') {
        updateRemainingTime();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timerState, updateRemainingTime]);

  // Clean up timer interval on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  const formattedTime = PomodoroService.formatTime(remainingSeconds);

  return (
    <div className="w-full space-y-10">
      <div className="grid gap-5">
        <div className="px-2 py-10 text-white sm:px-8 sm:py-16">
          <div className="mb-7 flex rounded-xl bg-white/10 p-1">
            <button
              type="button"
              onClick={() => handleModeSwitch('focus')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors ${mode === 'focus' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <span aria-hidden="true" className="material-icons text-base">center_focus_strong</span>
              Focus
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('shortBreak')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors ${mode === 'shortBreak' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              <span aria-hidden="true" className="material-icons text-base">coffee</span>
              Break
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <span className="font-mono text-[clamp(7rem,18vw,12rem)] font-black leading-none tabular-nums tracking-normal text-white">
                  {formattedTime.formatted}
                </span>                </div>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {timerState === 'running' ? (
                <Button variant="primary" size="lg" className="min-w-36 rounded-full border-0 bg-violet-600 shadow-[0_8px_30px_rgba(124,58,237,0.28)] hover:bg-violet-500" onClick={handlePause}>
                  <span aria-hidden="true" className="material-icons mr-2 text-lg">pause</span>
                  Pause
                </Button>
              ) : (
                <Button variant="primary" size="lg" className="min-w-36 rounded-full border-0 bg-violet-600 shadow-[0_8px_30px_rgba(124,58,237,0.28)] hover:bg-violet-500" onClick={handleStart} disabled={remainingSeconds <= 0}>
                  <span aria-hidden="true" className="material-icons mr-2 text-lg">{timerState === 'paused' ? 'play_arrow' : 'play_arrow'}</span>
                  {timerState === 'paused' ? 'Resume' : 'Start focus'}
                </Button>
              )}
              <Button variant="outline" size="lg" aria-label="Reset timer" className="h-12 w-12 rounded-full border-violet-300/30 bg-transparent p-0 text-violet-200 hover:bg-violet-500/15 hover:text-white" onClick={handleReset} disabled={timerState === 'idle' && remainingSeconds === totalDurationSeconds}>
                <span aria-hidden="true" className="material-icons text-lg">restart_alt</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Card variant="muted" className="border-0 bg-transparent p-0 text-slate-100">
          <div className="grid gap-3 sm:grid-cols-3">
            {C.PRESETS.map((preset) => (
              <button key={preset.id} type="button" onClick={() => handlePresetSelect(preset.id)} disabled={timerState === 'running'} className={`flex min-h-20 items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${selectedPresetId === preset.id ? 'border-violet-300 bg-violet-500/20 text-white shadow-[0_0_24px_rgba(139,40,255,0.12)]' : 'border-violet-400/20 bg-violet-950/30 text-violet-200 hover:border-violet-300/60'} disabled:cursor-not-allowed disabled:opacity-50`}>
                <span>
                  <span className="block text-sm font-semibold">{preset.focusMinutes} min focus</span>
                  <span className="mt-1 block text-xs text-violet-400">{preset.breakMinutes} min break</span>
                </span>
                <span aria-hidden="true" className="material-icons text-2xl text-violet-300/70">{preset.id === '50-10' ? 'hourglass_top' : preset.id === '15-5' ? 'bolt' : 'center_focus_strong'}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 text-center">
            <button type="button" onClick={() => setSelectedPresetId('custom')} disabled={timerState === 'running'} className={`text-xs font-semibold text-violet-300 underline-offset-4 hover:underline disabled:opacity-50 ${selectedPresetId === 'custom' ? 'underline' : ''}`}>Custom duration</button>
          </div>
        </Card>
      </div>

      {selectedPresetId === 'custom' && (
        <Card variant="default" className="border-slate-800 bg-slate-900 text-slate-100 [&_label]:text-slate-300">
          <div className="mb-4 flex items-center gap-2">
            <span aria-hidden="true" className="material-icons text-base text-slate-400">edit_calendar</span>
            <div>
              <h2 className="text-sm font-bold text-slate-200">Customize your rhythm</h2>
              <p className="text-xs text-slate-400">Set a duration that matches the task in front of you.</p>
            </div>
          </div>
          <div className="grid max-w-md grid-cols-2 gap-3">
            <Input label="Focus (mins)" className="border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500 focus:border-blue-400 focus:ring-blue-500/20" type="number" min={C.MIN_CUSTOM_MINUTES} max={C.MAX_CUSTOM_MINUTES} value={focusMinutes} disabled={timerState === 'running'} onChange={(e) => handleCustomFocusChange(parseInt(e.target.value, 10))} />
            <Input label="Break (mins)" className="border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500 focus:border-blue-400 focus:ring-blue-500/20" type="number" min={C.MIN_CUSTOM_MINUTES} max={C.MAX_CUSTOM_MINUTES} value={breakMinutes} disabled={timerState === 'running'} onChange={(e) => handleCustomBreakChange(parseInt(e.target.value, 10))} />
          </div>
        </Card>
      )}

      {/* Completion Notification Panel */}
      {timerState === 'completed' && (
        <ResultPanel
          className="border-slate-800 bg-slate-900 text-slate-100 [&_.border-slate-100]:border-slate-800 [&_.bg-emerald-50]:bg-emerald-500/15 [&_.text-emerald-700]:text-emerald-300 [&_.text-slate-500]:text-slate-400 [&_.text-slate-900]:text-white"
          headlineLabel="Session Complete!"
          headlineValue={mode === 'focus' ? 'Great Focus!' : 'Refreshed!'}
          statusType="success"
          statusLabel={mode === 'focus' ? 'Time for a break' : 'Ready to focus again'}
          actionButtons={
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleModeSwitch(mode === 'focus' ? 'shortBreak' : 'focus')}
            >
              Start {mode === 'focus' ? 'Break' : 'Focus'}
            </Button>
          }
        />
      )}
    </div>
  );
};

export default PomodoroTimerComponent;
