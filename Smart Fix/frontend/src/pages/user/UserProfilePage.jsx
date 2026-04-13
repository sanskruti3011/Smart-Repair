import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import api from "../../api/axios";
import UserSectionHeader from "../../components/UserSectionHeader";

const UserProfilePage = () => {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/users/profile").then(({ data }) => {
      setForm({ fullName: data.fullName || "", email: data.email || "", phone: data.phone || "", address: data.address || "" });
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.put("/users/profile", form);
    setMessage("Profile updated successfully.");
  };

  return (
    <UserLayout title="Profile" subtitle="Review and edit your customer details including name, email, and address.">
      <div className="grid gap-6 xl:grid-cols-[0.86fr,1.14fr]">
        <div className="surface-card p-8">
          <UserSectionHeader
            eyebrow="Profile"
            title="Customer profile"
            text="Keep your details up to date so providers can coordinate repairs, pickup, and delivery smoothly."
          />
          <div className="mt-8 grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Name</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{form.fullName || "Not provided"}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Email</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{form.email || "Not provided"}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Address</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{form.address || "Not provided"}</p>
            </div>
          </div>
        </div>

        <div className="surface-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="input-field" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <input className="input-field" placeholder="Email" value={form.email} disabled />
            <input className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <textarea className="input-field min-h-32" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            {message && <p className="rounded-xl bg-success/10 px-4 py-3 text-sm text-green-300">{message}</p>}
            <button type="submit" className="rounded-full bg-accent px-6 py-3 font-medium text-white">Save Profile</button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProfilePage;
