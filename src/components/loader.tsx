"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

const EASE_LUXE = [0.76, 0, 0.24, 1] as const;
const EASE_SIGN = [0.16, 1, 0.3, 1] as const;

const WORD_LEFT = ["H", "I", "M", "J", "A"];
const WORD_RIGHT = ["B", "E", "H", "L"];

const DISPLAY_MS = 1800;
const EXIT_S = 0.7;

// Module-level guard: survives soft (client-side) navigation, resets on hard reload.
let hasLoadedOnce = false;

export function Loader() {
  const [isLoading, setIsLoading] = useState(() => {
    // Server (SSR) must render the same output as the client's first paint
    // to avoid hydration mismatches, so it always "loads".
    if (typeof window === "undefined") return true;

    const params = new URLSearchParams(window.location.search);
    const forceShow = params.get("loader") === "1";

    if (hasLoadedOnce && !forceShow) return false;

    hasLoadedOnce = true;
    return true;
  });

  useEffect(() => {
    if (!isLoading) return;

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, DISPLAY_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] select-none"
            aria-hidden="true"
          >
            {/* Frosted stage — blurs the page behind, dissolves on exit */}
            <motion.div
              className="absolute inset-0 backdrop-blur-xl backdrop-saturate-150"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(74,21,28,0.85) 0%, rgba(26,4,7,0.92) 75%)",
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: EXIT_S, ease: "easeInOut" }}
            />

            {/* Left curtain — Warm White: parts open, glides further away on exit */}
            <motion.div
              className="absolute top-0 left-0 h-full w-[50%] bg-warm-white"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-130%" }}
              transition={{ duration: 0.4, ease: EASE_LUXE }}
            />

            {/* Right curtain — Maroon: parts open, glides further away on exit */}
            <motion.div
              className="absolute top-0 right-0 h-full w-[50%] bg-[#4A151C]"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "130%" }}
              transition={{ duration: 0.4, ease: EASE_LUXE }}
            />

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="flex items-center justify-center overflow-hidden px-6">
                {WORD_LEFT.map((letter, i) => (
                  <motion.span
                    key={`l-${i}`}
                    className="font-display text-3xl md:text-4xl lg:text-5xl text-dust-gold tracking-[0.4em] mr-[0.4em] inline-block"
                    initial={{ y: "115%", opacity: 0.6 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_SIGN, delay: 0.28 + i * 0.05 }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <span className="w-4 md:w-6" aria-hidden="true" />
                {WORD_RIGHT.map((letter, i) => (
                  <motion.span
                    key={`r-${i}`}
                    className="font-display text-3xl md:text-4xl lg:text-5xl text-dust-gold tracking-[0.4em] inline-block"
                    initial={{ y: "115%", opacity: 0.6 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_SIGN,
                      delay: 0.28 + (WORD_LEFT.length + i) * 0.05,
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Gold hairline + diamond */}
              <div className="relative flex items-center justify-center mt-6 h-6">
                <motion.div
                  className="h-[1px] bg-dust-gold/60 origin-center"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_LUXE, delay: 0.95 }}
                  style={{ width: 56 }}
                />
                <motion.div
                  className="absolute w-[7px] h-[7px] bg-dust-gold"
                  style={{ rotate: 45 }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_SIGN, delay: 1.18 }}
                />
              </div>

              {/* Tagline */}
              <motion.p
                className="font-sans text-[9px] md:text-[10px] uppercase text-warm-white/55 mt-5"
                initial={{ opacity: 0, letterSpacing: "0.3em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_SIGN, delay: 1.05 }}
                style={{ marginLeft: "0.5em" }}
              >
                Curating The Edit
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}