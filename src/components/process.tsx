"use client";

import { motion } from "framer-motion";
import { BlurImage } from "@/components/blur-image";

const stages = [
  {
    number: "01",
    title: "Understand",
    description: "We begin with you: your wedding, functions, personal style, proportions, colour preferences, budget and the way you want to feel. The goal is clarity before we look at a single outfit.",
    image: "/himja-process-discover.webp",
    imageAlt: "Himja Behl sketching a styling concept on iPad"
  },
  {
    number: "02",
    title: "Build the Direction",
    description: "I shape the visual language of your wardrobe — silhouettes, colours, designers, references and how each function should feel. If I'm styling more than one family member, this is also where the larger wedding story begins to come together.",
    image: "/himja-process-curate.webp",
    imageAlt: "Himja Behl curating garments at a clothing rack"
  },
  {
    number: "03",
    title: "Curate & Shop",
    description: "The search becomes focused. I shortlist, source and edit the options worth your time, through virtual curation or in-person shopping. We refine outfits, customisation, fittings and selections until the wardrobe feels right — not simply finished.",
    image: "/himja-process-shop.webp",
    imageAlt: "Himja Behl examining bespoke embroidery and textile swatches"
  },
  {
    number: "04",
    title: "Style Head to Toe",
    description: "Once the clothes are locked, we complete the look: jewellery, shoes, drapes, accessories, hair and makeup direction, and the small styling decisions that change how an outfit finally reads. You walk into the wedding knowing the entire look has been considered.",
    image: "/himja-process-style.webp",
    imageAlt: "Bespoke bridal polki and emerald jewelry styling flatlay"
  }
];

export function Process() {
  return (
    <section id="process" className="bg-warm-white pt-12 md:pt-24 pb-24 md:pb-48 text-[#1A0407] selection:bg-dust-gold selection:text-maroon">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row relative">
        
        {/* Sticky Left Column */}
        <div className="w-full md:w-1/3 mb-16 md:mb-0">
          <div className="sticky top-32">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-dust-gold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 block font-semibold"
            >
              The Methodology
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.9]"
            >
              How We Work
            </motion.h2>
          </div>
        </div>

        {/* Scrolling Right Column (The Stages) */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="border-t border-[#1A0407]/20 w-full" />
          
          {stages.map((stage, index) => (
            <motion.div 
              key={stage.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-12 py-16 md:py-24 border-b border-[#1A0407]/20"
            >
              {/* Massive Stage Number */}
              <div className="w-full md:w-1/4 flex-shrink-0">
                <span className="font-display text-6xl md:text-7xl lg:text-8xl text-dust-gold/40 group-hover:text-dust-gold transition-colors duration-500 leading-none block">
                  {stage.number}
                </span>
              </div>
              
              {/* Stage Content */}
              <div className="w-full md:w-3/4 flex flex-col justify-center gap-8">
                <div>
                  <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-6">
                    {stage.title}
                  </h3>
                  <p className="font-sans font-light text-base md:text-lg leading-[1.8] text-[#1A0407]/70 max-w-xl">
                    {stage.description}
                  </p>
                </div>
                {stage.image && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden border border-dust-gold/15">
                    <BlurImage
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
