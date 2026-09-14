import {cn} from "@/lib/utils";

type PostCoverProps = {
  readonly className?: string;
  readonly cover: string | null;
};

export function PostCover({className, cover}: PostCoverProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-primary-bg", className)}>
      {cover === null ? (
        <div aria-hidden className="h-full w-full bg-linear-to-br from-primary/30 via-primary-bg to-primary-bg" />
      ) : (
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
