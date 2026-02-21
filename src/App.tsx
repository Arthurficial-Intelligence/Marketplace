import { useEffect } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import WhyMowNow from './components/WhyMowNow';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';

export default function App() {
  // Scroll-triggered fade-in using Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header>
        <Hero />
      </header>
      <main>
        <HowItWorks />
        <Services />
        <WhyMowNow />
        <SocialProof />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
