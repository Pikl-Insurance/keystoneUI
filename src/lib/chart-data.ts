// Generates synthetic daily data for Jan 1 – Jun 23 (174 days)
const START = new Date("2026-01-01")

function dateLabel(offset: number) {
  const d = new Date(START)
  d.setDate(d.getDate() + offset)
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

function wave(offset: number, amp: number, period: number, phase = 0) {
  return amp * (0.5 + 0.5 * Math.sin((2 * Math.PI * (offset + phase)) / period))
}

function noise(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export function buildDailyBookingsData(days = 174) {
  return Array.from({ length: days }, (_, i) => ({
    date: dateLabel(i),
    made: Math.round(5000 + wave(i, 2500, 14) - i * 10 + noise(i) * 1200),
    starting: Math.round(3500 + wave(i, 4000, 7, 2) + noise(i + 50) * 800),
  }))
}

export function buildAbvPerDayData(days = 174) {
  const partners = ["ABV (total)", "Partner Alpha", "Partner Beta", "Partner Gamma (DK)", "Partner Gamma (EUR)", "Partner Delta", "Partner Epsilon", "Partner Zeta (DK)"]
  return Array.from({ length: days }, (_, i) => {
    const row: Record<string, string | number> = { date: dateLabel(i) }
    partners.forEach((p, pi) => {
      row[p] = Math.round(1200 + wave(i, 1800, 14, pi * 3) + noise(i + pi * 7) * 900)
    })
    return row
  })
}

export function buildLeadTimeData(days = 174) {
  const series = ["Lead (total)", "Partner Alpha", "Partner Beta", "Partner Gamma (DK)", "Partner Gamma (EUR)", "Partner Delta", "Partner Epsilon", "Partner Zeta (DK)"]
  return Array.from({ length: days }, (_, i) => {
    const row: Record<string, string | number> = { date: dateLabel(i) }
    series.forEach((s, si) => {
      row[s] = Math.round(90 + wave(i, 80, 21, si * 4) + noise(i + si * 11) * 40)
    })
    return row
  })
}

export function buildBookingsMadePerDayData(days = 174) {
  return Array.from({ length: days }, (_, i) => ({
    date: dateLabel(i),
    bookings: Math.round(4500 + wave(i, 3000, 14) - i * 8 + noise(i) * 1500),
  }))
}

export function buildCalDdlTakeupData(days = 174) {
  const series = ["CAL % (total)", "Partner Alpha CAL %", "Partner Beta CAL %", "DDL % (total)", "Partner Alpha DDL %"]
  return Array.from({ length: days }, (_, i) => {
    const row: Record<string, string | number> = { date: dateLabel(i) }
    series.forEach((s, si) => {
      row[s] = parseFloat((2 + wave(i, 6, 28, si * 5) * 0.6 + noise(i + si * 13) * 2).toFixed(1))
    })
    return row
  })
}
