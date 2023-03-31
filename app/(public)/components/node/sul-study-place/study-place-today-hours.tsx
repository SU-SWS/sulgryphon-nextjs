"use client";

import useLibraryHours, {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours";
import {StudyPlace} from "@/lib/drupal/drupal";
import {ClockIcon} from "@heroicons/react/24/outline";
import {ErrorBoundary} from "react-error-boundary";

const StudyPlaceHours = ({node}: { node: StudyPlace }) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <StudyPlaceHoursComponent node={node}/>
    </ErrorBoundary>
  )
}

const StudyPlaceHoursComponent = ({node}: { node: StudyPlace }) => {
  if (!node.sul_study__branch?.su_library__hours) {
    return null;
  }

  const StudyPlaceHours = useLibraryHours(node.sul_study__branch?.su_library__hours) as LocationHours;
  const StudyPlacePrimaryHours = StudyPlaceHours?.primaryHours;

  if (!StudyPlacePrimaryHours) {
    return null;
  }

  const date = new Date()

  const StudyPlaceTodayHours = StudyPlacePrimaryHours.find(day => {
    // Set the time so that it works with UTC time.
    const dayDate = new Date(day.day + " 20:00:00").toLocaleDateString('en-us', {weekday: "long", timeZone: 'America/Los_Angeles'})
    return dayDate === date.toLocaleDateString('en-us', {weekday: "long", timeZone: 'America/Los_Angeles'})
  }) as DayHours;

  let openTime, closeTime, isOpen = false, closedAllDay = StudyPlaceTodayHours?.closed;

  if (!StudyPlaceTodayHours.closed && StudyPlaceTodayHours.opens_at && StudyPlaceTodayHours.closes_at) {
    openTime = new Date(StudyPlaceTodayHours.opens_at);
    closeTime = new Date(StudyPlaceTodayHours.closes_at);
    isOpen = date > openTime && date < closeTime;
  }

  let StudyPlaceCloseTime = closeTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: 'America/Los_Angeles'
  })

  let StudyPlaceOpenTime = openTime?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: 'America/Los_Angeles'
  })

  return (
    <div className="su-flex su-text-black-true su-mb-20 su-type-1">
      <ClockIcon width={19} className="su-mr-12 su-flex-shrink-0"/>
      <div aria-live="polite">
        {!closedAllDay && (isOpen ? 'Closes at ' + StudyPlaceCloseTime : 'Opens at ' + StudyPlaceOpenTime)}
      </div>
    </div>
  )
}
export default StudyPlaceHours;