type ComposerChipsProps = {
  readonly items: readonly string[];
  readonly onSelect: (item: string) => void;
};

export function ComposerChips({items, onSelect}: ComposerChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-2 pt-3 pb-1">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm transition-colors hover:bg-white"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
