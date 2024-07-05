import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {getLibrarySelectOptions, HoursSelectOption} from "@/components/node/sul-library/library-select-options"

type HoursProps = {
  closedAllDay: boolean
  isOpen: boolean
  openingTime?: string
  closingTime?: string
  afterClose: boolean
  selectOptions: HoursSelectOption[]
  nextOpeningTime?: string
}

const useTodayLibraryHours = (branchId?: string): HoursProps | undefined => {
  const libraryHours = useLibraryHours<LocationHours>(branchId)
  if (!libraryHours || !libraryHours?.primaryHours) {
    return
  }

  const rightNow = new Date()

  const todayHours = libraryHours.primaryHours.find(day => {
    // Set the time so that it works with UTC time.
    const dayDate = new Date(day.day + " 20:00:00").toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
    return dayDate === rightNow.toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
  }) as DayHours

  let openTime,
    closeTime,
    isOpen = false,
    closedAllDay = todayHours?.closed

  if (!todayHours.closed && todayHours.opens_at && todayHours.closes_at) {
    openTime = new Date(todayHours.opens_at)
    closeTime = new Date(todayHours.closes_at)
    isOpen = rightNow > openTime && rightNow < closeTime
  }

  const closingTime = closeTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Los_Angeles",
  })

  const openingTime = openTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Los_Angeles",
  })

  const selectOptions = getLibrarySelectOptions(libraryHours.primaryHours)

  const afterClose = (closeTime && closeTime <= rightNow) || false
  let nextOpeningTime = undefined

  // If the location is open, no need to return the next open time.
  if (!isOpen) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dayHours
    // Start with tomorrow and find the next day that has a time that is open.
    for (let i = rightNow.getDay(); i < 7; i++) {
      dayHours = libraryHours.primaryHours.find(day => day.weekday === weekdays[i])
      if (dayHours?.opens_at) {
        const format: Intl.DateTimeFormatOptions = {weekday: "short", hour: "numeric"}
        const openDateTime = new Date(dayHours.opens_at)

        if (openDateTime < rightNow) continue

        if (openDateTime.getMinutes() !== 0) {
          format.minute = "2-digit"
        }
        nextOpeningTime = openDateTime.toLocaleString("en-us", format)
        i += 6
      }
    }
  }

  return {closedAllDay, isOpen, openingTime, closingTime, selectOptions, afterClose, nextOpeningTime}
}

export default useTodayLibraryHours
