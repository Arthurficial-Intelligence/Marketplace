import { useEffect, useRef, useState } from "react";
import MessageBubble from "../MessageBubble";

interface TextInputStepProps {
  message: string;
  placeholder: string;
  onSubmit: (value: string) => void;
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
  autoCapitalize?: string;
  validate?: (value: string) => string | null;
}

export default function TextInputStep({
  message,
  placeholder,
  onSubmit,
  inputMode = "text",
  autoComplete,
  autoCapitalize,
  validate,
}: TextInputStepProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (validate) {
      const err = validate(trimmed);
      if (err) {
        setError(err);
        return;
      }
    }
    setError(null);
    onSubmit(trimmed);
  }

  return (
    <div className="flex flex-col gap-4">
      <MessageBubble>{message}</MessageBubble>
      <div className="pl-12 pt-2 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder={placeholder}
            inputMode={inputMode}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 min-h-[48px] text-base font-body text-charcoal placeholder:text-gray-400 focus:border-primary focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="bg-primary text-white rounded-xl px-4 min-h-[48px] font-heading font-semibold hover:bg-secondary-green active:scale-[0.97] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 10h10M11 6l4 4-4 4" />
            </svg>
          </button>
        </div>
        {error && (
          <p className="text-error text-sm pl-1">{error}</p>
        )}
      </div>
    </div>
  );
}
