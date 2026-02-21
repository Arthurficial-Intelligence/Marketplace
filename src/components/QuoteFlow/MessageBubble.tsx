import { useEffect, useRef, type ReactNode } from "react";
import Avatar from "./Avatar";

interface MessageBubbleProps {
  children: ReactNode;
  avatar?: string;
}

export default function MessageBubble({
  children,
  avatar = "\uD83C\uDF3F",
}: MessageBubbleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Trigger reflow then animate in
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 400ms ease-out, transform 400ms ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <div ref={ref} className="flex items-start gap-3 opacity-0">
      <Avatar emoji={avatar} />
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[85%]">
        <p className="text-charcoal text-base leading-relaxed font-body">
          {children}
        </p>
      </div>
    </div>
  );
}
