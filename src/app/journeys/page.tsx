import type { Metadata } from "next";
import { Journeys } from "@/components/journeys";
import { Navbar } from "@/components/navbar";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, journeySlugs, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Client Journeys",
  description:
    "A look at recent weddings styled by Himja Behl — bride trousseaux, groom edits, heritage heirlooms, and complete family wardrobes across India.",
  alternates: {
    canonical: absoluteUrl("/journeys"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/journeys"),
    title: "Client Journeys — Himja Behl",
    images: [OG_IMAGE],
  },
};

const journeysListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: journeySlugs.map((slug, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(slug),
  })),
};

export default function JourneysArchive() {
  return (
    <main className="min-h-screen bg-warm-white">
      <JsonLd data={journeysListSchema} />
      <Navbar />
      <div className="pt-24 md:pt-32">
        <Journeys />
      </div>
    </main>
  );
}