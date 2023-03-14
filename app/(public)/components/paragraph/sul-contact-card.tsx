"use client";

import Link from "next/link";
import Image from "next/image";
import {ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import useLibraryHours from "@/lib/hooks/useLibraryHours";
import Conditional from "../utils/conditional";
import {useResizeDetector} from "react-resize-detector";
import { ContactCardParagraph } from "@/lib/drupal/drupal";

interface ContactCardProps {
  paragraph: ContactCardParagraph
	siblingCount?: number
}

const SulContactCard = ({paragraph, siblingCount}: ContactCardProps) => {
	const {width, ref} = useResizeDetector();
  const hours = useLibraryHours()

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
  const libraryHours = paragraph.sul_contact__branch?.su_library__hours ? hours[paragraph.sul_contact__branch?.su_library__hours] : [];
  const libraryPrimaryHours = libraryHours?.primary_hours;
  
  let todayHours;
  if (libraryPrimaryHours) {
    todayHours = libraryPrimaryHours.find(day => day.day === currentDay);
  }
  
  const date = new Date()
  let openTime, closeTime, isOpen = false, closedAllDay = todayHours?.closed;

  if (Object.keys(hours).length !== 0 && !todayHours?.closed) {
    openTime = new Date(todayHours?.opens_at);
    closeTime = new Date(todayHours?.closes_at);
    isOpen = date.getTime() > openTime.getTime() && date.getTime() < closeTime.getTime();
  }

  const contactImageUrl = paragraph.sul_contact__image?.field_media_image?.image_style_uri?.breakpoint_md_2x || paragraph.sul_contact__branch?.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x

  let contactImage

  if (contactImageUrl) {
    contactImage = <Image
      className="su-object-cover su-object-center su-static"
      src={contactImageUrl}
      alt={paragraph.sul_contact__image?.field_media_image?.resourceIdObjMeta?.alt ?? ''}
      fill={true}
    />
  }

  return (
    <>
			<div ref={ref} className={"su-flex su-w-full su-basefont-23 su-leading-display su-shadow-md su-border-0 su-rounded " + ((width && width < 768) && " su-flex-col")}>
				<div className={"su-overflow-hidden su-aspect-[16/9] su-relative " + ((width && width > 767) && " su-w-1/2")}>
					{contactImage}
				</div>
				
				<div className={"card-body su-items-start su-rs-px-2 su-rs-py-4 su-bg-black-true " + ((width && width > 767) && " su-w-1/2")}>
					<div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
						{paragraph.sul_contact__branch?.path ? (
							<Link href={paragraph.sul_contact__branch?.path?.alias} className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light">
								<h2 className="su-type-3 su-rs-mb-1">{paragraph.sul_contact__branch?.title}</h2>
							</Link>
						) : (
							<h2 className="su-type-3 su-rs-mb-1 su-text-white">{paragraph.sul_contact__title}</h2>
						)}
						<div className="su-leading-tight md:su-rs-px-2 su-text-white">
							<Conditional showWhen={paragraph.sul_contact__hours || paragraph.sul_contact__branch?.su_library__hours}>
								<div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
									<ClockIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mr-12 su-flex-shrink-0"/>
									<div className="sm:su-flex">
										<Conditional showWhen={paragraph.sul_contact__hours}>
											<div className="su-text-white su-rs-mb-neg2 sm:su-mb-0">
												{paragraph.sul_contact__hours}								
											</div>
										</Conditional>
										{paragraph.sul_contact__link?.url && 
											<Link className={"su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal" + (paragraph.sul_contact__hours && " sm:su-ml-15") } href={paragraph.sul_contact__link?.url}>
												{paragraph.sul_contact__link?.title}
											</Link>
										}
									</div>
									<Conditional showWhen={paragraph.sul_contact__branch?.su_library__hours}>
										<div className="su-text-white" aria-live="polite">
											<div className="su-flex">
												{isOpen ? 'Open ' : 'Closed '}
												/
												<div className="su-ml-5">
													{!closedAllDay && (isOpen ? 'Closes at ' + closeTime?.toLocaleTimeString("en-US", {
														hour: "numeric",
														minute: "numeric",
													}) : 'Opens at ' + openTime?.toLocaleTimeString("en-US", {
														hour: "numeric",
														minute: "numeric",
													}))}
												</div>
											</div>
										</div>
									</Conditional>
								</div>
							</Conditional>
							<Conditional showWhen={paragraph.sul_contact__branch?.su_library__phone || paragraph.sul_contact__phone}>
								<div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
									<PhoneIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mr-12 su-flex-shrink-0"/>
									{paragraph.sul_contact__phone}{paragraph.sul_contact__branch?.su_library__phone}
								</div>
							</Conditional>
							<Conditional showWhen={paragraph.sul_contact__branch?.su_library__email || paragraph.sul_contact__email}>
								<div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
										<EnvelopeIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-02em su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
										<Link className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal" href={`mailto:${paragraph.sul_contact__branch?.su_library__email || paragraph.sul_contact__email}`}>
											{paragraph.sul_contact__branch?.su_library__email || paragraph.sul_contact__email}
										</Link>
									</div>
							</Conditional>
							<Conditional showWhen={paragraph.sul_contact__branch?.su_library__address || paragraph.sul_contact__address}>
								<div className="su-relative su-flex su-flex-row su-items-start su-type-1">
									<MapPinIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
									{(paragraph.sul_contact__branch?.su_library__map_link || paragraph.sul_contact__map_link) ? (
										<Link href={paragraph.sul_contact__branch?.su_library__map_link.uri || paragraph.sul_contact__map_link.uri} className="su-underline su-text-white hocus:su-text-illuminating-dark hocus:su-no-underline active:su-text-digital-red-light su-font-normal">
											<div>{paragraph.sul_contact__branch?.su_library__address?.address_line1 || paragraph.sul_contact__address?.address_line1}, {paragraph.sul_contact__branch?.su_library__address?.address_line2 || paragraph.sul_contact__address?.address_line2}, {paragraph.sul_contact__branch?.su_library__address?.locality || paragraph.sul_contact__address?.locality} {paragraph.sul_contact__branch?.su_library__address?.administrative_area || paragraph.sul_contact__address?.administrative_area}, {paragraph.sul_contact__branch?.su_library__address?.postal_code || paragraph.sul_contact__address?.postal_code}</div>
										</Link>	
									) : (
										<>
											<div>{paragraph.sul_contact__branch?.su_library__address?.address_line1 || paragraph.sul_contact__address?.address_line1}, {paragraph.sul_contact__branch?.su_library__address?.address_line2 || paragraph.sul_contact__address?.address_line2}, {paragraph.sul_contact__branch?.su_library__address?.locality || paragraph.sul_contact__address?.locality} {paragraph.sul_contact__branch?.su_library__address?.administrative_area || paragraph.sul_contact__address?.administrative_area}, {paragraph.sul_contact__branch?.su_library__address?.postal_code || paragraph.sul_contact__address?.postal_code}</div>
										</>
									)}
								</div>
							</Conditional>
						</div>
					</div>

				</div>
			</div>
    </>
  )
}

export default SulContactCard;