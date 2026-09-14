import { ToolItem, NavItem } from './site.types';

export class SiteConstants {
  static readonly SITE_NAME = 'Astrava';
  static readonly SITE_TAGLINE = 'Student Utility Hub';
  static readonly SITE_DESCRIPTION = 'High-precision academic calculators and study utilities engineered for students. 100% free, client-side, zero login.';
  static readonly SITE_URL = 'https://astrava.club';
  static readonly AUTHOR = 'Uday';
  static readonly TWITTER_HANDLE = '@astravaclub';

  static readonly NAV_ITEMS: readonly NavItem[] = [
    { label: 'Calculators', href: '/tools' },
    { label: 'Attendance', href: '/tools/attendance-calculator' },
    { label: 'CGPA', href: '/tools/cgpa-calculator' },
    { label: 'Percentage', href: '/tools/percentage-calculator' },
    { label: 'About', href: '/about' },
  ] as const;

  static readonly LEGAL_NAV_ITEMS: readonly NavItem[] = [
    { label: 'About Astrava', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ] as const;

  static readonly ALL_TOOLS: readonly ToolItem[] = [
    {
      slug: 'attendance-calculator',
      name: 'Attendance Calculator',
      shortDescription: 'Calculate current attendance percentage, classes missable, and classes needed to reach 75%, 80%, or custom goals.',
      category: 'academics',
      path: '/tools/attendance-calculator',
      iconName: 'UserCheck',
      isAvailable: true,
      badge: 'POPULAR',
    },
    {
      slug: 'cgpa-calculator',
      name: 'CGPA Calculator',
      shortDescription: 'Multi-semester CGPA calculator with swappable percentage conversion formulas for Indian and global universities.',
      category: 'academics',
      path: '/tools/cgpa-calculator',
      iconName: 'GraduationCap',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'gpa-calculator',
      name: 'GPA Calculator',
      shortDescription: 'Weighted course GPA calculator supporting 4.0, 5.0, and 10.0 grade point scales with credit weightings.',
      category: 'academics',
      path: '/tools/gpa-calculator',
      iconName: 'Award',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'percentage-calculator',
      name: 'Percentage Calculator',
      shortDescription: '4-in-1 percentage tool: X% of Y, X is what % of Y, percentage increase/decrease, and percentage change values.',
      category: 'general',
      path: '/tools/percentage-calculator',
      iconName: 'Percent',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'age-calculator',
      name: 'Age Calculator',
      shortDescription: 'Exact calendar-aware age calculator computing years, months, days, total days lived, and next birthday countdown.',
      category: 'general',
      path: '/tools/age-calculator',
      iconName: 'Calendar',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'date-calculator',
      name: 'Date Calculator',
      shortDescription: 'UTC-safe calendar date difference and addition/subtraction calculator without Daylight Savings drift.',
      category: 'general',
      path: '/tools/date-calculator',
      iconName: 'Clock',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'unit-converter',
      name: 'Unit Converter',
      shortDescription: 'Multi-category converter for length, weight, temperature, speed, area, volume, time, and data units.',
      category: 'general',
      path: '/tools/unit-converter',
      iconName: 'Scale',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'pomodoro-timer',
      name: 'Pomodoro Study Timer',
      shortDescription: 'Drift-proof study interval timer with 15/5, 25/5, and 50/10 presets with audio chimes and background-tab sync.',
      category: 'study',
      path: '/tools/pomodoro-timer',
      iconName: 'Timer',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'word-counter',
      name: 'Word & Character Counter',
      shortDescription: '100% client-side privacy-first text analysis for word count, character count, sentence count, and reading time.',
      category: 'study',
      path: '/tools/word-counter',
      iconName: 'FileText',
      isAvailable: false,
      badge: 'COMING SOON',
    },
    {
      slug: 'typing-test',
      name: 'Typing Speed Test',
      shortDescription: 'Surgical typing speed evaluator reporting Net WPM, Gross WPM, accuracy %, and character errors.',
      category: 'study',
      path: '/tools/typing-test',
      iconName: 'Keyboard',
      isAvailable: false,
      badge: 'COMING SOON',
    },
  ] as const;
}
