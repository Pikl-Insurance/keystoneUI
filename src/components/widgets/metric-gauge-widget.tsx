import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { WidgetHelpButton } from "@/components/widgets/widget-help-button"
import { FIGURE_24PX_CLASS, METRIC_WIDGET_STACK_GAP_CLASS } from "@/lib/figure-styles"
import { cn } from "@/lib/utils"

export type MetricGaugeWidgetProps = {
  title: string
  value: string
  gaugePercent: number
  label: string
  helpText?: string
  className?: string
}

function SemiCircularGauge({ percent }: { percent: number }) {
  const radius = 18
  const circumference = Math.PI * radius
  const clamped = Math.min(100, Math.max(0, percent))
  const offset = circumference * (1 - clamped / 100)

  return (
    <svg
      width="44"
      height="26"
      viewBox="0 0 44 26"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M 4 22 A 18 18 0 0 1 40 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="text-muted"
      />
      <path
        d="M 4 22 A 18 18 0 0 1 40 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-foreground"
      />
    </svg>
  )
}

export function MetricGaugeWidget({
  title,
  value,
  gaugePercent,
  label,
  helpText,
  className,
}: MetricGaugeWidgetProps) {
  return (
    <Card className={cn("@container flex h-full min-w-0 flex-col bg-card shadow-xs", className)}>
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-0">
        <h3 className="min-w-0 pr-2 text-sm font-semibold text-muted-foreground">{title}</h3>
        <WidgetHelpButton title={title} helpText={helpText} />
      </CardHeader>

      <CardContent
        className={cn(
          "flex min-h-0 flex-1 flex-col px-4 pb-5 pt-2",
          METRIC_WIDGET_STACK_GAP_CLASS
        )}
      >
        <div className="flex min-h-0 flex-1 items-center py-2">
          <p
            className={cn(
              "font-bold tracking-tight tabular-nums text-foreground",
              FIGURE_24PX_CLASS
            )}
          >
            {value}
          </p>
        </div>

        <div className={cn("flex shrink-0 items-end", METRIC_WIDGET_STACK_GAP_CLASS)}>
          <SemiCircularGauge percent={gaugePercent} />
          <p className="pb-0.5 text-xs leading-snug text-muted-foreground @sm:text-sm">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
