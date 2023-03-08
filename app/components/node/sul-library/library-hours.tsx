"use client";

import useLibraryHours from "@/lib/hooks/useLibraryHours";
import {useId} from "react";
import {Library} from "@/lib/drupal/drupal";
import Select from "react-select";
import {ClockIcon} from "@heroicons/react/24/outline";

const LibraryHeaderHours = ({node}: { node: Library }) => {
  const inputId = useId();
  const hours = useLibraryHours();

  const libraryHours = hours[node.su_library__hours];
  const libraryPrimaryHours = libraryHours?.primary_hours;

  if (!libraryPrimaryHours) {
    return null;
  }

  const rightNow = new Date()
  const today = rightNow.toLocaleString('en-us', {weekday: 'short', timeZone: 'America/Los_Angeles'});

  const hourOptions: any = [];

  let isOpen = false;
  libraryPrimaryHours.map(dayHours => {
    let label = new Date(dayHours.day).toLocaleString('en-us', {weekday: 'short', timeZone: 'UTC'});

    const open = new Date(dayHours.opens_at ?? '');
    const closed = new Date(dayHours.closes_at ?? '');

    if (label === today) {
      isOpen = dayHours.closed ? false : open <= rightNow && closed >= rightNow;
    }

    const dayNumber = new Date(dayHours.day).getDay();
    const dayOfWeek = label;

    label += ': ';
    if (dayHours.closed) {
      label += ' Closed';
    } else {
      const openTime = open.toLocaleString('en-us', {
        timeStyle: 'short',
        timeZone: 'America/Los_Angeles'
      });
      const closeTime = closed.toLocaleString('en-us', {
        timeStyle: 'short',
        timeZone: 'America/Los_Angeles'
      });
      label += `${openTime} - ${closeTime}`
    }
    hourOptions.push({day: dayNumber, value: dayOfWeek, isDisabled: dayOfWeek != today, label})
  })
  hourOptions.sort((a, b) => a.day - b.day);

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
        defaultValue={hourOptions.find(option => option.value === today)}
      />
    </>
  )
}
export default LibraryHeaderHours;