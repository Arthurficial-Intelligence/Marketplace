import { useEffect, useRef } from "react";
import type { QuoteResult } from "../../../lib/pricing";
import MessageBubble from "../MessageBubble";

interface PriceRevealStepProps {
  quote: QuoteResult;
  onNext: () => void;
}

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: "per week",
  biweekly: "every 2 weeks",
  monthly: "per month",
  onetime: "one-time visit",
};

export default function PriceRevealStep({ quote, onNext }: PriceRevealStepProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "scale(0.9)";
    const timer = setTimeout(() => {
      el.style.transition =
        "opacity 600ms ease-out, transform 600ms ease-out";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <MessageBubble>Here's your personalized quote!</MessageBubble>

      <div ref={cardRef} className="pl-12 pt-2 opacity-0">
        <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-lg p-6 max-w-sm">
          {/* Total price */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 font-body mb-1">
              Your price {FREQUENCY_LABELS[quote.frequency] ?? ""}
            </p>
            <p className="text-5xl font-heading font-bold text-primary">
              ${quote.total.toFixed(2)}
            </p>
          </div>

          {/* Breakdown */}
          <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm text-gray-600 font-body">
            <div className="flex justify-between">
              <span>Mowing</span>
              <span>${quote.mowingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>${quote.serviceFee.toFixed(2)}</span>
            </div>
            {quote.savings > 0 && (
              <div className="flex justify-between text-primary font-semibold">
                <span>You save</span>
                <span>-${quote.savings.toFixed(2)}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center mt-3">
            Includes mowing, edging, and blowing. No hidden fees.
          </p>

          <button
            type="button"
            onClick={onNext}
            className="mt-4 w-full bg-primary text-white font-heading font-semibold rounded-full py-3 min-h-[48px] text-base hover:bg-secondary-green active:scale-[0.97] transition-all duration-200"
          >
            Lock In This Price &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
