"use client"

import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {getLibrarySelectOptions, HoursSelectOption} from "@/components/node/sul-library/library-select-options"
import {useIsClient} from "usehooks-ts"

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
  if (!useIsClient() || !libraryHours || !libraryHours?.primaryHours) {
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
    isOpen = rightNow >= openTime && rightNow < closeTime
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
    const futureOpenHours = libraryHours.primaryHours.filter(
      dayHours => dayHours.opens_at && new Date(dayHours.opens_at) > rightNow
    )

    for (let i = 0; i < futureOpenHours.length; i++) {
      if (futureOpenHours[i].opens_at) {
        nextOpenDateTime = new Date(futureOpenHours[i].opens_at as string)
        i = futureOpenHours.length + 1
      }
    }

    if (nextOpenDateTime) {
      const format: Intl.DateTimeFormatOptions = {hour: "numeric", timeZone: "America/Los_Angeles"}

      // Default to the show the day of the week.
      nextOpeningTime = nextOpenDateTime.toLocaleDateString("en-us", {
        weekday: "long",
        timeZone: "America/Los_Angeles",
      })

      // Next open date is tomorrow. Check for tomorrow date and if it's the last day of the month.
      if (
        getDate(rightNow) + 1 === getDate(nextOpenDateTime) ||
        (getMonth(rightNow) != getMonth(nextOpenDateTime) && getDate(nextOpenDateTime) === 1)
      )
        nextOpeningTime = "tomorrow"

      // Next open date is today.
      if (getDate(rightNow) === getDate(nextOpenDateTime)) nextOpeningTime = "today"

      if (nextOpenDateTime.getMinutes() !== 0) format.minute = "2-digit"

      nextOpeningTime += " at " + nextOpenDateTime.toLocaleString("en-us", format).toLowerCase()
    }
  }

  return {closedAllDay, isOpen, openingTime, closingTime, selectOptions, afterClose, nextOpeningTime}
}

const getDate = (dateTime: Date) => {
  return parseInt(dateTime.toLocaleDateString("en-us", {day: "numeric", timeZone: "America/Los_Angeles"}))
}
const getMonth = (dateTime: Date) => {
  return parseInt(dateTime.toLocaleDateString("en-us", {month: "numeric", timeZone: "America/Los_Angeles"}))
}

export default useTodayLibraryHours
