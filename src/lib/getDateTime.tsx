export const getDateString = (start: Date, end: Date): string | null => {
  const timeZone = "America/Los_Angeles"

  const startDateString = start.toLocaleDateString("en-US", {timeZone})
  const endDateString = end.toLocaleDateString("en-US", {timeZone})

  // Multiple days - return date range
  if (startDateString !== endDateString) {
    return (
      start.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone,
      }) +
      " - " +
      end.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone,
      })
    )
  }

  // Single day - return the date
  return start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  })
}

export const getTimeString = (start: Date, end: Date): string | null => {
  const timeZone = "America/Los_Angeles"

  const startHour = parseInt(
    start.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    })
  )
  const startMinute = parseInt(
    start.toLocaleTimeString("en-US", {
      minute: "numeric",
      hour12: false,
      timeZone,
    })
  )
  const endHour = parseInt(
    end.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    })
  )
  const endMinute = parseInt(
    end.toLocaleTimeString("en-US", {
      minute: "numeric",
      hour12: false,
      timeZone,
    })
  )

  // All Day event - return null (no time to display)
  if ((startHour === 24 || startHour === 0) && startMinute === 0 && endHour === 23 && endMinute === 59) {
    return null
  }

  // Different start and end times
  if (startHour !== endHour || startMinute !== endMinute) {
    const startTime = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone,
    })
    const endTime = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone,
    })
    return `${startTime} - ${endTime}`
  }

  // Same start and end times
  return start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone,
  })
}

export const isAllDay = (start: Date, end: Date): boolean => {
  const timeZone = "America/Los_Angeles"

  const startHour = parseInt(
    start.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    })
  )
  const startMinute = parseInt(
    start.toLocaleTimeString("en-US", {
      minute: "numeric",
      hour12: false,
      timeZone,
    })
  )
  const endHour = parseInt(
    end.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    })
  )
  const endMinute = parseInt(
    end.toLocaleTimeString("en-US", {
      minute: "numeric",
      hour12: false,
      timeZone,
    })
  )

  return (startHour === 24 || startHour === 0) && startMinute === 0 && endHour === 23 && endMinute === 59
}
