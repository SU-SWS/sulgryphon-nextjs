import {HTMLAttributes} from "react"

// LibCal user ids are numeric. Anything else would add parameters to the widget's query string.
const CALENDAR_ID = /^\d{1,12}$/

export const isCalendarId = (id?: string | null): id is string => !!id && CALENDAR_ID.test(id)

/** The LibCal appointment widget for a calendar (LibCal user) id. Renders nothing for an invalid id. */
const CalendarFrame = ({id, ...props}: Omit<HTMLAttributes<HTMLIFrameElement>, "id"> & {id?: string | null}) => {
  if (!isCalendarId(id)) return null

  return (
    <iframe
      {...props}
      src={`https://appointments.library.stanford.edu/widget/appointments?u=${encodeURIComponent(id)}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
      title="Schedule an appointment"
    />
  )
}

export default CalendarFrame
