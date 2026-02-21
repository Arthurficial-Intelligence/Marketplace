import { describe, it, expect } from "vitest";
import { calculateQuote, PRICING_CONFIG } from "./pricing.ts";
import type { QuoteInput } from "./pricing.ts";

// Helper to build input with defaults (small, none, minimal, flat, biweekly)
function input(overrides: Partial<QuoteInput> = {}): QuoteInput {
  return {
    yardSize: "small",
    fencing: "none",
    obstacles: "minimal",
    slope: "flat",
    frequency: "biweekly",
    ...overrides,
  };
}

describe("calculateQuote", () => {
  describe("base prices by yard size", () => {
    it("small yard = $35 base", () => {
      const result = calculateQuote(input({ yardSize: "small" }));
      expect(result.breakdown.base).toBe(35);
    });

    it("medium yard = $45 base", () => {
      const result = calculateQuote(input({ yardSize: "medium" }));
      expect(result.breakdown.base).toBe(45);
    });

    it("large yard = $60 base", () => {
      const result = calculateQuote(input({ yardSize: "large" }));
      expect(result.breakdown.base).toBe(60);
    });

    it("xl yard = $80 base", () => {
      const result = calculateQuote(input({ yardSize: "xl" }));
      expect(result.breakdown.base).toBe(80);
    });
  });

  describe("frequency multipliers", () => {
    it("weekly = 0.85x (discount)", () => {
      const result = calculateQuote(input({ frequency: "weekly" }));
      // small=$35, biweekly multiplier=1.0, weekly=0.85 → 35*0.85=29.75
      expect(result.mowingCost).toBe(29.75);
    });

    it("biweekly = 1.0x (baseline)", () => {
      const result = calculateQuote(input({ frequency: "biweekly" }));
      expect(result.mowingCost).toBe(35);
    });

    it("monthly = 1.2x", () => {
      const result = calculateQuote(input({ frequency: "monthly" }));
      // 35 * 1.2 = 42
      expect(result.mowingCost).toBe(42);
    });

    it("onetime = 1.35x", () => {
      const result = calculateQuote(input({ frequency: "onetime" }));
      // 35 * 1.35 = 47.25
      expect(result.mowingCost).toBe(47.25);
    });

    it("weekly savings = biweekly subtotal - weekly subtotal", () => {
      const result = calculateQuote(input({ frequency: "weekly" }));
      // savings = 35 - 29.75 = 5.25
      expect(result.savings).toBe(5.25);
    });

    it("biweekly savings = 0 (is the baseline)", () => {
      const result = calculateQuote(input({ frequency: "biweekly" }));
      expect(result.savings).toBe(0);
    });

    it("monthly/onetime have negative savings (more expensive than biweekly)", () => {
      const monthly = calculateQuote(input({ frequency: "monthly" }));
      expect(monthly.savings).toBeLessThan(0);

      const onetime = calculateQuote(input({ frequency: "onetime" }));
      expect(onetime.savings).toBeLessThan(0);
    });
  });

  describe("stacked adjustments", () => {
    it("all adjustments stack additively before frequency multiplier", () => {
      const result = calculateQuote(
        input({
          yardSize: "medium",
          fencing: "full",
          obstacles: "lots",
          slope: "hilly",
          frequency: "biweekly",
        })
      );
      // 45 + 5 + 10 + 8 = 68, * 1.0 = 68
      expect(result.mowingCost).toBe(68);
      expect(result.breakdown.base).toBe(45);
      expect(result.breakdown.fencingAdj).toBe(5);
      expect(result.breakdown.obstacleAdj).toBe(10);
      expect(result.breakdown.slopeAdj).toBe(8);
    });

    it("partial fencing + some obstacles + slight slope", () => {
      const result = calculateQuote(
        input({
          yardSize: "large",
          fencing: "partial",
          obstacles: "some",
          slope: "slight",
          frequency: "biweekly",
        })
      );
      // 60 + 3 + 5 + 3 = 71
      expect(result.mowingCost).toBe(71);
    });
  });

  describe("min price scenario", () => {
    it("small + none + minimal + flat + weekly = cheapest", () => {
      const result = calculateQuote(
        input({
          yardSize: "small",
          fencing: "none",
          obstacles: "minimal",
          slope: "flat",
          frequency: "weekly",
        })
      );
      // (35 + 0 + 0 + 0) * 0.85 = 29.75
      // total = 29.75 + 4.99 = 34.74
      expect(result.mowingCost).toBe(29.75);
      expect(result.total).toBe(34.74);
    });
  });

  describe("max price scenario", () => {
    it("xl + full + lots + hilly + onetime = most expensive", () => {
      const result = calculateQuote(
        input({
          yardSize: "xl",
          fencing: "full",
          obstacles: "lots",
          slope: "hilly",
          frequency: "onetime",
        })
      );
      // (80 + 5 + 10 + 8) * 1.35 = 103 * 1.35 = 139.05
      // total = 139.05 + 4.99 = 144.04
      expect(result.mowingCost).toBe(139.05);
      expect(result.total).toBe(144.04);
    });
  });

  describe("service fee", () => {
    it("is always $4.99", () => {
      const scenarios: QuoteInput[] = [
        input({ yardSize: "small", frequency: "weekly" }),
        input({ yardSize: "xl", frequency: "onetime" }),
        input({ yardSize: "medium", frequency: "biweekly" }),
      ];

      for (const scenario of scenarios) {
        const result = calculateQuote(scenario);
        expect(result.serviceFee).toBe(PRICING_CONFIG.serviceFee);
        expect(result.serviceFee).toBe(4.99);
      }
    });

    it("total = mowingCost + serviceFee", () => {
      const result = calculateQuote(input());
      expect(result.total).toBe(result.mowingCost + result.serviceFee);
    });
  });

  describe("result shape", () => {
    it("returns all expected fields", () => {
      const result = calculateQuote(input());
      expect(result).toHaveProperty("mowingCost");
      expect(result).toHaveProperty("serviceFee");
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("savings");
      expect(result).toHaveProperty("frequency");
      expect(result).toHaveProperty("breakdown");
      expect(result.breakdown).toHaveProperty("base");
      expect(result.breakdown).toHaveProperty("fencingAdj");
      expect(result.breakdown).toHaveProperty("obstacleAdj");
      expect(result.breakdown).toHaveProperty("slopeAdj");
      expect(result.breakdown).toHaveProperty("frequencyDiscount");
    });

    it("frequency in result matches input", () => {
      const result = calculateQuote(input({ frequency: "monthly" }));
      expect(result.frequency).toBe("monthly");
    });
  });
});
