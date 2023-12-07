import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours";
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options";

interface HoursProps {
  closedAllDay: boolean
  isOpen: boolean
  openingTime: string
  closingTime: string
  afterClose: boolean
  selectOptions: [{
    opens: string,
    closes: string,
    day: number,
    value: string,
    isDisabled: boolean,
    label: string
  }]
}

const useTodayLibraryHours = (branchId): HoursProps | null => {
  const libraryHours = useLibraryHours(branchId) as LocationHours;
  if (!libraryHours || !libraryHours?.primaryHours) {
    return null;
  }

  const rightNow = new Date()

  const todayHours = libraryHours.primaryHours.find(day => {
    // Set the time so that it works with UTC time.
    const dayDate = new Date(day.day + " 20:00:00").toLocaleDateString('en-us', {weekday: "long", timeZone: 'America/Los_Angeles'})
    return dayDate === rightNow.toLocaleDateString('en-us', {weekday: "long", timeZone: 'America/Los_Angeles'})
  }) as DayHours;

  let openTime, closeTime, isOpen = false, closedAllDay = todayHours?.closed;

  if (!todayHours.closed && todayHours.opens_at && todayHours.closes_at) {
    openTime = new Date(todayHours.opens_at);
    closeTime = new Date(todayHours.closes_at);
    isOpen = rightNow > openTime && rightNow < closeTime;
  }

  const closingTime = closeTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: 'America/Los_Angeles'
  }) ?? null;

  const openingTime = openTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: 'America/Los_Angeles'
  }) ?? null;

  const selectOptions = getLibrarySelectOptions(libraryHours.primaryHours);

  const afterClose = closeTime <= rightNow
  return {closedAllDay, isOpen, openingTime, closingTime, selectOptions, afterClose}
}

export default useTodayLibraryHours;