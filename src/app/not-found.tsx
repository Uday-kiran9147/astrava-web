import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#2D5BFF] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page not found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Link href="/">
        <Button size="lg" className="bg-[#2D5BFF] hover:bg-[#1E44CC] text-white font-bold shadow-[0_4px_14px_rgba(45,91,255,0.35)] hover:scale-[1.02] transition-all">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
