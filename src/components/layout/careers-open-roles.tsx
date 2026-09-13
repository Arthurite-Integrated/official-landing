import {Search} from "lucide-react";
import {useMemo, useState} from "react";

import {cn} from "@/lib/utils";
import {OPEN_ROLES, ROLE_CATEGORIES, ROLE_LOCATIONS} from "#/components/layout/careers-data.ts";
import type {RoleCategory} from "#/components/layout/careers-data.ts";
import {CareersRoleRow} from "#/components/layout/careers-role-card.tsx";

const SECTION_TITLE_ID = "open-roles";

type RoleSidebarProps = {
  readonly activeCategory: RoleCategory | null;
  readonly onSelectCategory: (category: RoleCategory | null) => void;
};

function RoleSidebar({activeCategory, onSelectCategory}: RoleSidebarProps) {
  return (
    <nav aria-label="Role categories" className="hidden lg:block lg:w-48 xl:w-56">
      <div className="sticky top-32 space-y-1">
        {ROLE_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(activeCategory === category ? null : category)}
            className={cn(
              "block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200",
              activeCategory === category
                ? "border-l-2 border-emerald-400 bg-white/5 font-medium text-white"
                : "border-l-2 border-transparent text-white/50 hover:text-white/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}

type RoleSearchBarProps = {
  readonly searchQuery: string;
  readonly onSearchChange: (value: string) => void;
  readonly locationFilter: string;
  readonly onLocationChange: (value: string) => void;
};

function RoleSearchBar({searchQuery, onSearchChange, locationFilter, onLocationChange}: RoleSearchBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search job titles..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
        />
      </div>
      <select
        value={locationFilter}
        onChange={(event) => onLocationChange(event.target.value)}
        aria-label="Filter by location"
        className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
      >
        <option value="">All locations</option>
        {ROLE_LOCATIONS.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}

type GroupedDepartment = {
  readonly department: string;
  readonly roles: typeof OPEN_ROLES;
};

type GroupedRoles = {
  readonly category: RoleCategory;
  readonly departments: readonly GroupedDepartment[];
};

function groupRolesByCategory(roles: typeof OPEN_ROLES): readonly GroupedRoles[] {
  const grouped = new Map<RoleCategory, Map<string, (typeof OPEN_ROLES)[number][]>>();

  for (const role of roles) {
    if (!grouped.has(role.category)) {
      grouped.set(role.category, new Map());
    }
    const departments = grouped.get(role.category)!;
    if (!departments.has(role.department)) {
      departments.set(role.department, []);
    }
    departments.get(role.department)!.push(role);
  }

  return ROLE_CATEGORIES.filter((cat) => grouped.has(cat)).map((category) => ({
    category,
    departments: [...grouped.get(category)!.entries()].map(([department, roles]) => ({
      department,
      roles,
    })),
  }));
}

type RoleListingProps = {
  readonly groups: readonly GroupedRoles[];
};

function RoleListing({groups}: RoleListingProps) {
  if (groups.length === 0) {
    return <p className="py-16 text-center text-sm text-white/40">No roles match your current filters.</p>;
  }

  return (
    <>
      {groups.map((group) => (
        <div key={group.category} className="mb-12">
          <h3 className="border-b border-white/10 pb-4 text-xl font-medium tracking-tight text-white sm:text-2xl">{group.category}</h3>

          {group.departments.map((dept) => (
            <div key={dept.department} className="mt-6">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-emerald-400/80 uppercase">{dept.department}</p>
              <div className="mt-2">
                {dept.roles.map((role) => (
                  <CareersRoleRow key={role.id} role={role} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

type MobileCategoryFilterProps = {
  readonly activeCategory: RoleCategory | null;
  readonly onSelectCategory: (category: RoleCategory | null) => void;
};

function MobileCategoryFilter({activeCategory, onSelectCategory}: MobileCategoryFilterProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 lg:hidden">
      {ROLE_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(activeCategory === category ? null : category)}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
            activeCategory === category ? "bg-white text-black" : "border border-white/10 bg-white/5 text-white/60 hover:text-white"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export function CareersOpenRoles() {
  const [activeCategory, setActiveCategory] = useState<RoleCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredRoles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return OPEN_ROLES.filter((role) => {
      if (activeCategory && role.category !== activeCategory) return false;
      if (locationFilter && role.location !== locationFilter) return false;
      if (query && !role.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [activeCategory, searchQuery, locationFilter]);

  const groupedRoles = useMemo(() => groupRolesByCategory(filteredRoles), [filteredRoles]);
  const roleCount = filteredRoles.length;

  return (
    <section
      id="open-roles"
      aria-labelledby={SECTION_TITLE_ID}
      className="relative isolate overflow-hidden bg-black px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl">
        <div className="max-w-2xl">
          <h2 id={SECTION_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            {roleCount} open {roleCount === 1 ? "role" : "roles"}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/50 sm:text-lg">
            We're looking for people who are excited to build what's next — from cloud architecture to platform engineering and operations.
          </p>
        </div>

        <div className="mt-12">
          <RoleSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            locationFilter={locationFilter}
            onLocationChange={setLocationFilter}
          />
        </div>

        <MobileCategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

        <div className="mt-12 flex gap-12">
          <RoleSidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
          <div className="min-w-0 flex-1">
            <RoleListing groups={groupedRoles} />
          </div>
        </div>
      </div>
    </section>
  );
}
