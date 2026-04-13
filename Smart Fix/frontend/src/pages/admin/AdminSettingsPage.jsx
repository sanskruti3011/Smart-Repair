import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AdminSectionHeader from "../../components/AdminSectionHeader";

const AdminSettingsPage = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    maintenanceMode: false,
    emailAlerts: true,
    autoAssign: false
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Admin settings saved on the frontend.");
  };

  return (
    <AdminLayout title="Settings" subtitle="Manage password and basic system settings from the admin workspace.">
      <div className="grid gap-6 xl:grid-cols-[0.86fr,1.14fr]">
        <div className="surface-card p-8">
          <AdminSectionHeader
            eyebrow="Settings"
            title="System settings"
            text="This page includes a change password form and admin system toggles such as maintenance mode and alerts."
          />
          <div className="mt-8 grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Security</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">Use strong admin credentials and rotate passwords regularly for platform security.</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">System controls</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">Adjust frontend system toggles for maintenance mode, email alerts, and assignment behavior.</p>
            </div>
          </div>
        </div>

        <div className="surface-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="input-field" type="password" placeholder="Current password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
              <input className="input-field" type="password" placeholder="New password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
              <input className="input-field md:col-span-2" type="password" placeholder="Confirm new password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
            </div>

            <div className="space-y-3">
              {[
                ["maintenanceMode", "Maintenance mode"],
                ["emailAlerts", "Email alerts"],
                ["autoAssign", "Auto assign requests"]
              ].map(([key, label]) => (
                <label key={key} className="flex items-center justify-between rounded-[22px] bg-panelAlt px-4 py-4 text-sm text-[rgb(var(--color-text-soft))]">
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                    className="h-4 w-4 accent-[rgb(var(--color-accent))]"
                  />
                </label>
              ))}
            </div>

            {message && <p className="rounded-xl bg-success/10 px-4 py-3 text-sm text-green-300">{message}</p>}
            <button type="submit" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white">Save Settings</button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
