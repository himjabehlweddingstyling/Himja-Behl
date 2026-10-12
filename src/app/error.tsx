"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#1A0407] text-warm-white px-6 text-center relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #58171f 0%, transparent 60%)'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-dust-gold mb-6 font-semibold">
          System Error
        </span>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9] mb-8">
          Something<br/>Went Wrong
        </h1>
        
        <p className="font-sans font-light text-base md:text-lg text-warm-white/70 max-w-md mx-auto mb-12">
          An unexpected error occurred while loading this page. We apologize for the interruption to your experience.
        </p>
        
        <button
          onClick={() => reset()}
          className="group flex items-center gap-4 bg-dust-gold text-[#1A0407] px-8 py-4 rounded-none hover:bg-warm-white transition-all duration-500 uppercase tracking-widest font-sans text-xs"
        >
          Try Again
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
}
