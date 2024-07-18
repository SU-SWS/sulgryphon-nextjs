import {DayHours} from "@/lib/hooks/useLibraryHours"

type ShortDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
export type HoursSelectOption = {
  opens?: string
  closes?: string
  day: number
  value: ShortDay
  isDisabled: boolean
  label: string
}
export const getLibrarySelectOptions = (libraryHours: DayHours[]): HoursSelectOption[] => {
  const rightNow = new Date()

  const sunday = new Date()
  sunday.setDate(sunday.getDate() - rightNow.getDay())
  const saturday = new Date()
  saturday.setDate(saturday.getDate() + (7 - rightNow.getDay()))

  libraryHours = libraryHours.filter(dayHours => {
    const day = new Date(dayHours.day + " 20:00:00")
    return day >= sunday && day <= saturday
  })

  const today = rightNow.toLocaleString("en-us", {weekday: "short", timeZone: "America/Los_Angeles"})

  const hourOptions: HoursSelectOption[] = []

  libraryHours.map(dayHours => {
    const day = new Date(dayHours.day + " 20:00:00")
    let label = day.toLocaleString("en-us", {weekday: "short", timeZone: "America/Los_Angeles"})

    const open = new Date(dayHours.opens_at || "")
    const closed = new Date(dayHours.closes_at || "")

    const dayNumber = day.getDay()
    const dayOfWeek = label

    label += ": "
    if (dayHours.closed) {
      label += " Closed"
    } else {
      const openTime = open.toLocaleTimeString("en-us", {
        timeStyle: "short",
        timeZone: "America/Los_Angeles",
      })
      const closeTime = closed.toLocaleTimeString("en-us", {
        timeStyle: "short",
        timeZone: "America/Los_Angeles",
      })
      label += `${openTime} - ${closeTime}`
    }

    hourOptions.push({
      opens: dayHours.opens_at,
      closes: dayHours.closes_at,
      day: dayNumber,
      value: dayOfWeek as ShortDay,
      isDisabled: dayOfWeek != today,
      label,
    })
  })
  hourOptions.sort((a, b) => a.day - b.day)
  return hourOptions
}
