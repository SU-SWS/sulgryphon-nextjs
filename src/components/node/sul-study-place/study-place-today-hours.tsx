"use client"

import {ClockIcon} from "@heroicons/react/24/outline"
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours"

const StudyPlaceHours = ({hoursId}: {hoursId: string}) => {
  return <StudyPlaceHoursComponent hoursId={hoursId} />
}

const StudyPlaceHoursComponent = ({hoursId}: {hoursId: string}) => {
  const hours = useTodayLibraryHours(hoursId)
  if (!hours) {
    return null
  }
  const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = hours
  const hoursDisplay = closedAllDay
    ? "Closed"
    : isOpen
      ? "Closes at " + closingTime
      : afterClose
        ? "Closed at " + closingTime
        : "Opens at " + openingTime

  return (
    <div className="mb-20 flex type-0 text-black-true">
      <ClockIcon title="Hours" width={19} className="mr-12 shrink-0" />
      <div aria-live="polite">{hoursDisplay}</div>
    </div>
  )
}
export default StudyPlaceHours
