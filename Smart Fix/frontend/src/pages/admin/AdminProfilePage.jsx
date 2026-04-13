import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../layouts/AdminLayout";
import AdminSectionHeader from "../../components/AdminSectionHeader";

const AdminProfilePage = () => {
  const { authUser, setAuthUser } = useAuth();
  const [form, setForm] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || ""
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuthUser?.({ ...authUser, fullName: form.fullName });
    setMessage("Admin profile updated on the frontend.");
  };

  return (
    <AdminLayout title="Profile" subtitle="View and edit admin identity details.">
      <div className="grid gap-6 xl:grid-cols-[0.86fr,1.14fr]">
        <div className="surface-card p-8">
          <AdminSectionHeader
            eyebrow="Profile"
            title="Admin profile"
            text="This page displays the current admin identity and provides a simple edit form for the frontend module."
          />
          <div className="mt-8 grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Name</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{form.fullName || "Not provided"}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Email</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{form.email || "Not provided"}</p>
            </div>
          </div>
        </div>

        <div className="surface-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="input-field" placeholder="Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <input className="input-field" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {message && <p className="rounded-xl bg-success/10 px-4 py-3 text-sm text-green-300">{message}</p>}
            <button type="submit" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white">Save Profile</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
