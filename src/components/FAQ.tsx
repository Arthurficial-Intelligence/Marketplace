import { useState } from 'react';
import { siteContent } from '../content/mownow-copy';

const { faq } = siteContent;

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-charcoal/10 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-600 text-charcoal transition-colors hover:text-primary"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M5 7.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-charcoal/65 pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      className="fade-in-section bg-white py-16 md:py-20"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-2xl px-5">
        <h2
          id="faq-heading"
          className="font-heading text-center text-2xl font-700 text-primary md:text-3xl"
        >
          {faq.heading}
        </h2>

        <div className="mt-10">
          {faq.items.map((item, i) => (
            <AccordionItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
