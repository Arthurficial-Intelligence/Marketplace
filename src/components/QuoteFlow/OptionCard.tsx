interface OptionCardProps {
  emoji: string;
  title: string;
  subtitle?: string;
  badge?: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  emoji,
  title,
  subtitle,
  badge,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left rounded-xl border-2 px-4 py-3 min-h-[48px] transition-all duration-200 active:scale-[0.97] ${
        selected
          ? "border-primary bg-primary/5"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {badge && (
        <span className="absolute -top-2.5 right-3 text-[11px] font-bold font-heading bg-accent text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="text-xl flex-shrink-0">{emoji}</span>
        <div className="min-w-0">
          <span className="font-heading font-semibold text-charcoal text-sm block">
            {title}
          </span>
          {subtitle && (
            <span className="text-xs text-gray-500 block mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
        {selected && (
          <svg
            className="ml-auto flex-shrink-0 text-primary"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
