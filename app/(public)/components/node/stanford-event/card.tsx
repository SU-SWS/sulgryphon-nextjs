"use client"
import {CalendarDaysIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {Event} from "@/lib/drupal/drupal";
import Image from "next/image";
import {ClockIcon, MapPinIcon} from "@heroicons/react/24/outline";

const StanfordEventCard = ({node, ...props}: { node: Event }) => {
  const start = new Date(node.su_event_date_time?.value);
  const end = new Date(node.su_event_date_time?.end_value);
  console.log(node.su_event_date_time?.value);

  const shortMonth = start.toLocaleDateString("en-US", {
    month: "short",
    timeZone: 'America/Los_Angeles'
  })
  const day = start.toLocaleDateString("en-US", {
    day: "numeric",
    timeZone: 'America/Los_Angeles'
  })
  const startDay = start.toLocaleDateString("en-US", {timeZone: 'America/Los_Angeles'})

  let dateTimeString = "";

  // Same Day Display
  if (start.getMonth() === end.getMonth() && start.getDate() === end.getDate() && start.getFullYear() === end.getFullYear()) {
    // Not ALl Day.
    if (
      start.getHours() !== 0 ||
      start.getMinutes() !== 0 ||
      end.getHours() !== 23 ||
      end.getMinutes() !== 59
    ) {

      if (start.getHours() !== end.getHours() || start.getMinutes() !== end.getMinutes()) {
        dateTimeString += start.toLocaleTimeString("en-US", {
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
      } else {
        dateTimeString += ' ' + start.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
          timeZone: 'America/Los_Angeles'
        })
      }
    }else {
      dateTimeString = 'All Day';
    }
  } else {
    // Multiple days
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
  }

  // Fix difference between server side render and client side render. Replace any strange characters.
  dateTimeString = dateTimeString.replace(/[^a-zA-Z0-9 ,:\-|]/, ' ');


  let image;
  let imageUrl = node.sul_event__image?.field_media_image?.image_style_uri?.breakpoint_2xl_1x;
  if (imageUrl) {
    image = <Image
      className="su-object-cover su-object-center"
      src={imageUrl}
      alt=""
      fill={true}
    />
  }

  return (
    <article {...props}>
      {image &&
          <div className="su-overflow-hidden su-aspect-[4/3] su-relative su-mb-40" aria-hidden="true">
            {image}
          </div>
      }

      <div className="su-flex su-gap-xl">
        <div>
          <div
            className="su-bg-black-true su-text-white su-pt-20 su-px-30 su-text-center su-uppercase">{shortMonth}</div>
          <div className="su-bg-black-true su-text-white su-pb-20 su-px-30 su-text-center su-text-m4">{day}</div>
        </div>

        <div>
          {node.su_event_type &&
              <ul className="su-list-unstyled su-font-semibold su-mb-10">
                {node.su_event_type.map(eventType =>
                  <li key={eventType.id} className="su-inline su-mr-5">{eventType.name}</li>
                )}
              </ul>
          }
          <h2 className="su-text-m2">
            <Link href={node.path.alias}
                  className="su-text-black-true hover:su-text-brick-dark su-underline hover:su-no-underline">
              {node.title}
            </Link>
          </h2>

          <div className="su-flex su-mb-20">
            <CalendarDaysIcon width={20} className="su-mr-20"/>
            {startDay}
          </div>

          <div className="su-flex su-mb-20">
            <ClockIcon width={20} className="su-mr-20"/>
            <div>{dateTimeString}</div>
          </div>

          {node.su_event_map_link?.url &&
              <div className="su-flex su-mb-20">
                <MapPinIcon width={20} className="su-mr-20"/>
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