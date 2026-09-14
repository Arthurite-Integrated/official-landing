export type TeamMember = {
  readonly id: string;
  readonly initials: string;
  readonly name: string;
  /** Path under `public/`, e.g. "/about/team/ada.jpg". Null shows the initials panel until the photo is added. */
  readonly photo: string | null;
  readonly position: string;
  readonly quote: string;
};

const QUOTE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

export const TeamMembers: readonly TeamMember[] = [
  {id: "team-member-1", name: "Team member one", position: "Position", initials: "T1", photo: null, quote: QUOTE},
  {id: "team-member-2", name: "Team member two", position: "Position", initials: "T2", photo: null, quote: QUOTE},
  {id: "team-member-3", name: "Team member three", position: "Position", initials: "T3", photo: null, quote: QUOTE},
  {id: "team-member-4", name: "Team member four", position: "Position", initials: "T4", photo: null, quote: QUOTE},
];
