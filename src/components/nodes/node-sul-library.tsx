import {Library} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLink} from "@/components/simple/link";
import Link from "next/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Paragraph} from "@/components/paragraphs";
import {useLibraryHours} from "@/lib/hooks/useLibraryHours";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface SulLibraryNodeProps {
  node: Library;
}

export const NodeSulLibrary = ({node, ...props}: SulLibraryNodeProps) => {
  const hours = useLibraryHours()
  const currentDay = new Date().toISOString().substring(0, 10)
  const libraryHours = hours[node.su_library__hours]
  let todayHours;

  if (libraryHours) {
    todayHours = libraryHours.locations[Object.keys(libraryHours.locations)[0]].find(day => day.day === currentDay);
  }

  return (
    <MainContentLayout pageTitle={node.title} header={<LibraryBanner/>} {...props}>
      <article>
        { console.log(node) }

        <div className={`hero su-basefont-23 su-relative su-h-full su-mx-auto su-w-full lg:su-max-h-500}`}>
          <div className="su-w-full su-overflow-hidden su-relative su-max-h-500 su-min-h-[30rem] lg:su-min-h-[50rem] su-px-[50px] lg:su-p-0 su-bg-[grey]">
            {/* {image} */}
            image
          </div>

          <div className='su-cc su-mx-auto su-block lg:su-absolute lg:su-top-auto lg:su-bottom-36 lg:su-right-36'>
            <div className="card su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md">
              <div className="su-overflow-hidden su-aspect-[16/9] su-relative">
                image
              </div>
              <div className="card-body su-items-start su-rs-px-2 su-rs-pt-2 su-rs-pb-4">
                {node.su_library__phone && 
                  <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
                    <PhoneIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                    {node.su_library__phone}
                  </div>
                }
                {node.su_library__email && 
                  <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
                    <EnvelopeIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                    {node.su_library__email}
                  </div>
                }
                {node.su_library__address &&
                  <div className="su-relative su-mt-40 md:su-mt-20 su-mb-4">
                    <MapPinIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                    {node.su_library__map_link ? (
                      <Link href={node.su_library__map_link.uri} className="su-no-underline hocus:su-underline">
                        <div>{node.su_library__address.address_line1}</div>
                        <div>{node.su_library__address.address_line2}</div>
                        <div>{node.su_library__address.locality}, {node.su_library__address.administrative_area} {node.su_library__address.postal_code}</div>
                      </Link>
                    ): (
                      <>
                        <div>{node.su_library__address.address_line1}</div>
                        <div>{node.su_library__address.address_line2}</div>
                        <div>{node.su_library__address.locality}, {node.su_library__address.administrative_area} {node.su_library__address.postal_code}</div>
                      </>
                    )}
                  </div>
                }
                {hours &&
                  <div className="su-relative su-mt-40 md:su-mt-20 su-mb-4">
                    <ClockIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                    {hours && <LibraryHours {...todayHours} />}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="su-block su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border su-border-solid su-border-black-10 su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3">
          {node.su_library__phone && 
            <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
              <PhoneIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              {node.su_library__phone}
            </div>
          }
          {node.su_library__email && 
            <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
              <EnvelopeIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              {node.su_library__email}
            </div>
          }
          {node.su_library__address &&
            <div className="su-relative su-mt-40 md:su-mt-20 su-mb-4">
              <MapPinIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              {node.su_library__map_link ? (
                <Link href={node.su_library__map_link.uri} className="su-no-underline hocus:su-underline">
                  <div>{node.su_library__address.address_line1}</div>
                  <div>{node.su_library__address.address_line2}</div>
                  <div>{node.su_library__address.locality}, {node.su_library__address.administrative_area} {node.su_library__address.postal_code}</div>
                </Link>
              ): (
                <>
                  <div>{node.su_library__address.address_line1}</div>
                  <div>{node.su_library__address.address_line2}</div>
                  <div>{node.su_library__address.locality}, {node.su_library__address.administrative_area} {node.su_library__address.postal_code}</div>
                </>
              )}
            </div>
          }
          {hours &&
            <div className="su-relative su-mt-40 md:su-mt-20 su-mb-4">
              <ClockIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
              {hours && <LibraryHours {...todayHours} />}
            </div>
          }
        </div>

        {node.su_library__paragraphs && 
          <div className="su-rs-py-1">
            {node.su_library__paragraphs.map(paragraph =>
              <Paragraph key={paragraph.id} paragraph={paragraph}/>
            )}
          </div>
        }
      </article>
    </MainContentLayout>
  )
}

const LibraryBanner = ({node, ...props}: SulLibraryNodeProps) => {
  return (
    <div className="su-bg-black-true su-mb-100 su-relative">
      <div className="su-cc su-relative su-z-10 su-top-50 md:su-top-100 md:su-mx-40 md:su-min-h-[300px]">
        <div className="xl:su-mx-20 md:su-flex su-justify-between">
          <div className="su-text-white su-mb-40 md:su-w-1/3 lg:su-w-1/2">
            <h1 className="su-cc">Green Library</h1>
            {/* <h1 className="su-cc">{node.su_library__title}</h1> */}
          </div>
        </div>
      </div>

      <div
        className="su-bg-right-bottom lg:su-bg-home-banner-sprinkles su-absolute su-h-2/3 su-w-3/4 su-bottom-0 su-right-0">
        <div className="su-bg-gradient-to-b su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
          <div className="su-bg-gradient-to-r su-from-black-true su-to-transparent su-absolute su-w-full su-h-full">
            {/*Empty elements. They are absolute positioned to provide visual affects only.*/}
          </div>
        </div>
      </div>

      <div className="su-relative">
        <svg viewBox="0 0 1500 70">
          <path d="M0,71 Q500,65 800,20 Q1200,-30 1500,71" stroke="#fff" className="su-fill-white"></path>
        </svg>
      </div>
    </div>
  )
}

export const NodeSUlLibraryListItem = ({node, ...props}: SulLibraryNodeProps) => {
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

export const NodeSulLibraryCard = ({node, ...props}: SulLibraryNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

const LibraryHours = ({closed, closes_at, opens_at}) => {

  const closes = new Date(closes_at)
  const closeTime = closes.toLocaleTimeString("en-US", {
    hour: "numeric"
  })

  const opens = new Date(opens_at)
  const openTime = opens.toLocaleTimeString("en-US", {
    hour: "numeric"
  })

  return (
    <div>
      {closed && <span>closed</span>}
      {!closed && <span>{openTime} - {closeTime}</span>}
    </div>
  )
}
