import { supabase } from "./supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface QuoteLeadSubmission {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  yardSize: string;
  fencing: string;
  obstacles: string;
  slope: string;
  frequency: string;
  quote: {
    mowingCost: number;
    serviceFee: number;
    total: number;
    breakdown: {
      base: number;
      fencingAdj: number;
      obstacleAdj: number;
      slopeAdj: number;
      frequencyDiscount: number;
    };
    frequencyMultiplier: number;
  };
}

export interface QuoteLeadResult {
  success: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getUtmParams(): {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
} {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
  };
}

// ---------------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------------

export async function submitQuoteLead(
  data: QuoteLeadSubmission
): Promise<QuoteLeadResult> {
  const leadId = crypto.randomUUID();
  const utm = getUtmParams();

  // Insert the lead record
  const { error: leadError } = await supabase.from("mownow_leads").insert({
    id: leadId,
    full_name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    street_address: data.address.trim(),
    zip_code: data.zip.trim(),
    yard_size: data.yardSize || null,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  });

  if (leadError) {
    console.error("Supabase lead insert error:", leadError);
    return {
      success: false,
      error: "Something went wrong. Please try again or call us directly.",
    };
  }

  // Insert the quote record linked to the lead
  const { breakdown } = data.quote;
  const adjustments =
    breakdown.fencingAdj + breakdown.obstacleAdj + breakdown.slopeAdj;

  const { error: quoteError } = await supabase.from("mownow_quotes").insert({
    lead_id: leadId,
    yard_size: data.yardSize,
    fencing: data.fencing,
    obstacles: data.obstacles,
    slope: data.slope,
    frequency: data.frequency,
    base_price: breakdown.base,
    adjustments,
    frequency_multiplier: data.quote.frequencyMultiplier,
    subtotal: data.quote.mowingCost,
    service_fee: data.quote.serviceFee,
    total_price: data.quote.total,
  });

  if (quoteError) {
    console.error("Supabase quote insert error:", quoteError);
    return {
      success: false,
      error: "Something went wrong. Please try again or call us directly.",
    };
  }

  return { success: true };
}
