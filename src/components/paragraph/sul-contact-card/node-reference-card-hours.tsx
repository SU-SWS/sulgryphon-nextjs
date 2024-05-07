"use client";

import {ClockIcon} from "@heroicons/react/24/outline";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";

const NodeReferenceCardHours = ({branchId, branchName}: { branchId: string, branchName: string }) => {
  const hours = useTodayLibraryHours(branchId);
  if (!hours) {
    return null;
  }
  const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = hours;
  const hoursDisplay = closedAllDay ? 'Closed' : (isOpen ? 'Closes at ' + closingTime : (afterClose ? 'Closed at ' + closingTime : 'Opens at ' + openingTime));

  return (
    <div className="relative flex flex-row items-start rs-mb-0 type-0">
      <ClockIcon
        width={19}
        className="mr-12 mt-01em flex-shrink-0"
      />
      <div className="text-white">
        {isOpen && <>Open<span className="mx-5">&nbsp;/&nbsp;</span></>}

        {hoursDisplay}
        <span className="mx-5">&nbsp;/&nbsp;</span>
        <a className="text-white font-normal hocus:text-illuminating-dark hocus:no-underline"
           href={`https://library-hours.stanford.edu/libraries/${branchId}`}>
          See all hours<span className="sr-only">&nbsp;for{branchName}</span>
        </a>
      </div>
    </div>
  )
}

export default NodeReferenceCardHours;