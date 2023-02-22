import {DrupalLinkButton} from "@/components/simple/link";
import Image from "next/image";
import Link from "next/link";
import {EnvelopeIcon, LinkIcon, MapIcon, PhoneIcon} from "@heroicons/react/20/solid";
import {NextSeo} from "next-seo";
import {Person} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {Paragraph} from "@/components/paragraphs";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import Conditional from "../simple/conditional";
import { SizeMe } from 'react-sizeme'

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
            {node.body?.processed && <div className="su-type-1 su-rs-mt-6 sm:su-rs-mt-0 su-rs-mb-7 md:su-w-10/12 ">{formatHtml(node.body.processed)}</div>}
            
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
                    { education }
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
                  <DrupalLinkButton key={`person-affiliation-${index}`} href={affiliation.url}>{affiliation.title}</DrupalLinkButton>
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
                        <EnvelopeIcon width={20} className="su-inline-block su-ml-4" />
                      </Link>
                    </li>
                  </Conditional>
                </ul>
              </>
              }
            </div>

            <div className="su-rs-mb-7 children:su-leading">
              <Conditional showWhen={(node.su_person_location_name || node.su_person_location_address || node.su_person_map_url)}>
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
                      <Link href={link.uri} className={'su-leading su-no-underline su-text-blue-600 hocus:su-text-black'}>* {link.title}</Link>
                    </div>
                  )}
                </div>
              </div>
            </Conditional>

            {node?.su_person_profile_link &&
              <DrupalLinkButton className="su-rs-mb-4" href={node.su_person_profile_link.url}>{node.su_person_profile_link.title}</DrupalLinkButton>
            }

          </div>
        </div>
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordPersonListItem = ({node, ...props}: PersonNodeProps) => {
  return (
    <article className="su-grid su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-rs-pt-2 su-rs-px-2 su-rs-pb-3 " {...props}>
      {node.su_person_photo?.field_media_image &&
        <div className="su-rs-pb-1">
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
      <Link href={node.path.alias} className="su-no-underline su-text-digital-red hocus:su-underline hocus:su-text-black">
        <h2 className="su-type-1 su-font-semibold su-mb-[0.2em]">{node.title}</h2>
      </Link>
      <div className="su-type-0 su-leading-snug">{node.su_person_short_title}</div>
    </article>
  )
}

export const NodeStanfordPersonCard = ({node, ...props}: PersonNodeProps) => {

  return (
    <SizeMe monitorHeight>
      {({ size }) => (
        <article className="su-w-full su-basefont-23 su-leading-display su-bg-white su-text-black su-border-x su-border-t-5 sm:su-border-t su-border-b sm:su-border-b-5 su-border-solid su-border-black-10 su-border-t-digital-red sm:su-border-t-black-10 sm:su-border-b-digital-red su-shadow-md su-rs-pt-2 su-rs-px-2 su-rs-pb-3 su-mt-70 sm:su-mt-0" {...props}>
          {size.width < 510 ?
            <>
              {node?.su_person_photo?.field_media_image &&
                <div className="su-relative sm:su-static su-flex su-justify-center su-pb-80 sm:su-rs-pb-4">
                  <div className="su-absolute sm:su-static su-top-[-11rem]">
                    <div className="su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden">
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
                <Link href={node.path.alias} className="su-no-underline hocus:su-text-digital-red hocus:su-underline su-text-black">
                  <h2 className="su-type-1 su-rs-mb-neg2 su-font-serif">{node.title}</h2>
                </Link>
                <Conditional showWhen={node.su_person_full_title}>
                  <div className="su-type-0 su-rs-mb-neg2">{node.su_person_full_title}</div>
                </Conditional>
                <Conditional showWhen={node.su_person_email}>
                  <Link href={`mailto:${node.su_person_email}`}>
                    <EnvelopeIcon width={20} className="su-inline-block su-mr-4" />
                    {node.su_person_email}
                  </Link>
                </Conditional>
              </div>
              <div>My width is {size.width}px</div>
              <div>My height is {size.height}px</div>
            </>
          :
            <>
              {node?.su_person_photo?.field_media_image &&
                <div className="su-relative sm:su-static su-flex su-justify-center su-pb-80 sm:su-rs-pb-4">
                  <div className="su-absolute sm:su-static su-top-[-11rem]">
                    <div className="su-rounded-full su-w-[155px] su-h-[155px] su-overflow-hidden">
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
                <Link href={node.path.alias} className="su-no-underline hocus:su-text-digital-red hocus:su-underline su-text-black">
                  <h2 className="su-type-1 su-rs-mb-neg2 su-font-serif">{node.title}</h2>
                </Link>
                <Conditional showWhen={node.su_person_full_title}>
                  <div className="su-type-0 su-rs-mb-neg2">{node.su_person_full_title}</div>
                </Conditional>
                <Conditional showWhen={node.su_person_email}>
                  <Link href={`mailto:${node.su_person_email}`}>
                    <EnvelopeIcon width={20} className="su-inline-block su-mr-4" />
                    {node.su_person_email}
                  </Link>
                </Conditional>
              </div>
              <div>My width is {size.width}px</div>
              <div>My height is {size.height}px</div>
            </>
          }
        </article>
      )}
    </SizeMe>
  )
}