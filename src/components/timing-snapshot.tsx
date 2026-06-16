import { useState } from "react"
import { Clock, Info, LayoutList, Timer } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type CurrencyTiming = {
  currency: "GBP" | "EUR"
  flag: "uk" | "eu"
  value: string
  cal: string
}

type TimingCard = {
  label: string
  icon: typeof Clock
  description: string
  columns?: [CurrencyTiming, CurrencyTiming]
  emptyNote?: string
}

const timingCards: TimingCard[] = [
  {
    label: "Avg booking to stay",
    icon: Clock,
    description: "Average number of days between booking date and stay start date.",
    columns: [
      { currency: "GBP", flag: "uk", value: "94.2 days", cal: "CAL 118.7 days" },
      { currency: "EUR", flag: "eu", value: "108.5 days", cal: "CAL 134.1 days" },
    ],
  },
  {
    label: "Avg cancellation to stay",
    icon: Timer,
    description: "Average number of days between cancellation date and stay start date.",
    emptyNote: "Days from cancellation to stay start",
  },
]

const timingRows = [
  { brand: "Partner Alpha", ccy: "GBP", avgLead: "92.4 days", calAvgLead: "118.7 days", color: "bg-blue-500" },
  { brand: "Partner Beta", ccy: "GBP", avgLead: "86.1 days", calAvgLead: "—", color: "bg-cyan-500" },
  { brand: "Partner Gamma (DK)", ccy: "EUR", avgLead: "101.3 days", calAvgLead: "142.0 days", color: "bg-amber-500" },
  { brand: "Partner Gamma (EUR)", ccy: "EUR", avgLead: "115.6 days", calAvgLead: "—", color: "bg-violet-500" },
  { brand: "Partner Delta (EUR)", ccy: "EUR", avgLead: "128.4 days", calAvgLead: "—", color: "bg-rose-500" },
  { brand: "Partner Epsilon", ccy: "GBP", avgLead: "134.2 days", calAvgLead: "—", color: "bg-lime-500" },
  { brand: "Partner Zeta (DK)", ccy: "EUR", avgLead: "109.8 days", calAvgLead: "138.5 days", color: "bg-pink-500" },
  { brand: "Partner Zeta (EUR)", ccy: "EUR", avgLead: "97.3 days", calAvgLead: "124.9 days", color: "bg-orange-500" },
]

function FlagBadge({ type }: { type: "uk" | "eu" }) {
  const src = type === "uk" ? "https://flagcdn.com/w40/gb.png" : "https://flagcdn.com/w40/eu.png"
  const alt = type === "uk" ? "United Kingdom flag" : "European Union flag"
  return (
    <span className="inline-flex size-4 overflow-hidden rounded-full border border-border/80 bg-background">
      <img src={src} alt={alt} className="size-full object-cover" />
    </span>
  )
}

export function TimingSnapshot() {
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <TooltipProvider>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide uppercase">Timing</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setShowBreakdown((prev) => !prev)}
                aria-label={showBreakdown ? "Hide timing breakdown" : "Show timing breakdown"}
                className={`rounded-md p-1.5 transition-colors hover:bg-accent ${showBreakdown ? "text-foreground" : "text-muted-foreground"}`}
              >
                <LayoutList className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {showBreakdown
                ? "Hide partner breakdown"
                : "View avg booking lead time per partner — includes CAL avg lead days by brand"}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {timingCards.map(({ label, icon: Icon, description, columns, emptyNote }) => (
            <Card key={label}>
              <CardHeader className="items-center">
                <div className="flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="size-3.5" />
                  </div>
                  <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                    {label}
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`More information about ${label}`}
                    >
                      <Info className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{description}</TooltipContent>
                </Tooltip>
              </CardHeader>

              <CardContent>
                <div className="border-t border-border pt-4">
                  {columns ? (
                    <div className="grid grid-cols-2 divide-x divide-border">
                      {columns.map((col, i) => (
                        <div key={col.currency} className={i === 0 ? "pr-4" : "pl-4"}>
                          <div className="mb-1 flex items-center gap-1.5">
                            <FlagBadge type={col.flag} />
                            <span className="text-sm font-medium tracking-wide text-muted-foreground">
                              {col.currency}
                            </span>
                          </div>
                          <p className="text-xl font-medium tracking-tight">{col.value}</p>
                          <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {col.cal}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-medium tracking-tight text-muted-foreground">—</p>
                      <p className="mt-2 text-sm text-muted-foreground">{emptyNote}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showBreakdown && (
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>CCY</TableHead>
                  <TableHead className="text-right">Avg lead</TableHead>
                  <TableHead className="text-right">CAL avg lead</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timingRows.map((row) => (
                  <TableRow key={row.brand}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${row.color}`} />
                        <span>{row.brand}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{row.ccy}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.avgLead}</TableCell>
                    <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                      {row.calAvgLead}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </TooltipProvider>
  )
}
