import {Search} from "lucide-react";
import {useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {cn} from "@/lib/utils";
import {CareersApplyModal} from "#/components/layout/careers-apply-modal.tsx";
import {toOpenRole} from "#/components/layout/careers-data.ts";
import type {OpenRole} from "#/components/layout/careers-data.ts";
import {CareersRoleRow} from "#/components/layout/careers-role-card.tsx";
import {jobsQueryOptions} from "#/lib/api/endpoints.ts";

const SECTION_TITLE_ID = "open-roles";

type RoleSidebarProps = {
  readonly categories: readonly string[];
  readonly activeCategory: string | null;
  readonly onSelectCategory: (category: string | null) => void;
};

function RoleSidebar({categories, activeCategory, onSelectCategory}: RoleSidebarProps) {
  return (
    <nav aria-label="Role categories" className="hidden lg:block lg:w-48 xl:w-56">
      <div className="sticky top-32 space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(activeCategory === category ? null : category)}
            className={cn(
              "block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200",
              activeCategory === category
                ? "border-l-2 border-primary bg-primary/10 font-medium text-foreground"
                : "border-l-2 border-transparent text-foreground/50 hover:text-foreground/80"
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
  readonly locations: readonly string[];
};

function RoleSearchBar({searchQuery, onSearchChange, locationFilter, onLocationChange, locations}: RoleSearchBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search job titles..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-foreground/15 bg-foam py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
        />
      </div>
      <select
        value={locationFilter}
        onChange={(event) => onLocationChange(event.target.value)}
        aria-label="Filter by location"
        className="appearance-none rounded-xl border border-foreground/15 bg-foam px-4 py-2.5 text-sm text-foreground/80 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
      >
        <option value="">All locations</option>
        {locations.map((location) => (
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
  readonly roles: readonly OpenRole[];
};

type GroupedRoles = {
  readonly category: string;
  readonly departments: readonly GroupedDepartment[];
};

function groupRolesByCategory(roles: readonly OpenRole[]): readonly GroupedRoles[] {
  const grouped = new Map<string, Map<string, OpenRole[]>>();

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

  return [...grouped.entries()].map(([category, departments]) => ({
    category,
    departments: [...departments.entries()].map(([department, roles]) => ({department, roles})),
  }));
}

type RoleListingProps = {
  readonly groups: readonly GroupedRoles[];
  readonly onApply: (role: OpenRole) => void;
};

function RoleListing({groups, onApply}: RoleListingProps) {
  if (groups.length === 0) {
    return <p className="py-16 text-center text-sm text-foreground/40">No roles match your current filters.</p>;
  }

  return (
    <>
      {groups.map((group) => (
        <div key={group.category} className="mb-12">
          <h3 className="border-b border-foreground/10 pb-4 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            {group.category}
          </h3>

          {group.departments.map((dept) => (
            <div key={dept.department} className="mt-6">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-primary/80 uppercase">{dept.department}</p>
              <div className="mt-2">
                {dept.roles.map((role) => (
                  <CareersRoleRow key={role.id} role={role} onApply={onApply} />
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
  readonly categories: readonly string[];
  readonly activeCategory: string | null;
  readonly onSelectCategory: (category: string | null) => void;
};

function MobileCategoryFilter({categories, activeCategory, onSelectCategory}: MobileCategoryFilterProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 lg:hidden">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(activeCategory === category ? null : category)}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
            activeCategory === category
              ? "bg-primary text-white"
              : "border border-foreground/15 bg-foreground/5 text-foreground/60 hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function RolesLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading open roles">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="h-14 animate-pulse rounded-xl border border-foreground/10 bg-foreground/5" />
      ))}
    </div>
  );
}

function RolesHeading({count}: {readonly count: number}) {
  return (
    <div className="max-w-2xl">
      <h2 id={SECTION_TITLE_ID} className="text-4xl leading-[1.06] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {count} open {count === 1 ? "role" : "roles"}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-foreground/50 sm:text-lg">
        We're looking for people who are excited to build what's next — from cloud architecture to platform engineering and operations.
      </p>
    </div>
  );
}

type RolesBodyProps = {
  readonly roles: readonly OpenRole[];
  readonly isPending: boolean;
  readonly isError: boolean;
  readonly onApply: (role: OpenRole) => void;
};

function RolesBody({roles, isPending, isError, onApply}: RolesBodyProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const categories = useMemo(() => [...new Set(roles.map((role) => role.category))], [roles]);
  const locations = useMemo(() => [...new Set(roles.map((role) => role.location))], [roles]);

  const filteredRoles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return roles.filter(
      (role) =>
        (!activeCategory || role.category === activeCategory) &&
        (!locationFilter || role.location === locationFilter) &&
        (!query || role.title.toLowerCase().includes(query))
    );
  }, [roles, activeCategory, searchQuery, locationFilter]);

  const groupedRoles = useMemo(() => groupRolesByCategory(filteredRoles), [filteredRoles]);

  return (
    <>
      <div className="mt-12">
        <RoleSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          locations={locations}
        />
      </div>

      <MobileCategoryFilter categories={categories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      <div className="mt-12 flex gap-12">
        <RoleSidebar categories={categories} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <div className="min-w-0 flex-1">
          {isPending ? (
            <RolesLoading />
          ) : isError ? (
            <p role="alert" className="py-16 text-center text-sm text-foreground/40">
              We couldn't load open roles right now. Please try again later.
            </p>
          ) : (
            <RoleListing groups={groupedRoles} onApply={onApply} />
          )}
        </div>
      </div>
    </>
  );
}

export function CareersOpenRoles() {
  const [applyRole, setApplyRole] = useState<OpenRole | null>(null);
  const {data, isPending, isError} = useQuery(jobsQueryOptions({status: "open"}));

  const roles = useMemo(() => (data?.items ?? []).map(toOpenRole), [data]);
  const roleCount = isPending || isError ? 0 : roles.length;

  return (
    <section
      id="open-roles"
      aria-labelledby={SECTION_TITLE_ID}
      className="relative isolate overflow-hidden bg-background px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl">
        <RolesHeading count={roleCount} />
        <RolesBody roles={roles} isPending={isPending} isError={isError} onApply={setApplyRole} />
      </div>

      {applyRole ? <CareersApplyModal role={applyRole} onClose={() => setApplyRole(null)} /> : null}
    </section>
  );
}
