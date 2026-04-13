import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import api from "../../api/axios";
import UserProviderCard from "../../components/UserProviderCard";
import UserSectionHeader from "../../components/UserSectionHeader";

const BookRepairPage = () => {
  const [searchParams] = useSearchParams();
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    productType: "Mobile",
    issueType: "Screen",
    description: "",
    image: null,
    address: ""
  });
  const [filters, setFilters] = useState({ search: "", skill: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProviders = async () => {
      const { data } = await api.get("/providers/directory", { params: filters });
      const selectedFromQuery = searchParams.get("provider");
      setProviders(data.items);
      setSelectedProvider((current) => {
        const fromQuery = data.items.find((provider) => provider._id === selectedFromQuery);
        if (fromQuery) return fromQuery;
        return current && data.items.some((provider) => provider._id === current._id)
          ? current
          : data.items[0] || null;
      });
    };

    loadProviders();
  }, [filters.search, filters.skill, searchParams]);

  const skills = useMemo(() => [...new Set(providers.flatMap((provider) => provider.skills || []))], [providers]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setForm((current) => ({ ...current, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const payload = new FormData();
      payload.append("productType", form.productType);
      payload.append("issueType", form.issueType);
      payload.append("description", form.description);
      payload.append("providerId", selectedProvider._id);
      payload.append("address", form.address);
      if (form.image) payload.append("image", form.image);
      await api.post("/repairs", payload, { headers: { "Content-Type": "multipart/form-data" } });
      setMessage("Repair request created successfully.");
      setForm({ productType: "Mobile", issueType: "Screen", description: "", image: null, address: "" });
      setPreview("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to create repair request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UserLayout
      title="Book Repair"
      subtitle="Create a new repair request with product details, problem summary, issue photo, provider selection, and your address."
      actions={
        <Link to="/user/providers" className="rounded-full border border-border bg-panelAlt px-5 py-3 text-sm font-medium text-[rgb(var(--color-text))]">
          Browse Providers
        </Link>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <section className="space-y-4">
          <UserSectionHeader
            eyebrow="Providers"
            title="Select a service provider"
            text="Search by skill or location, compare ratings, and choose the technician who should handle your repair request."
          />

          <div className="surface-card p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <input className="input-field" placeholder="Search by name or location" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
              <select className="input-field" value={filters.skill} onChange={(e) => setFilters({ ...filters, skill: e.target.value })}>
                <option value="">All skills</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4">
            {providers.map((provider) => (
              <UserProviderCard key={provider._id} provider={provider} onSelect={setSelectedProvider} selected={selectedProvider?._id === provider._id} />
            ))}
          </div>
        </section>

        <section className="surface-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Booking Form</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Book repair service</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <select className="input-field" value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })}>
              <option>Mobile</option>
              <option>Laptop</option>
              <option>TV</option>
              <option>Tablet</option>
              <option>Smartwatch</option>
            </select>
            <select className="input-field" value={form.issueType} onChange={(e) => setForm({ ...form, issueType: e.target.value })}>
              <option>Screen</option>
              <option>Battery</option>
              <option>Software</option>
              <option>Charging</option>
              <option>Motherboard</option>
            </select>
            <textarea className="input-field min-h-32" placeholder="Describe the issue" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <textarea className="input-field min-h-28" placeholder="Enter pickup or repair address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <label className="block rounded-xl border border-dashed border-border bg-panelAlt p-4 text-sm text-[rgb(var(--color-text-soft))]">
              Upload image
              <input type="file" accept="image/*" className="mt-3 block w-full" onChange={handleFileChange} />
            </label>
            {preview && <img src={preview} alt="Preview" className="h-44 w-full rounded-2xl object-cover" />}
            {selectedProvider && (
              <div className="rounded-xl bg-panelAlt p-4 text-sm text-[rgb(var(--color-text-soft))]">
                Selected provider: <span className="font-semibold text-[rgb(var(--color-text))]">{selectedProvider.name}</span>
              </div>
            )}
            {message && <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-sky-200">{message}</p>}
            <button type="submit" disabled={submitting || !selectedProvider} className="w-full rounded-xl bg-accent px-4 py-3 font-medium text-white">
              {submitting ? "Submitting..." : "Submit Repair Request"}
            </button>
          </form>
        </section>
      </div>
    </UserLayout>
  );
};

export default BookRepairPage;
