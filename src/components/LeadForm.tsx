import { useState } from 'react';
import type { FormEvent } from 'react';
import { siteContent } from '../content/mownow-copy';
import {
  submitLead,
  YARD_SIZE_OPTIONS,
  REFERRAL_SOURCE_OPTIONS,
  type LeadFormData,
} from '../lib/submitLead';

const { leadForm } = siteContent;

const VALID_ZIPS = ['37127', '37128', '37129', '37130', '37131', '37132'];

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    full_name: '',
    email: '',
    phone: '',
    street_address: '',
    zip_code: '',
    yard_size: '',
    referral_source: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const result = await submitLead(formData);

    if (!result.success) {
      setErrorMsg(result.error || leadForm.errorMessage);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-primary py-16 md:py-20" id="lead-form" aria-labelledby="form-heading">
        <div className="mx-auto max-w-lg px-5">
          <div className="flex flex-col items-center text-center gap-4 py-8" role="status">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M8 17l5 5 11-12" stroke="#D4A843" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-700 text-white">
              {leadForm.successTitle}
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-white/80">
              {leadForm.successMessage}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary py-16 md:py-20" id="lead-form" aria-labelledby="form-heading">
      <div className="mx-auto max-w-lg px-5">
        <h2
          id="form-heading"
          className="font-heading text-center text-2xl font-700 text-white md:text-3xl"
        >
          {leadForm.heading}
        </h2>
        <p className="mt-2 text-center text-base text-white/75">
          {leadForm.subheading}
        </p>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="full_name" className="text-sm font-500 text-white/90">
              Full Name *
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              autoComplete="name"
              placeholder="e.g. John Smith"
              value={formData.full_name}
              onChange={handleChange}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-500 text-white/90">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm font-500 text-white/90">
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(615) 555-1234"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Street Address */}
          <div className="flex flex-col gap-1">
            <label htmlFor="street_address" className="text-sm font-500 text-white/90">
              Street Address *
            </label>
            <input
              id="street_address"
              name="street_address"
              type="text"
              autoComplete="street-address"
              placeholder="123 Main St, Murfreesboro, TN"
              value={formData.street_address}
              onChange={handleChange}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/40 backdrop-blur-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Zip Code */}
          <div className="flex flex-col gap-1">
            <label htmlFor="zip_code" className="text-sm font-500 text-white/90">
              Zip Code *
            </label>
            <select
              id="zip_code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              className="appearance-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white backdrop-blur-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="" className="text-charcoal">Select zip code</option>
              {VALID_ZIPS.map((zip) => (
                <option key={zip} value={zip} className="text-charcoal">
                  {zip}
                </option>
              ))}
            </select>
          </div>

          {/* Yard Size */}
          <div className="flex flex-col gap-1">
            <label htmlFor="yard_size" className="text-sm font-500 text-white/90">
              Yard Size Estimate
            </label>
            <select
              id="yard_size"
              name="yard_size"
              value={formData.yard_size}
              onChange={handleChange}
              className="appearance-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white backdrop-blur-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="" className="text-charcoal">Select yard size</option>
              {YARD_SIZE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="text-charcoal">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Referral Source */}
          <div className="flex flex-col gap-1">
            <label htmlFor="referral_source" className="text-sm font-500 text-white/90">
              How did you hear about us?
            </label>
            <select
              id="referral_source"
              name="referral_source"
              value={formData.referral_source}
              onChange={handleChange}
              className="appearance-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-base text-white backdrop-blur-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            >
              <option value="" className="text-charcoal">Select one (optional)</option>
              {REFERRAL_SOURCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="text-charcoal">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="rounded-lg bg-error/20 px-4 py-3 text-center text-sm text-white" role="alert">
              {errorMsg}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-lg bg-accent px-8 py-4 text-lg font-bold text-primary shadow-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? leadForm.submittingButton : leadForm.submitButton}
          </button>
        </form>
      </div>
    </section>
  );
}
