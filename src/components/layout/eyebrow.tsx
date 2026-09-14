type EyebrowProps = {
  readonly label: string;
};

export function Eyebrow({label}: EyebrowProps) {
  return (
    <span className="inline-flex items-center gap-2 px-1">
      <span aria-hidden className="size-[7px] rounded-full bg-primary ring-4 ring-primary/20" />
      <span className="text-xs font-medium tracking-[0.01em] text-primary">{label}</span>
    </span>
  );
}
