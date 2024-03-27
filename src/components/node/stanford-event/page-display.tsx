import {CalendarIcon, MapIcon, PhoneIcon, UserGroupIcon} from "@heroicons/react/20/solid";
import Link from "@/components/patterns/elements/drupal-link";
import {DrupalLinkButton} from "@/components/patterns/link";
import formatHtml from "@/lib/format-html";
import {redirect} from "next/navigation";
import EmailLink from "@/components/patterns/elements/email-link";
import TelephoneLink from "@/components/patterns/elements/telephone-link";
import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d";
import Paragraph from "@/components/paragraph";

const StanfordEvent = async ({node, ...props}: { node: NodeStanfordEvent }) => {
  if (node.suEventSource?.url) redirect(node.suEventSource.url)

  const inPast = new Date(node.suEventDateTime.end_value * 1000) < new Date();
  const start = new Date(node.suEventDateTime.value * 1000);
  const end = new Date(node.suEventDateTime.end_value * 1000);

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

      {(node.suEventType && node.suEventType.length > 0) &&
        <div>
          {node.suEventType.map(term =>
            <div key={term.id} className="text-digital-red text-16 md:text-18 2xl:text-19">
              {term.name}
            </div>
          )}
        </div>
      }

      {node.suEventSubheadline && <h2 className="type-3 rs-mb-1">{node.suEventSubheadline}</h2>}
      {node.suEventDek && <div className="rs-mb-4 text-16 md:text-21">{node.suEventDek}</div>}

      {node.suEventSponsor &&
        <div className="rs-pb-3">
          {node.suEventSponsor.map((sponsor, index) =>
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
                <time dateTime={node.suEventDateTime.value} className="text-16 md:text-18">
                  {dateTimeString}
                </time>
              </div>
              {inPast &&
                <div className="text-14 md:text-16 pt-4 text-black-70 ml-[31px]">
                  This event has passed.
                </div>}
            </div>

            {(node.suEventLocation || node.suEventAltLoc) &&
              <div>
                {node.suEventLocation &&
                  <div className="flex flex-col">
                    <div className="flex flex-row items-start mt-40 mb-4">
                      <MapIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                      <h3 className="text-16 md:text-18">Location</h3>
                    </div>
                    <div className="ml-36">
                      <div className="text-16 md:text-18">{node.suEventLocation.organization}</div>
                      <div className="text-16 md:text-18">{node.suEventLocation.addressLine1}</div>
                      <div className="text-16 md:text-18">{node.suEventLocation.addressLine2}</div>
                      <div
                        className="text-16 md:text-18">{node.suEventLocation.locality}, {node.suEventLocation.administrativeArea} {node.suEventLocation.postalCode}</div>
                    </div>
                  </div>
                }
                {node.suEventAltLoc &&
                  <div>
                    <div className="flex flex-row items-start mt-40 mb-4">
                      <MapIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                      <h3 className="text-16 md:text-18">Location</h3>
                    </div>
                    <div className="ml-36 leading-snug">
                      {node.suEventAltLoc}
                    </div>
                  </div>
                }

                {node.suEventMapLink?.url &&
                  <Link href={node.suEventMapLink.url} className="block ml-36">
                    {node.suEventMapLink.title}
                  </Link>
                }
              </div>
            }
          </div>

          <div>
            {(node.suEventTelephone || node.suEventEmail) &&
              <div>
                <div className="flex flex-row items-start mt-40 md:mt-20 mb-4">
                  <PhoneIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                  <h3 className="text-16 md:text-18">Contact</h3>
                </div>
                {node.suEventTelephone &&
                  <TelephoneLink
                    tel={node.suEventTelephone}
                    className="block mb-4 ml-36"
                  />
                }
                {node.suEventEmail &&
                  <EmailLink email={node.suEventEmail} className="block ml-36 break-words"/>
                }
              </div>
            }

            {node.suEventAudience &&
              <div>
                <div className="flex flex-row items-start mt-40 mb-4">
                  <UserGroupIcon className="inline-block flex-shrink-0 mr-06em w-[24px]"/>
                  <h3 className="text-16 md:text-18">This event is open to:</h3>
                </div>
                {node.suEventAudience.map(audience =>
                  <div className="text-16 md:text-18 ml-36" key={audience.id}>{audience.name}</div>
                )}
              </div>
            }
          </div>
        </div>

        {node.suEventCta?.url &&
          <div className="rs-pt-4 rs-pb-6">
            <DrupalLinkButton href={node.suEventCta.url} className="block mx-auto">
              {node.suEventCta.title}
            </DrupalLinkButton>
          </div>
        }
      </div>

      {node.body?.processed &&
        <div className="centered lg:max-w-[980px] mb-40">
          {formatHtml(node.body.processed)}
        </div>
      }

      {node.suEventComponents &&
        <div className="mb-40">
          {node.suEventComponents.map(paragraph =>
            <Paragraph key={paragraph.id} paragraph={paragraph}/>
          )}
        </div>
      }
    </article>
  )
}

export default StanfordEvent;