"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const EASE_LUXE = [0.76, 0, 0.24, 1] as const;
const COVER_MS = 260;
const UNCOVER_MS = 320;

type Phase = "none" | "in" | "out";

export function RouteTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("none");
  const [token, setToken] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setToken((t) => t + 1);
    setPhase("in");

    const t = setTimeout(() => setPhase("out"), COVER_MS);
    const t2 = setTimeout(() => setPhase("none"), COVER_MS + UNCOVER_MS);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {phase !== "none" && (
        <motion.div
          key={`${token}-${phase}`}
          className="fixed inset-0 z-[90] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, #4A151C 0%, #641D26 45%, #1A0407 100%)",
            }}
            initial={{ x: phase === "in" ? "-100%" : "0%" }}
            animate={{ x: phase === "in" ? "0%" : "100%" }}
            transition={{ duration: phase === "in" ? 0.22 : 0.3, ease: EASE_LUXE, delay: phase === "out" ? 0.1 : 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}