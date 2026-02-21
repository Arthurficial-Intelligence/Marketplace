import { siteContent } from '../content/mownow-copy';

const { socialProof } = siteContent;

const badgeIcons = [
  // Shield - Licensed
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L4 5.5v4.5c0 5 3.3 9.7 8 11 4.7-1.3 8-6 8-11V5.5L12 2z"
      className="stroke-primary fill-primary/10" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12.5l2 2 4-4.5" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Map pin - Locally Owned
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z"
      className="stroke-primary fill-primary/10" strokeWidth="1.5" />
    <circle cx="12" cy="11" r="2" className="stroke-primary" strokeWidth="1.5" />
  </svg>,
  // Heart - Murfreesboro Proud
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21C12 21 4 15 4 9.5a4.5 4.5 0 019-1 4.5 4.5 0 019 1C22 15 12 21 12 21z"
      className="stroke-primary fill-primary/10" strokeWidth="1.5" />
  </svg>,
  // Check circle - Guaranteed
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" className="stroke-primary fill-primary/10" strokeWidth="1.5" />
    <path d="M9 12.5l2 2 4-4.5" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function SocialProof() {
  return (
    <section
      className="fade-in-section bg-cream py-16 md:py-20"
      id="social-proof"
      aria-labelledby="social-heading"
    >
      <div className="mx-auto max-w-5xl px-5">
        <h2
          id="social-heading"
          className="font-heading text-center text-2xl font-700 text-primary md:text-3xl"
        >
          {socialProof.heading}
        </h2>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
          {socialProof.badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-500 text-primary"
            >
              {badgeIcons[i]}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials — uncomment when real customer quotes are available */}
        {socialProof.testimonials.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {socialProof.testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="rounded-xl border-l-4 border-accent bg-white p-5 shadow-sm"
              >
                <p className="text-sm italic leading-relaxed text-charcoal/75">
                  "{t.quote}"
                </p>
                <footer className="mt-3 text-xs font-500 text-charcoal/50">
                  &mdash; {t.name}, {t.location}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
