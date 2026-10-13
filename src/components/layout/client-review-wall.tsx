import {useState} from "react";

import {cn} from "@/lib/utils";
import {ClientReviewCard} from "#/components/layout/client-review-card.tsx";
import {ClientReviewHex} from "#/components/layout/client-review-hex.tsx";
import {ClientReviewsContent} from "#/components/layout/client-reviews-content.ts";
import type {ClientReview} from "#/components/layout/client-reviews-content.ts";
import {buildWallRows} from "#/lib/review-wall.ts";

const {map, rows} = ClientReviewsContent;

type ClientReviewWallProps = {
  readonly people: readonly ClientReview[];
};

export function ClientReviewWall({people}: ClientReviewWallProps) {
  const [selectedId, setSelectedId] = useState(people[0]?.id);
  const selected = people.find((person) => person.id === selectedId) ?? people[0];
  const wallRows = buildWallRows(rows, people);

  return (
    <div className="relative w-full">
      <img
        src={map.src}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 w-[1440px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-30"
      />

      <div className="relative flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          {wallRows.map((row, rowIndex) => (
            <div key={row[0]?.index} className={cn("flex justify-center gap-x-1.5", rowIndex > 0 && "-mt-3")}>
              {row.map((cell) => (
                <ClientReviewHex
                  key={cell.index}
                  person={cell.person}
                  selected={cell.person?.id === selected?.id}
                  onSelect={(person) => setSelectedId(person.id)}
                />
              ))}
            </div>
          ))}
        </div>

        {selected ? <ClientReviewCard person={selected} /> : null}
      </div>
    </div>
  );
}
