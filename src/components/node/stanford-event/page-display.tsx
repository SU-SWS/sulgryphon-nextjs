import "server-only";
import {CalendarIcon, MapIcon, PhoneIcon, UserGroupIcon} from "@heroicons/react/20/solid";
import Link from "@/components/patterns/elements/drupal-link";
import {DrupalLinkButton} from "@/components/patterns/link";
import {Event, StanfordParagraph} from "@/lib/drupal/drupal";
import fetchComponents from "@/lib/fetch-components";

import formatHtml from "@/lib/format-html";
import Paragraph from "@/components/paragraph";
import {redirect} from "next/navigation";
import EmailLink from "@/components/patterns/elements/email-link";
import TelephoneLink from "@/components/patterns/elements/telephone-link";

const StanfordEvent = async ({node, ...props}: { node: Event }) => {
  if (node.su_event_source?.url) redirect(node.su_event_source.url)

  node.su_event_components = await fetchComponents<StanfordParagraph>(node.su_event_components ?? []);
  node.su_event_components = node.su_event_components.filter(item => !!item?.id);

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
    <article {...props} className="mt-50">
      {inPast && <div className="text-black-70 uppercase">Past Event</div>}

      {(node.su_event_type && node.su_event_type.length > 0) && node.su_event_type.map(term =>
        <div key={term.id} className="text-digital-red text-16 md:text-18 2xl:text-19">
          {term.name}
        </div>
      )}

      {node.su_event_subheadline && <h2 className="type-3 rs-mb-1">{node.su_event_subheadline}</h2>}
      {node.su_event_dek && <div className="rs-mb-4 text-16 md:text-21">{node.su_event_dek}</div>}

      {node.su_event_sponsor &&
          <div className="rs-pb-3">
            {node.su_event_sponsor.map((sponsor, index) =>
              <div key={`event-sponsor-${index}`} className="type-1">
                {sponsor}
              </div>
            )}
          </div>
      }

      <div className="w-[80%] mx-auto shadow-sm border border-[#c6c6c6] p-[40px] mb-[50px]">
        <h2 className="type-1">Event Details:</h2>
        <div className="md:grid grid-cols-2 grid-gap gap-lg">
          <div>
            <div>
              <div className="flex flex-row items-start mt-20">
                <CalendarIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                <time dateTime={node.su_event_date_time.value} className="text-16 md:text-18">
                  {dateTimeString}
                </time>
              </div>
              {inPast &&
                  <div className="text-14 md:text-16 pt-4 text-black-70 ml-[31px]">
                    This event has passed.
                  </div>}
            </div>

            {(node.su_event_location || node.su_event_alt_loc) &&
                <div>
                  {node.su_event_location &&
                      <div className="flex flex-col">
                        <div className="flex flex-row items-start mt-40 mb-4">
                          <MapIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                          <h3 className="text-16 md:text-18">Location</h3>
                        </div>
                        <div className="ml-36">
                          <div className="text-16 md:text-18">{node.su_event_location.organization}</div>
                          <div className="text-16 md:text-18">{node.su_event_location.address_line1}</div>
                          <div className="text-16 md:text-18">{node.su_event_location.address_line2}</div>
                          <div
                              className="text-16 md:text-18">{node.su_event_location.locality}, {node.su_event_location.administrative_area} {node.su_event_location.postal_code}</div>
                        </div>
                      </div>
                  }
                  {node.su_event_alt_loc &&
                      <div>
                        <div className="flex flex-row items-start mt-40 mb-4">
                          <MapIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                          <h3 className="text-16 md:text-18">Location</h3>
                        </div>
                        <div className="ml-36 leading-snug">
                          <>{node.su_event_alt_loc}</>
                        </div>
                      </div>
                  }

                  {node.su_event_map_link &&
                      <Link href={node.su_event_map_link.url} className="block ml-36">
                        {node.su_event_map_link.title}
                      </Link>
                  }
                </div>
            }
          </div>

          <div>
            {(node.su_event_telephone || node.su_event_email) &&
                <div>
                  <div className="flex flex-row items-start mt-40 md:mt-20 mb-4">
                    <PhoneIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                    <h3 className="text-16 md:text-18">Contact</h3>
                  </div>
                  {node.su_event_telephone &&
                    <TelephoneLink
                      tel={node.su_event_telephone}
                      className="block mb-4 ml-36"
                    />
                  }
                  {node.su_event_email &&
                    <EmailLink email={node.su_event_email} className="block ml-36 break-words"/>
                  }
                </div>
            }

            {(node.su_event_audience && node.su_event_audience?.length > 0) &&
                <div>
                  <div className="flex flex-row items-start mt-40 mb-4">
                    <UserGroupIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                    <h3 className="text-16 md:text-18">This event is open to:</h3>
                  </div>
                  {node.su_event_audience.map(audience =>
                    <div className="text-16 md:text-18 ml-36" key={audience.id}>{audience.name}</div>
                  )}
                </div>
            }
          </div>
        </div>

        {node.su_event_cta &&
            <div className="rs-pt-4 rs-pb-6">
              <DrupalLinkButton href={node.su_event_cta.url} className="block mx-auto">
                {node.su_event_cta.title}
              </DrupalLinkButton>
            </div>
        }
      </div>

      {node.su_event_source &&
          <Link
              href={node.su_event_source.url}>{node.su_event_source.title ? node.su_event_source.title : 'View this event'}</Link>
      }

      {node.body &&
        <div className="centered lg:max-w-[980px] mb-40">
          {formatHtml(node.body)}
        </div>
      }

      {node.su_event_components &&
        <div className="mb-40">
          {node.su_event_components.map(component =>
            <Paragraph key={component.id} paragraph={component} fullWidth={false}/>
          )}
        </div>
      }
    </article>
  )
}

export default StanfordEvent;