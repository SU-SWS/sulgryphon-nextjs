import {Event} from "@/lib/drupal/drupal";
import {CalendarIcon, MapIcon} from "@heroicons/react/20/solid";
import formatHtml from "@/lib/format-html";
import Link from "next/link";

const StanfordEventListItem = ({node, ...props}: { node: Event }) => {
  const inPast = new Date(node.su_event_date_time?.value) < new Date();
  const start = new Date(node.su_event_date_time?.value);
  const end = new Date(node.su_event_date_time?.end_value);
  const date = new Date(node.su_event_date_time.value)
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
    <article {...props}>
      <div>
        <div className="md:su-flex">
          <div className="su-mb-20 md:su-mb-0" aria-hidden="true">
            <div className="su-flex su-flex-row su-items-center su-justify-start md:su-min-w-[90px]">
              <div className="su-flex su-flex-col">
                <span
                  className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonth}</span>
                <span className="su-font-bold su-leading-trim su-text-m4 su-text-center">{day}</span>
                {start.getDate() !== end.getDate() && (
                  <>
                    <div className="su-text-center su-mt-6">- to -</div>
                    <div className="su-flex su-flex-col">
                      <span
                        className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonthEnd}</span>
                      <span className="su-font-bold su-leading-trim su-text-m4 su-text-center">{dayEnd}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            {inPast && <span className="su-text-black-70 su-text-14 md:su-text-16 su-uppercase su-font-semibold">Past Event | </span>}
            {(node.su_event_type && node.su_event_type.length > 0) && <span
                className="su-font-semibold su-text-16 xl:su-text-18 2xl:su-text-19">{node.su_event_type[0].name}</span>}

            <Link href={node.path.alias} className="su-text-digital-red hover:su-text-black su-no-underline">
              <h2 className="su-type-2">{node.title}</h2>
            </Link>

            {node.su_event_subheadline &&
                <div className="su-font-bold su-rs-mb-2">
                  {node.su_event_subheadline}
                </div>
            }

            {node.su_event_dek &&
                <div className="su-rs-mb-0 su-text-16 md:su-text-18">
                  {node.su_event_dek}
                </div>
            }

            <div className="su-mb-10">
              <CalendarIcon className="su-float-left su-mr-10" width={21}/>
              <time dateTime={node.su_event_date_time.value}>
                {dateTimeString}
                {inPast &&
                    <div className="su-text-14 md:su-text-16 su-italic su-ml-[31px]">*This event has passed.</div>}
              </time>
            </div>
            {node.su_event_alt_loc &&
                <div className="su-mb-5">
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
          </div>
        </div>

      </div>
    </article>
  )
}
export default StanfordEventListItem;