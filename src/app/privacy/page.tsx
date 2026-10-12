export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Himja Behl website.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-warm-white text-[#1A0407] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto font-sans">
        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-widest mb-12 border-b border-dust-gold/30 pb-6">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 font-light leading-relaxed text-sm md:text-base text-[#1A0407]/80">
          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">1. Information We Collect</h2>
            <p>When you submit an enquiry through our website, we collect personal information such as your name, email address, phone number, wedding dates, and event details. This information is exclusively used to understand your styling needs and to communicate with you regarding our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">2. How We Use Your Information</h2>
            <p>We use the information you provide to respond to your inquiries, schedule consultations, and curate customized wardrobe proposals. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">3. Data Security</h2>
            <p>We implement standard security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">4. Cookies</h2>
            <p>Our website may use standard "cookies" to enhance user experience, analyze site traffic, and understand where our audience is coming from. You may choose to set your web browser to refuse cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">5. Contact Us</h2>
            <p>If you have any questions regarding this privacy policy, you may contact us at himjabehlweddingstyling@gmail.com.</p>
          </section>

          <p className="pt-8 text-xs text-[#1A0407]/50 uppercase tracking-widest">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
