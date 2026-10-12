import {describe, expect, it} from "vite-plus/test";

import {initialsOf, toTeamMembers} from "#/components/about/team-content.ts";
import type {ApiStaff} from "#/lib/api/types.ts";

const staff: ApiStaff = {
  id: "76af23fe",
  slug: "paul-aderoju",
  name: "Paul Aderoju",
  position: "Senior Solutions Architect",
  photo: "https://cdn.arthurite.test/paul-aderoju.png",
  bio: "Cloud, AI, and business.",
  sortOrder: 0,
};

describe("initialsOf", () => {
  it("takes the first letter of every word in the name", () => {
    expect(initialsOf("Sufyan Zakariyya Sani")).toBe("SZS");
  });

  it("upper-cases the initials", () => {
    expect(initialsOf("ada okafor")).toBe("AO");
  });
});

describe("toTeamMembers", () => {
  it("quotes the staff member's bio", () => {
    expect(toTeamMembers([staff])[0]?.quote).toBe(staff.bio);
  });

  it("derives initials from the name", () => {
    expect(toTeamMembers([staff])[0]?.initials).toBe("PA");
  });

  it("orders members by their dashboard sort order", () => {
    const later = {...staff, id: "later", name: "Later Person", sortOrder: 5};
    const earlier = {...staff, id: "earlier", name: "Earlier Person", sortOrder: 1};

    expect(toTeamMembers([later, earlier]).map((member) => member.id)).toEqual(["earlier", "later"]);
  });

  it("shows the initials panel when a member has no photo", () => {
    expect(toTeamMembers([{...staff, photo: null}])[0]?.photo).toBeNull();
  });

  it("normalizes an empty string photo to null", () => {
    expect(toTeamMembers([{...staff, photo: ""}])[0]?.photo).toBeNull();
  });
});
