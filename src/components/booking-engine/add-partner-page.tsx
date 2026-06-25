import { useState, type FormEvent, type ReactNode } from "react"
import { ArrowLeft, Building2, Cable, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  PARTNER_CONNECTION_DESCRIPTIONS,
  PARTNER_CONNECTION_LABELS,
  PARTNER_CONNECTION_TYPES,
  type AddPartnerFormValues,
  type PartnerConnectionType,
  type PartnerCurrency,
  type PartnerProduct,
} from "@/lib/booking-engine-data"
import { cn } from "@/lib/utils"

type AddPartnerPageProps = {
  onBack: () => void
  onSubmit?: (values: AddPartnerFormValues) => void
}

type FieldErrors = Partial<Record<keyof AddPartnerFormValues, string>>

const EMPTY_FORM: AddPartnerFormValues = {
  name: "",
  initials: "",
  connectionType: "API",
  currencies: ["GBP"],
  products: ["CAL"],
  contactName: "",
  contactEmail: "",
  accountManager: "",
  goLiveDate: "",
  notes: "",
  status: "draft",
}

function deriveInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 4)
    .toUpperCase()
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function validateForm(values: AddPartnerFormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.name.trim()) {
    errors.name = "Partner name is required"
  }

  if (!values.initials.trim()) {
    errors.initials = "Partner code is required"
  } else if (!/^[A-Z0-9]{2,4}$/.test(values.initials.trim())) {
    errors.initials = "Use 2–4 uppercase letters or numbers"
  }

  if (values.currencies.length === 0) {
    errors.currencies = "Select at least one currency"
  }

  if (values.products.length === 0) {
    errors.products = "Select at least one product"
  }

  if (!values.contactName.trim()) {
    errors.contactName = "Primary contact is required"
  }

  if (!values.contactEmail.trim()) {
    errors.contactEmail = "Contact email is required"
  } else if (!validateEmail(values.contactEmail)) {
    errors.contactEmail = "Enter a valid email address"
  }

  if (!values.accountManager.trim()) {
    errors.accountManager = "Account manager is required"
  }

  return errors
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Building2
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Card className="rounded-xl border-border shadow-xs">
      <CardHeader className="gap-1 pb-3">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
            <Icon className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 space-y-1">
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">{children}</CardContent>
    </Card>
  )
}

function FormField({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="normal-case tracking-normal">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

function ToggleChip({
  selected,
  onToggle,
  children,
}: {
  selected: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-9 items-center rounded-md border px-3 text-xs font-medium transition-colors",
        selected
          ? "border-foreground/20 bg-foreground text-background"
          : "border-input bg-field text-foreground hover:bg-accent"
      )}
    >
      {children}
    </button>
  )
}

