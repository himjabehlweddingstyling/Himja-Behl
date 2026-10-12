import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journeys } from "@/lib/data";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { BlurImage } from "@/components/blur-image";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

// Generate static params so the pages are pre-rendered at build time
export function generateStaticParams() {
  return journeys.map((journey) => ({
    slug: journey.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const journey = journeys.find((j) => j.slug === slug);
  if (!journey) return {};

  const ogImage = {
    url: absoluteUrl(journey.image),
    width: 1200,
    height: 630,
    alt: `${journey.title} — ${journey.client}`,
  };

  return {
    title: `${journey.title}`,
    description: `${journey.client} — ${journey.context}. ${journey.description.slice(0, 150)}`,
    alternates: {
      canonical: absoluteUrl(`/journeys/${journey.slug}`),
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(`/journeys/${journey.slug}`),
      title: `${journey.title} — ${journey.client} | Himja Behl`,
      description: journey.description.slice(0, 160),
      images: [ogImage],
    },
  };
}

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const journeyIndex = journeys.findIndex((j) => j.slug === resolvedParams.slug);
  
  if (journeyIndex === -1) {
    notFound();
  }

  const journey = journeys[journeyIndex];
  
  // Find next journey for the bottom navigation
  const nextJourney = journeys[journeyIndex + 1] || journeys[0]; // Loop back to first if at the end

  const journeySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${journey.title} — ${journey.client}`,
    serviceType: "Wedding Wardrobe Styling",
    description: journey.description,
    provider: { "@id": `${SITE_URL}/#business` },
    image: absoluteUrl(journey.image),
    areaServed: { "@type": "Country", name: "India" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Client Journeys",
        item: absoluteUrl("/journeys"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: journey.client,
        item: absoluteUrl(`/journeys/${journey.slug}`),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-warm-white text-[#1A0407] selection:bg-dust-gold selection:text-maroon">
      <Navbar />
      <JsonLd data={[journeySchema, breadcrumbSchema]} />

      {/* Split Hero to prevent cropping */}
      <section className="relative w-full min-h-[70vh] bg-[#1A0407] flex flex-col md:flex-row items-center justify-center pt-32 pb-20 px-6 md:px-12 gap-12">
        <div className="w-full md:w-1/2 flex flex-col items-start md:items-center text-left md:text-center z-10 text-warm-white">
          <span className="text-dust-gold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 md:mb-6 font-semibold block">
            {journey.context}
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl uppercase tracking-tight leading-[0.9]">
            {journey.client}
          </h1>
        </div>
        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end lg:justify-center">
          <BlurImage
            src={journey.image}
            alt={journey.client}
            width={800}
            height={1200}
            className="w-full max-w-md h-auto shadow-2xl border border-white/10 object-contain"
            priority
          />
        </div>
      </section>

      {/* Content Body */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-36">
        
        {/* Style Direction Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 md:mb-24">
          {journey.tags.map(tag => (
            <span key={tag} className="text-[#1A0407] border border-[#1A0407]/20 px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold">
              {tag}
            </span>
          ))}
        </div>

        {/* Editorial Introduction */}
        <div className="max-w-3xl mx-auto mb-24 md:mb-36">
          <p className="font-sans font-light text-lg md:text-2xl leading-[1.8] md:leading-[2] text-[#1A0407]/80 text-center">
            {journey.description}
          </p>
        </div>

        {/* The Detail Sections with Contextual Photography */}
        <div className="space-y-28 md:space-y-40">
          {journey.sections.map((section, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <article 
                key={section.id} 
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 md:gap-16 lg:gap-20`}
              >
                {/* Visual Media Column */}
                <div className="w-full lg:w-7/12">
                  <div className="relative overflow-hidden bg-ivory shadow-xl border border-[#1A0407]/10 group">
                    <BlurImage
                      src={section.image}
                      alt={section.imageAlt}
                      width={1400}
                      height={1000}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                  {section.imageCaption && (
                    <div className="mt-4 flex items-baseline gap-3 text-left">
                      <span className="w-6 h-px bg-dust-gold shrink-0 self-center" />
                      <p className="font-sans text-[11px] md:text-xs text-[#1A0407]/60 tracking-wide uppercase font-light">
                        {section.imageCaption}
                      </p>
                    </div>
                  )}
                </div>

                {/* Editorial Copy Column */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-dust-gold text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold">
                      {section.number}
                    </span>
                    <span className="h-px w-8 bg-dust-gold/50" />
                    <span className="text-dust-gold text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold">
                      {section.title}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-[#1A0407] mb-6 leading-tight">
                    {section.title}
                  </h3>

                  <p className="font-sans font-light text-base md:text-lg leading-relaxed text-[#1A0407]/80">
                    {section.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Client Testimonial / Quote */}
      <section className="w-full bg-[#1A0407] text-warm-white py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-dust-gold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12 block font-semibold">
            Client Words
          </span>
          <p className="font-quote italic text-2xl md:text-3xl lg:text-4xl leading-[1.4] md:leading-[1.3] text-warm-white mb-12">
            &ldquo;{journey.quote}&rdquo;
          </p>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-warm-white/60">
            &mdash; {journey.client}
          </span>
        </div>
      </section>

      {/* Next Journey Navigation */}
      <Link href={`/journeys/${nextJourney.slug}`} className="group block">
        <section className="w-full relative h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <BlurImage
              src={nextJourney.image}
              alt={nextJourney.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-40 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-maroon/80 mix-blend-multiply" />
          </div>
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-dust-gold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 block font-semibold">
              Next Journey
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-warm-white flex items-center gap-6">
              {nextJourney.client}
              <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-dust-gold group-hover:translate-x-4 transition-transform duration-500" />
            </h2>
          </div>
        </section>
      </Link>
    </main>
  );
}
