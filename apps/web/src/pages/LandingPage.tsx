import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { Features } from '../components/landing/Features';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
