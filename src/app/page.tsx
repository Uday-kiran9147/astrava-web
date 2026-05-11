import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { FounderStories } from "@/components/FounderStories";
import { Pricing } from "@/components/Pricing";
import { Criteria } from "@/components/Criteria";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <FounderStories />
      <Pricing />
      <Criteria />
      <WaitlistForm />
      <FAQ />
      <Footer />
    </main>
  );
}
