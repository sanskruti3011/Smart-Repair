import PublicLayout from "../../layouts/PublicLayout";
import SectionIntro from "../../components/SectionIntro";

const AboutPage = () => {
  return (
    <PublicLayout>
      <section className="section-shell p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr,1.08fr]">
          <div>
            <SectionIntro
              eyebrow="About Us"
              title="We built Smart Repair System to make repair workflows feel more trustworthy."
              text="Customers need clarity, technicians need structured operations, and administrators need a single view of service health. The product is designed around that operational reality."
            />
            <div className="mt-8 metric-tile">
              <p className="metric-kicker">Our goal</p>
              <p className="mt-3 text-lg leading-8 text-[rgb(var(--color-text-soft))]">
                Turn fragmented repair communication into one clean workflow with visible pricing, status updates, and accountable service execution.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Transparency", "Status tracking and price approval keep every repair visible."],
              ["Efficiency", "Provider dashboards reduce manual follow-up and missed updates."],
              ["Support", "Integrated ticketing helps admins resolve delays and disputes quickly."],
              ["Scalability", "The platform is structured to grow across cities, teams, and device categories."]
            ].map(([title, text]) => (
              <div key={title} className="metric-tile">
                <p className="text-lg font-semibold">{title}</p>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
