import './HowItWorks.scss';

const steps = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="20" fill="#dcfce7" />
        <path
          d="M14 21l3 3 9-9"
          stroke="#15803d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Request Service',
    description: 'Fill out a quick form with your address and yard details.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="20" fill="#dcfce7" />
        <path
          d="M15 17h10M15 20h7M15 23h10"
          stroke="#15803d"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Get Instant Pricing',
    description: 'See your price right away — no surprise fees, no haggling.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="20" fill="#dcfce7" />
        <path
          d="M20 14v6l4 2"
          stroke="#15803d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="7" stroke="#15803d" strokeWidth="2.5" />
      </svg>
    ),
    title: 'We Handle the Rest',
    description:
      'A licensed, insured pro shows up on schedule. You enjoy your yard.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works" aria-labelledby="how-heading">
      <div className="container">
        <h2 id="how-heading" className="how-it-works__heading">
          How It Works
        </h2>
        <ol className="how-it-works__steps">
          {steps.map((step, i) => (
            <li key={i} className="how-it-works__step">
              <div className="how-it-works__icon">{step.icon}</div>
              <h3 className="how-it-works__step-title">{step.title}</h3>
              <p className="how-it-works__step-desc">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
