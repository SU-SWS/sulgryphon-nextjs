import Link from "@/components/patterns/elements/drupal-link"
import {CalendarIcon} from "@heroicons/react/24/solid"
import IconLinkContent from "@/components/patterns/elements/icon-link-content"

const LibCal = ({libcalId, srText}: {libcalId: number; srText: string}) => {
  return (
    <div>
      {/* The icon is inside the link so it takes the link's colour and hover box. */}
      <Link href={`/calendar/${libcalId}`} className="link-cta text-left font-semibold" aria-haspopup="dialog">
        <IconLinkContent icon={<CalendarIcon aria-hidden="true" width={20} className="mr-6" />}>
          Schedule an appointment<span className="sr-only">&nbsp;for {srText}</span>
        </IconLinkContent>
      </Link>
    </div>
  )
}
export default LibCal