function toggleInList<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function AddPartnerPage({ onBack, onSubmit }: AddPartnerPageProps) {
  const [values, setValues] = useState<AddPartnerFormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [initialsTouched, setInitialsTouched] = useState(false)

  function updateField<K extends keyof AddPartnerFormValues>(
    key: K,
    value: AddPartnerFormValues[K]
  ) {
    setValues((prev) => {
      const next = { ...prev, [key]: value }

      if (key === "name" && !initialsTouched) {
        next.initials = deriveInitials(String(value))
      }

      return next
    })

    if (submitted) {
      setErrors((prev) => {
        const nextValues = { ...values, [key]: value }
        if (key === "name" && !initialsTouched) {
          nextValues.initials = deriveInitials(String(value))
        }
        const nextErrors = validateForm(nextValues)
        return { ...prev, [key]: nextErrors[key] }
      })
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)

    const nextErrors = validateForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      onSubmit?.(values)
      onBack()
    }
  }

  const fieldClass = (hasError: boolean) =>
    cn(hasError && "border-destructive focus-visible:ring-destructive/30")

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">Partners &amp; policies</p>
          <h1 className="mt-1 text-[22px] font-semibold tracking-tight">Add partner</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Set up a new distribution partner, connection route, and primary contacts before
            onboarding brands and policies.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-9 gap-2 text-xs"
          onClick={onBack}
        >
          <ArrowLeft className="size-3.5" />
          Back to partners
        </Button>
      </div>

      <form className="space-y-4 pb-24" onSubmit={handleSubmit} noValidate>
        <FormSection
          icon={Building2}
          title="Partner details"
          description="Core identity used across PAS, reporting, and policy grouping."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="name" label="Partner name" error={errors.name}>
              <Input
                id="name"
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="e.g. Partner Alpha"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={fieldClass(Boolean(errors.name))}
              />
            </FormField>

            <FormField
              id="initials"
              label="Partner code"
              hint="Short identifier shown in lists and exports (2–4 characters)."
              error={errors.initials}
            >
              <Input
                id="initials"
                value={values.initials}
                onChange={(event) => {
                  setInitialsTouched(true)
                  updateField("initials", event.target.value.toUpperCase())
                }}
                placeholder="PRAL"
                maxLength={4}
                aria-invalid={Boolean(errors.initials)}
                className={cn("uppercase", fieldClass(Boolean(errors.initials)))}
              />
            </FormField>
          </div>

          <FormField id="status" label="Setup status">
            <Select
              value={values.status}
              onValueChange={(value: "draft" | "active") => updateField("status", value)}
            >
              <SelectTrigger id="status" className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft — setup in progress</SelectItem>
                <SelectItem value="active">Active — ready for bookings</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </FormSection>

        <FormSection
          icon={Cable}
          title="Connection & products"
          description="How booking data is received and which Cover Genius products apply."
        >
          <FormField id="connectionType" label="Data connection">
            <Select
              value={values.connectionType}
              onValueChange={(value: PartnerConnectionType) =>
                updateField("connectionType", value)
              }
            >
              <SelectTrigger id="connectionType" className="h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PARTNER_CONNECTION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {PARTNER_CONNECTION_LABELS[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {PARTNER_CONNECTION_DESCRIPTIONS[values.connectionType]}
            </p>
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="currencies"
              label="Supported currencies"
              error={errors.currencies}
            >
              <div className="flex flex-wrap gap-2">
                {(["GBP", "EUR"] as PartnerCurrency[]).map((currency) => (
                  <ToggleChip
                    key={currency}
                    selected={values.currencies.includes(currency)}
                    onToggle={() =>
                      updateField(
                        "currencies",
                        toggleInList(values.currencies, currency)
                      )
                    }
                  >
                    {currency}
                  </ToggleChip>
                ))}
              </div>
            </FormField>

            <FormField id="products" label="Products" error={errors.products}>
              <div className="flex flex-wrap gap-2">
                {(["CAL", "DDL"] as PartnerProduct[]).map((product) => (
                  <ToggleChip
                    key={product}
                    selected={values.products.includes(product)}
                    onToggle={() =>
                      updateField("products", toggleInList(values.products, product))
                    }
                  >
                    {product}
                  </ToggleChip>
                ))}
              </div>
            </FormField>
          </div>

          <FormField
            id="goLiveDate"
            label="Target go-live date"
            hint="Optional — when you expect the first production feed."
          >
            <Input
              id="goLiveDate"
              type="date"
              value={values.goLiveDate}
              onChange={(event) => updateField("goLiveDate", event.target.value)}
              className="max-w-xs"
            />
          </FormField>
        </FormSection>

        <FormSection
          icon={UserRound}
          title="Contacts"
          description="Who to reach on the partner side and who owns the relationship internally."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="contactName" label="Primary contact" error={errors.contactName}>
              <Input
                id="contactName"
                value={values.contactName}
                onChange={(event) => updateField("contactName", event.target.value)}
                placeholder="Jane Smith"
                aria-invalid={Boolean(errors.contactName)}
                className={fieldClass(Boolean(errors.contactName))}
              />
            </FormField>

            <FormField id="contactEmail" label="Contact email" error={errors.contactEmail}>
              <Input
                id="contactEmail"
                type="email"
                value={values.contactEmail}
                onChange={(event) => updateField("contactEmail", event.target.value)}
                placeholder="jane.smith@partner.com"
                aria-invalid={Boolean(errors.contactEmail)}
                className={fieldClass(Boolean(errors.contactEmail))}
              />
            </FormField>
          </div>

          <FormField
            id="accountManager"
            label="Account manager"
            hint="Cover Genius owner for this partner relationship."
            error={errors.accountManager}
          >
            <Input
              id="accountManager"
              value={values.accountManager}
              onChange={(event) => updateField("accountManager", event.target.value)}
              placeholder="Alex Morgan"
              aria-invalid={Boolean(errors.accountManager)}
              className={fieldClass(Boolean(errors.accountManager))}
            />
          </FormField>

          <FormField
            id="notes"
            label="Setup notes"
            hint="Onboarding context, technical requirements, or policy exceptions."
          >
            <textarea
              id="notes"
              value={values.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              rows={4}
              placeholder="e.g. Awaiting S3 bucket credentials; initial brand rollout in Q3…"
              className={cn(
                "flex min-h-[96px] w-full resize-y rounded-md border border-input bg-field px-3 py-2 text-sm shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </FormField>
        </FormSection>

        <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/95 px-4 py-3 shadow-xs backdrop-blur-sm">
          <p className="text-xs text-muted-foreground">
            Brands and policy rates can be configured after the partner is created.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" className="h-9 text-xs" onClick={onBack}>
              Cancel
            </Button>
            <Button type="submit" className="h-9 text-xs">
              Create partner
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
