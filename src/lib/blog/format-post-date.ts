// Formatted in UTC so the prerendered HTML and the hydrated page print the same day wherever the reader is.
export function formatPostDate(calendarDay: string): string {
  return new Intl.DateTimeFormat("en-GB", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"}).format(new Date(calendarDay));
}
