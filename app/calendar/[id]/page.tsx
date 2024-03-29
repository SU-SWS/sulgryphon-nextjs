import InternalHeaderBanner from "@/components/patterns/internal-header-banner";

export const metadata = {
  title: 'Make an Appointment',
  robots: {
    index: false
  }
}

export const revalidate = false;
export const dynamic = 'force-static';

const Calendar = ({params: {id}}: {params: {id: string}}) => {
  return (
    <main id="main-content">
      <InternalHeaderBanner>
        <h1
          className="w-full max-w-[calc(100vw-10rem)] md::max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto relative text-white mt-80 md:mt-100 mb-50 p-0">
          Make an Appointment
        </h1>
      </InternalHeaderBanner>

      <iframe
        src={`https://appointments.library.stanford.edu/widget/appointments?u=${id}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
        title="Schedule an appointment"
        className="centered min-h-[400px] h-full px-50 3xl:px-0"
      />
    </main>
  )
}


export default Calendar;
