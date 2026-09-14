import { CgpaConstants as C } from './cgpa.constants';
import { Subject, GradeMapping, PercentageFormulaType, CgpaResult } from './cgpa.types';

export class CgpaCalculator {
  /**
   * Calculates the CGPA and percentage based on subjects and chosen formula
   * @param subjects Array of subjects with credits and grades
   * @param formula Selected percentage conversion formula
   * @param gradeScale Optional custom grade scale, defaults to 10-point scale
   * @returns CgpaResult containing calculated values
   */
  static calculate(
    subjects: Subject[],
    formula: PercentageFormulaType = C.DEFAULT_PERCENTAGE_FORMULA,
    gradeScale: GradeMapping[] = C.DEFAULT_GRADE_SCALE
  ): CgpaResult {
    if (subjects.length === 0) {
      throw new Error('At least one subject is required to calculate CGPA');
    }

    let totalCredits = 0;
    let totalGradePoints = 0;

    for (const subject of subjects) {
      if (subject.credits < 0) {
        throw new Error('Credits cannot be negative');
      }

      // Find the points for the given grade
      const gradeMapping = gradeScale.find((g) => g.grade === subject.grade);
      if (!gradeMapping) {
        throw new Error(`Invalid grade: ${subject.grade}`);
      }

      totalCredits += subject.credits;
      totalGradePoints += subject.credits * gradeMapping.points;
    }

    if (totalCredits === 0) {
      throw new Error('Total credits must be greater than 0');
    }

    const cgpa = Number((totalGradePoints / totalCredits).toFixed(C.DECIMAL_PRECISION));
    let percentage = 0;
    let percentageFormulaUsed = '';

    switch (formula) {
      case 'multiply9.5':
        percentage = cgpa * 9.5;
        percentageFormulaUsed = 'CGPA × 9.5';
        break;
      case 'subtract0.75multiply10':
        percentage = (cgpa - 0.75) * 10;
        percentageFormulaUsed = '(CGPA - 0.75) × 10';
        break;
      case 'multiply10':
        percentage = cgpa * 10;
        percentageFormulaUsed = 'CGPA × 10';
        break;
      default:
        throw new Error('Invalid percentage formula');
    }

    // Clamp percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    percentage = Number(percentage.toFixed(C.DECIMAL_PRECISION));

    return {
      cgpa,
      totalCredits,
      percentage,
      percentageFormulaUsed,
    };
  }
}
