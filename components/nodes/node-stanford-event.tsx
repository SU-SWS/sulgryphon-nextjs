import {DrupalLink, DrupalLinkButton} from "@/components/simple/link";
import {Paragraph} from "@/components/paragraphs";
import {Event} from "../../types/drupal";
import {formatDate} from "@/lib/format-date";
import {CalendarIcon} from "@heroicons/react/outline";
import {MapIcon, PhoneIcon, UserGroupIcon} from "@heroicons/react/solid";
import formatHtml from "@/lib/format-html";
import {EventJsonLd} from "next-seo";
import {MainContentLayout} from "@/components/layouts/main-content-layout";

interface EventNodeProps {
  node: Event;
}

export const NodeStanfordEvent = ({node, ...props}: EventNodeProps) => {
  const inPast = new Date(node.su_event_date_time?.value) < new Date();
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

    if (
      (start.getHours() !== end.getHours() || start.getMinutes() !== end.getMinutes()) &&
      (start.getHours() !== 0 && end.getHours() !== 23 && start.getMinutes() !== 0 && end.getMinutes() !== 59)
    ) {
      dateTimeString += ' - ' + end.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    }
  }


  return (
    <MainContentLayout>
      <article {...props}>
        <EventJsonLd
          name={node.title}
          startDate={node.su_event_date_time?.value}
          endDate={node.su_event_date_time?.end_value}
          location={{name: node.su_event_location?.organization}}
          eventStatus="EventScheduled"
        />
        {inPast && <div>Past Event</div>}

        {node.su_event_type && node.su_event_type.map(term =>
          <div key={term.id}>
            {term.name}
          </div>
        )}
        <h1>{node.title}</h1>
        {node.su_event_subheadline && <div className="su-mb-[20px]">{node.su_event_subheadline}</div>}
        {node.su_event_dek && <div className="su-mb-[20px]">{node.su_event_dek}</div>}


        {node.su_event_sponsor &&
            <div className="su-mb-[20px]">
              {node.su_event_sponsor.map((sponsor, index) =>
                <div key={`event-sponsor-${index}`}>
                  {sponsor}
                </div>
              )}
            </div>
        }

        <div className="su-w-[80%] su-mx-auto su-shadow-sm su-border su-border-[#c6c6c6] su-p-[40px] su-mb-[50px]">
          <h2>Event Details</h2>
          <div className="md:su-grid su-grid-cols-2">
            <div>
              <div>
                <CalendarIcon width={24}/>
                {dateTimeString}
                {inPast && <div>This event has passed.</div>}
              </div>


              {(node.su_event_location || node.su_event_alt_loc) &&
                  <div>
                      <h3>Location</h3>

                    {node.su_event_location &&
                        <div>
                            <MapIcon width={24}/>

                            <div>{node.su_event_location.organization}</div>
                            <div>{node.su_event_location.address_line1}</div>
                            <div>{node.su_event_location.address_line2}</div>
                            <div>{node.su_event_location.locality}, {node.su_event_location.administrative_area} {node.su_event_location.postal_code}</div>
                        </div>
                    }

                    {node.su_event_alt_loc}

                    {node.su_event_map_link &&
                        <DrupalLink href={node.su_event_map_link.url} className="su-block">
                          {node.su_event_map_link.title}
                        </DrupalLink>
                    }
                  </div>

              }
            </div>

            <div>
              {(node.su_event_telephone || node.su_event_email) &&
                  <div>
                      <PhoneIcon width={24}/><h3> Contact</h3>
                    {node.su_event_telephone &&
                        <DrupalLink href={`tel:${node.su_event_telephone}`} className="su-block">
                          {node.su_event_telephone}
                        </DrupalLink>
                    }
                    {node.su_event_email &&
                        <DrupalLink href={`mailto:${node.su_event_email}`} className="su-block">
                          {node.su_event_email}
                        </DrupalLink>
                    }
                  </div>
              }

              {node.su_event_audience.length > 0 &&
                  <div>
                      <UserGroupIcon width={24}/>
                      <h3>This event is open to:</h3>
                    {node.su_event_audience.map(audience =>
                      <div key={audience.id}>{audience.name}</div>
                    )}
                  </div>

              }


            </div>
          </div>

          {node.su_event_cta &&
              <DrupalLinkButton href={node.su_event_cta.url} className="su-block su-mx-auto">
                {node.su_event_cta.title}
              </DrupalLinkButton>

          }
        </div>

        {node.su_event_source &&
            <DrupalLink href={node.su_event_source.url}>{node.su_event_source.title}</DrupalLink>
        }

        {node.su_event_components && node.su_event_components.map(paragraph =>
          <Paragraph key={paragraph.id} paragraph={paragraph}/>
        )}
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordEventListItem = ({node, ...props}: EventNodeProps) => {
  const startTime = new Date(node.su_event_date_time.value);
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
      <div>{startTime.toLocaleString()}</div>
    </article>
  )
}


export const NodeStanfordEventCard = ({node, ...props}: EventNodeProps) => {

  const date = new Date(node.su_event_date_time.value)
  const shortMonth = date.toLocaleDateString("en-US", {
    month: "short",
  })
  const day = date.toLocaleDateString("en-US", {
    day: "numeric",
  })

  return (
    <article className="su-shadow-md su-p-[20px]" {...props}>
      {node.su_event_date_time &&
          <div className="su-font-bold" aria-hidden={true}>
              <div className="su-text-[20px]">{shortMonth}</div>
              <div className="su-text-[40px]">{day}</div>
          </div>
      }

      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>


      <div className="su-m-10">
        <CalendarIcon className="su-float-left su-mr-10" width={21}/>
        {formatDate(node.su_event_date_time.value)}
      </div>
      {node.su_event_alt_loc &&
          <div className="su-m-10">
              <MapIcon className="su-float-left su-mr-10" width={21}/>
            {formatHtml(node.su_event_alt_loc)}
          </div>
      }
    </article>
  )
}
