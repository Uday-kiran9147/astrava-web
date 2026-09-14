import { GradeMapping, PercentageFormulaType } from './cgpa.types';

export class CgpaConstants {
  static readonly DECIMAL_PRECISION = 2;

  // Default 10-point scale (common in India)
  static readonly DEFAULT_GRADE_SCALE: GradeMapping[] = [
    { grade: 'O', points: 10, label: 'Outstanding' },
    { grade: 'A+', points: 9, label: 'Excellent' },
    { grade: 'A', points: 8, label: 'Very Good' },
    { grade: 'B+', points: 7, label: 'Good' },
    { grade: 'B', points: 6, label: 'Above Average' },
    { grade: 'C', points: 5, label: 'Average' },
    { grade: 'P', points: 4, label: 'Pass' },
    { grade: 'F', points: 0, label: 'Fail' },
  ];

  static readonly PERCENTAGE_FORMULAS = [
    {
      id: 'multiply9.5',
      label: 'CGPA × 9.5 (CBSE/Common)',
    },
    {
      id: 'subtract0.75multiply10',
      label: '(CGPA - 0.75) × 10 (Mumbai Uni)',
    },
    {
      id: 'multiply10',
      label: 'CGPA × 10 (Direct %)',
    },
  ] as const;

  static readonly DEFAULT_PERCENTAGE_FORMULA: PercentageFormulaType = 'multiply9.5';
}
