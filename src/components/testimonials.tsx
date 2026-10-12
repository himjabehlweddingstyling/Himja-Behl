"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 text-warm-white selection:bg-dust-gold selection:text-maroon overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 45%, #58171f 0%, #4A151C 40%, #1A0407 100%)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">

        {/* Eyebrow + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-dust-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-5 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] text-warm-white">
            How People <br /> Describe My Work.
          </h2>
        </motion.div>

        {/* Featured Quote */}
        <div className="border-t border-warm-white/10 pt-10 md:pt-14">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              {/* Decorative large quotation mark */}
              <div
                aria-hidden="true"
                className="font-display text-[5rem] md:text-[7rem] leading-none text-dust-gold/15 select-none -mb-6 -ml-3"
              >
                "
              </div>

              <blockquote className="font-quote italic text-2xl md:text-3xl lg:text-4xl text-warm-white leading-[1.6] mb-16 font-light">
                "{active.quote}"
              </blockquote>

              <figcaption className="flex items-center gap-6">
                <div className="w-10 h-[1px] bg-dust-gold shrink-0" />
                <div>
                  <cite className="not-italic font-sans text-xs md:text-sm uppercase tracking-[0.25em] font-semibold text-warm-white block">
                    {active.name}
                  </cite>
                  <span className="text-dust-gold text-[10px] tracking-[0.25em] uppercase font-medium mt-1 block">
                    {active.role}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Testimonial Index Grid */}
        <div className="mt-20 md:mt-32 border-t border-warm-white/10 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-warm-white/10">
          {testimonials.map((t, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                aria-selected={isActive}
                aria-label={`View testimonial from ${t.role}`}
                className={`group relative text-left p-8 transition-colors duration-500 ${
                  isActive
                    ? "bg-[#58171f]"
                    : "bg-[#1A0407] hover:bg-[#58171f]/30"
                }`}
              >
                <span className="text-warm-white/25 text-[10px] tracking-[0.3em] font-sans mb-4 block">
                  {t.id}
                </span>
                <span
                  className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold block transition-colors duration-300 ${
                    isActive ? "text-dust-gold" : "text-warm-white/60 group-hover:text-warm-white"
                  }`}
                >
                  {t.role}
                </span>
                <p className="mt-3 text-xs text-warm-white/40 leading-relaxed line-clamp-2 font-sans group-hover:text-warm-white/60 transition-colors duration-300">
                  {t.quote.slice(0, 60)}…
                </p>

                {/* Active underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-dust-gold"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
