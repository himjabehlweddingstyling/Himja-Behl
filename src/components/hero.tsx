"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlurImage } from "@/components/blur-image";

export function Hero() {
  return (
    <section 
      className="relative w-full min-h-[100svh] flex items-center pt-20 md:pt-0"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #58171f 0%, #4A151C 40%, #1A0407 100%)'
      }}
    >
      
      {/* Right Column: Full-bleed Absolute Image with Warm Grade */}
      <div 
        className="absolute top-0 right-0 w-full md:w-[55%] h-full z-0 hidden md:block"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 50%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%, black 100%)'
        }}
      >
        <BlurImage
          src="/himja-hero.webp"
          alt="Himja Behl in her styling studio"
          fill
          className="object-cover object-[80%_center]"
          priority
        />
        {/* Warm Maroon Duotone Overlay */}
        <div className="absolute inset-0 bg-[#4A151C] mix-blend-multiply opacity-50" />
        {/* Top gradient for navbar legibility */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#58171f]/90 to-transparent" />
      </div>

      {/* Mobile Image (Visible only on small screens) */}
      <div 
        className="absolute top-0 inset-x-0 w-full h-[50vh] z-0 md:hidden opacity-50"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%)'
        }}
      >
        <BlurImage
          src="/himja-hero.webp"
          alt="Himja Behl in her styling studio"
          fill
          className="object-cover object-[80%_center]"
          priority
        />
        <div className="absolute inset-0 bg-[#4A151C] mix-blend-multiply opacity-60" />
      </div>

      {/* Left Column: Text & CTAs perfectly aligned to global grid */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex relative z-10">
        <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col justify-center items-center md:items-start pt-24 md:pt-32 pb-20 md:pr-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-dust-gold font-sans text-[10px] md:text-xs tracking-widest mb-16 md:mb-20 uppercase font-semibold text-center md:text-left">
              BASED IN DELHI NCR — STYLING WORLDWIDE
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h1 className="text-warm-white font-display text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] tracking-tight mb-4 uppercase text-center md:text-left whitespace-nowrap">
              YOUR <span className="text-dust-gold font-display italic capitalize pr-1">Wedding.</span><br />
              YOUR <span className="text-dust-gold font-display italic capitalize pr-1">Style.</span><br />
              YOUR <span className="text-dust-gold font-display italic capitalize pr-1">Wardrobe.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="text-warm-white/80 font-sans text-base md:text-lg leading-relaxed mb-12 font-light max-w-sm text-center md:text-left text-balance">
              Wedding wardrobes, thoughtfully curated from the bride and groom to the family that celebrates with them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6 w-full mb-8 justify-center md:justify-start"
          >
            <Link
              href="#enquire"
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-dust-gold text-[#58171f] font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-warm-white w-full sm:w-auto"
            >
              <span>START YOUR ENQUIRY</span>
            </Link>
            <Link
              href="#journeys"
              className="inline-flex items-center justify-center px-8 py-4 border border-dust-gold/60 text-dust-gold font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-dust-gold/10 hover:border-dust-gold w-full sm:w-auto"
            >
              <span>VIEW PAST WEDDINGS</span>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center md:justify-start gap-3 text-dust-gold/70 text-center md:text-left"
          >
            <span className="font-sans text-[10px] tracking-widest uppercase font-semibold">
              15+ YEARS OF EXPERTISE • 200+ WEDDINGS CURATED
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
