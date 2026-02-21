import { siteContent } from '../content/mownow-copy';

const { howItWorks } = siteContent;

const stepIcons = [
  // Clipboard / form icon
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="20" className="fill-secondary-green/15" />
    <path
      d="M16 14h8M14 18h12M14 22h12M14 26h8"
      className="stroke-secondary-green"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>,
  // Price tag / dollar icon
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="20" className="fill-accent/15" />
    <path
      d="M20 13v14M17 16.5c0-1.1 1.3-2 3-2s3 .9 3 2-1.3 2-3 2-3 .9-3 2 1.3 2 3 2 3-.9 3-2"
      className="stroke-accent"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  // Checkmark / done icon
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="20" className="fill-primary/15" />
    <path
      d="M14 21l4 4 8-9"
      className="stroke-primary"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

export default function HowItWorks() {
  return (
    <section
      className="fade-in-section bg-white py-16 md:py-20"
      id="how-it-works"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-5xl px-5">
        <h2
          id="how-heading"
          className="font-heading text-center text-2xl font-700 text-primary md:text-3xl"
        >
          {howItWorks.heading}
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 list-none p-0">
          {howItWorks.steps.map((step, i) => (
            <li
              key={i}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
                {stepIcons[i]}
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-heading text-xl font-600 text-charcoal">
                {step.title}
              </h3>
              <p className="max-w-xs text-base leading-relaxed text-charcoal/70">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
