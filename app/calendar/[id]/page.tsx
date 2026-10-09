import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import CalendarFrameFromUrl from "@/components/patterns/elements/calendar-frame.client"

export const metadata = {
  title: "Make an Appointment",
  robots: {
    index: false,
  },
}

// The calendar id is read in the browser (see CalendarFrameFromUrl), so this one static page serves every id.
const Calendar = () => {
  return (
    <main id="main-content">
      <InternalHeaderBanner>
        <h1 className="relative mx-auto mt-80 mb-50 w-full max-w-[calc(100vw-10rem)] p-0 md:mt-100 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]">
          Make an Appointment
        </h1>
      </InternalHeaderBanner>

      <CalendarFrameFromUrl className="centered h-full min-h-[400px] px-50 3xl:px-0" />
    </main>
  )
}

export default Calendar
