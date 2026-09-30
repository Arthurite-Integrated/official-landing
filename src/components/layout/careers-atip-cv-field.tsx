import {CV_HINT} from "#/lib/cv-file.ts";

export function AtipCvField({onChange}: {readonly onChange: (file: File | null) => void}) {
  return (
    <div>
      <label htmlFor="cv" className="block text-xs font-semibold tracking-wider text-foreground/80 uppercase">
        CV (optional, {CV_HINT})
      </label>
      <input
        id="cv"
        type="file"
        accept=".pdf,.docx"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        className="mt-2 block w-full text-sm text-foreground/70 file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-5 file:py-2.5 file:text-xs file:font-semibold file:text-primary hover:file:bg-primary/20"
      />
    </div>
  );
}
