"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { id: "home", name: "HOME", href: "/" },
  { id: "story", name: "STORY", href: "/story" },
  { id: "journeys", name: "JOURNEYS", href: "/#journeys" },
  { id: "process", name: "PROCESS", href: "/#process" },
];

const SECTION_IDS = ["story", "journeys", "process", "enquire"];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isHome = pathname === "/";
  const innerPage = !isHome;
  const isJourneyDetail = pathname.startsWith("/journeys/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const enquireEl = document.getElementById("enquire");
      if (enquireEl) {
        const rect = enquireEl.getBoundingClientRect();
        setIsOnDarkSection(rect.top <= 85 && rect.bottom >= 85);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: string | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            best = entry.target.id;
            bestRatio = entry.intersectionRatio;
          }
        }
        if (best) setActiveSection(best);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.5, 1] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const activeLinkId = (() => {
    if (pathname === "/story") return "story";
    if (pathname.startsWith("/journeys")) return "";
    if (isHome && !isScrolled) return "home";
    return activeSection ?? "home";
  })();

  const isLight = isJourneyDetail
    ? false
    : innerPage || (isScrolled && !isOnDarkSection);
  const linkColor = isLight ? "text-[#1A0407]/90 hover:text-[#1A0407]" : "text-warm-white hover:text-dust-gold";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isLight
            ? "bg-warm-white/95 backdrop-blur-md py-4 shadow-sm border-b border-dust-gold/20"
            : isOnDarkSection
              ? "bg-transparent backdrop-blur-md py-4 shadow-sm border-b border-white/10"
              : "bg-transparent py-6 bg-gradient-to-b from-[#58171f]/80 to-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className={cn(
              "font-display text-2xl md:text-3xl tracking-widest uppercase font-medium transition-colors duration-500",
              isLight ? "text-[#1A0407]" : "text-warm-white"
            )}
          >
            Himja Behl
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-9">
            {NAV_LINKS.map((link) => {
              const isActive = activeLinkId === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "relative py-1 text-xs font-sans tracking-widest transition-colors duration-500 uppercase",
                    isActive ? "text-dust-gold" : linkColor
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-dust-gold"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors duration-500",
              isLight ? "text-[#1A0407]" : "text-warm-white"
            )}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-center items-center bg-[#4A151C]"
          >
            <button
              className="absolute top-6 right-6 p-2 text-warm-white"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-8 h-8" strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeLinkId === link.id;
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "font-display text-3xl tracking-widest uppercase transition-colors",
                        isActive ? "text-dust-gold" : "text-warm-white hover:text-dust-gold"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}


            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}