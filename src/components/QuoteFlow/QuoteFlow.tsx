import { useCallback, useState } from "react";
import { calculateQuote } from "../../lib/pricing";
import type { QuoteResult, Frequency, YardSize, Fencing, Obstacles, Slope } from "../../lib/pricing";
import { submitQuoteLead } from "../../lib/submitQuoteLead";
import QuoteHeader from "./QuoteHeader";
import WelcomeStep from "./steps/WelcomeStep";
import TextInputStep from "./steps/TextInputStep";
import InfoStep from "./steps/InfoStep";
import SelectStep from "./steps/SelectStep";
import VisualSelectStep from "./steps/VisualSelectStep";
import LoadingStep from "./steps/LoadingStep";
import PriceRevealStep from "./steps/PriceRevealStep";
import SuccessStep from "./steps/SuccessStep";

interface QuoteFlowProps {
  onClose: () => void;
}

interface Answers {
  name: string;
  address: string;
  zip: string;
  yardSize: string;
  fencing: string;
  obstacles: string;
  slope: string;
  frequency: string;
  email: string;
  phone: string;
}

const TOTAL_STEPS = 15;

const ZIP_OPTIONS = [
  { label: "37127", value: "37127" },
  { label: "37128", value: "37128" },
  { label: "37129", value: "37129" },
  { label: "37130", value: "37130" },
  { label: "37131", value: "37131" },
  { label: "37132", value: "37132" },
];

const YARD_OPTIONS = [
  { emoji: "\uD83C\uDFD8\uFE0F", title: "Small", subtitle: "Townhome or small lot", value: "small" },
  { emoji: "\uD83C\uDFE0", title: "Medium", subtitle: "Typical subdivision yard", value: "medium" },
  { emoji: "\uD83C\uDFE1", title: "Large", subtitle: "Bigger than most neighbors", value: "large" },
  { emoji: "\uD83C\uDF33", title: "Half acre+", subtitle: "You've got some room", value: "xl" },
];

const FENCE_OPTIONS = [
  { emoji: "\uD83C\uDF3F", title: "No fence", subtitle: undefined, value: "none" },
  { emoji: "\u25FB\uFE0F", title: "Partial", subtitle: "Some areas fenced", value: "partial" },
  { emoji: "\uD83D\uDD32", title: "Fully fenced", subtitle: "Fenced all around", value: "full" },
];

const OBSTACLE_OPTIONS = [
  { emoji: "\u2600\uFE0F", title: "Pretty open", subtitle: "Mostly clear", value: "minimal" },
  { emoji: "\uD83C\uDF32", title: "A few things", subtitle: "Trees, beds, equipment", value: "some" },
  { emoji: "\uD83C\uDFCA", title: "Lots of stuff", subtitle: "Pool, heavy landscaping", value: "lots" },
];

const SLOPE_OPTIONS = [
  { emoji: "\uD83D\uDFE9", title: "Flat", subtitle: "Nice and level", value: "flat" },
  { emoji: "\uD83D\uDCD0", title: "Some slope", subtitle: "A few hills", value: "slight" },
  { emoji: "\u26F0\uFE0F", title: "Hilly", subtitle: "Significant slopes", value: "hilly" },
];

const FREQUENCY_OPTIONS = [
  { emoji: "\u2B50", title: "Weekly", subtitle: "Best value \u2014 save 15%", value: "weekly", badge: "BEST VALUE" },
  { emoji: "\uD83D\uDCC5", title: "Every 2 weeks", subtitle: "Most popular", value: "biweekly", badge: "POPULAR" },
  { emoji: "\uD83D\uDDD3\uFE0F", title: "Monthly", subtitle: undefined, value: "monthly" },
  { emoji: "1\uFE0F\u20E3", title: "One-time", subtitle: "Just this once", value: "onetime" },
];

function validateEmail(value: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email.";
  return null;
}

function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return "Please enter a valid phone number.";
  return null;
}

