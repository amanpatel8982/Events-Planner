const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  className = "",
}) => {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div
      className={[
        "flex max-w-3xl flex-col",
        alignment,
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3">
          <span
            className="h-px w-8 shrink-0 bg-[var(--brass)]"
            aria-hidden="true"
          />
          <p
            className={[
              "eyebrow",
              invert ? "text-white/70" : "text-[var(--rose)]",
            ].join(" ")}
          >
            {eyebrow}
          </p>
        </div>
      )}

      <h2
        className={[
          "display-title text-3xl leading-tight sm:text-4xl lg:text-5xl",
          invert ? "text-white" : "text-[var(--ink)]",
        ].join(" ")}
        style={invert ? { color: "white" } : undefined}
      >
        {title}
      </h2>

      {description && (
        <p
          className={[
            "mt-5 max-w-2xl text-base leading-7 sm:text-lg",
            invert ? "text-white/70" : "text-[var(--muted)]",
          ].join(" ")}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
