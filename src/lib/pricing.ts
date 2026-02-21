// MowNow Lawn Care Pricing Engine — Murfreesboro, TN

export const PRICING_CONFIG = {
  base: {
    small: 35,
    medium: 45,
    large: 60,
    xl: 80,
  },
  fencing: {
    none: 0,
    partial: 3,
    full: 5,
  },
  obstacles: {
    minimal: 0,
    some: 5,
    lots: 10,
  },
  slope: {
    flat: 0,
    slight: 3,
    hilly: 8,
  },
  frequency: {
    weekly: 0.85,
    biweekly: 1.0,
    monthly: 1.2,
    onetime: 1.35,
  },
  serviceFee: 4.99,
} as const;

export type YardSize = keyof typeof PRICING_CONFIG.base;
export type Fencing = keyof typeof PRICING_CONFIG.fencing;
export type Obstacles = keyof typeof PRICING_CONFIG.obstacles;
export type Slope = keyof typeof PRICING_CONFIG.slope;
export type Frequency = keyof typeof PRICING_CONFIG.frequency;

export interface QuoteInput {
  yardSize: YardSize;
  fencing: Fencing;
  obstacles: Obstacles;
  slope: Slope;
  frequency: Frequency;
}

export interface QuoteBreakdown {
  base: number;
  fencingAdj: number;
  obstacleAdj: number;
  slopeAdj: number;
  frequencyDiscount: number;
}

export interface QuoteResult {
  mowingCost: number;
  serviceFee: number;
  total: number;
  savings: number;
  frequency: Frequency;
  breakdown: QuoteBreakdown;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const base = PRICING_CONFIG.base[input.yardSize];
  const fencingAdj = PRICING_CONFIG.fencing[input.fencing];
  const obstacleAdj = PRICING_CONFIG.obstacles[input.obstacles];
  const slopeAdj = PRICING_CONFIG.slope[input.slope];
  const frequencyMultiplier = PRICING_CONFIG.frequency[input.frequency];

  const preFrequency = base + fencingAdj + obstacleAdj + slopeAdj;
  const subtotal = round2(preFrequency * frequencyMultiplier);

  // Savings vs biweekly baseline (biweekly multiplier is 1.0)
  const biweeklySubtotal = round2(preFrequency * PRICING_CONFIG.frequency.biweekly);
  const savings = round2(biweeklySubtotal - subtotal);

  const serviceFee = PRICING_CONFIG.serviceFee;
  const total = round2(subtotal + serviceFee);

  const frequencyDiscount = round2(preFrequency - subtotal);

  return {
    mowingCost: subtotal,
    serviceFee,
    total,
    savings,
    frequency: input.frequency,
    breakdown: {
      base,
      fencingAdj,
      obstacleAdj,
      slopeAdj,
      frequencyDiscount,
    },
  };
}
