export function formatDate(input: string): string {
  // If the time is in UTC format, change it to LA timezone.
  if (input.includes("+00:00")) input = input.replace(/\+.*$/, "-09:00")

  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })
}
