import InterceptionModal from "@/components/patterns/modals/interception-modal"
import {useId} from "react"

const Calendar = ({params: {id}}: {params: {id: string}}) => {
  const headingId = useId()
  return (
    <InterceptionModal aria-labelledby={headingId}>
      <div className="bg-[#fbfbf9]">
        <h2 id={headingId} className="p-40">
          Schedule an appointment
        </h2>
        <iframe
          src={`https://appointments.library.stanford.edu/widget/appointments?u=${id}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
          title="Schedule an appointment"
          className="h-full min-h-[600px] w-full p-40"
        />
      </div>
    </InterceptionModal>
  )
}

export default Calendar
