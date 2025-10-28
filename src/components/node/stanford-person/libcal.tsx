import Link from "@/components/patterns/elements/drupal-link"
import {CalendarIcon} from "@heroicons/react/24/solid"

const LibCal = ({libcalId, srText}: {libcalId: number; srText: string}) => {
  return (
    <div className="flex flex-row items-center">
      <CalendarIcon title="Calendar" width={20} className="mr-6 inline-block text-digital-blue" />
      <Link
        href={`/calendar/${libcalId}`}
        className="break-words text-digital-blue no-underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
        aria-haspopup="dialog"
      >
        Schedule an appointment<span className="sr-only">&nbsp;for {srText}</span>
      </Link>
    </div>
  )
}
export default LibCal
