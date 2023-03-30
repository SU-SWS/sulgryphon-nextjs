import "server-only";
import {CalendarIcon, MapIcon, PhoneIcon, UserGroupIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {DrupalLinkButton} from "@/components/patterns/link";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {Event} from "@/lib/drupal/drupal";
import fetchComponents from "@/lib/fetch-components";
import {DrupalParagraph} from "next-drupal";

const StanfordEvent = async ({node, ...props}: { node: Event }) => {
  node.su_event_components = await fetchComponents(node.su_event_components ?? []) as DrupalParagraph[];
  node.su_event_components = node.su_event_components.filter(item => item?.id?.length > 0);

  const inPast = new Date(node.su_event_date_time?.end_value) < new Date();
  const start = new Date(node.su_event_date_time?.value);
  const end = new Date(node.su_event_date_time?.end_value);

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
        dateTimeString += ' ' + start.toLocaleTimeString("en-US", {
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
    <article {...props} className="su-mt-50">
      {inPast && <div className="su-text-black-70 su-uppercase">Past Event</div>}

      {(node.su_event_type && node.su_event_type.length > 0) && node.su_event_type.map(term =>
        <div key={term.id} className="su-text-digital-red su-text-16 md:su-text-18 2xl:su-text-19">
          {term.name}
        </div>
      )}

      {node.su_event_subheadline && <h2 className="su-type-3 su-rs-mb-1">{node.su_event_subheadline}</h2>}
      {node.su_event_dek && <div className="su-rs-mb-4 su-text-16 md:su-text-21">{node.su_event_dek}</div>}

      {node.su_event_sponsor &&
          <div className="su-rs-pb-3">
            {node.su_event_sponsor.map((sponsor, index) =>
              <div key={`event-sponsor-${index}`} className="su-type-1">
                {sponsor}
              </div>
            )}
          </div>
      }

      <div className="su-w-[80%] su-mx-auto su-shadow-sm su-border su-border-[#c6c6c6] su-p-[40px] su-mb-[50px]">
        <h2 className="su-type-1">Event Details:</h2>
        <div className="md:su-grid su-grid-cols-2 su-grid-gap su-gap-lg">
          <div>
            <div>
              <div className="su-flex su-flex-row su-items-start su-mt-20">
                <CalendarIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]"/>
                <time dateTime={node.su_event_date_time.value} className="su-text-16 md:su-text-18">
                  {dateTimeString}
                </time>
              </div>
              {inPast &&
                  <div className="su-text-14 md:su-text-16 su-pt-4 su-text-black-70 su-ml-[31px]">
                    This event has passed.
                  </div>}
            </div>

            {(node.su_event_location || node.su_event_alt_loc) &&
                <div>
                  {node.su_event_location &&
                      <div className="su-flex su-flex-col">
                        <div className="su-flex su-flex-row su-items-start su-mt-40 su-mb-4">
                          <MapIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]"/>
                          <h3 className="su-text-16 md:su-text-18">Location</h3>
                        </div>
                        <div className="su-ml-36">
                          <div className="su-text-16 md:su-text-18">{node.su_event_location.organization}</div>
                          <div className="su-text-16 md:su-text-18">{node.su_event_location.address_line1}</div>
                          <div className="su-text-16 md:su-text-18">{node.su_event_location.address_line2}</div>
                          <div
                              className="su-text-16 md:su-text-18">{node.su_event_location.locality}, {node.su_event_location.administrative_area} {node.su_event_location.postal_code}</div>
                        </div>
                      </div>
                  }
                  {node.su_event_alt_loc &&
                      <div>
                        <div className="su-flex su-flex-row su-items-start su-mt-40 su-mb-4">
                          <MapIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]"/>
                          <h3 className="su-text-16 md:su-text-18">Location</h3>
                        </div>
                        <div className="su-ml-36 su-leading-snug">
                          <>{node.su_event_alt_loc}</>
                        </div>
                      </div>
                  }

                  {node.su_event_map_link &&
                      <Link href={node.su_event_map_link.url} className="su-block su-ml-36">
                        {node.su_event_map_link.title}
                      </Link>
                  }
                </div>
            }
          </div>

          <div>
            {(node.su_event_telephone || node.su_event_email) &&
                <div>
                  <div className="su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
                    <PhoneIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]"/>
                    <h3 className="su-text-16 md:su-text-18">Contact</h3>
                  </div>
                  {node.su_event_telephone &&
                      <Link href={`tel:${node.su_event_telephone}`} className="su-block su-mb-4 su-ml-36">
                        {node.su_event_telephone}
                      </Link>
                  }
                  {node.su_event_email &&
                      <Link href={`mailto:${node.su_event_email}`} className="su-block su-ml-36 su-break-words">
                        {node.su_event_email}
                      </Link>
                  }
                </div>
            }

            {(node.su_event_audience && node.su_event_audience?.length > 0) &&
                <div>
                  <div className="su-flex su-flex-row su-items-start su-mt-40 su-mb-4">
                    <UserGroupIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]"/>
                    <h3 className="su-text-16 md:su-text-18">This event is open to:</h3>
                  </div>
                  {node.su_event_audience.map(audience =>
                    <div className="su-text-16 md:su-text-18 su-ml-36" key={audience.id}>{audience.name}</div>
                  )}
                </div>
            }
          </div>
        </div>

        {node.su_event_cta &&
            <div className="su-rs-pt-4 su-rs-pb-6">
              <DrupalLinkButton href={node.su_event_cta.url} className="su-block su-mx-auto">
                {node.su_event_cta.title}
              </DrupalLinkButton>
            </div>
        }
      </div>

      {node.su_event_source &&
          <Link
              href={node.su_event_source.url}>{node.su_event_source.title ? node.su_event_source.title : 'View this event'}</Link>
      }

      <ParagraphRows items={node.su_event_components}/>
    </article>
  )
}

export default StanfordEvent;