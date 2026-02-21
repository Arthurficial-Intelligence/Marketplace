import { supabase } from "./supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type YardSize = "small" | "medium" | "large" | "xl";

export type ReferralSource =
  | "facebook"
  | "instagram"
  | "google"
  | "neighbor"
  | "other";

export interface LeadFormData {
  full_name: string;
  email: string;
  phone: string;
  street_address: string;
  zip_code: string;
  yard_size: YardSize | "";
  referral_source: ReferralSource | "";
  notes?: string;
}

export interface LeadSubmitResult {
  success: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VALID_ZIP_CODES = new Set([
  "37127",
  "37128",
  "37129",
  "37130",
  "37131",
  "37132",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const YARD_SIZE_OPTIONS: { value: YardSize; label: string }[] = [
  { value: "small", label: "Small (under 5,000 sq ft)" },
  { value: "medium", label: "Medium (5,000 - 10,000 sq ft)" },
  { value: "large", label: "Large (10,000 - 20,000 sq ft)" },
  { value: "xl", label: "XL (over 20,000 sq ft)" },
];

export const REFERRAL_SOURCE_OPTIONS: {
  value: ReferralSource;
  label: string;
}[] = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "neighbor", label: "Neighbor / Word of mouth" },
  { value: "other", label: "Other" },
];

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

function validateLead(data: LeadFormData): string | null {
  if (!data.full_name.trim()) return "Full name is required.";
  if (!data.email.trim()) return "Email is required.";
  if (!EMAIL_RE.test(data.email)) return "Please enter a valid email address.";
  if (!data.phone.trim()) return "Phone number is required.";
  if (!data.street_address.trim()) return "Street address is required.";
  if (!data.zip_code.trim()) return "Zip code is required.";
  if (!VALID_ZIP_CODES.has(data.zip_code.trim()))
    return "Sorry, we only service the Murfreesboro area (zip codes 37127-37132).";
  return null;
}

// ---------------------------------------------------------------------------
// Submit
// ---------------------------------------------------------------------------

export async function submitLead(
  data: LeadFormData
): Promise<LeadSubmitResult> {
  const validationError = validateLead(data);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const utm = getUtmParams();

  const { error } = await supabase.from("mownow_leads").insert({
    full_name: data.full_name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    street_address: data.street_address.trim(),
    zip_code: data.zip_code.trim(),
    yard_size: data.yard_size || null,
    referral_source: data.referral_source || null,
    notes: data.notes?.trim() || null,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again or call us directly.",
    };
  }

  return { success: true };
}
