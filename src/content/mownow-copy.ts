// ─────────────────────────────────────────────────────────────
// MowNow Site Content — Single source of truth for all copy
// ─────────────────────────────────────────────────────────────

export interface HeroContent {
  headline: string;
  subheadline: string;
  cta: string;
  urgencyBanner: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface HowItWorksContent {
  heading: string;
  steps: [Step, Step, Step];
}

export interface ServiceCard {
  title: string;
  price: string;
  note: string;
}

export interface ServicesContent {
  heading: string;
  card: ServiceCard;
}

export interface ValueProp {
  title: string;
  description: string;
}

export interface WhyMowNowContent {
  heading: string;
  props: [ValueProp, ValueProp, ValueProp, ValueProp];
}

export interface TrustBadge {
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

export interface SocialProofContent {
  heading: string;
  badges: TrustBadge[];
  testimonials: Testimonial[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  items: FaqItem[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder: string;
  autoComplete?: string;
  required: boolean;
  options?: string[];
}

export interface LeadFormContent {
  heading: string;
  subheading: string;
  successTitle: string;
  successMessage: string;
  submitButton: string;
  submittingButton: string;
  errorMessage: string;
  fields: FormField[];
}

export interface FooterContent {
  brand: string;
  tagline: string;
  serviceArea: string;
  email: string;
  zipCodes: string[];
}

export interface SiteContent {
  hero: HeroContent;
  howItWorks: HowItWorksContent;
  services: ServicesContent;
  whyMowNow: WhyMowNowContent;
  socialProof: SocialProofContent;
  faq: FaqContent;
  leadForm: LeadFormContent;
  footer: FooterContent;
}

export const siteContent: SiteContent = {
  // ── Hero ──────────────────────────────────────────────────
  hero: {
    headline: 'Lawn care, booked in seconds.',
    subheadline:
      'No waiting for quotes. No back-and-forth. Just a freshly cut yard at a price you know upfront — right here in Murfreesboro.',
    cta: 'Get My Free Quote',
    urgencyBanner:
      'Now booking spring cleanups — spots are limited for March & April.',
  },

  // ── How It Works ──────────────────────────────────────────
  howItWorks: {
    heading: 'How It Works',
    steps: [
      {
        title: 'Tell Us About Your Yard',
        description:
          'Fill out a quick form with your address and yard size. Takes about 60 seconds — way less time than mowing.',
      },
      {
        title: 'Get Your Price, Instantly',
        description:
          'No waiting around for a callback. You see your price right away — transparent, fair, no hidden fees.',
      },
      {
        title: 'We Show Up and Handle It',
        description:
          'A licensed, insured pro comes on schedule, does the work, and you get your weekend back. Simple as that.',
      },
    ],
  },

  // ── Services ──────────────────────────────────────────────
  services: {
    heading: 'What We Offer',
    card: {
      title: 'Weekly Mow & Edge',
      price: 'Starting at $40',
      note: 'Final pricing is based on your yard size. We always confirm the price before any work begins — no surprises.',
    },
  },

  // ── Why MowNow ────────────────────────────────────────────
  whyMowNow: {
    heading: 'Why Murfreesboro Homeowners Pick MowNow',
    props: [
      {
        title: 'Get Your Weekends Back',
        description:
          'Between baseball practice, family cookouts, and actually relaxing — you have better things to do than push a mower in the Tennessee heat.',
      },
      {
        title: 'No More Quote Runaround',
        description:
          'Most lawn companies make you call, wait, follow up, then wait some more. We give you a price in minutes, not days.',
      },
      {
        title: 'Licensed, Insured & Local',
        description:
          'We are not some app sending random strangers to your door. MowNow crews are licensed, insured, and from right here in the Boro.',
      },
      {
        title: '100% Satisfaction Guaranteed',
        description:
          'If your yard does not look great, we will come back and make it right — no arguments, no fine print.',
      },
    ],
  },

  // ── Social Proof ──────────────────────────────────────────
  socialProof: {
    heading: 'Join 50+ Murfreesboro Homeowners Getting Their Weekends Back',
    badges: [
      { label: 'Licensed & Insured' },
      { label: 'Locally Owned' },
      { label: 'Murfreesboro Proud' },
      { label: 'Satisfaction Guaranteed' },
    ],
    testimonials: [
      {
        quote:
          'I used to spend my whole Saturday mowing. Now I book online Friday night and my yard looks amazing by lunch.',
        name: 'Marcus T.',
        location: 'Murfreesboro, TN',
      },
      {
        quote:
          'Knowing the price upfront is a game changer. No more awkward negotiations or surprise bills.',
        name: 'Sarah K.',
        location: 'Murfreesboro, TN',
      },
      {
        quote:
          'Finally a lawn service that just does what they say. Show up, mow, done. These guys are the real deal.',
        name: 'Jason R.',
        location: 'Smyrna, TN',
      },
    ],
  },

  // ── FAQ ───────────────────────────────────────────────────
  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'How much does it cost?',
        answer:
          'Mow and edge service starts at $40. Your actual price depends on yard size, and we always confirm it with you before we start. No hidden fees, no surprises.',
      },
      {
        question: 'Are you licensed and insured?',
        answer:
          'Absolutely. Every MowNow crew member is fully licensed and insured. We take this seriously — it protects your property and gives you peace of mind.',
      },
      {
        question: 'What areas do you serve?',
        answer:
          'We serve Murfreesboro, TN and the surrounding area — zip codes 37127, 37128, 37129, 37130, 37131, and 37132. If you are nearby but not sure, go ahead and submit the form and we will let you know.',
      },
      {
        question: 'What if I am not happy with the service?',
        answer:
          'We stand behind our work 100%. If something does not look right, let us know within 24 hours and we will come back to fix it at no extra charge.',
      },
      {
        question: 'How quickly can you get to my yard?',
        answer:
          'Most new customers get their first service within 3-5 business days. During peak season in spring, it can be a bit longer — so booking early is smart.',
      },
      {
        question: 'Do I need to be home?',
        answer:
          'Nope. As long as we can access your yard, we will take care of everything. We will send you a heads-up before we arrive and a confirmation when we are done.',
      },
    ],
  },

