import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AdContainer } from '@/components/layout/ad-container';
import { AttendanceCalculatorForm } from '@/components/tools/attendance/attendance-calculator-form';
import { AttendanceExplanation } from '@/components/tools/attendance/attendance-explanation';
import { AttendanceFaq } from '@/components/tools/attendance/attendance-faq';
import { AttendanceRelated } from '@/components/tools/attendance/attendance-related';
import { AttendanceConstants as C } from '@/domains/attendance/attendance.constants';
import { SiteConstants } from '@/shared/site.constants';

export const metadata: Metadata = {
  title: 'Attendance Calculator — Calculate Classes to Miss or Attend | Astrava',
  description: 'Free student attendance calculator. Find out your current attendance percentage, how many classes you can safely miss, or how many you need to reach 75%, 80%, or 85%.',
  alternates: {
    canonical: `${SiteConstants.SITE_URL}/tools/attendance-calculator`,
  },
  openGraph: {
    title: 'Attendance Calculator — Calculate Classes to Miss or Attend | Astrava',
    description: 'Calculate your exact attendance percentage and discover how many classes you can safely miss or must attend to reach your goal.',
    url: `${SiteConstants.SITE_URL}/tools/attendance-calculator`,
    siteName: SiteConstants.SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attendance Calculator | Astrava',
    description: 'Instant student attendance percentage and class recovery calculator.',
  },
};

export default function AttendanceCalculatorPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: 'Attendance Calculator', href: '/tools/attendance-calculator' },
  ] as const;

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Astrava Attendance Calculator',
        url: `${SiteConstants.SITE_URL}/tools/attendance-calculator`,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free high-precision student attendance calculator for college and school attendance requirements (75%, 80%, custom).',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SiteConstants.SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: `${SiteConstants.SITE_URL}/tools`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Attendance Calculator',
            item: `${SiteConstants.SITE_URL}/tools/attendance-calculator`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: C.FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
        {/* 1. Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* 2. Page Header */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Attendance Calculator
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Calculate your current attendance percentage, find out how many classes you can safely miss, or see how many you need to reach 75%, 80%, or custom goals.
          </p>
        </div>

        {/* 3. Calculator Card + Results */}
        <AttendanceCalculatorForm />

        {/* 4. Ad Unit Slot */}
        <AdContainer format="responsive" />

        {/* 5. How It Works Explanation */}
        <AttendanceExplanation />

        {/* 6. FAQ Section */}
        <AttendanceFaq />

        {/* 7. Related Tools */}
        <AttendanceRelated />
      </main>

      <Footer />
    </div>
  );
}
