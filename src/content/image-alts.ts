/** Alt text constants for all MowNow images — used for accessibility and SEO */

export const IMAGE_ALTS = {
  heroLawn:
    "Freshly mowed suburban lawn with crisp stripes glowing in warm golden-hour sunlight",
  lawnMower:
    "Close-up of a lawn mower cutting through lush green grass on a sunny day",
  neighborhood:
    "Quiet suburban neighborhood street lined with brick homes and mature trees",
  backyardRelax:
    "Beautiful backyard of a modern home with a manicured lawn and inviting outdoor space",
  mownowLogo: "MowNow — Your Neighborhood Lawn Care Marketplace",
  mownowIcon: "MowNow logo icon",
  ogImage:
    "MowNow — Your Neighborhood Lawn Care Marketplace, Get Early Access",
} as const;

export type ImageAltKey = keyof typeof IMAGE_ALTS;
