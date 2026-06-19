import { useRef, type ReactNode } from "react"

import { ExportSnapshotButton } from "@/components/export-snapshot-button"
import { cn } from "@/lib/utils"
import type { ActiveFilters } from "@/lib/chart-data"

type ReportSectionProps = {
  title: string
  exportSlug: string
  filters?: ActiveFilters
  headingClassName?: string
  headerActions?: ReactNode
  children: ReactNode
}

export function ReportSection({
  title,
  exportSlug,
  filters,
  headingClassName,
  headerActions,
  children,
}: ReportSectionProps) {
  const snapshotRef = useRef<HTMLElement>(null)

  return (
    <section ref={snapshotRef} className="flex h-full min-w-0 flex-col">
      <div
        className={cn(
          "flex items-center justify-between gap-3",
          headingClassName ?? "mb-4"
        )}
      >
        <h2 className="text-xs font-semibold tracking-wide uppercase">{title}</h2>
        <div className="flex shrink-0 items-center gap-1" data-snapshot-exclude>
          {headerActions}
          <ExportSnapshotButton
            getTarget={() => snapshotRef.current}
            exportSlug={exportSlug}
            filters={filters}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  )
}
