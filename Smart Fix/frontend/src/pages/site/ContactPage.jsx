import PublicLayout from "../../layouts/PublicLayout";
import SectionIntro from "../../components/SectionIntro";

const ContactPage = () => {
  return (
    <PublicLayout>
      <section className="section-shell p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.82fr,1.18fr]">
          <div>
            <SectionIntro
              eyebrow="Contact Us"
              title="Talk to the team handling support, pricing questions, and repair operations."
              text="Use the contact page for booking help, service concerns, provider coordination, or platform assistance."
            />
            <div className="mt-8 grid gap-4">
              {[
                "support@smartrepairsystem.com",
                "+91 98765 43210",
                "MG Road, Bengaluru, India",
                "Monday to Saturday, 9:00 AM to 7:00 PM"
              ].map((line) => (
                <div key={line} className="metric-tile text-sm text-[rgb(var(--color-text-soft))]">
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card-soft p-7">
            <h3 className="text-2xl font-semibold tracking-tight">Send us a message</h3>
            <form className="mt-6 grid gap-4">
              <input className="input-field" placeholder="Your name" />
              <input className="input-field" placeholder="Email address" type="email" />
              <input className="input-field" placeholder="Subject" />
              <textarea className="input-field min-h-40" placeholder="How can we help you?" />
              <button type="button" className="button-primary w-fit">
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
