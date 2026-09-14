'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ResultPanel } from '@/components/ui/result-panel';
import { CgpaCalculator } from '@/domains/cgpa/cgpa.service';
import { CgpaConstants as C } from '@/domains/cgpa/cgpa.constants';
import { Subject, PercentageFormulaType, CgpaResult } from '@/domains/cgpa/cgpa.types';

export const CgpaCalculatorComponent: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', credits: 3, grade: 'A', name: 'Subject 1' },
    { id: '2', credits: 4, grade: 'B+', name: 'Subject 2' },
    { id: '3', credits: 3, grade: 'O', name: 'Subject 3' }
  ]);
  const [formula, setFormula] = useState<PercentageFormulaType>(C.DEFAULT_PERCENTAGE_FORMULA);
  const [result, setResult] = useState<CgpaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gradeOptions = C.DEFAULT_GRADE_SCALE.map((g) => ({
    label: `${g.grade} (${g.points} pts) - ${g.label}`,
    value: g.grade,
  }));

  const formulaOptions = C.PERCENTAGE_FORMULAS.map((f) => ({
    label: f.label,
    value: f.id,
  }));

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Math.random().toString(36).substring(7),
        credits: 3,
        grade: 'A',
        name: `Subject ${subjects.length + 1}`
      }
    ]);
    setError(null);
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    setError(null);
  };

  const handleUpdateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(
      subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
    setError(null);
  };

  const handleCalculate = useCallback(() => {
    try {
      setError(null);
      const res = CgpaCalculator.calculate(subjects, formula);
      setResult(res);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during calculation');
      }
      setResult(null);
    }
  }, [subjects, formula]);

  const handleReset = () => {
    setSubjects([
      { id: '1', credits: 3, grade: 'A', name: 'Subject 1' },
      { id: '2', credits: 4, grade: 'B+', name: 'Subject 2' },
      { id: '3', credits: 3, grade: 'O', name: 'Subject 3' }
    ]);
    setFormula(C.DEFAULT_PERCENTAGE_FORMULA);
    setResult(null);
    setError(null);
  };

  const isCalculateDisabled = subjects.length === 0;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card variant="elevated">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Subjects</h2>
            <Button variant="outline" size="sm" onClick={handleAddSubject}>
              + Add Subject
            </Button>
          </div>

          {subjects.length === 0 ? (
            <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              No subjects added. Add a subject to calculate CGPA.
            </div>
          ) : (
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={subject.id} className="flex flex-col sm:flex-row gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
                  <div className="flex-1 min-w-0">
                    <Input
                      label={index === 0 ? 'Name (Optional)' : undefined}
                      placeholder="Subject name"
                      value={subject.name || ''}
                      onChange={(e) => handleUpdateSubject(subject.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-24 shrink-0">
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      label={index === 0 ? 'Credits' : undefined}
                      value={subject.credits}
                      onChange={(e) => handleUpdateSubject(subject.id, 'credits', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="w-full sm:w-48 shrink-0">
                    <Select
                      label={index === 0 ? 'Grade' : undefined}
                      value={subject.grade}
                      onChange={(e) => handleUpdateSubject(subject.id, 'grade', e.target.value)}
                      options={gradeOptions}
                    />
                  </div>
                  
                  <button
                    onClick={() => handleRemoveSubject(subject.id)}
                    className="absolute -top-2 -right-2 sm:static sm:mt-8 w-6 h-6 sm:w-10 sm:h-[42px] sm:self-end flex items-center justify-center bg-white sm:bg-transparent rounded-full sm:rounded-md border border-slate-200 sm:border-transparent text-slate-400 hover:text-red-500 hover:bg-red-50 sm:hover:border-red-200 transition-colors shadow-sm sm:shadow-none"
                    aria-label="Remove subject"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <div className="max-w-xs">
              <Select
                label="Percentage Conversion Formula"
                value={formula}
                onChange={(e) => {
                  setFormula(e.target.value as PercentageFormulaType);
                  setError(null);
                }}
                options={formulaOptions}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium flex items-start gap-2">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCalculate}
              disabled={isCalculateDisabled}
            >
              Calculate CGPA
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              className="sm:w-32 shrink-0"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          <ResultPanel
            headlineLabel="Cumulative Grade Point Average"
            headlineValue={result.cgpa}
            statusType="success"
            statusLabel={`Total Credits: ${result.totalCredits}`}
          />
          
          <ResultPanel
            headlineLabel="Equivalent Percentage"
            headlineValue={result.percentage}
            headlineUnit="%"
            statusType="neutral"
            statusLabel={result.percentageFormulaUsed}
          />
        </div>
      )}
    </div>
  );
};

export default CgpaCalculatorComponent;
