import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import WhyMowNow from './components/WhyMowNow';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';
import QuoteFlowOverlay from './components/QuoteFlowOverlay';

export default function App() {
  const [quoteFlowOpen, setQuoteFlowOpen] = useState(false);

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
        <Hero onOpenQuoteFlow={() => setQuoteFlowOpen(true)} />
      </header>
      <main>
        <HowItWorks />
        <Services />
        <WhyMowNow />
        <SocialProof />
        <FAQ />
      </main>
      <Footer />
      <StickyMobileCTA
        onOpenQuoteFlow={() => setQuoteFlowOpen(true)}
        isQuoteFlowOpen={quoteFlowOpen}
      />
      <QuoteFlowOverlay
        isOpen={quoteFlowOpen}
        onClose={() => setQuoteFlowOpen(false)}
      />
    </>
  );
}
