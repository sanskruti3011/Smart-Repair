import { useEffect, useState } from "react";
import ProviderLayout from "../../layouts/ProviderLayout";
import api from "../../api/axios";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";

const ProviderProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    skills: "",
    experience: 0
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/providers/me").then(({ data }) => {
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        location: data.location || "",
        bio: data.bio || "",
        skills: (data.skills || []).join(", "),
        experience: data.experience || 0
      });
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.put("/providers/me", form);
    setMessage("Provider profile updated.");
  };

  return (
    <ProviderLayout title="Profile" subtitle="Show your provider details, skills, experience, and location.">
      <div className="grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
        <div className="surface-card p-8">
          <ProviderSectionHeader
            eyebrow="Profile"
            title="Technician profile"
            text="Keep your service profile clear and complete so customers can trust your skills, experience, and operating area."
          />
          <div className="mt-8 grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Skills</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{form.skills || "No skills added yet"}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Experience</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{form.experience} years</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Location</p>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{form.location || "Not provided"}</p>
            </div>
          </div>
        </div>
        <div className="surface-card p-8">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="input-field" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <input className="input-field" placeholder="Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            <input className="input-field md:col-span-2" placeholder="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
            <textarea className="input-field md:col-span-2 min-h-32" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            {message && <p className="md:col-span-2 rounded-xl bg-success/10 px-4 py-3 text-sm text-green-300">{message}</p>}
            <button type="submit" className="rounded-full bg-accent px-6 py-3 font-medium text-white">Save Profile</button>
          </form>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderProfilePage;
