import { useEffect, useRef } from "react";

interface SuccessStepProps {
  name: string;
}

export default function SuccessStep({ name }: SuccessStepProps) {
  const checkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = checkRef.current;
    if (!el) return;
    el.style.transform = "scale(0)";
    el.style.opacity = "0";
    requestAnimationFrame(() => {
      el.style.transition = "transform 500ms ease-out, opacity 400ms ease-out";
      el.style.transform = "scale(1)";
      el.style.opacity = "1";
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
      <div
        ref={checkRef}
        className="w-20 h-20 rounded-full bg-primary flex items-center justify-center opacity-0"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 20l7 7 13-13" />
        </svg>
      </div>

      <h2 className="font-heading font-bold text-2xl text-charcoal">
        You're all set, {name}!
      </h2>
      <p className="text-gray-500 font-body text-base max-w-xs">
        We'll text you shortly to confirm your first visit. Welcome to
        stress-free lawn care.
      </p>
    </div>
  );
}
