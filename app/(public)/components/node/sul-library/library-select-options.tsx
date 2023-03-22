export const getLibrarySelectOptions = (libraryHours) => {
  const rightNow = new Date()
  const today = rightNow.toLocaleString('en-us', {weekday: 'short', timeZone: 'America/Los_Angeles'});

  const hourOptions: any = [];

  libraryHours.map(dayHours => {
    let label = new Date(dayHours.day).toLocaleString('en-us', {weekday: 'short', timeZone: 'UTC'});

    const open = new Date(dayHours.opens_at ?? '');
    const closed = new Date(dayHours.closes_at ?? '');

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
    hourOptions.push({
      opens: dayHours.opens_at,
      closes: dayHours.closes_at,
      day: dayNumber,
      value: dayOfWeek,
      isDisabled: dayOfWeek != today,
      label
    })
  })
  hourOptions.sort((a, b) => a.day - b.day);
  return hourOptions;
}
