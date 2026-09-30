import {useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {CareersApplyModal} from "#/components/layout/careers-apply-modal.tsx";
import {toOpenRole} from "#/components/layout/careers-data.ts";
import type {OpenRole} from "#/components/layout/careers-data.ts";
import {CareersRoleRow} from "#/components/layout/careers-role-card.tsx";
import {MobileCategoryFilter, RoleSearchBar, RoleSidebar} from "#/components/layout/careers-role-filters.tsx";
import {jobsQueryOptions} from "#/lib/api/endpoints.ts";

const SECTION_TITLE_ID = "open-roles";

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
  readonly hasAnyRoles: boolean;
  readonly onApply: (role: OpenRole) => void;
};

function RoleListing({groups, hasAnyRoles, onApply}: RoleListingProps) {
  if (groups.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-foreground/40">
        {hasAnyRoles
          ? "No roles match your current filters."
          : "We don't have any open roles right now. Check back soon or reach out via the contact page."}
      </p>
    );
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
            <RoleListing groups={groupedRoles} hasAnyRoles={roles.length > 0} onApply={onApply} />
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
