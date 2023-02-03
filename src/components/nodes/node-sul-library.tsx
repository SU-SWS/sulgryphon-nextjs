import {Library} from "../../types/drupal";
import Link from "next/link";
import Image from "next/image";
import { useId } from 'react';
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {Card} from "@/components/patterns/card";
import {Paragraph} from "@/components/paragraphs";
import {useLibraryHours} from "@/lib/hooks/useLibraryHours";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface SulLibraryNodeProps {
  node: Library;
}

export const NodeSulLibrary = ({node, ...props}: SulLibraryNodeProps) => {

  return (
    <MainContentLayout header={<LibraryBanner node={node} />} {...props}>
      <article>
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
  const inputId = useId();
  const hours = useLibraryHours()

  if (Object.keys(hours).length === 0) {
    return null;
  }

  const toISOStringWithTimezone = date => {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      diff + pad(tzOffset / 60) +
      ':' + pad(tzOffset % 60);
  };

  const currentDay = toISOStringWithTimezone(new Date()).substring(0, 10);
  const libraryHours = hours[node.su_library__hours];
  const libraryPrimaryHours = libraryHours?.primary_hours;
  
  let todayHours;
  if (libraryPrimaryHours) {
    todayHours = libraryPrimaryHours.find(day => day.day === currentDay);
  }
  
  const date = new Date()
  let openTime, closeTime, isOpen = false;

  if (!todayHours.closed) {
    openTime = new Date(todayHours.opens_at);
    closeTime = new Date(todayHours.closes_at);
    isOpen = date.getTime() > openTime.getTime() && date.getTime() < closeTime.getTime();
  }

  const bannerImageUrl = node.su_library__banner?.field_media_image?.image_style_uri?.breakpoint_2xl_2x;
  let bannerImage = null

  if (bannerImageUrl) {
    bannerImage = <Image
      className="su-object-cover su-object-center"
      src={bannerImageUrl}
      alt={node.su_library__banner.field_media_image.resourceIdObjMeta.alt}
      fill={true}
    />
  }

  const contactImageUrl = node.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x
  let contactImage = null

  if (contactImageUrl) {
    contactImage = <Image
      className="su-object-cover su-object-center"
      src={contactImageUrl}
      alt={node.su_library__contact_img.field_media_image.resourceIdObjMeta.alt}
      fill={true}
    />
  }

  return (
    <>
      <div className="su-bg-black-true su-mb-100 su-relative">
        <div className="su-absolute su-h-full su-w-full" >
          <div className="su-hidden md:su-block su-w-full su-h-full su-overflow-hidden su-relative">
            {bannerImage}
          </div>
        </div>    
        <div className="su-absolute su-block su-w-full su-h-full su-top-0 su-bg-gradient-to-tl su-to-black-true su-from-transparent" aria-hidden="true"></div>
        <div className="su-cc su-relative su-z-10 su-top-50 md:su-top-100 md:su-mx-40 md:su-min-h-[300px]">
          <div className="xl:su-mx-20 md:su-flex su-justify-between">
            <div className="su-flex su-items-center su-text-white su-mb-40 md:su-w-1/3 lg:su-w-1/2">
              <h1 className="su-type-4 su-font-serif">{node.title}</h1>
            </div>

            <div className="su-relative su-z-100 su-min-w-[300px] xl:su-min-w-[400px]">
              <Card
                className="su-border-0 su-rounded"
                image={contactImage}
                footer={
                  <>
                    <div className="su-leading-tight su-text-black md:su-rs-px-2 su-rs-pb-1 su-mt-[-2rem]">
                      {node.su_library__phone && 
                        <div className="su-relative su-flex su-flex-row su-items-start su-mb-4 su-type-1">
                          <PhoneIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mr-12"/>
                          {node.su_library__phone}
                        </div>
                      }
                      {node.su_library__email && 
                        <div className="su-relative su-flex su-flex-row su-items-start su-mt-20 md:su-mt-18 su-mb-4 su-type-1">
                          <EnvelopeIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-02em su-mt-01em md:su-mt-0 su-mr-12"/>
                          <Link className="su-no-underline hocus:su-underline" href={`mailto:${node.su_library__email}`}>
                            {node.su_library__email}
                          </Link>
                        </div>
                      }
                      {node.su_library__address &&
                        <div className="su-relative su-flex su-flex-row su-items-start su-mt-20 md:su-mt-18 su-mb-4 su-type-1">
                          <MapPinIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mt-01em md:su-mt-0 su-mr-12"/>
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
                        <div className="su-relative su-flex su-flex-row su-items-start su-mt-20 md:su-mt-18 su-mb-4 su-type-1">
                          <ClockIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mt-01em md:su-mt-0 su-mr-12"/>
                          {isOpen ? 'Open' : 'Closed'}
                        </div>
                      }
                    </div>
                    {libraryPrimaryHours &&
                      <div className="su-relative su-pb-70 md:su-pb-40">
                        <label htmlFor={inputId + '-libraryhours'} className="su-sr-only">Choose a library</label>
                        <select id={inputId + '-libraryhours'} className="su-absolute su-leading-none su-w-full su-text-black su-py-20 su-mb-20 su-rounded su-shadow su-type-1">
                          {libraryPrimaryHours.map(date =>
                              <option key={`library-hours-${date.day}`} selected={date.day === currentDay} disabled={date.day !== currentDay} value={date.day}>
                                <LibraryHours key={date} {...date} />
                              </option>
                            )}
                        </select>
                      </div>
                    }
                  </>
                }
              />
            </div>
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

const LibraryHours = ({closed, closes_at, opens_at, weekday}) => {

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
      {closed && <span>{weekday.slice(0,3)}: Closed</span>}
      {!closed && <span>{weekday.slice(0,3)}: {openTime} - {closeTime}</span>}
    </div>
  )
}

export const NodeSUlLibraryListItem = ({node, ...props}: SulLibraryNodeProps) => {
  return (
    <article {...props}>
      <Link href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}

export const NodeSulLibraryCard = ({node, ...props}: SulLibraryNodeProps) => {
  return (
    <article className="su-shadow-lg" {...props}>
      <Link href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </Link>
    </article>
  )
}