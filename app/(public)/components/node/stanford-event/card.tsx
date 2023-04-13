import {CalendarDaysIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {Event} from "@/lib/drupal/drupal";
import Image from "next/image";
import {ClockIcon, MapPinIcon} from "@heroicons/react/24/outline";

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

const StanfordEventCard = ({node, ...props}: { node: Event }) => {
  const start = new Date(node.su_event_date_time?.value);
  const end = new Date(node.su_event_date_time?.end_value);
  const startMonth = start.toLocaleDateString("en-US", {month: "short", timeZone: 'America/Los_Angeles'})
  const startDay = parseInt(start.toLocaleDateString("en-US", {day: "numeric", timeZone: 'America/Los_Angeles'}))

  // Fix difference between server side render and client side render. Replace any strange characters.
  const dateTimeString = getTimeString(start, end).replace(/[^a-zA-Z0-9 ,:\-|]/, ' ');

  const imageUrl = node.sul_event__image?.field_media_image?.image_style_uri?.breakpoint_2xl_1x;
  const placeholder = node.sul_event__image?.field_media_image?.uri.base64;


  return (
    <article {...props}>
      {imageUrl &&
        <div className="su-overflow-hidden su-aspect-[4/3] su-relative su-mb-40" aria-hidden="true">
          <Image
            className="su-object-cover su-object-center"
            src={imageUrl}
            alt=""
            fill={true}
            placeholder={placeholder ? 'blur' : 'empty'}
            blurDataURL={placeholder}
          />
        </div>
      }

      <div className="su-flex su-gap-xl">
        <div>
          <div
            className="su-bg-black-true su-text-white su-pt-20 su-px-30 su-text-center su-uppercase">{startMonth}</div>
          <div className="su-bg-black-true su-text-white su-pb-20 su-px-30 su-text-center su-text-m4">{startDay}</div>
        </div>

        <div>
          {node.su_event_type?.[0]?.name &&
            <div className="su-inline su-mr-5 su-font-semibold su-mb-10">{node.su_event_type?.[0].name}</div>
          }

          <h2 className="su-text-m2">
            <Link href={node.path.alias}
                  className="su-text-black-true hover:su-text-brick-dark su-underline hover:su-no-underline">
              {node.title}
            </Link>
          </h2>

          <div className="su-flex su-mb-20">
            <CalendarDaysIcon width={20} className="su-mr-20 su-flex-shrink-0"/>
            {start.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'})}
          </div>

          <div className="su-flex su-mb-20">
            <ClockIcon width={20} className="su-mr-20 su-flex-shrink-0"/>
            <div>{dateTimeString}</div>
          </div>

          {node.su_event_map_link?.url &&
            <div className="su-flex su-mb-20">
              <MapPinIcon width={20} className="su-mr-20 su-flex-shrink-0"/>
              <Link href={node.su_event_map_link?.url}>
                {node.su_event_map_link?.title}
              </Link>
            </div>
          }
        </div>
      </div>
    </article>
  )
}
export default StanfordEventCard;