"use client"

import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours"
import CachedClientFetch from "@/components/utils/cached-client-fetch"

const StudyPlaceHours = ({hoursId}: {hoursId: string}) => {
  return (
    <CachedClientFetch>
      <StudyPlaceHoursComponent hoursId={hoursId} />
    </CachedClientFetch>
  )
}

const StudyPlaceHoursComponent = ({hoursId}: {hoursId: string}) => {
  const hours = useTodayLibraryHours(hoursId)
  if (!hours) {
    return null
  }

  const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = hours
  // This is the open text.
  const openUntil = "Open"
  // This is for the open or closed text.
  const openClosed = isOpen ? openUntil : afterClose ? openUntil : "Closed "
  // This is for the time logic.
  const hoursDisplay = closedAllDay ? "Closed" : isOpen ? closingTime : afterClose ? closingTime : openingTime

  return (
    <div className="type-0 centered mb-20 text-black-true">
      <div
        aria-live="polite"
        className="text-left md:text-center"
      >
        <div>
          <span className="fit-content inline-block rounded-full bg-digital-green p-[1rem] text-white">{openClosed}</span>
          <time
            className="block"
            dateTime={hoursDisplay}
          >
            until {hoursDisplay}
          </time>
        </div>
      </div>
    </div>
  )
}
export default StudyPlaceHours
