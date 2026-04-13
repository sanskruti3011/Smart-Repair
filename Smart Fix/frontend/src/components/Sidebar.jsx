import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => (
  <aside className="w-full rounded-2xl border border-border bg-panel p-3 shadow-panel lg:w-72">
    <nav className="flex gap-2 overflow-x-auto lg:flex-col">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive ? "bg-accent text-white" : "bg-panelAlt text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
