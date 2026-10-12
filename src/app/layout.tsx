import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import { defaultMetadata, SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { RouteTransition } from "@/components/route-transition";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const fontDisplay = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontQuote = Playfair_Display({
  variable: "--font-quote",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#4A151C",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: `${SITE_URL}/og.jpg`,
  priceRange: "₹₹₹",
  areaServed: [
    { "@type": "City", name: "New Delhi" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "Country", name: "India" },
  ],
  knowsAbout: [
    "Wedding Styling",
    "Bridal Trousseau Curation",
    "Groom Wardrobe Styling",
    "Indian Wedding Wardrobe",
    "Bridal Lehenga Styling",
    "Sherwani Styling",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Wedding Wardrobe Curation",
        serviceType: "Wedding Styling",
        description: "End-to-end wardrobe styling for brides, grooms, and families across Indian wedding celebrations.",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontQuote.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        <JsonLd data={organizationSchema} />
        <RouteTransition />
        {children}
        <Analytics />
      </body>
    </html>
  );
}