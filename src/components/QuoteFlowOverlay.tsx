import { useEffect, useCallback } from 'react';
import QuoteFlow from './QuoteFlow/QuoteFlow';

interface QuoteFlowOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteFlowOverlay({ isOpen, onClose }: QuoteFlowOverlayProps) {
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure? Your progress won't be saved.",
    );
    if (confirmed) onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="animate-slide-up">
      <QuoteFlow onClose={handleClose} />
    </div>
  );
}
