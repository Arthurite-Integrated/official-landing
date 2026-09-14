import type {BlogCategory} from "#/lib/blog/categories.ts";
import {formatPostDate} from "#/lib/blog/format-post-date.ts";

type PostMetaProps = {
  readonly category: BlogCategory;
  readonly date: string;
};

export function PostMeta({category, date}: PostMetaProps) {
  return (
    <p className="flex items-center gap-2 text-sm text-foreground/60">
      <span className="font-medium text-primary">{category}</span>
      <span aria-hidden>·</span>
      <time dateTime={date}>{formatPostDate(date)}</time>
    </p>
  );
}
