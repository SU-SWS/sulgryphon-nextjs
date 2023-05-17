import InternalHeaderBanner from "@/components/patterns/internal-header-banner";

export const metadata = {
  title: 'Make an Appointment',
  robots: {
    index: false
  }
}

const Calendar = ({params: {id}}) => {
  return (
    <main id="main-content">
      <InternalHeaderBanner>
        <h1 className="su-max-w-1500 su-mx-auto su-px-50 3xl:su-px-0 su-pt-[110px] su-pb-50 lg:su-pb-20 su-relative su-text-white">Make an Appointment</h1>
      </InternalHeaderBanner>

      <iframe
        src={`https://appointments.library.stanford.edu/widget/appointments?u=${id}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
        title="Schedule an appointment"
        className="su-max-w-1500 su-mx-auto su-w-full su-min-h-[400px] su-h-full su-px-50 3xl:su-px-0"
      />
    </main>
  )
}
export default Calendar;
