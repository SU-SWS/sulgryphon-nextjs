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
      <ClockIcon
        width={19}
        className="su-mr-12 su-mt-01em su-flex-shrink-0"
      />
      <div className="su-text-white">
        {isOpen ? 'Open' : 'Closed'}
        <span className="su-mx-5">/</span>
        {hoursDisplay}
        <span className="su-mx-5">/</span>
        <a className="su-text-white su-font-normal hocus:su-text-illuminating-dark hocus:su-no-underline"
           href={`https://library-hours.stanford.edu/libraries/${branchId}`}>
          See all hours
        </a>
      </div>
    </div>
  )
}

export default NodeReferenceCardHours;