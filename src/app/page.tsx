import type { Metadata } from "next";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Marquee } from "@/components/marquee";
import { Journeys } from "@/components/journeys";
import { Process } from "@/components/process";
import { Enquiry } from "@/components/enquiry";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, OG_IMAGE, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Himja Behl — Premium Wedding Styling & Wardrobe Curation",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "Himja Behl — Premium Wedding Styling & Wardrobe Curation",
    images: [OG_IMAGE],
  },
};

const homeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Premium Wedding Styling & Wardrobe Curation",
  serviceType: "Wedding Styling",
  description:
    "Curated, intentional wedding wardrobes — from the bride and groom to their immediate family, every look considered with intention across the full celebration.",
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: [
    { "@type": "City", name: "New Delhi" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "Country", name: "India" },
  ],
  image: absoluteUrl("/og.jpg"),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-warm-white selection:bg-maroon selection:text-warm-white">
      <JsonLd data={homeServiceSchema} />
      <Loader />
      <Navbar />
      <Hero />
      <Story />
      <Marquee />
      <Journeys />
      <Process />
      <Enquiry />
      <Footer />
    </main>
  );
}