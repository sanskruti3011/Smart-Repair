import PublicLayout from "../../layouts/PublicLayout";

const items = [
  "User registration, login, profile management, booking, tracking, notifications, and reviews",
  "Technician dashboard for quotes, status updates, pickup, repair, and dispatch management",
  "Admin analytics, dispute handling, request monitoring, and support ticket oversight",
  "JWT authentication, MongoDB data models, image uploads, and responsive React interface"
];

const DetailsPage = () => {
  return (
    <PublicLayout>
      <section className="space-y-6">
        <div className="surface-card p-8">
          <h2 className="text-3xl font-semibold">Platform</h2>
          <p className="mt-3 max-w-3xl text-sm text-[rgb(var(--color-text-soft))]">
            Smart Repair System is designed for end-to-end repair operations, from booking and approvals to technician execution and administrative supervision.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <div key={item} className="surface-card p-6">
              <p className="text-sm font-semibold text-accent">0{index + 1}</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default DetailsPage;
