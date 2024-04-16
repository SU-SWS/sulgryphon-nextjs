import {CalendarDaysIcon} from "@heroicons/react/20/solid";
import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {ClockIcon, MapPinIcon} from "@heroicons/react/24/outline";

import {buildUrl} from "@/lib/drupal/utils";
import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  node: NodeStanfordEvent
  h3Heading?: boolean
}

const StanfordEventCard = ({node, h3Heading, ...props}: Props) => {

  const HeadingElement = h3Heading ? 'h3' : 'h2';
  const start = new Date(node.suEventDateTime.value * 1000);
  const end = new Date(node.suEventDateTime.end_value * 1000);
  const startMonth = start.toLocaleDateString("en-US", {month: "short", timeZone: 'America/Los_Angeles'})
  const startDay = parseInt(start.toLocaleDateString("en-US", {day: "numeric", timeZone: 'America/Los_Angeles'}))

  const endMonth = end.toLocaleDateString("en-US", {month: "short", timeZone: 'America/Los_Angeles'})
  const endDay = parseInt(end.toLocaleDateString("en-US", {day: "numeric", timeZone: 'America/Los_Angeles'}))

  // Fix difference between server side render and client side render. Replace any strange characters.
  const dateTimeString = getTimeString(start, end).replace(/[^a-zA-Z0-9 ,:\-|]/, ' ');

  const imageUrl = node.sulEventImage?.mediaImage.url;
  const goToUrl = node.suEventSource?.url || node.path;

  return (
    <article {...props} className="@container mx-auto">
      {imageUrl &&
        <div
          className={"overflow-hidden aspect-[4/3] relative"}
          aria-hidden="true"
        >
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            sizes="(max-width: 1700px) 100vw, 1500px"
          />
        </div>
      }

      <div className="flex items-start gap-xl flex-col">
        <div
          className="flex w-full flex-row items-center bg-black-true text-white text-center uppercase"
          aria-hidden
        >
          <div className="flex flex-col items-center mx-auto">
            <div
              className="pt-20 px-30 font-semibold">
              {startMonth}
            </div>
            <div className="pb-20 px-30 text-m4">
              {startDay}
            </div>
          </div>


          {(startMonth !== endMonth || startDay !== endDay) &&
            <>
              <div className="font-bold">&mdash;</div>
              <div className="mx-auto">
                <div
                  className="pt-20 px-30 font-semibold">
                  {endMonth}
                </div>
                <div className="pb-20 px-30 text-m4">
                  {endDay}
                </div>
              </div>
            </>
          }
        </div>

        <div className="flex flex-col gap-[1.2rem]">
          <HeadingElement className="text-m1 order-2">
            <Link href={goToUrl}
                  className="text-black-true hover:text-brick-dark underline hover:no-underline">
              {node.title}
            </Link>
          </HeadingElement>

          {node.suEventType?.[0]?.name &&
            <div className="order-1 inline mr-5 font-semibold">{node.suEventType?.[0].name}</div>
          }


          <div className="flex order-3">
            <CalendarDaysIcon width={20} className="mr-20 flex-shrink-0"/>
            {start.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'})}
          </div>

          <div className="flex order-4">
            <ClockIcon width={20} className="mr-20 flex-shrink-0"/>
            <div>{dateTimeString}</div>
          </div>

          {node.suEventMapLink?.url &&
            <div className="flex order-5">
              <MapPinIcon width={20} className="mr-20 flex-shrink-0"/>
              <Link href={node.suEventMapLink?.url}>
                {node.suEventMapLink?.title}
              </Link>
            </div>
          }
        </div>
      </div>
    </article>
  )
}


const getTimeString = (start: Date, end: Date): string => {
  const startHour = parseInt(start.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: 'America/Los_Angeles'
  }))
  const startMinute = parseInt(start.toLocaleTimeString("en-US", {
    minute: "numeric",
    hour12: false,
    timeZone: 'America/Los_Angeles'
  }))

  const endHour = parseInt(end.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: 'America/Los_Angeles'
  }))
  const endMinute = parseInt(end.toLocaleTimeString("en-US", {
    minute: "numeric",
    hour12: false,
    timeZone: 'America/Los_Angeles'
  }))

  let dateTimeString: string;

  // Multiple days.
  if (start.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'}) != end.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'})) {
    dateTimeString = start.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: 'America/Los_Angeles'
    }) + ' - ' + end.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: 'America/Los_Angeles'
    })
    return dateTimeString;
  }

  // All Day display.
  if (
    (startHour === 24 || startHour === 0) &&
    startMinute === 0 &&
    endHour === 23 &&
    endMinute === 59
  ) {
    return 'All Day';
  }


  // Different start and end times.
  if (startHour !== endHour || startMinute !== endMinute) {
    dateTimeString = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: 'America/Los_Angeles'
    });
    dateTimeString += ' - ';
    dateTimeString += end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
      timeZone: 'America/Los_Angeles'
    })
    return dateTimeString;
  }

  // Start and end times are the same, just display the start time.
  return start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: 'America/Los_Angeles'
  })
}

export default StanfordEventCard;
