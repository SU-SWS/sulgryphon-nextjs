"use client";

import useLibraryHours, {LocationHours} from "@/lib/hooks/useLibraryHours";
import {useId} from "react";
import {Library} from "@/lib/drupal/drupal";
import Select from "react-select";
import {ClockIcon} from "@heroicons/react/24/outline";
import {getLibrarySelectOptions} from "@/components/node/sul-library/library-select-options";
import {ErrorBoundary} from "react-error-boundary";

const LibraryHeaderHours = ({node}: { node: Library }) => {
  return (
    <ErrorBoundary
      fallback={<></>}
      onError={e => console.error(e.message)}
    >
      <LibraryHeaderHoursComponent node={node}/>
    </ErrorBoundary>
  )
}

const LibraryHeaderHoursComponent = ({node}: { node: Library }) => {
  if (!node.su_library__hours) {
    return null;
  }

  const inputId = useId();
  const libraryHours = useLibraryHours(node.su_library__hours) as LocationHours;
  const libraryPrimaryHours = libraryHours?.primaryHours;

  if (!libraryPrimaryHours) {
    return null;
  }

  const hourOptions = getLibrarySelectOptions(libraryPrimaryHours);
  if (hourOptions.length === 0) {
    return null;
  }

  const today = new Date().toLocaleString('en-us', {weekday: 'short', timeZone: 'America/Los_Angeles'});
  const todayHours = hourOptions.find(option => option.value === today)

  const open = new Date(todayHours.opens ?? '');
  const closed = new Date(todayHours.closes ?? '');

  const rightNow = new Date();
  const isOpen = todayHours.closed ? false : open <= rightNow && closed >= rightNow;

  return (
    <>
      <div className="su-flex su-text-black-true su-mb-20 su-type-1">
        <ClockIcon width={19} className="su-inline su-mr-10"/>
        {isOpen ? 'Open' : 'Closed'}
      </div>
      <Select
        className="su-text-black-true"
        instanceId={`${inputId}-hours`}
        aria-label="Day of the week hours"
        options={hourOptions}
        defaultValue={todayHours}
        isSearchable={false}
      />
    </>
  )
}
export default LibraryHeaderHours;