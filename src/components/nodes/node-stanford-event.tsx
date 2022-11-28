import {DrupalLinkButton} from "@/components/simple/link";
import Link from "next/link";
import {Paragraph} from "@/components/paragraphs";
import {Event} from "../../types/drupal";
import {CalendarIcon, MapIcon, PhoneIcon, UserGroupIcon} from "@heroicons/react/20/solid";
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
    <MainContentLayout pageTitle={node.title}>
      <article {...props} className="su-mt-50">
        <EventJsonLd
          name={node.title}
          startDate={node.su_event_date_time?.value}
          endDate={node.su_event_date_time?.end_value}
          location={{name: node.su_event_location?.organization}}
          eventStatus="EventScheduled"
        />

        {inPast && <div className="su-text-black-70 su-uppercase">Past Event</div>}

        {node.su_event_type.length > 0 && node.su_event_type.map(term =>
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
                  <CalendarIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]" />
                  <time dateTime={node.su_event_date_time.value} className="su-text-16 md:su-text-18">
                    {dateTimeString}
                  </time>
                </div>
                {inPast && <div className="su-text-14 md:su-text-16 su-pt-4 su-text-black-70 su-ml-[31px]">This event has passed.</div>}
              </div>

              {(node.su_event_location || node.su_event_alt_loc) &&
                  <div>
                    {node.su_event_location &&
                        <div className="su-flex su-flex-col">
                          <div className="su-flex su-flex-row su-items-start su-mt-40 su-mb-4">
                            <MapIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]" />
                            <h3 className="su-text-16 md:su-text-18">Location</h3>
                          </div>
                          <div className="su-ml-36">
                            <div className="su-text-16 md:su-text-18">{node.su_event_location.organization}</div>
                            <div className="su-text-16 md:su-text-18">{node.su_event_location.address_line1}</div>
                            <div className="su-text-16 md:su-text-18">{node.su_event_location.address_line2}</div>
                            <div className="su-text-16 md:su-text-18">{node.su_event_location.locality}, {node.su_event_location.administrative_area} {node.su_event_location.postal_code}</div>
                          </div>
                        </div>
                    }
                    {node.su_event_alt_loc &&
                      <div>
                        <div className="su-flex su-flex-row su-items-start su-mt-40 su-mb-4">
                          <MapIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]" />
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

              {node.su_event_audience.length > 0 &&
                <div>
                  <div className="su-flex su-flex-row su-items-start su-mt-40 su-mb-4" >
                    <UserGroupIcon className="su-inline-block su-flex-shrink-0 su-mr-06em su-w-[24px]" />
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
          <Link href={node.su_event_source.url}>{node.su_event_source.title}</Link>
        }

        {node.su_event_components && node.su_event_components.map(paragraph =>
          <Paragraph key={paragraph.id} paragraph={paragraph}/>
        )}
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordEventListItem = ({node, ...props}: EventNodeProps) => {
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
                <span className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonth}</span>
                <span className="su-font-bold su-leading-trim su-text-[39px] md:su-text-[44px] su-text-center">{day}</span>
                { start.getDate() !== end.getDate() && (
                  <>
                    <div className="su-text-center su-mt-6">- to -</div>
                    <div className="su-flex su-flex-col">
                      <span className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonthEnd}</span>
                      <span className="su-font-bold su-leading-trim su-text-[39px] md:su-text-[44px] su-text-center">{dayEnd}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            {inPast && <span className="su-text-black-70 su-text-14 md:su-text-16 su-uppercase su-font-semibold">Past Event | </span>}
            {node.su_event_type.length > 0 && <span className="su-font-semibold su-text-16 xl:su-text-18 2xl:su-text-19">{node.su_event_type[0].name}</span>}

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
                {inPast && <div className="su-text-14 md:su-text-16 su-italic su-ml-[31px]">*This event has passed.</div>}
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
                <div className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.address_line1}</div>
                <div className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.address_line2}</div>
                <div className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.locality}, {node.su_event_location.administrative_area} {node.su_event_location.postal_code}</div>
              </div>
            }      
          </div>
        </div>

      </div>
    </article>
  )
}

export const NodeStanfordEventCard = ({node, ...props}: EventNodeProps) => {
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
    <article className="su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 " {...props}>
      {node.su_event_date_time &&
        <div className="su-mb-20" aria-hidden="true">
          <div className="su-flex su-flex-row su-items-center su-justify-start md:su-min-w-[90px]">
            <div className="su-flex su-flex-col">
              <span className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonth}</span>
              <span className="su-font-bold su-leading-trim su-text-[39px] md:su-text-[44px] su-text-center">{day}</span>
            </div>
            { start.getDate() !== end.getDate() && (
              <>
                <div className="su-text-center su-mx-6">- to -</div>
                <div className="su-flex su-flex-col">
                  <span className="su-mb-10 su-mt-6 su-uppercase su-font-semibold su-text-center su-leading-none su-text-16 md:su-text-18">{shortMonthEnd}</span>
                  <span className="su-font-bold su-leading-trim su-text-[39px] md:su-text-[44px] su-text-center">{dayEnd}</span>
                </div>
              </>
            )}
          </div>
        </div>
      }

      {node.su_event_type.length > 0 && <div className="su-text-16 xl:su-text-18 2xl:su-text-19 su-text-digital-red">{node.su_event_type[0].name}</div>}

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
        <time dateTime={node.su_event_date_time.value} >
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
          <div className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.address_line1}</div>
          <div className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.address_line2}</div>
          <div className="su-text-16 md:su-text-18 su-ml-[31px] su-leading-snug">{node.su_event_location.locality}, {node.su_event_location.administrative_area} {node.su_event_location.postal_code}</div>
        </div>
      }
    </article>
  )
}