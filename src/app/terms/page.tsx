export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for Himja Behl wedding styling services.",
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-warm-white text-[#1A0407] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto font-sans">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-widest mb-12 border-b border-dust-gold/30 pb-6">
          Terms of Service
        </h1>
        
        <div className="space-y-8 font-light leading-relaxed text-sm md:text-base text-[#1A0407]/80">
          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using the services provided by Himja Behl ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">2. Services & Consultation</h2>
            <p>Himja Behl provides premium wedding styling and wardrobe curation. All consultation fees, styling packages, and deliverables will be explicitly defined in a signed client agreement before the commencement of any work.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">3. Payments & Retainers</h2>
            <p>A non-refundable retainer is required to secure our services for your wedding dates. Final payments must be cleared as per the schedule outlined in your individual styling contract.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">4. Cancellations</h2>
            <p>In the event of a cancellation by the client, the initial retainer remains non-refundable due to the blocking of dates and turning away of other potential clients. Custom or sourced garments cannot be refunded once production or purchase has commenced.</p>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">5. Intellectual Property</h2>
            <p>All content on this website, including styling concepts, imagery, text, and branding, is the intellectual property of Himja Behl and may not be reproduced without explicit written consent.</p>
          </section>

          <p className="pt-8 text-xs text-[#1A0407]/50 uppercase tracking-widest">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
