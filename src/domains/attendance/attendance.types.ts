export type AttendanceStatus = 'on_track' | 'margin' | 'deficit';

export interface AttendanceInput {
  readonly attended: number;
  readonly total: number;
  readonly targetPercent: number;
}

export interface AttendanceResult {
  readonly currentPercent: number;
  readonly targetPercent: number;
  readonly attended: number;
  readonly total: number;
  readonly missed: number;
  readonly status: AttendanceStatus;
  readonly statusLabel: string;
  readonly maxMissable: number;
  readonly classesNeeded: number;
  readonly is100PercentTarget: boolean;
  readonly note?: string;
  readonly nextMilestoneClasses?: number;
}

export interface AttendanceValidationResult {
  readonly isValid: boolean;
  readonly error?: string;
}
