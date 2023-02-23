import {DrupalLinkButton} from "@/components/simple/link";
import Image from "next/image";
import Link from "next/link";
import {EnvelopeIcon, LinkIcon, MapIcon, PhoneIcon} from "@heroicons/react/20/solid";
import {SizeMe} from 'react-sizeme'
import {useEffect, useId, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {NextSeo} from "next-seo";
import dynamic from "next/dynamic";

import {Person} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import Conditional from "../simple/conditional";

const Modal = dynamic(() => import("../simple/modal"));
const MainContentLayout = dynamic(() => import("../layouts/main-content-layout").then((mod) => mod.MainContentLayout));
const Paragraph = dynamic(() => import("../paragraphs/index").then((mod) => mod.Paragraph));

interface PersonNodeProps {
  node: Person
}

export const NodeStanfordPerson = ({node, ...props}: PersonNodeProps) => {

  return (
    <MainContentLayout pageTitle={node.title}>
      <article {...props}>
        <NextSeo
          openGraph={{profile: {firstName: node.su_person_first_name, lastName: node.su_person_last_name}}}
        />
        <div className="sm:su-flex su-no-wrap su-rs-mb-5 su-mt-50">
          {node.su_person_photo?.field_media_image &&
              <div className="su-rs-mr-4 su-rs-mb-1 sm:su-mb-[0rem] ">
                <div className="su-rounded-full su-w-[220px] su-h-[220px] su-overflow-hidden">
                  <Image
                      src={node.su_person_photo.field_media_image.image_style_uri.medium_square}
                      alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt}
                      height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
                      width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
                  />
                </div>
              </div>
          }

          <div>
            <Conditional showWhen={node.su_person_short_title}>
              <div className="su-type-0 su-leading">{node.su_person_short_title}</div>
            </Conditional>
            <Conditional showWhen={node.su_person_full_title}>
              <div className="su-type-0 su-leading">{node.su_person_full_title}</div>
            </Conditional>
            <Conditional showWhen={node.su_person_pronouns}>
              <div className="su-type-0 su-leading">Pronouns: {node.su_person_pronouns}</div>
            </Conditional>
          </div>
        </div>

        <div className="md:su-grid su-grid-cols-6 su-gap-[40px]">
          <div className="su-col-span-4">
            {node.body?.processed && <div
                className="su-type-1 su-rs-mt-6 sm:su-rs-mt-0 su-rs-mb-7 md:su-w-10/12 ">{formatHtml(node.body.processed)}</div>}

            <Conditional showWhen={node.su_person_components}>
              {node.su_person_components.map(paragraph =>
                <Paragraph key={paragraph.id} paragraph={paragraph}/>
              )}
            </Conditional>

            <Conditional showWhen={node.su_person_education.length > 0}>
              <div className="su-rs-mb-7">
                <h2 className="su-type-0">Education</h2>
                {node.su_person_education.map((education, index) =>
                  <div key={`person-education-${index}`} className="su-rs-mb-0">
                    {education}
                  </div>
                )}
              </div>
            </Conditional>

            <Conditional showWhen={node.su_person_research.length > 0}>
              <div className="su-rs-mb-7">
                <h2 className="su-type-0">Research</h2>
                <div className="md:su-grid su-grid-cols-2">
                  {node.su_person_research.map((interest, index) =>
                    <div key={`research-${index}`} className="su-rs-mb-1">
                      {formatHtml(interest.processed)}
                    </div>
                  )}
                </div>
              </div>
            </Conditional>

            <Conditional showWhen={node.su_person_research_interests}>
              {node.su_person_research_interests}
            </Conditional>

            <Conditional showWhen={node.su_person_affiliations.length > 0}>
              <div className="su-rs-mb-7">
                <h2 className="su-type-0">Stanford Affiliations</h2>
                {node.su_person_affiliations.map((affiliation, index) =>
                  <DrupalLinkButton key={`person-affiliation-${index}`}
                                    href={affiliation.url}>{affiliation.title}</DrupalLinkButton>
                )}
              </div>
            </Conditional>
          </div>

          <div className="su-col-span-2">
            <div className="su-rs-mb-7">
              {(node.su_person_telephone || node.su_person_mobile_phone || node.su_person_fax || node.su_person_mail_code || node.su_person_email) &&
                  <>
                    <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
                      <PhoneIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                      <h2 className="su-type-0">Contact</h2>
                    </div>
                    <ul className="su-list-none su-p-0 children:su-mb-0">
                      <Conditional showWhen={node.su_person_telephone}>
                        <li>p {node.su_person_telephone}</li>
                      </Conditional>
                      <Conditional showWhen={node.su_person_mobile_phone}>
                        <li>m {node.su_person_mobile_phone}</li>
                      </Conditional>
                      <Conditional showWhen={node.su_person_fax}>
                        <li>f {node.su_person_fax}</li>
                      </Conditional>
                      <Conditional showWhen={node.su_person_mail_code}>
                        <li>Mail Code: {node.su_person_mail_code}</li>
                      </Conditional>
                      <Conditional showWhen={node.su_person_email}>
                        <li>
                          <Link href={`mailto:${node.su_person_email}`}>
                            {node.su_person_email}
                            <EnvelopeIcon width={20} className="su-inline-block su-ml-4"/>
                          </Link>
                        </li>
                      </Conditional>
                    </ul>
                  </>
              }
            </div>

            <div className="su-rs-mb-7 children:su-leading">
              <Conditional
                showWhen={(node.su_person_location_name || node.su_person_location_address || node.su_person_map_url)}>
                <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
                  <MapIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                  <h2 className="su-type-0">Location</h2>
                </div>

                <Conditional showWhen={node.su_person_location_name}>
                  {node.su_person_location_name}
                </Conditional>

                {node.su_person_location_address?.processed && <div className="children:su-mb-0">
                  {formatHtml(node.su_person_location_address.processed)}
                </div>}

                {node?.su_person_map_url?.url &&
                    <div>
                      Map URL: <Link href={node.su_person_map_url.url}>{node.su_person_map_url.url}</Link>
                    </div>
                }
              </Conditional>
            </div>

            <Conditional showWhen={node.su_person_links.length > 0}>
              <div className="su-rs-mb-4">
                <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
                  <LinkIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                  <h2 className="su-type-0">Links</h2>
                </div>
                <div>
                  {node.su_person_links.map((link, index) =>
                    <div key={`person-link-${index}`}>
                      <Link href={link.uri}
                            className={'su-leading su-no-underline su-text-blue-600 hocus:su-text-black'}>* {link.title}</Link>
                    </div>
                  )}
                </div>
              </div>
            </Conditional>

            <Conditional showWhen={node.sul_person__libcal_id}>
              <LibCal libcalId={node.sul_person__libcal_id}/>
            </Conditional>

            <Conditional showWhen={node.lib_guides.length > 0}>
              <LibGuides guides={node.lib_guides}/>
            </Conditional>

            {node?.su_person_profile_link &&
                <DrupalLinkButton className="su-rs-mb-4"
                                  href={node.su_person_profile_link.url}>{node.su_person_profile_link.title}</DrupalLinkButton>
            }

          </div>
        </div>
      </article>
    </MainContentLayout>
  )
}

