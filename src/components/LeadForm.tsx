import { useState } from 'react';
import type { FormEvent } from 'react';
import './LeadForm.scss';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  yardSize: string;
  referralSource: string;
}

interface FormErrors {
  [key: string]: string;
}

const YARD_SIZES = ['Small (under 5,000 sq ft)', 'Medium (5,000–10,000 sq ft)', 'Large (over 10,000 sq ft)'];

const REFERRAL_SOURCES = [
  'Google / Search Engine',
  'Facebook / Social Media',
  'Nextdoor',
  'Friend or Neighbor',
  'Yard Sign / Flyer',
  'Other',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s()+-]{7,20}$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Full name is required.';
  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_RE.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!data.address.trim()) errors.address = 'Street address is required.';
  if (!data.yardSize) errors.yardSize = 'Please select a yard size.';
  return errors;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    yardSize: '',
    referralSource: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    console.log('Lead form submission:', formData);

    const endpoint = import.meta.env.VITE_API_ENDPOINT;
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
      } catch (err) {
        console.error('Submission error:', err);
        setSubmitError(
          'Something went wrong. Please try again or email us directly.',
        );
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="lead-form" id="lead-form" aria-labelledby="form-heading">
        <div className="container">
          <div className="lead-form__success" role="status">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="24" fill="#dcfce7" />
              <path d="M15 25l6 6 12-13" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2>You&rsquo;re on the list!</h2>
            <p>
              Thanks for your interest in MowNow. We&rsquo;ll be in touch soon
              with pricing and next steps for your Murfreesboro yard.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="lead-form" id="lead-form" aria-labelledby="form-heading">
      <div className="container">
        <h2 id="form-heading" className="lead-form__heading">
          Get Your Free Quote
        </h2>
        <p className="lead-form__subheading">
          Tell us about your yard and we&rsquo;ll send you a price — no
          obligation.
        </p>

        <form
          className="lead-form__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="lead-form__field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="lead-form__error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="lead-form__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="lead-form__error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="lead-form__field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className="lead-form__error" role="alert">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="lead-form__field">
            <label htmlFor="address">Street Address (Murfreesboro area)</label>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              value={formData.address}
              onChange={handleChange}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <span id="address-error" className="lead-form__error" role="alert">
                {errors.address}
              </span>
            )}
          </div>

          <div className="lead-form__field">
            <label htmlFor="yardSize">Yard Size Estimate</label>
            <select
              id="yardSize"
              name="yardSize"
              value={formData.yardSize}
              onChange={handleChange}
              aria-invalid={!!errors.yardSize}
              aria-describedby={errors.yardSize ? 'yardSize-error' : undefined}
            >
              <option value="">Select yard size</option>
              {YARD_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.yardSize && (
              <span id="yardSize-error" className="lead-form__error" role="alert">
                {errors.yardSize}
              </span>
            )}
          </div>

          <div className="lead-form__field">
            <label htmlFor="referralSource">How did you hear about us?</label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
            >
              <option value="">Select one (optional)</option>
              {REFERRAL_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          {submitError && (
            <p className="lead-form__submit-error" role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className="lead-form__submit"
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Get My Free Quote'}
          </button>
        </form>
      </div>
    </section>
  );
}
