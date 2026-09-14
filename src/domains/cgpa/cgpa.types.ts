export interface Subject {
  id: string;
  name?: string;
  credits: number;
  grade: string;
}

export interface GradeMapping {
  grade: string;
  points: number;
  label?: string;
}

export type PercentageFormulaType = 'multiply9.5' | 'subtract0.75multiply10' | 'multiply10';

export interface CgpaResult {
  cgpa: number;
  totalCredits: number;
  percentage: number;
  percentageFormulaUsed: string;
}
