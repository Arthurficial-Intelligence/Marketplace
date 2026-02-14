import './Hero.scss';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <h1 id="hero-heading" className="hero__title">
          Lawn care, booked in&nbsp;seconds.
        </h1>
        <p className="hero__subtitle">
          No waiting for quotes. No back-and-forth. Just a freshly cut yard at a
          price you know upfront&nbsp;&mdash;&nbsp;right here in Murfreesboro.
        </p>
        <a href="#lead-form" className="hero__cta">
          Get Your Instant Quote
        </a>
      </div>
    </section>
  );
}
