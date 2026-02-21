import { siteContent } from '../content/mownow-copy';

const { services } = siteContent;

export default function Services() {
  return (
    <section
      className="fade-in-section bg-cream py-16 md:py-20"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-5xl px-5">
        <h2
          id="services-heading"
          className="font-heading text-center text-2xl font-700 text-primary md:text-3xl"
        >
          {services.heading}
        </h2>

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-secondary-green/15 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
            {/* Mower icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M6 22h20M10 18c0-3.3 2.7-6 6-6s6 2.7 6 6"
                  className="stroke-primary"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="24" r="2" className="fill-primary" />
                <circle cx="22" cy="24" r="2" className="fill-primary" />
              </svg>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-xl font-600 text-charcoal">
                {services.card.title}
              </h3>
              <p className="text-2xl font-700 text-accent">
                {services.card.price}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal/60">
                {services.card.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
