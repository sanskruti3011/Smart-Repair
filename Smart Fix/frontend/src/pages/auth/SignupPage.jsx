import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDefaultRouteForUser } from "../../utils/authRouting";

const SignupPage = ({ providerMode = false }) => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState(
    providerMode
      ? { name: "", email: "", password: "", phone: "", skills: "", experience: "", location: "", bio: "" }
      : { fullName: "", email: "", password: "", phone: "", address: "" }
  );
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await register({ ...form, accountType: providerMode ? "provider" : "user" });
      navigate(getDefaultRouteForUser(response.user), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10" style={{ backgroundImage: "var(--page-gradient)" }}>
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-panel p-8 shadow-panel">
        <div className="mb-6 flex flex-wrap gap-2 text-xs text-[rgb(var(--color-text-soft))]">
          <Link to="/" className="rounded-full bg-panelAlt px-3 py-2">Home</Link>
          <Link to="/platform" className="rounded-full bg-panelAlt px-3 py-2">Platform</Link>
          <Link to="/about" className="rounded-full bg-panelAlt px-3 py-2">About Us</Link>
          <Link to="/contact" className="rounded-full bg-panelAlt px-3 py-2">Contact Us</Link>
        </div>
        <h1 className="text-3xl font-semibold text-[rgb(var(--color-text))]">{providerMode ? "Register service provider" : "Create your account"}</h1>
        <p className="mt-2 text-sm text-muted">{providerMode ? "Set up your technician profile." : "Start booking and tracking repairs."}</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          {providerMode ? (
            <>
              <input className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input-field" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <input className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="input-field" placeholder="Skills (comma separated)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
              <input className="input-field" placeholder="Experience in years" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
              <input className="input-field md:col-span-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <textarea className="input-field md:col-span-2 min-h-28" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </>
          ) : (
            <>
              <input className="input-field" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input-field" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <input className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <textarea className="input-field md:col-span-2 min-h-28" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </>
          )}
          {error && <p className="md:col-span-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-red-300">{error}</p>}
          <button type="submit" disabled={loading} className="rounded-xl bg-accent px-4 py-3 font-medium text-white">
            {loading ? "Please wait..." : providerMode ? "Create provider account" : "Create account"}
          </button>
          <Link to="/login" className="rounded-xl border border-border px-4 py-3 text-center text-sm text-[rgb(var(--color-text-soft))]">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
