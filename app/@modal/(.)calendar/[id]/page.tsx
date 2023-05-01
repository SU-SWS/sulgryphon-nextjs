import InterceptionModal from "../../interception-modal";

const Calendar = ({params: {id}}) => {
  return (
    <InterceptionModal>
      <iframe
        src={`https://appointments.library.stanford.edu/widget/appointments?u=${id}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
        title="Schedule an appointment"
        className="su-w-full su-h-full su-min-h-[600px]"
      />
    </InterceptionModal>
  )
}


export default Calendar;