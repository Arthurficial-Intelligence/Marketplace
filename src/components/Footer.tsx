import { siteContent } from '../content/mownow-copy';

const { footer } = siteContent;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-10 text-white/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 text-center">
        <div>
          <strong className="font-heading text-xl font-700 text-white">
            {footer.brand}
          </strong>
          <p className="mt-1 text-sm italic text-white/50">
            {footer.tagline}
          </p>
        </div>

        <p className="text-sm">
          {footer.serviceArea}
          <br />
          <span className="text-xs text-white/40">
            {footer.zipCodes.join(' \u00B7 ')}
          </span>
        </p>

        <a
          href={`mailto:${footer.email}`}
          className="text-sm text-accent transition-colors hover:text-accent/80"
        >
          {footer.email}
        </a>

        <p className="text-xs text-white/35">
          &copy; {year} {footer.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
