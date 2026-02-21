import MessageBubble from "../MessageBubble";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectStepProps {
  message: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
}

export default function SelectStep({ message, options, onSelect }: SelectStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <MessageBubble>{message}</MessageBubble>
      <div className="pl-12 pt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className="border-2 border-gray-200 bg-white rounded-full px-5 py-2.5 min-h-[48px] text-sm font-heading font-semibold text-charcoal hover:border-primary hover:bg-primary/5 active:scale-[0.97] transition-all duration-200"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
