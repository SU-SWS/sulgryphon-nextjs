import {CalendarDaysIcon, MapPinIcon, ClockIcon} from "@heroicons/react/24/outline"
import Link from "@/components/patterns/elements/drupal-link"
import Image from "next/image"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d"
import {getDateString, getTimeString, isAllDay} from "@/lib/getDateTime"

interface Props {
  node: NodeStanfordEvent
  h3Heading?: boolean
}

const StanfordEventCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"
  const start = new Date(node.suEventDateTime.value * 1000)
  const end = new Date(node.suEventDateTime.end_value * 1000)
  const startMonth = start.toLocaleDateString("en-US", {month: "short", timeZone: "America/Los_Angeles"})
  const startDay = parseInt(start.toLocaleDateString("en-US", {day: "numeric", timeZone: "America/Los_Angeles"}))

  const endMonth = end.toLocaleDateString("en-US", {month: "short", timeZone: "America/Los_Angeles"})
  const endDay = parseInt(end.toLocaleDateString("en-US", {day: "numeric", timeZone: "America/Los_Angeles"}))

  // Fix difference between server side render and client side render. Replace any strange characters.
  const dateString = getDateString(start, end)?.replace(/[^a-zA-Z0-9 ,:\-|]/, " ")
  const timeString = getTimeString(start, end)?.replace(/[^a-zA-Z0-9 ,:\-|]/, " ")
  const isAllDayEvent = isAllDay(start, end)

  const imageUrl = node.sulEventImage?.mediaImage.url
  const goToUrl = (node.suEventSource?.url || node.path || "#").replaceAll(" ", "%20")

  return (
    <article {...props} className="mx-auto @container">
      <div className="relative">
        {imageUrl && (
          <div className={"relative aspect-[4/3] overflow-hidden"} aria-hidden="true">
            <Image
              className="object-cover object-center"
              src={buildUrl(imageUrl).toString()}
              alt=""
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        )}

        <div className="flex flex-col items-start gap-xs">
          <div className="flex w-full flex-row items-center bg-black-true text-center uppercase text-white" aria-hidden>
            <div className="mx-auto flex flex-col items-center">
              <div className="px-30 pt-10 text-24 font-semibold leading-display">{startMonth}</div>
              <div className="px-30 pb-10 text-[4rem] leading-display">{startDay}</div>
            </div>

            {(startMonth !== endMonth || startDay !== endDay) && (
              <>
                <div className="font-bold">&mdash;</div>
                <div className="mx-auto">
                  <div className="px-30 pt-10 text-24 font-semibold leading-display">{endMonth}</div>
                  <div className="px-30 pb-10 text-[4rem] leading-display">{endDay}</div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-[.5rem]">
            <HeadingElement className="order-2 text-18 font-bold tracking-[-0.2px] sm:text-20">
              <Link
                href={goToUrl}
                className="stretched-link text-black-true no-underline hocus:text-brick-dark hocus:underline"
              >
                {node.title}
              </Link>
            </HeadingElement>

            {node.suEventType?.[0]?.name && (
              <div className="order-1 mr-5 inline text-16 font-semibold uppercase text-cardinal-red sm:text-18">
                {node.suEventType?.[0].name}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[.5rem]">
        <div className="order-3 flex text-16 sm:text-18">
          <CalendarDaysIcon title="Date" width={20} className="mr-20 flex-shrink-0" />
          {dateString}
        </div>

        {(isAllDayEvent || timeString) && (
          <div className="order-4 flex text-16 sm:text-18">
            <ClockIcon title="Hours" width={20} className="mr-20 flex-shrink-0" />
            {timeString || "All day"}
          </div>
        )}

        {node.suEventMapLink?.url && (
          <div className="order-5 flex text-16 sm:text-18">
            <MapPinIcon title="Location" width={20} className="mr-20 flex-shrink-0" />
            <Link href={node.suEventMapLink?.url.replaceAll(" ", "%20")}>
              {node.suEventAltLoc || node.suEventMapLink?.title}
            </Link>
          </div>
        )}

        {node.sulEventExperience === "virtual" && (
          <div className="order-5 flex text-16 sm:text-18">
            <MapPinIcon title="Location" width={20} className="mr-20 flex-shrink-0" />
            <span>Virtual event</span>
          </div>
        )}
      </div>
    </article>
  )
}

export default StanfordEventCard