const LibCal = ({libcalId}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const iframeRef = useRef(null);
  return (
    <>
      <button className="su-button" onClick={() => setModalOpen(true)}>
        Schedule an appointment
      </button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ariaLabel="Foo Bar"
        initialFocus={iframeRef}
      >
        <iframe
          ref={iframeRef}
          src={`https://appointments.library.stanford.edu/widget/appointments?u=${libcalId}&lid=0&gid=0&iid=5247&t=Make%20an%20appointment`}
          title="Schedule an appointment"
          className="su-w-full su-h-full"
        />
      </Modal>
    </>
  )
}

const LibGuides = ({guides}) => {
  const courseGuides = guides.filter(guide => guide.type === 'Course Guide');
  const topicGuides = guides.filter(guide => guide.type === 'Topic Guide');

  return (
    <div>
      <Conditional showWhen={courseGuides.length > 0}>
        <LibGuideSection heading="Course Guides" guides={courseGuides}/>
      </Conditional>

      <Conditional showWhen={topicGuides.length > 0}>
        <LibGuideSection heading="Topic Guides" guides={topicGuides}/>
      </Conditional>
    </div>
  )
}

const LibGuideSection = ({heading, guides}) => {
  const firstGuides = guides.slice(0, 5);
  const moreGuides = guides.slice(5)
  const moreGuideRef = useRef(null);
  const buttonRef = useRef(null);
  const [showMore, setShowMore] = useState(true);
  const [parent] = useAutoAnimate();
  const containerId = useId();

  useEffect(() => {
    if(!showMore){
      moreGuideRef?.current?.focus()
    }
  }, [showMore])

  return (
    <>
      <h2>{heading}</h2>
      <ul ref={parent} id={containerId} className="su-list-unstyled">
        {firstGuides.map(guide =>
          <li key={guide.id}><Link href={guide.url}>{guide.title}</Link></li>
        )}

        <Conditional showWhen={moreGuides.length > 0}>
          <Conditional showWhen={!showMore}>
            {moreGuides.map((guide, i) =>
              <li key={guide.id}>
                <Link href={guide.url} ref={i === 0 ? moreGuideRef : null}>{guide.title}</Link>
              </li>
            )}
          </Conditional>
        </Conditional>
      </ul>

      <Conditional showWhen={moreGuides.length > 0}>
        <button
          className="su-button su-mx-auto su-block"
          ref={buttonRef}
          onClick={() => setShowMore(!showMore)}
          aria-expanded={!showMore}
                aria-controls={containerId}
        >
          {showMore ? `Show ${moreGuides.length} More` : 'Show Less'} <span className="su-sr-only">{heading}</span>
        </button>
      </Conditional>
    </>
  )
}

