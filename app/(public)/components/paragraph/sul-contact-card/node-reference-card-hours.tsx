"use client";

import useLibraryHours, {LocationHours} from "@/lib/hooks/useLibraryHours";
import {ClockIcon} from "@heroicons/react/24/outline";

const NodeReferenceCardHours = ({branchId}) => {
  const date = new Date()
  const currentDay = date.toLocaleDateString('en-us', {weekday: 'long', timeZone: 'America/Los_Angeles'})
  const libraryHours = useLibraryHours(branchId) as LocationHours;
  let libraryCloseTime, libraryOpenTime, isOpen = false;

  if (!libraryHours) {
    return null;
  }

  const libraryPrimaryHours = libraryHours?.primaryHours ?? [];
  const todayHours = libraryPrimaryHours.find(day => day.weekday === currentDay);

  if (todayHours?.opens_at && todayHours.closes_at) {
    const openTime = new Date(todayHours?.opens_at);
    const closeTime = new Date(todayHours?.closes_at);
    isOpen = !todayHours?.closed && date > openTime && date < closeTime;

    libraryCloseTime = closeTime?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: 'America/Los_Angeles'
    })

    libraryOpenTime = openTime?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: 'America/Los_Angeles'
    })
  }

  return (
    <div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
      <ClockIcon width={19} className="su-mr-12 su-mt-01em su-flex-shrink-0"/>
      <div className="su-text-white" aria-live="polite">
        <div className="sm:su-flex">
          {isOpen ? 'Open ' : 'Closed '}
          /
          <div className="sm:su-ml-5">
            {isOpen ? 'Closes at ' + libraryCloseTime : 'Opens at ' + libraryOpenTime}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeReferenceCardHours;