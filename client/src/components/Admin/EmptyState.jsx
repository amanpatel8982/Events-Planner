const EmptyState = (props) => {
  const Icon = props.icon;

  return (
    <div className="grid min-h-64 place-items-center px-5 py-12 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[#edf2ee] text-[var(--sage)]">
          <Icon size={23} />
        </span>
        <h3 className="mt-5 font-serif text-2xl">{props.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{props.description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
