import { FormattedTime } from './pomodoro.types';
import { PomodoroConstants as C } from './pomodoro.constants';

export class PomodoroService {
  /**
   * Computes the target end timestamp (in ms) given a duration in seconds and a starting timestamp
   */
  static getEndTimestampMs(durationSeconds: number, startTimestampMs: number): number {
    if (durationSeconds <= 0) {
      throw new Error('Duration must be greater than 0 seconds');
    }
    return startTimestampMs + durationSeconds * 1000;
  }

  /**
   * Calculates exact remaining seconds based on target end timestamp and current timestamp.
   * Clamps to >= 0.
   */
  static calculateRemainingSeconds(endTimestampMs: number, currentTimestampMs: number): number {
    const remainingMs = endTimestampMs - currentTimestampMs;
    return Math.max(0, Math.ceil(remainingMs / 1000));
  }

  /**
   * Calculates progress percentage (0 to 100)
   */
  static calculateProgressPercent(remainingSeconds: number, totalDurationSeconds: number): number {
    if (totalDurationSeconds <= 0) return 100;
    const elapsedSeconds = totalDurationSeconds - remainingSeconds;
    const percent = (elapsedSeconds / totalDurationSeconds) * 100;
    return Math.min(100, Math.max(0, Number(percent.toFixed(1))));
  }

  /**
   * Formats total seconds into HH:MM:SS string representation
   */
  static formatTime(totalSeconds: number): FormattedTime {
    const clampedSeconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(clampedSeconds / 3600);
    const mins = Math.floor((clampedSeconds % 3600) / 60);
    const secs = clampedSeconds % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = mins.toString().padStart(2, '0');
    const secondsStr = secs.toString().padStart(2, '0');

    return {
      hours: hoursStr,
      minutes: minutesStr,
      seconds: secondsStr,
      formatted: `${hoursStr}:${minutesStr}:${secondsStr}`,
    };
  }

  /**
   * Validates custom minutes input
   */
  static sanitizeCustomMinutes(minutes: number): number {
    if (isNaN(minutes) || minutes < C.MIN_CUSTOM_MINUTES) {
      return C.MIN_CUSTOM_MINUTES;
    }
    if (minutes > C.MAX_CUSTOM_MINUTES) {
      return C.MAX_CUSTOM_MINUTES;
    }
    return Math.floor(minutes);
  }
}
