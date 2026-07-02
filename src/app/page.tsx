import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { DiscoveryNetwork } from "@/components/DiscoveryNetwork";
import { AudienceBenefits } from "@/components/AudienceBenefits";
import { FeaturedInsights } from "@/components/FeaturedInsights";
import { Vision } from "@/components/Vision";
import { Newsletter } from "@/components/Newsletter";
import { SubmitProduct } from "@/components/SubmitProduct";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground scroll-smooth">
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <DiscoveryNetwork />
      <AudienceBenefits />
      <FeaturedInsights />
      <Vision />
      <Newsletter />
      <SubmitProduct />
      <Footer />
    </main>
  );
}

