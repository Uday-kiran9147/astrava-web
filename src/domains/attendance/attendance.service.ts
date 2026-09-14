import { AttendanceConstants as C } from './attendance.constants';
import {
  AttendanceInput,
  AttendanceResult,
  AttendanceStatus,
  AttendanceValidationResult,
} from './attendance.types';

/**
 * Attendance Calculator Domain Service
 * Pure static methods for computing attendance telemetry, missable classes, and recovery quotas.
 * Zero React dependencies or external side effects.
 */
export class AttendanceCalculator {
  /**
   * Validates raw attendance inputs against domain rules.
   */
  static validate(input: AttendanceInput): AttendanceValidationResult {
    const { attended, total, targetPercent } = input;

    if (isNaN(total) || total <= C.MIN_CLASSES) {
      return { isValid: false, error: C.ERR_TOTAL_ZERO_OR_NEGATIVE };
    }
    if (isNaN(attended) || attended < C.MIN_CLASSES) {
      return { isValid: false, error: C.ERR_ATTENDED_NEGATIVE };
    }
    if (attended > total) {
      return { isValid: false, error: C.ERR_ATTENDED_EXCEEDS_TOTAL };
    }
    if (isNaN(targetPercent) || targetPercent < C.MIN_TARGET_PERCENT || targetPercent > C.MAX_TARGET_PERCENT) {
      return { isValid: false, error: C.ERR_INVALID_TARGET };
    }

    return { isValid: true };
  }

  /**
   * Calculates current attendance percentage rounded to the configured precision.
   * Formula: (attended / total) * 100
   */
  static currentPercent(attended: number, total: number): number {
    if (total <= C.MIN_CLASSES) {
      throw new Error(C.ERR_TOTAL_ZERO_OR_NEGATIVE);
    }
    if (attended < C.MIN_CLASSES) {
      throw new Error(C.ERR_ATTENDED_NEGATIVE);
    }
    if (attended > total) {
      throw new Error(C.ERR_ATTENDED_EXCEEDS_TOTAL);
    }

    const raw = (attended / total) * 100;
    return Number(raw.toFixed(C.DECIMAL_PRECISION));
  }

  /**
   * Calculates maximum classes a student can miss consecutively without dropping below target %.
   * Formula: floor((attended * 100) / target - total), clamped to >= 0.
   */
  static maxMissable(attended: number, total: number, targetPercent: number): number {
    if (targetPercent <= 0 || targetPercent > C.MAX_TARGET_PERCENT) {
      throw new Error(C.ERR_INVALID_TARGET);
    }
    if (targetPercent === C.MAX_TARGET_PERCENT) {
      return 0;
    }

    const formulaResult = Math.floor((attended * 100) / targetPercent - total);
    return Math.max(0, formulaResult);
  }

  /**
   * Calculates minimum consecutive classes a student must attend to reach target %.
   * Formula: ceil((t * total - attended) / (1 - t)) where t = targetPercent / 100.
   * Special case: target = 100% requires special handling to prevent division by zero.
   */
  static classesNeeded(attended: number, total: number, targetPercent: number): number {
    if (targetPercent <= 0 || targetPercent > C.MAX_TARGET_PERCENT) {
      throw new Error(C.ERR_INVALID_TARGET);
    }

    // 100% Target Special Case
    if (targetPercent === C.MAX_TARGET_PERCENT) {
      if (attended === total) {
        return 0;
      }
      // If even 1 class was missed, 100% is mathematically impossible
      return -1; // -1 represents impossible recovery
    }

    const t = targetPercent / 100;
    const numerator = t * total - attended;

    if (numerator <= 0) {
      return 0; // Target is already satisfied
    }

    const formulaResult = Math.ceil(numerator / (1 - t));
    return Math.max(0, formulaResult);
  }

  /**
   * Determines the tactical status classification based on current vs target percentage.
   */
  static determineStatus(currentPercent: number, targetPercent: number): AttendanceStatus {
    if (currentPercent >= targetPercent + C.MARGIN_THRESHOLD_DELTA) {
      return C.STATUS_ON_TRACK;
    }
    if (currentPercent >= targetPercent) {
      return C.STATUS_MARGIN;
    }
    return C.STATUS_DEFICIT;
  }

  /**
   * Main calculation entrypoint producing a complete telemetry readout.
   */
  static calculate(input: AttendanceInput): AttendanceResult {
    const validation = this.validate(input);
    if (!validation.isValid) {
      throw new Error(validation.error ?? 'Invalid input');
    }

    const { attended, total, targetPercent } = input;
    const current = this.currentPercent(attended, total);
    const missed = total - attended;
    const status = this.determineStatus(current, targetPercent);
    const is100Percent = targetPercent === C.MAX_TARGET_PERCENT;

    let statusLabel: string;
    if (status === C.STATUS_ON_TRACK) {
      statusLabel = C.LABEL_ON_TRACK;
    } else if (status === C.STATUS_MARGIN) {
      statusLabel = C.LABEL_MARGIN;
    } else {
      statusLabel = C.LABEL_DEFICIT;
    }

    const missable = this.maxMissable(attended, total, targetPercent);
    const needed = this.classesNeeded(attended, total, targetPercent);

    let note: string | undefined;
    if (is100Percent) {
      note = attended === total ? C.MSG_TARGET_100_MAINTAIN : C.MSG_TARGET_100_DEFICIT;
    }

    return {
      currentPercent: current,
      targetPercent,
      attended,
      total,
      missed,
      status,
      statusLabel,
      maxMissable: missable,
      classesNeeded: needed,
      is100PercentTarget: is100Percent,
      note,
    };
  }
}
