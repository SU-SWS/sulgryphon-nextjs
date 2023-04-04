"use client";

import {ClockIcon} from "@heroicons/react/24/outline";
import useTodayLibraryHours from "@/lib/hooks/useTodayLibraryHours";

const NodeReferenceCardHours = ({branchId}) => {
  const hours = useTodayLibraryHours(branchId);
  if (!hours) {
    return null;
  }
  const {closedAllDay, isOpen, openingTime, closingTime, afterClose} = hours;
  const hoursDisplay = closedAllDay ? 'Closed' : (isOpen ? 'Closes at ' + closingTime : (afterClose ? 'Closed at ' + closingTime : 'Opens at ' + openingTime));

  return (
    <div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
      <ClockIcon width={19} className="su-mr-12 su-mt-01em su-flex-shrink-0"/>
      <div className="su-text-white" aria-live="polite">
        <div className="sm:su-flex">
          {isOpen ? 'Open ' : 'Closed '}
          /
          <div className="sm:su-ml-5">
            {hoursDisplay}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeReferenceCardHours;