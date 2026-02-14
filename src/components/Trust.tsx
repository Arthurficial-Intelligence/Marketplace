import './Trust.scss';

const badges = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M16 3l3.09 6.26L26 10.27l-5 4.87L22.18 22 16 18.77 9.82 22 11 15.14l-5-4.87 6.91-1.01L16 3z"
          stroke="#15803d"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="#dcfce7"
        />
      </svg>
    ),
    label: 'Licensed & Insured Providers',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="10" stroke="#15803d" strokeWidth="2" fill="#dcfce7" />
        <path d="M16 10v1M16 21v1M10 16h1M21 16h1" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" fill="#15803d" />
      </svg>
    ),
    label: 'Murfreesboro Local',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="20" height="20" rx="10" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
        <path d="M12 16.5l3 3 5.5-6" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Satisfaction Guaranteed',
  },
];

const testimonials = [
  {
    quote:
      '"I used to spend my whole Saturday mowing. Now I just book online and enjoy the weekend."',
    name: 'Coming soon',
    location: 'Murfreesboro, TN',
  },
  {
    quote:
      '"Knowing the price upfront is a game changer. No more awkward negotiations."',
    name: 'Coming soon',
    location: 'Murfreesboro, TN',
  },
];

export default function Trust() {
  return (
    <section className="trust" id="trust" aria-labelledby="trust-heading">
      <div className="container">
        <h2 id="trust-heading" className="trust__heading">
          Why Murfreesboro Homeowners Choose MowNow
        </h2>

        <ul className="trust__badges" role="list">
          {badges.map((badge, i) => (
            <li key={i} className="trust__badge">
              {badge.icon}
              <span>{badge.label}</span>
            </li>
          ))}
        </ul>

        <div className="trust__testimonials">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="trust__quote">
              <p>{t.quote}</p>
              <footer>
                &mdash; {t.name}, {t.location}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
