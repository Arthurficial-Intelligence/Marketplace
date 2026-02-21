import MessageBubble from "../MessageBubble";

interface InfoStepProps {
  message: string;
  buttonLabel: string;
  onNext: () => void;
}

export default function InfoStep({ message, buttonLabel, onNext }: InfoStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <MessageBubble>{message}</MessageBubble>
      <div className="pl-12 pt-2">
        <button
          type="button"
          onClick={onNext}
          className="bg-primary text-white font-heading font-semibold rounded-full px-8 py-3 min-h-[48px] text-base hover:bg-secondary-green active:scale-[0.97] transition-all duration-200"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
