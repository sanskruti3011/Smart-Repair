import { ArrowRight, BadgeCheck, Clock3, Cpu, Laptop, ShieldCheck, Smartphone, Star, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import SectionIntro from "../../components/SectionIntro";

const stats = [
  { label: "Tracked jobs", value: "12k+", text: "Repair requests handled through status-based workflow." },
  { label: "Response speed", value: "< 15m", text: "Technician acceptance and pricing updates visible quickly." },
  { label: "Cities", value: "28", text: "Service operations ready to scale across markets and teams." }
];

const workflow = [
  { step: "01", title: "Create the request", text: "Capture the device type, problem details, and image proof in one booking flow." },
  { step: "02", title: "Choose the right technician", text: "Filter providers by skills, location, and experience before assigning the job." },
  { step: "03", title: "Approve pricing changes", text: "If repair scope expands, users can approve or reject revised costs directly." },
  { step: "04", title: "Track delivery status", text: "Every update moves through a clear timeline from request to return dispatch." }
];

const platformCards = [
  { title: "Customer control", text: "Booking, issue history, image uploads, review flow, and real-time notifications.", icon: ShieldCheck },
  { title: "Technician operations", text: "Incoming jobs, acceptance, quote setting, dispatch handling, and work progress updates.", icon: Wrench },
  { title: "Admin oversight", text: "Analytics, dispute visibility, support tickets, provider supervision, and request monitoring.", icon: BadgeCheck }
];

const serviceGroups = [
  { title: "Mobile Repairs", icon: Smartphone, items: ["Display and glass replacement", "Battery health and power faults", "Charging port and speaker issues", "Water damage diagnostics"] },
  { title: "Laptop Repairs", icon: Laptop, items: ["Keyboard and trackpad faults", "Thermal servicing and fan cleanup", "Board-level diagnostics", "Display, hinge, and webcam repairs"] },
  { title: "Advanced Device Care", icon: Cpu, items: ["Tablet and wearable repairs", "Data-safe diagnostics workflow", "Insurance-friendly issue documentation", "Priority support handling"] }
];

const pricingPlans = [
  { title: "Diagnostic Start", price: "Rs. 299", text: "For quick issue confirmation, technician review, and repair estimation.", points: ["Problem assessment", "Device intake notes", "Initial service quote"] },
  { title: "Standard Repair", price: "From Rs. 999", text: "For typical screen, battery, keyboard, and hardware repair journeys.", points: ["Status tracking", "Cost confirmation", "Completion and handover"] },
  { title: "Priority Repair", price: "Custom", text: "For urgent business or premium support cases that need closer follow-up.", points: ["Faster response", "Priority queue", "Dedicated support coordination"] }
];

const faqs = [
  { q: "Can I compare technicians before choosing one?", a: "Yes. The booking flow is designed to surface provider profiles with skills, location, experience, and ratings before you assign the request." },
  { q: "What happens if the cost changes after inspection?", a: "The provider can submit a revised cost, and the user receives a confirmation request before the repair continues." },
  { q: "Does the platform support multiple roles?", a: "Yes. It includes separate user, service provider, and admin workflows with role-based access and dashboards." }
];

const HomePage = () => {
  return (
    <PublicLayout>
      <section id="home" className="grid scroll-mt-28 gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="section-shell subtle-grid halo-card p-8 sm:p-12">
          <div className="max-w-4xl">
            <span className="metric-kicker">Smart Repair Operating Layer</span>
            <h2 className="mt-6 max-w-5xl display-title">
              Repair service UI that feels premium, fast, and controlled.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[rgb(var(--color-text-soft))]">
              Smart Repair System gives customers, technicians, and administrators one coordinated workspace for booking, diagnosis, approvals, status tracking, and support resolution.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/login" className="button-primary">
                Open Dashboard
              </Link>
              <a href="#platform" className="button-secondary">
                Explore the platform
              </a>
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="metric-tile">
                <p className="metric-kicker">{item.label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight">{item.value}</p>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="section-shell p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="metric-kicker">Live System Snapshot</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight">Repair flow at a glance</h3>
              </div>
              <Clock3 className="text-accent" size={24} />
            </div>
            <div className="mt-8 grid gap-4">
              {[
                { label: "Pending pickup", value: "126" },
                { label: "In progress", value: "84" },
                { label: "Awaiting approval", value: "19" }
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-border bg-panelAlt/85 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-[rgb(var(--color-text-soft))]">{item.label}</p>
                    <p className="text-2xl font-semibold">{item.value}</p>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-[rgb(var(--color-border))]/60">
                    <div className="h-2 rounded-full bg-accent" style={{ width: item.label === "Pending pickup" ? "74%" : item.label === "In progress" ? "56%" : "28%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="section-shell p-7">
            <p className="metric-kicker">Why it works</p>
            <div className="mt-6 grid gap-4">
              {[
                "Clear handoff between user, provider, and admin",
                "Notifications and approvals reduce confusion",
                "Modern dashboard UI for every role"
              ].map((line) => (
                <div key={line} className="flex items-start gap-3 rounded-[22px] bg-panelAlt/85 px-4 py-4">
                  <Star className="mt-0.5 text-accent" size={18} />
                  <p className="text-sm leading-7 text-[rgb(var(--color-text-soft))]">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 section-shell p-8 sm:p-10">
        <div className="grid gap-6 xl:grid-cols-[0.86fr,1.14fr] xl:items-end">
          <SectionIntro
            eyebrow="Workflow"
            title="The service journey is visible from first request to final return."
            text="Instead of spreading updates across calls, spreadsheets, and chat messages, the platform makes each repair stage explicit and trackable."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {workflow.map((item) => (
              <div key={item.step} className="metric-tile">
                <p className="metric-kicker">Step {item.step}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="mt-16 scroll-mt-28 section-shell p-8 sm:p-10">
        <SectionIntro
          eyebrow="Platform"
          title="One connected control layer for the entire repair operation."
          text="The experience is designed to feel less like a basic service form and more like an operating system for device support."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {platformCards.map(({ title, text, icon: Icon }) => (
            <div key={title} className="metric-tile">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mt-16 scroll-mt-28 section-shell p-8 sm:p-10">
        <div className="grid gap-8 xl:grid-cols-[0.86fr,1.14fr]">
          <SectionIntro
            eyebrow="Services"
            title="Organized around real repair categories instead of generic forms."
            text="The UI supports issue description, image uploads, device-specific service types, and provider matching without forcing users through unclear options."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {serviceGroups.map(({ title, items, icon: Icon }) => (
              <div key={title} className="surface-card-soft p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>
                <div className="mt-5 space-y-3">
                  {items.map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-panel px-4 py-3 text-sm text-[rgb(var(--color-text-soft))]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mt-16 scroll-mt-28 section-shell p-8 sm:p-10">
        <SectionIntro
          eyebrow="Pricing"
          title="Transparent pricing that supports trust before repair work expands."
          text="Every plan is built around diagnostics, technician review, and explicit cost visibility so users stay in control throughout the service journey."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.title}
              className={`surface-card-soft p-6 ${index === 1 ? "border-accent shadow-[0_22px_70px_rgba(8,145,178,0.16)]" : ""}`}
            >
              <p className="metric-kicker">{plan.title}</p>
              <h3 className="mt-4 text-4xl font-semibold tracking-tight">{plan.price}</h3>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{plan.text}</p>
              <div className="mt-6 space-y-3">
                {plan.points.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm text-[rgb(var(--color-text-soft))]">
                    <ArrowRight size={16} className="text-accent" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-16 scroll-mt-28 section-shell p-8 sm:p-10">
        <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
          <SectionIntro
            eyebrow="FAQ"
            title="Answers that remove friction before users even log in."
            text="The public experience now carries enough detail to explain how the system works without forcing people to guess what happens next."
          />
          <div className="grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="metric-tile">
                <h3 className="text-xl font-semibold tracking-tight">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
