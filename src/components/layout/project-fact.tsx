type ProjectFactProps = {
  readonly label: string;
  readonly value: string;
};

export function ProjectFact({label, value}: ProjectFactProps) {
  return (
    <div className="flex gap-2">
      <dt className="font-semibold text-primary">{label}:</dt>
      <dd className="text-primary/70">{value}</dd>
    </div>
  );
}
