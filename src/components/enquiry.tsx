import { EnquiryForm } from "./enquiry-form";

export function Enquiry() {
  return (
    <section 
      id="enquire" 
      className="min-h-screen py-24 md:py-32 text-warm-white selection:bg-dust-gold selection:text-maroon relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #58171f 0%, #4A151C 40%, #1A0407 100%)'
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
          <span className="text-dust-gold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 block font-semibold">
            Private Consultation
          </span>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight leading-[0.9] mb-6 max-w-4xl mx-auto">
            Let's build your <br className="hidden md:block" />
            <span className="text-dust-gold italic">wedding wardrobe.</span>
          </h2>
          <p className="font-sans font-light text-base md:text-lg leading-[1.8] text-warm-white/70 max-w-2xl mx-auto">
            Tell me a little about your wedding, who you're looking to style, your city and your celebrations. We'll take it from there.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
