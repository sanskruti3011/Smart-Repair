import { useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import UserSectionHeader from "../../components/UserSectionHeader";

const UserSettingsPage = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifyRequests: true,
    notifyPrices: true,
    notifyStatus: true
  });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Settings saved on the frontend. Connect backend settings endpoints to persist them.");
  };

  return (
    <UserLayout title="Settings" subtitle="Manage password preferences and customer notification settings.">
      <div className="grid gap-6 xl:grid-cols-[0.86fr,1.14fr]">
        <div className="surface-card p-8">
          <UserSectionHeader
            eyebrow="Settings"
            title="Account settings"
            text="Use this page to change your password and control whether you receive request, price, and status notifications."
          />
          <div className="mt-8 grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Security</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">Choose a strong password and update it regularly to keep your account secure.</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Notifications</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">Control which repair events you want to see in your customer workspace.</p>
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
                ["notifyRequests", "Request updates"],
                ["notifyPrices", "Price updates"],
                ["notifyStatus", "Status changes"]
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
    </UserLayout>
  );
};

export default UserSettingsPage;
