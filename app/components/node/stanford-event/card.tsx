import {CalendarIcon, MapIcon} from "@heroicons/react/20/solid";
import formatHtml from "../../../lib/format-html";
import Link from "next/link";
import {Event} from "../../../../src/types/drupal";

const StanfordEventCard = ({node, ...props}: { node: Event }) => {
  const date = new Date(node.su_event_date_time.value)
  const start = new Date(node.su_event_date_time?.value);
  const end = new Date(node.su_event_date_time?.end_value);
  const shortMonth = date.toLocaleDateString("en-US", {
    month: "short",
  })
  const shortMonthEnd = end.toLocaleDateString("en-US", {
    month: "short",
  })
  const day = date.toLocaleDateString("en-US", {
    day: "numeric",
  })
  const dayEnd = end.toLocaleDateString("en-US", {
    day: "numeric",
  })

  let dateTimeString;
  if (start.getMonth() === end.getMonth() && start.getDate() === end.getDate() && start.getFullYear() === end.getFullYear()) {
    dateTimeString = start.toLocaleDateString('en-us', {weekday: 'long'});
    dateTimeString += ', ' + start.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })

    if (
      start.getHours() !== 0 ||
      start.getMinutes() !== 0 ||
      end.getHours() !== 23 ||
      end.getMinutes() !== 59
    ) {
      if (start.getHours() !== end.getHours() || start.getMinutes() !== end.getMinutes()) {
        dateTimeString += ' | ' + start.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        }) + ' - ' + end.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        })
      } else {
        dateTimeString += ' ' + start.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        })
      }
    }
  } else {
    // Multiple days
    dateTimeString = start.toLocaleDateString('en-us', {weekday: 'long'});
    dateTimeString += ', ' + start.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }) + ' - ' + end.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <article
      className="su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 " {...props}>
      {node.su_event_date_time &&
          <div className="su-mb-20" aria-hidden="true">
            <div className="su-flex su-flex-row su-items-center su-justify-start md:su-min-w-[90px]">
              <div className="su-flex su-flex-col">
                <span
                    className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonth}</span>
                <span className="su-font-bold su-leading-trim su-text-m4 su-text-center">{day}</span>
              </div>
              {start.getDate() !== end.getDate() && (
                <>
                  <div className="su-text-center su-mx-6">- to -</div>
                  <div className="su-flex su-flex-col">
                    <span
                      className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonthEnd}</span>
                    <span className="su-font-bold su-leading-trim su-text-m4 su-text-center">{dayEnd}</span>
                  </div>
                </>
              )}
            </div>
          </div>
      }

      {node.su_event_type.length > 0 && <div
          className="su-text-16 xl:su-text-18 2xl:su-text-19 su-text-digital-red">{node.su_event_type[0].name}</div>}

      <Link href={node.path.alias}
            className="su-no-underline hover:su-text-digital-red hover:su-underline">
        <h2 className="su-text-black hover:su-text-digital-red su-type-1">{node.title}</h2>
      </Link>

      {node.su_event_subheadline &&
          <div className="su-font-bold su-rs-mb-3">
            {node.su_event_subheadline}
          </div>
      }

      <div className="su-mb-10 su-text-16 md:su-text-18">
        <CalendarIcon className="su-float-left su-mr-10" width={21}/>
        <time dateTime={node.su_event_date_time.value}>
          {dateTimeString}
        </time>
      </div>

      {node.su_event_alt_loc &&
          <div className="su-mb-5 su-text-16 md:su-text-18">
            <MapIcon className="su-float-left su-mr-10" width={21}/>
            {formatHtml(node.su_event_alt_loc)}
          </div>
      }

      {node.su_event_location &&
          <div>
            <MapIcon className="su-float-left su-mr-10" width={21}/>
            <div className="su-text-16 md:su-text-18 su-leading-snug">{node.su_event_location.organization}</div>
            <div
                className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.address_line1}</div>
            <div
                className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.address_line2}</div>
            <div
                className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.locality}, {node.su_event_location.administrative_area} {node.su_event_location.postal_code}</div>
          </div>
      }
    </article>
  )
}
export default StanfordEventCard;