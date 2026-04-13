const SectionIntro = ({ eyebrow, title, text, align = "left" }) => (
  <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    {eyebrow && (
      <span className="rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
        {eyebrow}
      </span>
    )}
    <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h2>
    {text && <p className="mt-4 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{text}</p>}
  </div>
);

export default SectionIntro;
