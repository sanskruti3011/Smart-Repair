const UserSectionHeader = ({ eyebrow, title, text, actions }) => (
  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[rgb(var(--color-text))]">{title}</h1>
      {text && <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgb(var(--color-text-soft))]">{text}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
  </div>
);

export default UserSectionHeader;
