import { useEffect, useMemo, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import api from "../../api/axios";
import UserProviderCard from "../../components/UserProviderCard";
import UserSectionHeader from "../../components/UserSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const ServiceProvidersPage = () => {
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [filters, setFilters] = useState({ search: "", skill: "" });

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const { data } = await api.get("/providers/directory", { params: filters });
        setProviders(data.items);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [filters.search, filters.skill]);

  const skills = useMemo(() => [...new Set(providers.flatMap((provider) => provider.skills || []))], [providers]);

  if (loading) {
    return (
      <UserLayout title="Service Providers" subtitle="Browse available technicians by skill, rating, and location">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Service Providers" subtitle="Search, filter, and compare available repair providers before selecting one for your booking.">
      <div className="space-y-6">
        <UserSectionHeader
          eyebrow="Provider Directory"
          title="Service providers"
          text="Each provider card shows name, skill tags, location, experience, and star rating so you can choose the right repair expert."
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

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {providers.map((provider) => (
            <UserProviderCard key={provider._id} provider={provider} showSelectLink />
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default ServiceProvidersPage;
