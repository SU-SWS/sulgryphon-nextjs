import Link from "@/components/patterns/elements/drupal-link"
import {CalendarIcon} from "@heroicons/react/24/solid"

const LibCal = ({libcalId, srText}: {libcalId: number; srText: string}) => {
  return (
    <div>
      {/* The icon is inside the link so it takes the link's colour and hover box. */}
      <Link
        href={`/calendar/${libcalId}`}
        className="link-cta pl-[26px] text-left -indent-[26px] font-semibold"
        aria-haspopup="dialog"
      >
        <span className="whitespace-nowrap">
          <CalendarIcon aria-hidden="true" width={20} className="mr-6 inline-block align-text-bottom" />
          &#65279;
        </span>
        Schedule an appointment<span className="sr-only">&nbsp;for {srText}</span>
      </Link>
    </div>
  )
}
export default LibCal
