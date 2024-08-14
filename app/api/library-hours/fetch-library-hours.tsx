export const fetchLibraryHours = async () => {
  const from = new Date()
  from.setDate(from.getDate() - from.getDay())
  const to = new Date()
  to.setDate(to.getDate() + 6)

  const params = new URLSearchParams()
  params.set("from", from.toISOString().replace(/T.*/, ""))
  params.set("to", to.toISOString().replace(/T.*/, ""))

  return fetch(`https://library-hours.stanford.edu/libraries.json?${params.toString()}`, {
    cache: "no-cache",
  })
}
