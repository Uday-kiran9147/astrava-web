import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your message.',
};

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-16 h-16 bg-[#16A34A] text-white rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Your message has been received. We appreciate your feedback and will get back to you if a response is required.
      </p>
      <Link href="/">
        <Button size="lg" className="bg-[#2D5BFF] hover:bg-[#1E44CC] text-white font-bold shadow-[0_4px_14px_rgba(45,91,255,0.35)] hover:scale-[1.02] transition-all">
          Return to Tools
        </Button>
      </Link>
    </div>
  );
}
