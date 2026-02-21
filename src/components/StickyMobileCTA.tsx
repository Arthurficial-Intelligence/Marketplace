import { useState, useEffect } from 'react';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past the hero (roughly 300px)
      setVisible(window.scrollY > 300);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden sticky-cta-enter">
      <a
        href="#lead-form"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-center text-base font-bold text-primary shadow-2xl transition-all active:scale-[0.98]"
      >
        Get Your Free Quote &darr;
      </a>
    </div>
  );
}
