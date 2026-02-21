import MessageBubble from "../MessageBubble";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <MessageBubble>
        Hey there! I'm here to get you a price for lawn care in Murfreesboro.
        This takes about 60 seconds.
      </MessageBubble>
      <div className="pl-12 pt-2">
        <button
          type="button"
          onClick={onNext}
          className="bg-primary text-white font-heading font-semibold rounded-full px-8 py-3 min-h-[48px] text-base hover:bg-secondary-green active:scale-[0.97] transition-all duration-200"
        >
          Let's do it
        </button>
      </div>
    </div>
  );
}
