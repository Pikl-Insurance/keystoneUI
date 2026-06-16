import { useState } from "react"
import { BarChart2, ChevronUp, MapPin } from "lucide-react"

const NAV_ITEMS = [
  { label: "Bookings", anchor: "section-bookings" },
  { label: "Avg booking value", anchor: "section-abv" },
  { label: "CAL financials", anchor: "section-cal" },
  { label: "Timing", anchor: "section-timing" },
  { label: "Bookings vs stays per day", anchor: "section-bookings-vs-stays" },
  { label: "ABV (excl. fees) per day", anchor: "section-abv-per-day" },
  { label: "Avg lead time per day", anchor: "section-lead-time" },
  { label: "Bookings made per day", anchor: "section-bookings-per-day" },
  { label: "CAL & DDL take-up % per day", anchor: "section-cal-ddl-takeup" },
]

export function SectionNav() {
  const [open, setOpen] = useState(false)

  function scrollTo(anchor: string) {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="px-6 pb-6">
      {open && (
        <div className="mb-2 overflow-hidden rounded-xl border border-border bg-background shadow-xs">
          <div className="border-b border-border px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Jump to section</p>
          </div>
          <nav className="py-1">
            {NAV_ITEMS.map(({ label, anchor }) => (
              <button
                key={anchor}
                type="button"
                onClick={() => scrollTo(anchor)}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <BarChart2 className="size-3 shrink-0 text-muted-foreground" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle section navigation"
        className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-accent"
      >
        {open ? <ChevronUp className="size-4" /> : <MapPin className="size-4" />}
        Jump to section
      </button>
    </div>
  )
}
