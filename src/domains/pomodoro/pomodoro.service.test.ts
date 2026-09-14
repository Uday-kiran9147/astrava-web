import { describe, expect, it } from 'vitest';
import { PomodoroService } from './pomodoro.service';

describe('PomodoroService', () => {
  describe('getEndTimestampMs', () => {
    it('calculates correct end timestamp in milliseconds', () => {
      const now = 1000000;
      const durationSeconds = 1500; // 25 min
      const end = PomodoroService.getEndTimestampMs(durationSeconds, now);
      expect(end).toBe(1000000 + 1500000);
    });

    it('throws error if duration <= 0', () => {
      expect(() => PomodoroService.getEndTimestampMs(0, 1000)).toThrowError('Duration must be greater than 0');
      expect(() => PomodoroService.getEndTimestampMs(-5, 1000)).toThrowError('Duration must be greater than 0');
    });
  });

  describe('calculateRemainingSeconds', () => {
    it('calculates exact remaining seconds', () => {
      const end = 25000; // 24 seconds total
      const current = 11000; // 10 seconds elapsed
      const remaining = PomodoroService.calculateRemainingSeconds(end, current);
      expect(remaining).toBe(14);
    });

    it('clamps remaining seconds to >= 0 when timer expires', () => {
      const end = 25000;
      const current = 30000;
      const remaining = PomodoroService.calculateRemainingSeconds(end, current);
      expect(remaining).toBe(0);
    });
  });

  describe('calculateProgressPercent', () => {
    it('calculates progress percentage accurately', () => {
      expect(PomodoroService.calculateProgressPercent(1500, 1500)).toBe(0);
      expect(PomodoroService.calculateProgressPercent(750, 1500)).toBe(50);
      expect(PomodoroService.calculateProgressPercent(0, 1500)).toBe(100);
    });

    it('handles edge case of 0 total duration', () => {
      expect(PomodoroService.calculateProgressPercent(0, 0)).toBe(100);
    });
  });

  describe('formatTime', () => {
    it('formats seconds into HH:MM:SS format', () => {
      expect(PomodoroService.formatTime(1500)).toEqual({
        hours: '00',
        minutes: '25',
        seconds: '00',
        formatted: '00:25:00',
      });

      expect(PomodoroService.formatTime(3665)).toEqual({
        hours: '01',
        minutes: '01',
        seconds: '05',
        formatted: '01:01:05',
      });

      expect(PomodoroService.formatTime(0)).toEqual({
        hours: '00',
        minutes: '00',
        seconds: '00',
        formatted: '00:00:00',
      });
    });
  });

  describe('sanitizeCustomMinutes', () => {
    it('clamps custom minutes within MIN and MAX range', () => {
      expect(PomodoroService.sanitizeCustomMinutes(0)).toBe(1);
      expect(PomodoroService.sanitizeCustomMinutes(-10)).toBe(1);
      expect(PomodoroService.sanitizeCustomMinutes(200)).toBe(180);
      expect(PomodoroService.sanitizeCustomMinutes(45.8)).toBe(45);
    });
  });
});