  // ── Lead Capture Form ─────────────────────────────────────
  leadForm: {
    heading: 'Get My Free Quote',
    subheading:
      'Tell us about your yard and we will send you a price — no strings attached, no obligation.',
    successTitle: 'You are on the list!',
    successMessage:
      'Thanks for your interest in MowNow. We will be in touch soon with pricing and next steps for your Murfreesboro yard.',
    submitButton: 'Get My Free Quote',
    submittingButton: 'Sending...',
    errorMessage:
      'Something went wrong. Please try again or email us directly at hello@mownow.com.',
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'e.g. John Smith',
        autoComplete: 'name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'you@email.com',
        autoComplete: 'email',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '(615) 555-1234',
        autoComplete: 'tel',
        required: true,
      },
      {
        name: 'address',
        label: 'Street Address (Murfreesboro area)',
        type: 'text',
        placeholder: '123 Main St, Murfreesboro, TN',
        autoComplete: 'street-address',
        required: true,
      },
      {
        name: 'yardSize',
        label: 'Yard Size Estimate',
        type: 'select',
        placeholder: 'Select yard size',
        required: true,
        options: [
          'Small (under 5,000 sq ft)',
          'Medium (5,000-10,000 sq ft)',
          'Large (over 10,000 sq ft)',
        ],
      },
      {
        name: 'referralSource',
        label: 'How did you hear about us?',
        type: 'select',
        placeholder: 'Select one (optional)',
        required: false,
        options: [
          'Google / Search Engine',
          'Facebook / Social Media',
          'Nextdoor',
          'Friend or Neighbor',
          'Yard Sign / Flyer',
          'Other',
        ],
      },
    ],
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    brand: 'MowNow',
    tagline: 'Lawn care that respects your time.',
    serviceArea: 'Serving Murfreesboro, TN & surrounding areas',
    email: 'hello@mownow.com',
    zipCodes: ['37127', '37128', '37129', '37130', '37131', '37132'],
  },
};
