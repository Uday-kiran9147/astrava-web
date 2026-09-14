import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions of use for Astrava tools.',
};

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-4">Last updated: Sept 14, 2026</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using Astrava, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
        <p className="mb-4">
          Astrava is a free utility tool hub. You may use our calculators and tools for personal, non-commercial purposes. 
          You may not copy or redistribute the calculators or underlying code without explicit permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
        <p className="mb-4">
          The materials on Astrava&apos;s website are provided on an &apos;as is&apos; basis. Astrava makes no warranties, expressed or implied, 
          and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions 
          of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          Calculations are for informational purposes only.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
        <p className="mb-4">
          In no event shall Astrava or its suppliers be liable for any damages (including, without limitation, damages for loss 
          of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Astrava&apos;s website.
        </p>
      </div>
    </div>
  );
}
