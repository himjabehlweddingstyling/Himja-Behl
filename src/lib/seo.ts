import type { Metadata } from "next";
import { journeys } from "@/lib/data";

export const SITE_URL = "https://himjabehl.in";
export const SITE_NAME = "Himja Behl";

export const DEFAULT_DESCRIPTION =
  "Himja Behl is a premium wedding styling brand focused on curating complete wardrobe directions for brides, grooms, and families — silhouettes, fabrics, colours, and jewellery that belong to your celebration.";

export const OG_IMAGE = {
  url: `${SITE_URL}/og.jpg`,
  width: 1200,
  height: 630,
  alt: "Himja Behl — Wedding Styling & Wardrobe Curation",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Himja Behl — Premium Wedding Styling & Wardrobe Curation",
    template: "%s | Himja Behl",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Wedding Stylist",
    "Indian Bridal Wear",
    "Trousseau Curation",
    "Himja Behl",
    "Wedding Wardrobe Stylist",
    "Bridal Styling",
    "Groom Styling",
    "Luxury Indian Weddings",
    "Wedding Wardrobe Consultant Delhi",
    "Bridal Trousseau Mumbai",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Wedding Styling",
  openGraph: {
    type: "website",
    title: "Himja Behl — Premium Wedding Styling & Wardrobe Curation",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himja Behl — Premium Wedding Styling & Wardrobe Curation",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export const journeySlugs = journeys.map((j) => `/journeys/${j.slug}`);

export const sitePages = ["/", "/story", "/journeys", ...journeySlugs];