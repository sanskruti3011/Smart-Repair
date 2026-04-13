import { useState } from "react";
import ProviderLayout from "../../layouts/ProviderLayout";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";

const ProviderSettingsPage = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifyRequests: true,
    notifyPricing: true,
    notifyStatus: true
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Settings saved on the frontend. Connect backend settings endpoints to persist them.");
  };

  return (
    <ProviderLayout title="Settings" subtitle="Manage password preferences and technician notification settings.">
      <div className="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
        <div className="surface-card p-8">
          <ProviderSectionHeader
            eyebrow="Settings"
            title="Account settings"
            text="This page includes a change password form and notification toggles for incoming requests, pricing changes, and job status updates."
          />
          <div className="mt-8 grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Security</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">Use a strong password and rotate credentials regularly to protect your provider account.</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Notifications</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">Enable alerts so you do not miss new requests, price approvals, or status changes.</p>
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
                ["notifyRequests", "New repair requests"],
                ["notifyPricing", "Price approval updates"],
                ["notifyStatus", "Repair status changes"]
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
            <button type="submit" className="rounded-full bg-accent px-6 py-3 font-medium text-white">Save Settings</button>
          </form>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderSettingsPage;
