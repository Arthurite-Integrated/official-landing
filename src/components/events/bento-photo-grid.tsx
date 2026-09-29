import {useState} from "react";
import {ChevronLeft, ChevronRight, X} from "lucide-react";

const BENTO_SPANS = [
  "row-span-2 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-2",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
  "row-span-1 col-span-2",
] as const;

function bentoSpan(index: number): (typeof BENTO_SPANS)[number] {
  return BENTO_SPANS[index % BENTO_SPANS.length] as (typeof BENTO_SPANS)[number];
}

function LightboxCloseBtn({onClose}: {readonly onClose: () => void}) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close photo preview"
      className="absolute top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
    >
      <X className="h-5 w-5" />
    </button>
  );
}

function LightboxOverlay({
  src,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  readonly src: string;
  readonly index: number;
  readonly total: number;
  readonly onClose: () => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Event photo lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
    >
      <LightboxCloseBtn onClose={onClose} />
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous photo"
        className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-8"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <img src={src} alt={`Event showcase ${index + 1}`} className="max-h-[88vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />

      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo"
        className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-8"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
        {index + 1} / {total}
      </span>
    </div>
  );
}

function BentoCell({src, index, onOpen}: {readonly src: string; readonly index: number; readonly onOpen: (index: number) => void}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open photo ${index + 1}`}
      className={`group relative overflow-hidden rounded-2xl bg-slate-900 ${bentoSpan(index)}`}
    >
      <img
        src={src}
        alt={`Event showcase ${index + 1}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
    </button>
  );
}

function BentoGridCells({
  pageImages,
  startIndex,
  onOpen,
}: {
  readonly pageImages: readonly string[];
  readonly startIndex: number;
  readonly onOpen: (globalIdx: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 grid-flow-row-dense gap-3 sm:gap-4" style={{gridAutoRows: "200px"}}>
      {pageImages.map((src, pageIdx) => {
        const globalIdx = startIndex + pageIdx;
        return <BentoCell key={src} src={src} index={pageIdx} onOpen={() => onOpen(globalIdx)} />;
      })}
    </div>
  );
}

export function BentoPhotoGrid({images, pageSize = 25}: {readonly images: readonly string[]; readonly pageSize?: number}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(images.length / pageSize);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (safePage - 1) * pageSize;
  const pageImages = images.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <BentoGridCells pageImages={pageImages} startIndex={startIndex} onOpen={(idx) => setActiveIndex(idx)} />

      <PaginationControls
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={images.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {activeIndex !== null && (
        <LightboxOverlay
          src={images[activeIndex] ?? ""}
          index={activeIndex}
          total={images.length}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))}
          onNext={() => setActiveIndex((i) => (i === null ? 0 : (i + 1) % images.length))}
        />
      )}
    </>
  );
}

function PageNumberButtons({
  totalPages,
  currentPage,
  onPageChange,
}: {
  readonly totalPages: number;
  readonly currentPage: number;
  readonly onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({length: totalPages}, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          type="button"
          onClick={() => onPageChange(pageNum)}
          aria-label={`Page ${pageNum}`}
          aria-current={pageNum === currentPage ? "page" : undefined}
          className={`h-9 w-9 rounded-full text-xs font-bold transition-all ${
            pageNum === currentPage
              ? "bg-[#006759] text-white shadow-md dark:bg-emerald-500"
              : "border border-foreground/10 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly pageSize: number;
  readonly onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{start}</span>–<span className="font-semibold text-foreground">{end}</span>{" "}
        of <span className="font-semibold text-foreground">{totalItems}</span> photos
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex h-9 items-center gap-1 rounded-full border border-foreground/15 px-3.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        <PageNumberButtons totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex h-9 items-center gap-1 rounded-full border border-foreground/15 px-3.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
