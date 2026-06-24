import { useState } from "react";
import { Download } from "lucide-react";

import { PartnerCard } from "@/components/booking-engine/partner-card";
import { PropertiesListPage } from "@/components/booking-engine/properties-list-page";
import { PropertyPage } from "@/components/booking-engine/property-page";
import { Button } from "@keystone/ui/primitives/button";
import { TooltipProvider } from "@keystone/ui/primitives/tooltip";
import { DualDataWidget } from "@/components/dual-data-widget";
import { HeadlineDataWidget } from "@keystone/ui/widgets/headline-data-widget";
import {
  metricCardGridClass,
  metricCardStackClass,
} from "@keystone/ui/lib/card-layout";
import {
  BOOKING_ENGINE_PARTNERS,
  BOOKING_ENGINE_SUMMARY,
  formatCount,
  formatCurrency,
} from "@/lib/booking-engine-data";
import { FIGURE_24PX_CLASS } from "@keystone/ui/lib/figure-styles";
import { MOCK_PROPERTY } from "@/lib/property-data";
import { getPropertiesForPartner } from "@/lib/properties-list-data";
import { cn } from "@keystone/ui/lib/utils";

export function BookingEnginePage() {
  const [expandedPartnerId, setExpandedPartnerId] =
    useState<string>("partner-a");
  const [propertiesPartnerId, setPropertiesPartnerId] = useState<string | null>(
    null,
  );
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );

  const propertiesPartner = BOOKING_ENGINE_PARTNERS.find(
    (partner) => partner.id === propertiesPartnerId,
  );

  if (selectedPropertyId) {
    return (
      <PropertyPage
        property={MOCK_PROPERTY}
        onBack={() => setSelectedPropertyId(null)}
      />
    );
  }

  if (propertiesPartner) {
    return (
      <PropertiesListPage
        partner={propertiesPartner}
        properties={getPropertiesForPartner(propertiesPartner.id)}
        onBack={() => setPropertiesPartnerId(null)}
        onViewProperty={setSelectedPropertyId}
      />
    );
  }

  const calPct =
    BOOKING_ENGINE_SUMMARY.totalBookings > 0
      ? `${Math.round((BOOKING_ENGINE_SUMMARY.totalWithCal / BOOKING_ENGINE_SUMMARY.totalBookings) * 100)}%`
      : "0%";
  const ddlPct =
    BOOKING_ENGINE_SUMMARY.totalBookings > 0
      ? `${Math.round((BOOKING_ENGINE_SUMMARY.totalWithDdl / BOOKING_ENGINE_SUMMARY.totalBookings) * 100)}%`
      : "0%";

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight">
              Partners &amp; policies
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Configure partner connections, manage brands, and review active
              policy rates across the policy admin system.
            </p>
          </div>

          <Button className="text-xs">
            <Download className="size-3.5" />
            Export
          </Button>
        </div>

        <div className="@container min-w-0">
          <div
            className={cn(metricCardGridClass, "grid-cols-1 @md:grid-cols-2")}
          >
            <div className={cn(metricCardStackClass, "min-h-0")}>
              <DualDataWidget
                className="min-h-0 flex-1"
                datasetA={{
                  title: "Sales",
                  value: formatCount(BOOKING_ENGINE_SUMMARY.totalBookings),
                  clarification: "Total bookings",
                }}
                datasetB={{
                  title: "Properties",
                  value: formatCount(BOOKING_ENGINE_SUMMARY.totalProperties),
                  clarification: "On platform",
                }}
              />
              <DualDataWidget
                className="min-h-0 flex-1"
                datasetA={{
                  title: "Partners",
                  value: formatCount(BOOKING_ENGINE_SUMMARY.partners),
                  clarification: "Connected to engine",
                }}
                datasetB={{
                  title: "Active brands",
                  value: formatCount(BOOKING_ENGINE_SUMMARY.activeBrands),
                  clarification: "Across all partners",
                }}
              />
            </div>
            <div className={cn(metricCardStackClass, "min-h-0")}>
              <HeadlineDataWidget
                className="min-h-0 flex-1"
                title="Revenue"
                value={formatCurrency(
                  BOOKING_ENGINE_SUMMARY.totalRevenue,
                  "GBP",
                )}
                label="GBP · all partners"
                helpText="Combined revenue across all partners and brands."
                valueClassName={FIGURE_24PX_CLASS}
              />
              <DualDataWidget
                className="min-h-0 flex-1"
                datasetA={{
                  title: "With CAL",
                  value: formatCount(BOOKING_ENGINE_SUMMARY.totalWithCal),
                  clarification: `${calPct} of bookings`,
                }}
                datasetB={{
                  title: "With DDL",
                  value: formatCount(BOOKING_ENGINE_SUMMARY.totalWithDdl),
                  clarification: `${ddlPct} of bookings`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {BOOKING_ENGINE_PARTNERS.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              expanded={expandedPartnerId === partner.id}
              onToggle={() =>
                setExpandedPartnerId((current) =>
                  current === partner.id ? "" : partner.id,
                )
              }
              onViewProperty={() => setPropertiesPartnerId(partner.id)}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
