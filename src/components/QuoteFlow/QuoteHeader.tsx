interface QuoteHeaderProps {
  stepIndex: number;
  totalSteps: number;
  onClose: () => void;
}

export default function QuoteHeader({
  stepIndex,
  totalSteps,
  onClose,
}: QuoteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <span className="font-heading font-bold text-primary text-lg tracking-tight">
        MowNow
      </span>

      {/* Progress dots */}
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= stepIndex
                ? "bg-primary w-3"
                : "bg-gray-200 w-1.5"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-charcoal"
        aria-label="Close quote flow"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="5" y1="5" x2="15" y2="15" />
          <line x1="15" y1="5" x2="5" y2="15" />
        </svg>
      </button>
    </header>
  );
}
