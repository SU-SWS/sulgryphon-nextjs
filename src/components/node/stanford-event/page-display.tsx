import {CalendarIcon, MapIcon, PhoneIcon, UserGroupIcon} from "@heroicons/react/20/solid"
import Link from "@/components/patterns/elements/drupal-link"
import {DrupalLinkButton} from "@/components/patterns/link"
import formatHtml from "@/lib/format-html"
import {redirect} from "next/navigation"
import EmailLink from "@/components/patterns/elements/email-link"
import TelephoneLink from "@/components/patterns/elements/telephone-link"
import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d"
import Paragraph from "@/components/paragraph"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"
import NodePageMetadata from "@/components/node/node-page-metadata"
import {getCleanDescription} from "@/lib/text-tools"

const StanfordEvent = async ({node, ...props}: {node: NodeStanfordEvent}) => {
  if (node.suEventSource?.url) redirect(node.suEventSource.url)

  const inPast = new Date(node.suEventDateTime.end_value * 1000) < new Date()
  const start = new Date(node.suEventDateTime.value * 1000)
  const end = new Date(node.suEventDateTime.end_value * 1000)

  let dateTimeString
  if (
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate() &&
    start.getFullYear() === end.getFullYear()
  ) {
    dateTimeString = start.toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
    dateTimeString +=
      ", " +
      start.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles",
      })

    if (start.getHours() !== 0 || start.getMinutes() !== 0 || end.getHours() !== 23 || end.getMinutes() !== 59) {
      if (start.getHours() !== end.getHours() || start.getMinutes() !== end.getMinutes()) {
        dateTimeString +=
          " " +
          start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            timeZone: "America/Los_Angeles",
          }) +
          " - " +
          end.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
            timeZone: "America/Los_Angeles",
          })
      } else {
        dateTimeString +=
          " " +
          start.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
            timeZone: "America/Los_Angeles",
          })
      }
    }
  } else {
    // Multiple days
    dateTimeString = start.toLocaleDateString("en-us", {weekday: "long", timeZone: "America/Los_Angeles"})
    dateTimeString +=
      ", " +
      start.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles",
      }) +
      " - " +
      end.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles",
      })
  }

  return (
    <article {...props} className="mt-50" aria-labelledby={node.uuid}>
      <NodePageMetadata
        pageTitle={node.title}
        metatags={node.metatag}
        url={node.path}
        backupDescription={node.suEventSubheadline || getCleanDescription(node.body?.processed)}
      />
      <InternalHeaderBanner>
        <h1
          id={node.uuid}
          className="relative mx-auto mb-10 mt-75 flex w-full max-w-[calc(100vw-10rem)] flex-row gap-20 p-0 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]"
        >
          {node.title}
        </h1>
      </InternalHeaderBanner>
      {inPast && <div className="uppercase text-black-70">Past Event</div>}

      {node.suEventType && node.suEventType.length > 0 && (
        <div>
          {node.suEventType.map(term => (
            <div key={term.uuid} className="text-16 text-digital-red md:text-18 2xl:text-19">
              {term.name}
            </div>
          ))}
        </div>
      )}

      {node.suEventSubheadline && <h2 className="rs-mb-1 type-3">{node.suEventSubheadline}</h2>}
      {node.suEventDek && <div className="rs-mb-4 text-22 leading">{node.suEventDek}</div>}

      {node.suEventSponsor && (
        <div className="rs-pb-3">
          {node.suEventSponsor.map((sponsor, index) => (
            <div key={`event-sponsor-${index}`} className="type-1">
              {sponsor}
            </div>
          ))}
        </div>
      )}

      <div className="mx-auto mb-[50px] w-[80%] border border-[#c6c6c6] p-[40px] shadow-sm">
        <h2 className="type-1">Event Details:</h2>
        <div className="grid-gap grid-cols-2 gap-lg md:grid">
          <div>
            <div>
              <div className="mt-20 flex flex-row items-start">
                <CalendarIcon className="mr-06em inline-block w-[24px] flex-shrink-0" />
                <time dateTime={node.suEventDateTime.value} className="text-16 md:text-18">
                  {dateTimeString}
                </time>
              </div>
              {inPast && <div className="ml-[31px] pt-4 text-14 text-black-70 md:text-16">This event has passed.</div>}
            </div>

            {(node.suEventLocation || node.suEventAltLoc) && (
              <div>
                {node.suEventLocation && (
                  <div className="flex flex-col">
                    <div className="mb-4 mt-40 flex flex-row items-start">
                      <MapIcon title="Location" className="mr-06em inline-block w-[24px] flex-shrink-0" />
                      <h3 className="text-16 md:text-18">Location</h3>
                    </div>
                    <div className="ml-36">
                      <div className="text-16 md:text-18">{node.suEventLocation.organization}</div>
                      <div className="text-16 md:text-18">{node.suEventLocation.addressLine1}</div>
                      <div className="text-16 md:text-18">{node.suEventLocation.addressLine2}</div>
                      <div className="text-16 md:text-18">
                        {node.suEventLocation.locality}, {node.suEventLocation.administrativeArea}{" "}
                        {node.suEventLocation.postalCode}
                      </div>
                    </div>
                  </div>
                )}
                {node.suEventAltLoc && (
                  <div>
                    <div className="mb-4 mt-40 flex flex-row items-start">
                      <MapIcon title="Location" className="mr-06em inline-block w-[24px] flex-shrink-0" />
                      <h3 className="text-16 md:text-18">Location</h3>
                    </div>
                    <div className="ml-36 leading-snug">{node.suEventAltLoc}</div>
                  </div>
                )}

                {node.suEventMapLink?.url && (
                  <Link href={node.suEventMapLink.url} className="ml-36 block">
                    {node.suEventMapLink.title}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div>
            {(node.suEventTelephone || node.suEventEmail) && (
              <div>
                <div className="mb-4 mt-40 flex flex-row items-start md:mt-20">
                  <PhoneIcon title="Phone" className="mr-06em inline-block w-[24px] flex-shrink-0" />
                  <h3 className="text-16 md:text-18">Contact</h3>
                </div>
                {node.suEventTelephone && <TelephoneLink tel={node.suEventTelephone} className="mb-4 ml-36 block" />}
                {node.suEventEmail && <EmailLink email={node.suEventEmail} className="ml-36 block break-words" />}
              </div>
            )}

            {node.suEventAudience && (
              <div>
                <div className="mb-4 mt-40 flex flex-row items-start">
                  <UserGroupIcon title="Person" className="mr-06em inline-block w-[24px] flex-shrink-0" />
                  <h3 className="text-16 md:text-18">This event is open to:</h3>
                </div>
                {node.suEventAudience.map(audience => (
                  <div className="ml-36 text-16 md:text-18" key={audience.uuid}>
                    {audience.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {node.suEventCta?.url && (
          <div className="rs-pt-4 rs-pb-6">
            <DrupalLinkButton href={node.suEventCta.url} className="mx-auto block">
              {node.suEventCta.title}
            </DrupalLinkButton>
          </div>
        )}
      </div>

      {node.body?.processed && <div className="centered mb-40 lg:max-w-[980px]">{formatHtml(node.body.processed)}</div>}

      {node.suEventComponents && (
        <div className="mb-40">
          {node.suEventComponents.map(paragraph => (
            <Paragraph key={paragraph.uuid} paragraph={paragraph} />
          ))}
        </div>
      )}
    </article>
  )
}

export default StanfordEvent
