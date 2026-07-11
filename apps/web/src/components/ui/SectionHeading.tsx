interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-cyan-400">
        {label}
      </p>
      <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && <p className="text-lg leading-relaxed text-gray-400">{description}</p>}
    </div>
  );
}
