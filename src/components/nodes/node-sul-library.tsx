import {useEffect, useState} from "react";
import {Library} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {ReactNodeLike} from "prop-types";
import Image from "next/image";
import Link from "next/link";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import Conditional from "@/components/simple/conditional";
import {Paragraph} from "@/components/paragraphs";
import {Banner} from "@/components/patterns/banner";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import axios from "axios";


interface SulLibraryNodeProps {
  node: Library;
  image?: ReactNodeLike;
}

export const NodeSulLibrary = ({node, image, ...props}: SulLibraryNodeProps) => {
  const [hours, setHours] = useState(null)

  useEffect(() => {
    axios.get('https://library-hours.stanford.edu/libraries.json')
      .then(response => {
        const branchHours = response.data.included.filter(item => node.su_library__hours === item.relationships.library.data.id.toLowerCase());
        // TODO search for the branch hours and pick the correct set.
        setHours(branchHours[0])
      });
  }, [node.su_library__hours])

  const dayOfWeekName = new Date().toLocaleString('default', {weekday: 'long'});
  const todayHours = hours && hours?.attributes?.hours?.find(day => day.weekday === dayOfWeekName);

  return (
    <MainContentLayout pageTitle={node.title}>
      <article>
        { console.log(node) }
        {/* {node.body && <div>{formatHtml(node.body.processed)}</div>} */}
        {/* {node.su_library__access && <div><h2>About</h2>{node.su_library__access}</div>} */}
        {/* {node.su_library__accessibility && <div><h2>Accessibility</h2>{node.su_library__accessibility}</div>} */}
        {/* {node.su_library__parking && <div><h2>Transit and Parking</h2>{node.su_library__parking}</div>} */}

        {/* <Banner
          // image={image}
          header={node.su_library__phone}
          superHeader={node.su_library__phone}
          body={node.su_library__phone}
          // link={node.su_library__phone}
          // overlayPosition={paragraph.behavior_settings?.hero_pattern?.overlay_position}
          {...props}
        /> */}

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
