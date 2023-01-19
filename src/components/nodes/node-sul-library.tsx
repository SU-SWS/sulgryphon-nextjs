import {Library} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalLink} from "@/components/simple/link";
import Link from "next/link";
import Image from "next/image";
import { useState} from "react";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Card} from "@/components/patterns/card";
import {Paragraph} from "@/components/paragraphs";
import {useNodeList} from "@/lib/hooks/useNodeList";
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
    <MainContentLayout header={<LibraryBanner node={node} />} {...props}>
      <article>
        { console.log(node) }

        {/* <div>
          <h2>Hours</h2>
          {todayHours && <LibraryHours {...todayHours} />}
        </div> */}

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
  const imageUrl = node.su_library__banner?.field_media_image?.image_style_uri?.breakpoint_2xl_2x;
  let image = null

  if (imageUrl) {
    image = <Image
      className="su-object-cover su-object-center"
      src={imageUrl}
      alt={node.su_library__banner.field_media_image.resourceIdObjMeta.alt}
      fill={true}
    />
  }

  return (
    <>
      <div className="su-bg-black-true su-mb-100 su-relative">
        <div className="su-absolute su-h-full su-w-full" >
          <div className="su-w-full su-h-full su-overflow-hidden su-relative su-min-h-[30rem] lg:su-min-h-[50rem]">
            {image}
          </div>
        </div>    
        <div className="su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-tl su-to-black-true su-from-transparent" aria-hidden="true"></div>
        <div className="su-cc su-relative su-z-10 su-top-50 md:su-top-100 md:su-mx-40 md:su-min-h-[300px]">
          <div className="xl:su-mx-20 md:su-flex su-justify-between">
            <div className="su-flex su-items-center su-text-white su-mb-40 md:su-w-1/3 lg:su-w-1/2">
              <h1 className="su-type-4 su-font-serif">{node.title}</h1>
            </div>
            
            <TodayHours className="su-relative su-z-100 su-min-w-[300px] xl:su-min-w-[400px]"/>
          </div>
        </div>

        <div className="su-relative">
          <svg viewBox="0 0 1500 70">
            <path d="M0,71 Q500,65 800,20 Q1200,-30 1500,71" stroke="#fff" className="su-fill-white"></path>
          </svg>
        </div>
      </div>
    </>
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

const TodayHours = (props) => {
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const libraries = useNodeList('sul_library');
  const hours = useLibraryHours();

  if (libraries.length === 0 || Object.keys(hours).length === 0) {
    return null;
  }

  const library = libraries.find((item, index) => selectedLibrary ? item.id === selectedLibrary : index === 0);
  const selectedHours = hours[library.su_library__hours]

  const date = new Date()
  const libraryHours = selectedHours.locations[Object.keys(selectedHours.locations)[0]].find(day => day.day === date.toISOString().substring(0, 10));
  let openTime, closeTime, isOpen = false, closedAllDay = libraryHours.closed;

  if (!libraryHours.closed) {
    openTime = new Date(libraryHours.opens_at);
    closeTime = new Date(libraryHours.closes_at);
    isOpen = date.getTime() > openTime.getTime() && date.getTime() < closeTime.getTime();
  }

  const imageUrl = library.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  const image = <Image
    className="su-object-cover su-object-center"
    src={imageUrl}
    alt=""
    fill={true}
  />

  return (
    <div {...props}>

      <Card
        className="su-border-0 su-rounded"
        image={image}
        footer={
          <>
            <div className="su-leading-tight su-text-black su-rs-px-2 su-rs-pb-1 su-mt-[-2rem]">
              {library.su_library__phone && 
                <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-0 su-mb-4">
                  <PhoneIcon width={18} className="md:su-absolute md:su-left-[-38px] md:su-top-[2px] su-mr-3 md:su-mr-0"/>
                  {library.su_library__phone}
                </div>
              }
              {library.su_library__email && 
                <>
                  <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-18 su-mb-4">
                    <EnvelopeIcon width={18} className="md:su-absolute md:su-left-[-38px] md:su-top-[3px] su-mr-3 md:su-mr-0"/>
                    {library.su_library__email}
                  </div>
                  <Link className="su-text-black hocus:su-text-digital-blue su-transition-colors" href={`mailto:${library.su_library__email}`}>
                    <span>{library.su_library__email}</span>
                    <EnvelopeIcon width={28} />
                  </Link>
                
                </>
              }
              {library.su_library__address &&
                <div className="su-relative su-mt-40 md:su-mt-18 su-mb-4">
                  <MapPinIcon width={18} className="md:su-absolute md:su-left-[-38px] md:su-top-[2px] su-mr-3 md:su-mr-0"/>
                  {library.su_library__map_link ? (
                    <Link href={library.su_library__map_link.uri} className="su-no-underline hocus:su-underline">
                      <div>{library.su_library__address.address_line1}</div>
                      <div>{library.su_library__address.address_line2}</div>
                      <div>{library.su_library__address.locality}, {library.su_library__address.administrative_area} {library.su_library__address.postal_code}</div>
                    </Link>
                  ): (
                    <>
                      <div>{library.su_library__address.address_line1}</div>
                      <div>{library.su_library__address.address_line2}</div>
                      <div>{library.su_library__address.locality}, {library.su_library__address.administrative_area} {library.su_library__address.postal_code}</div>
                    </>
                  )}
                </div>
              }
              {hours &&
                <>
                  <div className="su-relative su-mt-40 md:su-mt-18 su-mb-4">
                    <ClockIcon width={18} className="md:su-absolute md:su-left-[-38px] md:su-top-[1px] su-mr-3 md:su-mr-0"/>
                    {isOpen ? 'Open' : 'Closed'}
                  </div>
                  <div>
                    {!closedAllDay && (isOpen ? 'Closes at ' + closeTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }) : 'Opens at ' + openTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }))}
                  </div>
                </>
              }
            </div>
            <div className="su-relative su-pb-70 md:su-pb-40">
              <label htmlFor="library-hours" className="su-sr-only">Choose a library</label>
              <select
                id="library-hours"
                className="su-absolute su-w-full su-text-black su-text-20 su-py-20 su-mb-20 su-rounded su-shadow"
                onChange={e => setSelectedLibrary(e.target.value)}
              >
                {Object.keys(libraries).map(index =>
                  <option key={index} value={libraries[index].id}>{libraries[index].title}</option>
                )}
              </select>
            </div>

          </>
        }
      />
    </div>
  )
}