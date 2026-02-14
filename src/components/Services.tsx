import './Services.scss';

export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <h2 id="services-heading" className="services__heading">
          What We Offer
        </h2>
        <div className="services__card">
          <div className="services__card-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#dcfce7" />
              <path
                d="M16 30h16M18 26c0-3.3 2.7-6 6-6s6 2.7 6 6"
                stroke="#15803d"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="24" cy="33" r="2" fill="#15803d" />
            </svg>
          </div>
          <div className="services__card-content">
            <h3 className="services__card-title">Mow &amp; Edge</h3>
            <p className="services__card-price">
              Starting at <strong>$40</strong>
            </p>
            <p className="services__card-note">
              Final pricing varies by yard size. We&rsquo;ll confirm your price
              before any work begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
