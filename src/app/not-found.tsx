import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-warm-white text-[#1A0407] px-6 text-center relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #58171f 0%, transparent 50%)'
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-dust-gold mb-6 font-semibold">
          Error 404
        </span>
        
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-[0.9] mb-8">
          Page Not<br/>Found
        </h1>
        
        <p className="font-sans font-light text-base md:text-lg text-[#1A0407]/70 max-w-md mx-auto mb-12">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          href="/"
          className="group flex items-center gap-4 bg-[#1A0407] text-warm-white px-8 py-4 rounded-none hover:bg-dust-gold hover:text-[#1A0407] transition-all duration-500 uppercase tracking-widest font-sans text-xs"
        >
          Return Home
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
        </Link>
      </div>
    </div>
  );
}
