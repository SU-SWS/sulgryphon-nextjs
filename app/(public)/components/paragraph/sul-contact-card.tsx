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
	// {(width && width < 768)}
  const hours = useLibraryHours()
  console.log('paragraph: ', paragraph)
  // console.log('hours', hours)

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
  // console.log('library hours: ', libraryHours)
  const libraryPrimaryHours = libraryHours?.primary_hours;
  
  let todayHours;
  if (libraryPrimaryHours) {
    todayHours = libraryPrimaryHours.find(day => day.day === currentDay);
  }
  // console.log('todaysHours', todayHours)
  // console.log('libraryPrimaryHours', libraryPrimaryHours)
  
  const date = new Date()
  let openTime, closeTime, isOpen = false, closedAllDay = todayHours?.closed;

  if (Object.keys(hours).length !== 0 && !todayHours?.closed) {
    openTime = new Date(todayHours?.opens_at);
    closeTime = new Date(todayHours?.closes_at);
    isOpen = date.getTime() > openTime.getTime() && date.getTime() < closeTime.getTime();
  }

  const contactImageUrl = paragraph.sul_contact__image?.field_media_image?.image_style_uri?.breakpoint_md_2x
  console.log('contactImageUrl', contactImageUrl)
  const contactImageUrl2 = paragraph.sul_contact__branch?.su_library__contact_img?.field_media_image?.image_style_uri?.breakpoint_md_2x

  console.log('contactImageUrl 2', contactImageUrl2)
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
				<div className="su-overflow-hidden su-w-1/2 su-bg-digital-blue-light su-relative">
					{contactImage}
				</div>
				
				<div className="card-body su-items-start su-w-1/2 su-rs-px-2 su-rs-py-4 su-bg-black-true">
					<div className="su-leading-display su-text-18 su-pt-0 su-font-normal ">
						{paragraph.sul_contact__branch?.path ? (
							<Link href={paragraph.sul_contact__branch?.path?.alias} className="su-no-underline hocus:su-text-digital-red hocus:su-underline su-text-black">
								<h2 className="su-type-3 su-font-serif su-rs-mb-1 su-underline su-text-white hocus:su-text-digital-red hocus:su-no-underline">{paragraph.sul_contact__branch?.title}</h2>
							</Link>
						) : (
							<h2 className="su-type-3 su-font-serif su-rs-mb-1 su-text-white">{paragraph.sul_contact__title}</h2>
						)}
						<div className="su-leading-tight md:su-rs-px-2 su-text-white">
							<Conditional showWhen={paragraph.sul_contact__hours || paragraph.sul_contact__branch?.su_library__hours}>
								<div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
									<ClockIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mr-12 su-flex-shrink-0"/>
									<div className="su-flex">
										<Conditional showWhen={paragraph.sul_contact__hours}>
											<div className="su-text-white">
												{paragraph.sul_contact__hours}								
											</div>
										</Conditional>
										{paragraph.sul_contact__link?.url && 
											<Link className={paragraph.sul_contact__hours ? "su-mx-5 su-underline su-text-white hocus:su-text-digital-red hocus:su-no-underline" : "su-underline su-text-white hocus:su-text-digital-red hocus:su-no-underline"} href={paragraph.sul_contact__link?.url}>
												{paragraph.sul_contact__link?.title}
											</Link>
										}
									</div>
									<Conditional showWhen={paragraph.sul_contact__branch?.su_library__hours}>
										<div className="su-text-white" aria-live="polite">
											{ console.log('openTime: ', openTime) }
											{ console.log('closeTime: ', closeTime) }
											{ console.log('isOpen: ', isOpen) }
											{ console.log('closedAllDay: ', closedAllDay) }
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
							{/* {hours && */}
								{/* <div className="su-relative su-flex su-flex-row su-items-start su-mt-20 md:su-mt-18 su-rs-mb-1 su-type-1">
									<div className="su-flex">
										<ClockIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mt-01em md:su-mt-0 su-mr-12"/>
										<Conditional showWhen={paragraph.sul_contact__hours}>
											{paragraph.sul_contact__hours}
										</Conditional>
										<Conditional showWhen={paragraph.sul_contact__link}>
											<Link className={paragraph.sul_contact__hours ? "su-mx-5" : ""} href={paragraph.sul_contact__link?.url}>
												{paragraph.sul_contact__link?.title}
											</Link>
										</Conditional>
									</div>
								</div> */}
							<Conditional showWhen={paragraph.sul_contact__branch?.su_library__phone || paragraph.sul_contact__phone}>
								<div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
									<PhoneIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mr-12 su-flex-shrink-0"/>
									{paragraph.sul_contact__phone}{paragraph.sul_contact__branch?.su_library__phone}
								</div>
							</Conditional>
							<Conditional showWhen={paragraph.sul_contact__branch?.su_library__email || paragraph.sul_contact__email}>
								<div className="su-relative su-flex su-flex-row su-items-start su-rs-mb-0 su-type-1">
										<EnvelopeIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-02em su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
										<Link className="su-underline su-text-white hocus:su-text-digital-red hocus:su-no-underline su-font-normal" href={`mailto:${paragraph.sul_contact__branch?.su_library__email || paragraph.sul_contact__email}`}>
											{paragraph.sul_contact__branch?.su_library__email || paragraph.sul_contact__email}
										</Link>
									</div>
							</Conditional>
							<Conditional showWhen={paragraph.sul_contact__branch?.su_library__address || paragraph.sul_contact__address}>
								<div className="su-relative su-flex su-flex-row su-items-start su-type-1">
									<MapPinIcon width={19} className="md:su-absolute md:su-left-[-38px] md:su-top-01em su-mt-01em md:su-mt-0 su-mr-12 su-flex-shrink-0"/>
									{(paragraph.sul_contact__branch?.su_library__map_link || paragraph.sul_contact__map_link) ? (
										<Link href={paragraph.sul_contact__branch?.su_library__map_link.uri || paragraph.sul_contact__map_link.uri} className="su-underline su-text-white hocus:su-text-digital-red hocus:su-no-underline su-font-normal">
											<div>{paragraph.sul_contact__branch?.su_library__address?.address_line1 || paragraph.sul_contact__address?.address_line1}, {paragraph.sul_contact__branch?.su_library__address?.address_line2 || paragraph.sul_contact__address?.address_line2}, {paragraph.sul_contact__branch?.su_library__address?.locality || paragraph.sul_contact__address?.locality} {paragraph.sul_contact__branch?.su_library__address?.administrative_area || paragraph.sul_contact__address?.administrative_area}, {paragraph.sul_contact__branch?.su_library__address?.postal_code || paragraph.sul_contact__address?.postal_code}</div>
										</Link>	
									) : (
										<>
											<div>{paragraph.sul_contact__branch?.su_library__address?.address_line1 || paragraph.sul_contact__address?.address_line1}, {paragraph.sul_contact__branch?.su_library__address?.address_line2 || paragraph.sul_contact__address?.address_line2}, {paragraph.sul_contact__branch?.su_library__address?.locality || paragraph.sul_contact__address?.locality} {paragraph.sul_contact__branch?.su_library__address?.administrative_area || paragraph.sul_contact__address?.administrative_area}, {paragraph.sul_contact__branch?.su_library__address?.postal_code || paragraph.sul_contact__address?.postal_code}</div>
										</>
									)}
								</div>
							</Conditional>
							{/* } */}
						</div>
					</div>

				</div>
			</div>
			
			{/* <div className="su-flex">
				<Conditional showWhen={paragraph.sul_contact__hours}>
					{paragraph.sul_contact__hours}
				</Conditional>
				<Conditional showWhen={paragraph.sul_contact__link}>
					<Link className={paragraph.sul_contact__hours ? "su-mx-5" : ""} href={paragraph.sul_contact__link?.url}>
						{paragraph.sul_contact__link?.title}
					</Link>
				</Conditional>
			</div>
			<div className="su-text-black" aria-live="polite">
				{ console.log('openTime: ', openTime) }
				{ console.log('closeTime: ', closeTime) }
				{ console.log('isOpen: ', isOpen) }
				{ console.log('closedAllDay: ', closedAllDay) }
				<div className="su-flex">
					<ClockIcon className="su-inline su-mr-5" width={15}/> {isOpen ? 'Open' : 'Closed'}
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
			</div> */}

    </>
  )
}

export default SulContactCard;