export default function QuoteFlow({ onClose }: QuoteFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    name: "",
    address: "",
    zip: "",
    yardSize: "",
    fencing: "",
    obstacles: "",
    slope: "",
    frequency: "",
    email: "",
    phone: "",
  });
  const [quote, setQuote] = useState<QuoteResult | null>(null);

  function update(field: keyof Answers, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  function next() {
    setStepIndex((i) => i + 1);
  }

  function handleUpdateAndNext(field: keyof Answers, value: string) {
    update(field, value);
    setStepIndex((i) => i + 1);
  }

  const handleLoadingDone = useCallback(() => {
    // Calculate quote
    const result = calculateQuote({
      yardSize: answers.yardSize as YardSize,
      fencing: answers.fencing as Fencing,
      obstacles: answers.obstacles as Obstacles,
      slope: answers.slope as Slope,
      frequency: answers.frequency as Frequency,
    });
    setQuote(result);
    setStepIndex((i) => i + 1);
  }, [answers.yardSize, answers.fencing, answers.obstacles, answers.slope, answers.frequency]);

  async function handlePhoneSubmit(phone: string) {
    update("phone", phone);
    // Submit to Supabase
    if (quote) {
      const frequencyMultiplier =
        answers.frequency === "weekly" ? 0.85 :
        answers.frequency === "monthly" ? 1.2 :
        answers.frequency === "onetime" ? 1.35 : 1.0;

      try {
        await submitQuoteLead({
          name: answers.name,
          email: answers.email,
          phone,
          address: answers.address,
          zip: answers.zip,
          yardSize: answers.yardSize,
          fencing: answers.fencing,
          obstacles: answers.obstacles,
          slope: answers.slope,
          frequency: answers.frequency,
          quote: {
            mowingCost: quote.mowingCost,
            serviceFee: quote.serviceFee,
            total: quote.total,
            breakdown: quote.breakdown,
            frequencyMultiplier,
          },
        });
      } catch (err) {
        console.error("Failed to submit quote lead:", err);
      }
    }
    next();
  }

  function renderStep() {
    switch (stepIndex) {
      case 0:
        return <WelcomeStep onNext={next} />;
      case 1:
        return (
          <TextInputStep
            key="name"
            message="First off, what's your name?"
            placeholder="Your name"
            autoCapitalize="words"
            onSubmit={(v) => handleUpdateAndNext("name", v)}
          />
        );
      case 2:
        return (
          <InfoStep
            message={`Nice to meet you, ${answers.name}! Let's figure out the best price for your yard.`}
            buttonLabel="Sounds good"
            onNext={next}
          />
        );
      case 3:
        return (
          <TextInputStep
            key="address"
            message={`What's your street address, ${answers.name}?`}
            placeholder="123 Main St"
            autoComplete="street-address"
            onSubmit={(v) => handleUpdateAndNext("address", v)}
          />
        );
      case 4:
        return (
          <SelectStep
            message="Which zip code?"
            options={ZIP_OPTIONS}
            onSelect={(v) => handleUpdateAndNext("zip", v)}
          />
        );
      case 5:
        return (
          <VisualSelectStep
            message="How would you describe your yard?"
            options={YARD_OPTIONS}
            onSelect={(v) => handleUpdateAndNext("yardSize", v)}
          />
        );
      case 6:
        return (
          <VisualSelectStep
            message="Any fencing?"
            options={FENCE_OPTIONS}
            onSelect={(v) => handleUpdateAndNext("fencing", v)}
          />
        );
      case 7:
        return (
          <VisualSelectStep
            message="How about obstacles in the yard?"
            options={OBSTACLE_OPTIONS}
            onSelect={(v) => handleUpdateAndNext("obstacles", v)}
          />
        );
      case 8:
        return (
          <VisualSelectStep
            message="What about the terrain?"
            options={SLOPE_OPTIONS}
            onSelect={(v) => handleUpdateAndNext("slope", v)}
          />
        );
      case 9:
        return (
          <VisualSelectStep
            message="How often would you like service?"
            options={FREQUENCY_OPTIONS}
            onSelect={(v) => handleUpdateAndNext("frequency", v)}
          />
        );
      case 10:
        return <LoadingStep name={answers.name} onDone={handleLoadingDone} />;
      case 11:
        return quote ? <PriceRevealStep quote={quote} onNext={next} /> : null;
      case 12:
        return (
          <TextInputStep
            key="email"
            message={`Great price, right ${answers.name}? Drop your email and we'll lock it in.`}
            placeholder="you@email.com"
            inputMode="email"
            autoComplete="email"
            validate={validateEmail}
            onSubmit={(v) => handleUpdateAndNext("email", v)}
          />
        );
      case 13:
        return (
          <TextInputStep
            key="phone"
            message="And your phone number? We'll text you to confirm your first visit."
            placeholder="(615) 555-1234"
            inputMode="tel"
            autoComplete="tel"
            validate={validatePhone}
            onSubmit={handlePhoneSubmit}
          />
        );
      case 14:
        return <SuccessStep name={answers.name} />;
      default:
        return null;
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-cream flex flex-col">
      <QuoteHeader
        stepIndex={stepIndex}
        totalSteps={TOTAL_STEPS}
        onClose={onClose}
      />
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-lg mx-auto quote-flow-step">{renderStep()}</div>
      </div>
    </div>
  );
}
