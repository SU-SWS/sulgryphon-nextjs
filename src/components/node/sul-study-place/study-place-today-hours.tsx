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
  const hoursDisplay = closedAllDay ? 'Closed' : (isOpen ? 'Closes at ' + closingTime : (afterClose ? 'Closed at ' + closingTime : 'Opens at ' + openingTime));

  return (
    <div className="flex text-black-true mb-20 type-0">
      <ClockIcon title="Hours" width={19} className="mr-12 flex-shrink-0"/>
      <div aria-live="polite">
        {hoursDisplay}
      </div>
    </div>
  )
}
export default StudyPlaceHours;