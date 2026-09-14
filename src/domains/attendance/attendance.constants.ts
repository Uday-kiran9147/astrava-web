import { FaqItem } from '@/shared/site.types';

/**
 * Attendance Domain Constants
 * Centralized immutable definitions for calculation rules, presets, error messages, and telemetry strings.
 */
export class AttendanceConstants {
  static readonly DEFAULT_TARGET_PERCENT = 75;
  static readonly TARGET_PRESETS = [75, 80, 85] as const;
  static readonly MIN_TARGET_PERCENT = 1;
  static readonly MAX_TARGET_PERCENT = 100;
  static readonly DECIMAL_PRECISION = 2;
  static readonly MIN_CLASSES = 0;
  static readonly MARGIN_THRESHOLD_DELTA = 3; // within 3% of target is margin

  // Error Messages
  static readonly ERR_TOTAL_ZERO_OR_NEGATIVE = 'Total classes must be greater than 0.';
  static readonly ERR_ATTENDED_NEGATIVE = 'Attended classes cannot be negative.';
  static readonly ERR_ATTENDED_EXCEEDS_TOTAL = 'Attended classes cannot exceed total classes.';
  static readonly ERR_INVALID_TARGET = 'Target percentage must be between 1% and 100%.';
  static readonly MSG_TARGET_100_DEFICIT = 'A 100% attendance target requires 0 missed classes. If any class has been missed, 100% is mathematically impossible.';
  static readonly MSG_TARGET_100_MAINTAIN = '100% attendance requires attending every single remaining class.';

  // Status Codes
  static readonly STATUS_ON_TRACK = 'on_track';
  static readonly STATUS_MARGIN = 'margin';
  static readonly STATUS_DEFICIT = 'deficit';

  // Status Display Labels
  static readonly LABEL_ON_TRACK = 'TARGET SECURED';
  static readonly LABEL_MARGIN = 'SAFE MARGIN';
  static readonly LABEL_DEFICIT = 'ATTENDANCE DEFICIT';

  // Telemetry Descriptions
  static readonly DESC_CAN_MISS = 'Classes you can safely miss while maintaining your target percentage:';
  static readonly DESC_MUST_ATTEND = 'Consecutive classes you must attend to recover and reach your target:';
  static readonly DESC_TARGET_ACHIEVED = 'Target attendance is secured. You have zero required recovery classes.';

  // FAQs
  static readonly FAQS: readonly FaqItem[] = [
    {
      question: 'How do I calculate if I have 75% attendance?',
      answer: 'Divide the number of classes you attended by the total number of classes held, then multiply by 100. If the result is 75 or higher, you meet the 75% requirement.',
    },
    {
      question: 'How many classes can I bunk or miss safely?',
      answer: 'Use the formula: floor((Attended × 100) / Target) − Total. If the result is greater than 0, you can miss that exact number of upcoming classes while keeping your overall attendance at or above your target percentage.',
    },
    {
      question: 'What happens if I miss a class when I am at exactly 75%?',
      answer: 'If you are at exactly 75% and miss the next class, your percentage will immediately drop below 75% because the total class denominator increases while your attended numerator stays the same.',
    },
    {
      question: 'Can I achieve 100% attendance if I missed a single lecture?',
      answer: 'No. Mathematically, 100% attendance requires 100% of all conducted classes to be attended. If you missed even one class, your maximum possible attendance will always remain below 100.00%.',
    },
    {
      question: 'Is my attendance information sent to any server or tracked?',
      answer: 'Zero data is sent anywhere. Astrava runs 100% client-side inside your browser. No attendance counts, subject names, or IP tracking are recorded on any database.',
    },
  ] as const;
}
