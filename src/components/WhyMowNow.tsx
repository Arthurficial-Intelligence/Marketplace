import { siteContent } from '../content/mownow-copy';

const { whyMowNow } = siteContent;

const propIcons = [
  // Calendar / weekend icon
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M9 4v3M19 4v3M4 11h20M4 8.5A2.5 2.5 0 016.5 6h15A2.5 2.5 0 0124 8.5v13a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 014 21.5v-13z"
      className="stroke-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 16l2.5 2.5L17 14" className="stroke-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Lightning / speed icon
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M15 4L7 16h6l-2 8 10-12h-6l2-8z"
      className="stroke-accent fill-accent/10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Shield / licensed icon
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 3L5 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-4z"
      className="stroke-accent fill-accent/10" strokeWidth="2" strokeLinejoin="round" />
    <path d="M10 14.5l2.5 2.5L18 12" className="stroke-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Thumbs up / guaranteed icon
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M7 13v9a1 1 0 001 1h2a1 1 0 001-1v-9a1 1 0 00-1-1H8a1 1 0 00-1 1z"
      className="stroke-accent fill-accent/10" strokeWidth="2" />
    <path d="M11 22h7.5a2.5 2.5 0 002.4-1.8l1.5-5.4A2 2 0 0020.5 12H16l.8-3.2a1.5 1.5 0 00-1.4-1.8h-.2a1 1 0 00-.8.4L11 12"
      className="stroke-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function WhyMowNow() {
  return (
    <section
      className="fade-in-section bg-white py-16 md:py-20"
      id="why-mownow"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-5xl px-5">
        <h2
          id="why-heading"
          className="font-heading text-center text-2xl font-700 text-primary md:text-3xl"
        >
          {whyMowNow.heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {whyMowNow.props.map((prop, i) => (
            <div
              key={i}
              className="rounded-xl border border-charcoal/8 bg-cream p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                {propIcons[i]}
              </div>
              <h3 className="font-heading text-lg font-600 text-charcoal">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
