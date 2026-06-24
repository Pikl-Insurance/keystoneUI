"use client";

import { useState } from "react";

import { InsightsReportPage } from "@/components/insights-report-page";
import { FilterSidebar } from "@/components/filter-sidebar";
import {
  type ActiveFilters,
  DEFAULT_FILTERS,
} from "@keystone/ui/lib/chart-data";

export default function InsightsRoute() {
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(DEFAULT_FILTERS);

  return (
    <div className="relative grid min-h-0 flex-1 overflow-hidden grid-cols-[1fr_300px]">
      <div className="min-h-0 min-w-0 overflow-hidden">
        <section className="h-full overflow-y-auto px-20 py-12 xl:px-24 xl:py-14">
          <div className="mb-8">
            <h1 className="text-[22px] font-semibold tracking-tight">
              Sales, cancellation &amp; re-let metrics
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time across 3 partners
            </p>
          </div>

          <InsightsReportPage filters={activeFilters} wideLayout={false} />
        </section>
      </div>

      <FilterSidebar filters={activeFilters} onRun={setActiveFilters} />
    </div>
  );
}
