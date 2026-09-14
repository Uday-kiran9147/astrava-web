import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Astrava. Learn how we handle your data.',
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-4">Last updated: Sept 14, 2026</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Astrava. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data when you visit our website 
          and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Data We Collect</h2>
        <p className="mb-4">
          Astrava&apos;s tools are designed to work entirely in your browser. We do not store or process your calculation inputs 
          on our servers. We do use Google Analytics to understand how our website is used and Google AdSense to serve ads.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies and Tracking</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track the activity on our service and hold certain information. 
          Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this privacy policy, please contact us at privacy@astrava.club.
        </p>
      </div>
    </div>
  );
}
