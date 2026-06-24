import { Card, CardContent, CardHeader } from "../primitives/card";
import { FIGURE_24PX_CLASS } from "../lib/figure-styles";
import { cn } from "../lib/utils";
import { WidgetHelpButton } from "../widgets/widget-help-button";

export type HeadlineDataWidgetProps = {
  title: string;
  value: string;
  label: string;
  helpText?: string;
  valueClassName?: string;
  className?: string;
};

export function HeadlineDataWidget({
  title,
  value,
  label,
  helpText,
  valueClassName,
  className,
}: HeadlineDataWidgetProps) {
  return (
    <Card
      className={cn(
        "@container flex h-full min-w-0 flex-col bg-card shadow-xs",
        className,
      )}
    >
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-0">
        <h3 className="min-w-0 pr-2 text-sm font-semibold text-muted-foreground">
          {title}
        </h3>
        <WidgetHelpButton title={title} helpText={helpText} />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 pb-5 pt-1">
        <div className="flex flex-1 items-center">
          <p
            className={cn(
              "font-bold tracking-tight tabular-nums text-foreground",
              valueClassName ?? FIGURE_24PX_CLASS,
            )}
          >
            {value}
          </p>
        </div>
        <p className="text-xs italic text-muted-foreground @sm:text-sm">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
