import { useState } from "react"
import { ArrowLeft, MapPin, ShoppingCart } from "lucide-react"

import { PropertyBookingsTable } from "@/components/booking-engine/property-bookings-table"
import { PropertyDetailsPanel } from "@/components/booking-engine/property-details"
import { PropertyInsights } from "@/components/booking-engine/property-insights"
import { PasSummaryMetricCard } from "@/components/booking-engine/pas-summary-metric-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DataSnapshotWidget } from "@/components/widgets/data-snapshot-widget"
import { formatBrandLabel } from "@/lib/booking-engine-data"
import { metricCardGridClass } from "@/lib/card-layout"
import { type Property } from "@/lib/property-data"
import { WILLOWCROFT_HOUSE_DETAILS } from "@/lib/property-details-data"
import { cn } from "@/lib/utils"

const PROPERTY_BOOKINGS_CHART_STUB = [8, 9, 9, 10, 11, 12]

type PropertyPageProps = {
  property: Property
  onBack: () => void
}

type PropertyDualMetricItem = {
  label: string
  value: string
  hint: string
}

function PropertyDualMetricCard({
  title,
  items,
  className,
}: {
  title?: string
  items: [PropertyDualMetricItem, PropertyDualMetricItem]
  className?: string
}) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col rounded-xl border border-border bg-card p-3 shadow-xs",
        className
      )}
    >
      {title ? (
        <p className="mb-2 text-xs font-medium text-muted-foreground">{title}</p>
      ) : null}
      <div className="grid min-h-0 flex-1 grid-cols-2">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={cn("min-w-0", index === 1 && "border-l border-border pl-3")}
          >
            <p className="text-[10px] font-medium text-muted-foreground">{item.label}</p>
            <p className="mt-0.5 truncate text-sm font-semibold leading-tight tabular-nums text-foreground">
              {item.value}
            </p>
            <p className="mt-0.5 truncate text-[10px] leading-tight text-muted-foreground">
              {item.hint}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}

export function PropertyPage({ property, onBack }: PropertyPageProps) {
  const [listView, setListView] = useState<"list" | "timeline">("list")

  const cancellationCount = property.bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length
  const avgNightsBooked = (
    property.bookings.reduce((sum, booking) => sum + booking.nights, 0) /
    property.bookings.length
  ).toFixed(1)

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <nav className="text-xs text-muted-foreground">
              <span>Policy admin system</span>
              <span className="mx-2">/</span>
              <span>Properties</span>
              <span className="mx-2">/</span>
              <span className="text-foreground">{property.id}</span>
            </nav>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onBack}
              className="h-9 shrink-0 gap-2 text-xs"
            >
              <ArrowLeft className="size-3.5" />
              Back to properties
            </Button>
          </div>

          <h1 className="text-[22px] font-semibold tracking-tight">{property.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {property.postcode}, {property.county}
          </p>
        </div>

        <div className="space-y-3">
          <div className={cn(metricCardGridClass, "grid-cols-1 lg:grid-cols-3")}>
            <div className="relative aspect-[16/10] min-h-44 w-full overflow-hidden rounded-xl border border-border bg-muted/30 lg:aspect-auto lg:h-full lg:min-h-0">
              <img
                src={property.imageUrl}
                alt={`${property.name} exterior`}
                className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
              />
            </div>

            <div className="relative aspect-[16/10] min-h-44 w-full overflow-hidden rounded-xl border border-border bg-muted/20 lg:aspect-auto lg:h-full lg:min-h-0">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.05)_1px,transparent_1px)] bg-size-[24px_24px]"
              />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <MapPin className="size-4 text-muted-foreground" strokeWidth={2} />
                  <p className="text-xs font-semibold text-foreground">{property.postcode}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {property.county}, {property.country}
                  </p>
                </div>
              </div>
            </div>

            <DataSnapshotWidget
              className="h-full shadow-xs"
              title="Overview"
              compact
              valueClassName="text-sm font-semibold"
              rows={WILLOWCROFT_HOUSE_DETAILS.overview.map((field) => ({
                label: field.label,
                value: field.value,
              }))}
            />
          </div>

          <div className={cn(metricCardGridClass, "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4")}>
            <PasSummaryMetricCard
              title="Bookings"
              value={String(property.bookingCount)}
              icon={ShoppingCart}
              chartValues={PROPERTY_BOOKINGS_CHART_STUB}
              chartStyle="sparkline"
              footer="Total bookings"
            />
            <PropertyDualMetricCard
              title="Stay profile"
              items={[
                {
                  label: "Avg nights",
                  value: avgNightsBooked,
                  hint: "Per booking",
                },
                {
                  label: "Cancellations",
                  value: String(cancellationCount),
                  hint: "All time",
                },
              ]}
            />
            <PropertyDualMetricCard
              items={[
                {
                  label: "Partner",
                  value: property.partner.replace(/^Partner /, ""),
                  hint: "Booking partner",
                },
                {
                  label: "Brand",
                  value: formatBrandLabel(property.brand),
                  hint: "Property brand",
                },
              ]}
            />
            <PropertyDualMetricCard
              items={[
                {
                  label: "Location",
                  value: property.postcode,
                  hint: `${property.county}, ${property.country}`,
                },
                {
                  label: "Max occupancy",
                  value: property.maxOccupancy,
                  hint: "Guests",
                },
              ]}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="bookings" className="gap-4">
            <TabsList className="bg-accent dark:bg-muted">
              <TabsTrigger value="bookings">Bookings ({property.bookingCount})</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="details">Property details</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={listView === "list" ? "default" : "ghost"}
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setListView("list")}
                >
                  List
                </Button>
                <Button
                  variant={listView === "timeline" ? "default" : "ghost"}
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => setListView("timeline")}
                >
                  Timeline
                </Button>
              </div>

              {listView === "list" ? (
                <>
                  <PropertyBookingsTable bookings={property.bookings} />
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                    <p>
                      Showing 1–{property.bookings.length} of {property.bookings.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs" disabled>
                        ← Prev
                      </Button>
                      <span className="text-xs">Page 1 of 1</span>
                      <Button variant="outline" size="sm" className="h-8 text-xs" disabled>
                        Next →
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/10 py-14 text-center">
                  <p className="text-sm font-medium">Timeline view</p>
                  <p className="text-sm text-muted-foreground">
                    Booking timeline will be available in a future release.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="insights">
              <PropertyInsights />
            </TabsContent>

            <TabsContent value="details">
              <PropertyDetailsPanel details={WILLOWCROFT_HOUSE_DETAILS} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
