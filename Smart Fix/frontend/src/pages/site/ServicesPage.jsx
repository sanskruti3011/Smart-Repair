import PublicLayout from "../../layouts/PublicLayout";
import SectionIntro from "../../components/SectionIntro";

const serviceGroups = [
  {
    title: "Mobile Repairs",
    items: ["Screen replacement", "Battery replacement", "Charging port issues", "Water damage diagnostics"]
  },
  {
    title: "Laptop Repairs",
    items: ["Keyboard and trackpad issues", "Motherboard diagnostics", "Thermal and fan issues", "Display replacement"]
  },
  {
    title: "Tablet and Wearables",
    items: ["Touch and display faults", "Battery and power issues", "Button or sensor problems", "Software restore"]
  }
];

const ServicesPage = () => {
  return (
    <PublicLayout>
      <section className="space-y-8">
        <SectionIntro
          eyebrow="Services"
          title="Repair services built for speed, clarity, and trust."
          text="Book a technician, describe the issue, approve quotes, and track each job across pickup, repair, completion, and delivery."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {serviceGroups.map((group) => (
            <div key={group.title} className="surface-card p-6">
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <div className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <div key={item} className="rounded-2xl bg-panelAlt px-4 py-3 text-sm text-[rgb(var(--color-text-soft))]">
                    {item}
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

export default ServicesPage;
