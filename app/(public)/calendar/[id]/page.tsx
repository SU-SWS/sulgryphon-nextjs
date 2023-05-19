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
        <h1
          className="su-w-full su-max-w-[calc(100vw-10rem)] md::su-max-w-[calc(100vw-20rem)] 3xl:su-max-w-[calc(1500px-20rem)] su-mx-auto su-relative su-text-white su-mt-80 md:mt-100 su-mb-50 su-p-0">
          Make an Appointment
        </h1>
      </InternalHeaderBanner>

      <iframe
        src={`https://appointments.library.stanford.edu/widget/appointments?u=${id}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
        title="Schedule an appointment"
        className="su-centered su-min-h-[400px] su-h-full su-px-50 3xl:su-px-0"
      />
    </main>
  )
}
export default Calendar;
