import { useState } from "react"
import { FileText, Info, LayoutList, Percent, Wallet, type LucideIcon } from "lucide-react"

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
import { cn } from "@/lib/utils"

type CurrencyColumn = {
  currency: "GBP" | "EUR"
  flag: "uk" | "eu"
  value: string
  cal: string
}

type CurrencyAbvMetric = {
  label: string
  icon: LucideIcon
  description: string
  columns: [CurrencyColumn, CurrencyColumn]
}

const currencyAbvMetrics: CurrencyAbvMetric[] = [
  {
    label: "ABV (excl. booking fee)",
    icon: Wallet,
    description: "Average booking value excluding the booking fee.",
    columns: [
      { currency: "GBP", flag: "uk", value: "£742", cal: "CAL £890" },
      { currency: "EUR", flag: "eu", value: "€1,340", cal: "CAL €1,210" },
    ],
  },
  {
    label: "ABV inc. booking fee",
    icon: FileText,
    description: "Average booking value including the booking fee.",
    columns: [
      { currency: "GBP", flag: "uk", value: "£768", cal: "CAL £920" },
      { currency: "EUR", flag: "eu", value: "€1,385", cal: "CAL €1,255" },
    ],
  },
]

const abvRows = [
  { brand: "Partner Alpha", ccy: "GBP", abv: "£742", calAbv: "£890", abvIncFee: "£768", calPricePct: "7.2%", color: "bg-blue-500" },
  { brand: "Partner Beta", ccy: "GBP", abv: "£615", calAbv: "—", abvIncFee: "£638", calPricePct: "—", color: "bg-cyan-500" },
  { brand: "Partner Gamma (DK)", ccy: "EUR", abv: "€1,180", calAbv: "€1,340", abvIncFee: "€1,210", calPricePct: "9.4%", color: "bg-amber-500" },
  { brand: "Partner Gamma (EUR)", ccy: "EUR", abv: "€1,320", calAbv: "—", abvIncFee: "€1,365", calPricePct: "—", color: "bg-violet-500" },
  { brand: "Partner Delta (EUR)", ccy: "EUR", abv: "€2,850", calAbv: "—", abvIncFee: "€2,920", calPricePct: "—", color: "bg-rose-500" },
  { brand: "Partner Epsilon", ccy: "GBP", abv: "£3,100", calAbv: "—", abvIncFee: "£3,180", calPricePct: "—", color: "bg-lime-500" },
  { brand: "Partner Zeta (DK)", ccy: "EUR", abv: "€1,050", calAbv: "€1,210", abvIncFee: "€1,085", calPricePct: "9.8%", color: "bg-pink-500" },
  { brand: "Partner Zeta (EUR)", ccy: "EUR", abv: "€1,140", calAbv: "€1,255", abvIncFee: "€1,175", calPricePct: "9.9%", color: "bg-orange-500" },
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

export function AverageBookingValueSnapshot() {
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <TooltipProvider>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-wide uppercase">Average booking value</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setShowBreakdown((prev) => !prev)}
                aria-label={showBreakdown ? "Hide ABV breakdown" : "Show ABV breakdown"}
                className={`rounded-md p-1.5 transition-colors hover:bg-accent ${showBreakdown ? "text-foreground" : "text-muted-foreground"}`}
              >
                <LayoutList className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {showBreakdown
                ? "Hide partner breakdown"
                : "View ABV per partner — shows ABV, CAL ABV, ABV inc. fee and CAL price % by brand"}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {currencyAbvMetrics.map(({ label, icon: Icon, description, columns }) => (
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
                  <div className="grid grid-cols-2 divide-x divide-border">
                    {columns.map((column, index) => (
                      <div
                        key={column.currency}
                        className={cn("min-w-0 px-4", index === 0 && "pl-0", index === 1 && "pr-0")}
                      >
                        <div className="mb-1 flex items-center gap-1.5">
                          <FlagBadge type={column.flag} />
                          <span className="text-sm font-medium tracking-wide text-muted-foreground">
                            {column.currency}
                          </span>
                        </div>
                        <p className="text-xl font-medium tracking-tight">{column.value}</p>
                        <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {column.cal}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader className="items-center">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-muted text-muted-foreground">
                  <Percent className="size-3.5" />
                </div>
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  CAL customer price
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="More information about CAL customer price"
                  >
                    <Info className="size-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Share of customer price against ABV including booking fee.</TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <div className="border-t border-border pt-4">
                <p className="text-xl font-medium tracking-tight">8.4%</p>
                <p className="mt-2 text-sm text-muted-foreground">% of ABV inc. booking fee</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {showBreakdown && (
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>CCY</TableHead>
                  <TableHead className="text-right">ABV</TableHead>
                  <TableHead className="text-right">CAL ABV</TableHead>
                  <TableHead className="text-right">ABV inc. fee</TableHead>
                  <TableHead className="text-right">CAL price %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {abvRows.map((row) => (
                  <TableRow key={row.brand}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${row.color}`} />
                        <span>{row.brand}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{row.ccy}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.abv}</TableCell>
                    <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">{row.calAbv}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.abvIncFee}</TableCell>
                    <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">{row.calPricePct}</TableCell>
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
