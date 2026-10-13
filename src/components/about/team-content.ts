import type {ApiStaff} from "#/lib/api/types.ts";
import {initialsOf} from "#/lib/initials.ts";

export type TeamMember = {
  readonly id: string;
  readonly initials: string;
  readonly name: string;
  /** Null shows the initials panel instead of a photo. */
  readonly photo: string | null;
  readonly position: string;
  readonly quote: string;
};

export function toTeamMembers(staff: readonly ApiStaff[]): readonly TeamMember[] {
  return [...staff]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((member) => ({
      id: member.id,
      initials: initialsOf(member.name),
      name: member.name,
      photo: member.photo || null,
      position: member.position,
      quote: member.bio,
    }));
}
