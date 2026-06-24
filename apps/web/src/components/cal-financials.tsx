import { ReportSection } from "@keystone/ui/widgets/report-section";
import { DataSnapshotWidget } from "@keystone/ui/widgets/data-snapshot-widget";
import { HeadlineDataWidget } from "@keystone/ui/widgets/headline-data-widget";
import { TooltipProvider } from "@keystone/ui/primitives/tooltip";
import { metricCardGridClass } from "@keystone/ui/lib/card-layout";
import {
  type ActiveFilters,
  getCalFinProfile,
} from "@keystone/ui/lib/chart-data";
import { INSIGHTS_WIDGET_HELP_TEXT } from "@keystone/ui/lib/insights-widget-labels";
import { cn } from "@keystone/ui/lib/utils";

export function CalFinancials({ filters }: { filters: ActiveFilters }) {
  const profile = getCalFinProfile(filters);

  const breakdownRows = [
    { label: "IPT (GBP)", value: profile.ipt },
    { label: "PISL comm (GBP)", value: profile.pislComm },
    { label: "Capacity net (GBP)", value: profile.capacityNet },
    { label: "PISL amount payable (GBP)", value: profile.pislPayable },
    { label: "Premium inc. IPT (GBP)", value: profile.premiumInc },
    { label: "GWP (GBP)", value: profile.gwp },
  ];

  return (
    <TooltipProvider>
      <ReportSection
        title="CAL financials (GBP)"
        exportSlug="cal-financials"
        filters={filters}
      >
        <div className="@container min-w-0">
          <div
            className={cn(
              metricCardGridClass,
              "grid-cols-1 @4xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)]",
            )}
          >
            <HeadlineDataWidget
              title="Total payable"
              value={profile.totalPayable}
              label="GBP · primary liability"
              helpText={INSIGHTS_WIDGET_HELP_TEXT}
            />
            <DataSnapshotWidget
              title="Financial breakdown"
              rows={breakdownRows}
            />
          </div>
        </div>
      </ReportSection>
    </TooltipProvider>
  );
}
