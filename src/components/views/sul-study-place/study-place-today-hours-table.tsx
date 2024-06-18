"use client";

import {ClockIcon} from "@heroicons/react/24/outline";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";
import CachedClientFetch from "@/components/utils/cached-client-fetch";

const StudyPlaceHours = ({hoursId}: { hoursId: string }) => {
  return (
    <CachedClientFetch>
      <StudyPlaceHoursComponent hoursId={hoursId}/>
    </CachedClientFetch>
  )
}

const StudyPlaceHoursComponent = ({hoursId}: { hoursId: string }) => {
  const hours = useTodayLibraryHours(hoursId);
  if (!hours) {
    return null;
  }

  const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = hours;
  // This is the open text.
  const openUntil = "Open";
  // This is for the open or closed text.
  const openClosed = isOpen ? openUntil  : (afterClose ? openUntil : "Closed ");
  // This is for the time logic.
  const hoursDisplay = closedAllDay ? 'Closed' : (isOpen ? closingTime : (afterClose ? closingTime : openingTime));

  return (
    <div className="flex text-black-true mb-20 type-0">

      <div aria-live="polite" className="centered">
        <div>
          <span className="rounded-full p-[1rem] fit-content inline-block bg-digital-green text-white">{openClosed}</span>
          <time className="block" dateTime={hoursDisplay}>until {hoursDisplay}</time>
        </div>
      </div>
    </div>
  )
}
export default StudyPlaceHours;