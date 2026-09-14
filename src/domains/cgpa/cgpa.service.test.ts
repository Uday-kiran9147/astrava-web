import { describe, expect, it } from 'vitest';
import { CgpaCalculator } from './cgpa.service';
import { Subject } from './cgpa.types';

describe('CgpaCalculator', () => {
  it('calculates correct CGPA and percentage (multiply 9.5)', () => {
    const subjects: Subject[] = [
      { id: '1', credits: 4, grade: 'O' }, // 4 * 10 = 40
      { id: '2', credits: 3, grade: 'A+' }, // 3 * 9 = 27
      { id: '3', credits: 3, grade: 'A' }, // 3 * 8 = 24
    ]; // Total credits: 10, Total points: 91
    // CGPA = 91 / 10 = 9.1

    const result = CgpaCalculator.calculate(subjects, 'multiply9.5');
    expect(result.cgpa).toBe(9.1);
    expect(result.totalCredits).toBe(10);
    expect(result.percentage).toBe(86.45); // 9.1 * 9.5
    expect(result.percentageFormulaUsed).toBe('CGPA × 9.5');
  });

  it('calculates correct percentage (subtract 0.75 multiply 10)', () => {
    const subjects: Subject[] = [
      { id: '1', credits: 4, grade: 'O' },
      { id: '2', credits: 3, grade: 'A+' },
      { id: '3', credits: 3, grade: 'A' },
    ];

    const result = CgpaCalculator.calculate(subjects, 'subtract0.75multiply10');
    expect(result.cgpa).toBe(9.1);
    expect(result.percentage).toBe(83.5); // (9.1 - 0.75) * 10 = 8.35 * 10 = 83.5
  });

  it('calculates correct percentage (multiply 10)', () => {
    const subjects: Subject[] = [
      { id: '1', credits: 4, grade: 'O' },
      { id: '2', credits: 3, grade: 'A+' },
      { id: '3', credits: 3, grade: 'A' },
    ];

    const result = CgpaCalculator.calculate(subjects, 'multiply10');
    expect(result.cgpa).toBe(9.1);
    expect(result.percentage).toBe(91);
  });

  it('throws error if zero subjects', () => {
    expect(() => CgpaCalculator.calculate([])).toThrowError('At least one subject is required');
  });

  it('throws error if negative credits', () => {
    const subjects: Subject[] = [{ id: '1', credits: -1, grade: 'O' }];
    expect(() => CgpaCalculator.calculate(subjects)).toThrowError('Credits cannot be negative');
  });

  it('throws error if zero total credits', () => {
    const subjects: Subject[] = [{ id: '1', credits: 0, grade: 'O' }];
    expect(() => CgpaCalculator.calculate(subjects)).toThrowError('Total credits must be greater than 0');
  });

  it('throws error if invalid grade', () => {
    const subjects: Subject[] = [{ id: '1', credits: 3, grade: 'X' }];
    expect(() => CgpaCalculator.calculate(subjects)).toThrowError('Invalid grade: X');
  });
});
