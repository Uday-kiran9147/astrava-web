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
  const progressPercent = PomodoroService.calculateProgressPercent(remainingSeconds, totalDurationSeconds);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Mode Switch Tabs */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => handleModeSwitch('focus')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-150 ${
            mode === 'focus'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
          }`}
        >
          🎯 Focus Session
        </button>
        <button
          type="button"
          onClick={() => handleModeSwitch('shortBreak')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-150 ${
            mode === 'shortBreak'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
          }`}
        >
          ☕ Break Time
        </button>
      </div>

      <Card variant="elevated" className="text-center py-8">
        {/* Preset Selector Chips */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {C.PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset.id)}
              disabled={timerState === 'running'}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedPresetId === preset.id
                  ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelectedPresetId('custom')}
            disabled={timerState === 'running'}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              selectedPresetId === 'custom'
                ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Custom
          </button>
        </div>

        {/* Custom Inputs (if custom preset active) */}
        {selectedPresetId === 'custom' && (
          <div className="mb-6 max-w-xs mx-auto grid grid-cols-2 gap-3 text-left">
            <Input
              label="Focus (mins)"
              type="number"
              min={C.MIN_CUSTOM_MINUTES}
              max={C.MAX_CUSTOM_MINUTES}
              value={focusMinutes}
              disabled={timerState === 'running'}
              onChange={(e) => handleCustomFocusChange(parseInt(e.target.value, 10))}
            />
            <Input
              label="Break (mins)"
              type="number"
              min={C.MIN_CUSTOM_MINUTES}
              max={C.MAX_CUSTOM_MINUTES}
              value={breakMinutes}
              disabled={timerState === 'running'}
              onChange={(e) => handleCustomBreakChange(parseInt(e.target.value, 10))}
            />
          </div>
        )}

        {/* Clock Display */}
        <div className="my-6">
          <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-slate-900 tabular-nums">
            {formattedTime.formatted}
          </div>
          <div className="text-sm font-semibold text-slate-500 mt-2">
            {mode === 'focus' ? 'Focus Session' : 'Rest & Recharge'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              mode === 'focus' ? 'bg-blue-600' : 'bg-emerald-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* CTA Actions */}
        <div className="flex justify-center gap-3">
          {timerState === 'running' ? (
            <Button variant="primary" size="lg" className="w-40" onClick={handlePause}>
              Pause
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              className="w-40"
              onClick={handleStart}
              disabled={remainingSeconds <= 0}
            >
              {timerState === 'paused' ? 'Resume' : 'Start Timer'}
            </Button>
          )}

          <Button
            variant="outline"
            size="lg"
            onClick={handleReset}
            disabled={timerState === 'idle' && remainingSeconds === totalDurationSeconds}
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Completion Notification Panel */}
      {timerState === 'completed' && (
        <ResultPanel
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
