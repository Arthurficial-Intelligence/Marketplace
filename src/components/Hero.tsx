import { siteContent } from '../content/mownow-copy';

const { hero } = siteContent;

interface HeroProps {
  onOpenQuoteFlow: () => void;
}

export default function Hero({ onOpenQuoteFlow }: HeroProps) {
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-lawn.jpg)' }}
        role="img"
        aria-label="Beautiful freshly mowed lawn"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/70" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
        {/* Urgency banner */}
        <div className="mb-6 inline-block rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm border border-accent/30">
          {hero.urgencyBanner}
        </div>

        <h1
          id="hero-heading"
          className="font-heading text-4xl font-800 leading-tight text-white md:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
          {hero.subheadline}
        </p>

        <button
          onClick={onOpenQuoteFlow}
          className="mt-8 inline-block rounded-lg bg-accent px-8 py-4 text-lg font-bold text-primary shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          {hero.cta}
        </button>
      </div>
    </section>
  );
}
