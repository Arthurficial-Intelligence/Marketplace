import { useEffect } from "react";
import MessageBubble from "../MessageBubble";

interface LoadingStepProps {
  name: string;
  onDone: () => void;
}

export default function LoadingStep({ name, onDone }: LoadingStepProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col gap-4">
      <MessageBubble>
        Crunching the numbers for your yard, {name}
        <span className="quote-flow-dots">...</span>
      </MessageBubble>
    </div>
  );
}
