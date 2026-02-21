import { useState } from "react";
import MessageBubble from "../MessageBubble";
import OptionCard from "../OptionCard";

interface VisualOption {
  emoji: string;
  title: string;
  subtitle?: string;
  value: string;
  badge?: string;
}

interface VisualSelectStepProps {
  message: string;
  options: VisualOption[];
  onSelect: (value: string) => void;
}

export default function VisualSelectStep({
  message,
  options,
  onSelect,
}: VisualSelectStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(value: string) {
    setSelected(value);
    // Brief delay so user sees the selection
    setTimeout(() => onSelect(value), 250);
  }

  return (
    <div className="flex flex-col gap-4">
      <MessageBubble>{message}</MessageBubble>
      <div className="pl-12 pt-2 flex flex-col gap-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            emoji={opt.emoji}
            title={opt.title}
            subtitle={opt.subtitle}
            badge={opt.badge}
            selected={selected === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
