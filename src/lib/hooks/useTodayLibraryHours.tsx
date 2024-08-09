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
    const dayDate = new Date(day.day + " 20:00:00").toLocaleDateString("en-us", {
      weekday: "long",
      timeZone: "America/Los_Angeles",
    })
    return dayDate === rightNow.toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
  }) as DayHours

  if (!todayHours) return

  let openTime,
    closeTime,
    isOpen = false,
    closedAllDay = todayHours?.closed

  if (!todayHours.closed && todayHours.opens_at && todayHours.closes_at) {
    openTime = new Date(todayHours.opens_at)
    closeTime = new Date(todayHours.closes_at)
    isOpen = rightNow > openTime && rightNow < closeTime
  }

  const closingTime = closeTime
    ?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "America/Los_Angeles",
    })
    .toLowerCase()

  const openingTime = openTime
    ?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "America/Los_Angeles",
    })
    .toLowerCase()

  const selectOptions = getLibrarySelectOptions(libraryHours.primaryHours)

  const afterClose = (closeTime && closeTime <= rightNow) || false
  let nextOpeningTime = undefined
  let nextOpenDateTime = undefined

  // If the location is open, no need to return the next open time.
  if (!isOpen) {
    const futureHours = libraryHours.primaryHours.filter(
      dayHours => dayHours.opens_at && new Date(dayHours.opens_at) > rightNow
    )
    const futureHourDateTime = new Date()

    for (let i = 0; i < futureHours.length; i++) {
      if (new Date(futureHours[i].opens_at as string).getDate() === rightNow.getDate()) {
        nextOpenDateTime = new Date(futureHours[i].opens_at as string)
        i = futureHours.length + 1
      }
      futureHourDateTime.setDate(futureHourDateTime.getDate() + 1)
    }

    if (nextOpenDateTime) {
      const format: Intl.DateTimeFormatOptions = {hour: "numeric"}

      if (rightNow.getDay() + 2 <= nextOpenDateTime.getDate())
        nextOpeningTime = nextOpenDateTime.toLocaleDateString("en-us", {weekday: "long"})
      if (rightNow.getDate() + 1 === nextOpenDateTime.getDate()) nextOpeningTime = "tomorrow"
      if (rightNow.getDate() === nextOpenDateTime.getDate()) nextOpeningTime = "today"

      if (nextOpenDateTime.getMinutes() !== 0) format.minute = "2-digit"

      nextOpeningTime += " " + nextOpenDateTime.toLocaleString("en-us", format).toLowerCase()
    }
  }

  return {closedAllDay, isOpen, openingTime, closingTime, selectOptions, afterClose, nextOpeningTime}
}

export default useTodayLibraryHours
