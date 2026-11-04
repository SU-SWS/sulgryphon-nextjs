import InterceptionModal from "@/components/patterns/modals/interception-modal"
import CalendarFrame, {isCalendarId} from "@/components/patterns/elements/calendar-frame"

type Props = {params: Promise<{id: string}>}

// Params are awaited outside Suspense, as in [...slug]: each calendar id renders on its first request and
// is then cached, instead of rendering on every visit.
const Calendar = async ({params}: Props) => {
  const {id} = await params
  if (!isCalendarId(id)) return null

  return (
    <InterceptionModal aria-labelledby={`calendar-${id}`}>
      <div className="bg-[#fbfbf9]">
        <h2 id={`calendar-${id}`} className="p-40">
          Schedule an appointment
        </h2>
        <CalendarFrame id={id} className="h-full min-h-[600px] w-full p-40" />
      </div>
    </InterceptionModal>
  )
}

// Cache Components needs one param to validate the route. Real calendar ids render on their first request.
export const generateStaticParams = async () => [{id: "placeholder"}]

export default Calendar
