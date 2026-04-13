import { NavLink } from "react-router-dom";

const AppSidebar = ({ links }) => (
  <aside className="surface-card w-full p-3 lg:sticky lg:top-24 lg:w-72">
    <nav className="flex gap-2 overflow-x-auto lg:flex-col">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `rounded-xl border px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "border-accent bg-accent text-white"
                : "border-transparent bg-panelAlt text-[rgb(var(--color-text-soft))] hover:border-accent hover:bg-panel"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AppSidebar;
