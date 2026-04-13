import PublicLayout from "../../layouts/PublicLayout";
import SectionIntro from "../../components/SectionIntro";

const faqs = [
  {
    q: "How do I book a repair?",
    a: "Create an account, select your device type, describe the issue, upload an image if needed, and choose a provider."
  },
  {
    q: "Can the provider increase the repair price later?",
    a: "Yes, but the system can send a confirmation request to the user before work continues on the updated cost."
  },
  {
    q: "Can I track my repair?",
    a: "Yes. Requests move through Pending, Accepted, Price Proposed, In Progress, Completed, and Delivered."
  },
  {
    q: "Do you support disputes and support tickets?",
    a: "Yes. Users and providers can raise support issues, and admins can review and resolve them."
  }
];

const FaqPage = () => {
  return (
    <PublicLayout>
      <section className="space-y-8">
        <SectionIntro
          eyebrow="FAQ"
          title="Questions users usually ask before booking."
          text="This page gives the public site more depth and mirrors the support-first structure seen on major repair-service platforms."
        />
        <div className="grid gap-4">
          {faqs.map((item) => (
            <div key={item.q} className="surface-card p-6">
              <h3 className="text-lg font-semibold">{item.q}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default FaqPage;