export const NodeStanfordPersonListItem = ({node, ...props}: PersonNodeProps) => {
  return (
    <article
      className="su-grid su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black lg:su-rs-pt-2 lg:su-rs-px-2 lg:su-rs-pb-3 " {...props}>
      {node.su_person_photo?.field_media_image &&
          <div className="su-rs-pb-1">
            <SizeMe>
              {({size}) => (
                <div
                  className={size.width < 300 ? "su-rounded-full su-w-[130px] su-h-[130px] su-overflow-hidden" : "su-rounded-full su-w-[215px] su-h-[215px] su-overflow-hidden"}>
                  <Image
                    src={node.su_person_photo.field_media_image.image_style_uri.medium_square}
                    alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt}
                    height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
                    width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
                  />
                </div>
              )}
            </SizeMe>
          </div>
      }
      <Link href={node.path.alias}
            className="su-no-underline su-text-digital-red hocus:su-underline hocus:su-text-black">
        <h2 className="su-type-1 su-font-semibold su-mb-[0.2em]">{node.title}</h2>
      </Link>
      <div className="su-type-0 su-leading-snug">{node.su_person_short_title}</div>

      <Conditional showWhen={node.sul_person__libcal_id}>
        <LibCal libcalId={node.sul_person__libcal_id}/>
      </Conditional>
    </article>
  )
}

export const NodeStanfordPersonCard = ({node, ...props}: PersonNodeProps) => {

  return (
    <SizeMe>
      {({size}) => (
        <>
          {size.width < 510 ?
            <article
              className="su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t-5 su-border-b su-border-solid su-border-black-10 su-border-t-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-70" {...props}>
              {node?.su_person_photo?.field_media_image &&
                  <div
                      className={size.width < 300 ? "su-relative su-flex su-justify-center su-pb-70" : "su-relative su-flex su-justify-center su-pb-80"}>
                    <div className="su-absolute su-top-[-11rem]">
                      <div
                          className={size.width < 300 ? "su-rounded-full su-w-[130px] su-h-[130px] su-overflow-hidden" : "su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden"}>
                        <Image
                            src={node.su_person_photo.field_media_image.image_style_uri.medium_square}
                            alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt}
                            height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
                            width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
                        />
                      </div>
                    </div>
                  </div>
              }
              <div>
                <Link href={node.path.alias}
                      className="su-no-underline hocus:su-text-digital-red hocus:su-underline su-text-black">
                  <h2
                    className={size.width < 300 ? "su-type-0 su-rs-mb-neg2 su-font-serif" : "su-type-1 su-rs-mb-neg2 su-font-serif"}>{node.title}</h2>
                </Link>
                <Conditional showWhen={node.su_person_full_title}>
                  <div
                    className={size.width < 300 ? "su-text-18 su-rs-mb-neg2" : "su-type-0 su-rs-mb-neg2"}>{node.su_person_full_title}</div>
                </Conditional>
                <Conditional showWhen={node.su_person_email}>
                  <Link href={`mailto:${node.su_person_email}`}
                        className={size.width < 300 ? "su-no-underline hocus:su-underline su-text-digital-blue su-text-18" : "su-no-underline hocus:su-underline su-text-digital-blue"}>
                    <div className="su-flex su-items-center su-truncate">
                      <EnvelopeIcon width={size.width < 300 ? 14 : 20} className="su-flex-shrink-0 su-mr-3"/>
                      {node.su_person_email}
                    </div>
                  </Link>
                </Conditional>

                <Conditional showWhen={node.sul_person__libcal_id}>
                  <LibCal libcalId={node.sul_person__libcal_id}/>
                </Conditional>
              </div>
            </article>
            :
            <article
              className="su-flex su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t su-border-b-5 su-border-solid su-border-black-10  su-border-b-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-0" {...props}>
              {node?.su_person_photo?.field_media_image &&
                  <div className="su-flex su-justify-center su-mr-50">
                    <div className="su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden">
                      <Image
                          src={node.su_person_photo.field_media_image.image_style_uri.medium_square}
                          alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt}
                          height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
                          width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
                      />
                    </div>
                  </div>
              }
              <div>
                <Link href={node.path.alias}
                      className="su-no-underline hocus:su-text-digital-red hocus:su-underline su-text-black">
                  <h2 className="su-type-1 su-rs-mb-neg2 su-font-serif">{node.title}</h2>
                </Link>
                <Conditional showWhen={node.su_person_full_title}>
                  <div className="su-type-0 su-rs-mb-neg2">{node.su_person_full_title}</div>
                </Conditional>
                <Conditional showWhen={node.su_person_email}>
                  <Link href={`mailto:${node.su_person_email}`}
                        className="su-no-underline hocus:su-underline su-text-digital-blue">
                    <EnvelopeIcon width={20} className="su-inline-block su-mr-6"/>
                    {node.su_person_email}
                  </Link>
                </Conditional>

                <Conditional showWhen={node.sul_person__libcal_id}>
                  <LibCal libcalId={node.sul_person__libcal_id}/>
                </Conditional>
              </div>
            </article>
          }
        </>
      )}
    </SizeMe>
  )
}
