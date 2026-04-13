import PublicLayout from "../../layouts/PublicLayout";
import SectionIntro from "../../components/SectionIntro";

const plans = [
  {
    title: "Basic Diagnostics",
    price: "Rs. 299",
    text: "Initial assessment and issue confirmation before repair.",
    bullets: ["Problem verification", "Technician estimate", "Repair recommendation"]
  },
  {
    title: "Standard Repair",
    price: "From Rs. 999",
    text: "Most common device issues handled with quote approval workflow.",
    bullets: ["Status tracking", "Provider selection", "Price confirmation for changes"]
  },
  {
    title: "Priority Service",
    price: "Custom",
    text: "Fast turnaround for urgent jobs and business-critical devices.",
    bullets: ["Priority scheduling", "Dedicated updates", "Escalated support handling"]
  }
];

const PricingPage = () => {
  return (
    <PublicLayout>
      <section className="space-y-8">
        <SectionIntro
          eyebrow="Pricing"
          title="Clear pricing before work progresses."
          text="Inspired by current repair-service patterns, the public site now emphasizes diagnostics, estimated cost visibility, and approval before higher charges are applied."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.title} className="surface-card p-6">
              <p className="text-sm font-semibold text-accent">{plan.title}</p>
              <h3 className="mt-4 text-3xl font-semibold">{plan.price}</h3>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{plan.text}</p>
              <div className="mt-6 space-y-3">
                {plan.bullets.map((bullet) => (
                  <div key={bullet} className="rounded-2xl bg-panelAlt px-4 py-3 text-sm text-[rgb(var(--color-text-soft))]">
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default PricingPage;
