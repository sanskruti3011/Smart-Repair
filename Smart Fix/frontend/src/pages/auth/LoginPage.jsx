import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDefaultRouteForUser } from "../../utils/authRouting";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await login(form);
      navigate(getDefaultRouteForUser(response.user), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundImage: "var(--page-gradient)" }}>
      <div className="w-full max-w-md rounded-3xl border border-border bg-panel p-8 shadow-panel">
        <div className="mb-6 flex flex-wrap gap-2 text-xs text-[rgb(var(--color-text-soft))]">
          <Link to="/" className="rounded-full bg-panelAlt px-3 py-2">Home</Link>
          <Link to="/platform" className="rounded-full bg-panelAlt px-3 py-2">Platform</Link>
          <Link to="/about" className="rounded-full bg-panelAlt px-3 py-2">About Us</Link>
          <Link to="/contact" className="rounded-full bg-panelAlt px-3 py-2">Contact Us</Link>
        </div>
        <h1 className="text-3xl font-semibold text-[rgb(var(--color-text))]">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">Sign in once and the system will open the correct user, provider, or admin workspace automatically.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input type="email" placeholder="Email" className="w-full rounded-xl border border-border bg-panelAlt px-4 py-3 text-[rgb(var(--color-text))] outline-none" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" className="w-full rounded-xl border border-border bg-panelAlt px-4 py-3 text-[rgb(var(--color-text))] outline-none" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-red-300">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent px-4 py-3 font-medium text-white transition hover:bg-sky-500 disabled:opacity-70">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-6 flex justify-between text-sm text-muted">
          <Link to="/signup" className="text-accent">Create user account</Link>
          <Link to="/provider-signup" className="text-accent">Join as provider</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
