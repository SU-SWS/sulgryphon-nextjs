import "server-only";

import {Person} from "@/lib/drupal/drupal";
import Image from "next/image";
import Conditional from "@/components/utils/conditional";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import formatHtml from "@/lib/format-html";
import {DrupalLinkButton} from "@/components/patterns/link";
import {EnvelopeIcon, LinkIcon, MapIcon, PhoneIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import LibCal from "./libcal";
import LibGuides from "./libguide";
import fetchLibGuides from "@/lib/libguides";
import fetchComponents from "@/lib/fetch-components";
import {DrupalParagraph} from "next-drupal";
import Paragraph from "@/components/paragraph";

const StanfordPerson = async ({node, ...props}: { node: Person }) => {
  node.su_person_components = await fetchComponents(node.su_person_components ?? []) as DrupalParagraph[];
  node.su_person_components = node.su_person_components.filter(item => item?.id?.length > 0);
  node.lib_guides = node.sul_person__libguide_id ? await fetchLibGuides({accountId: node.sul_person__libguide_id}) : [];

  const imageUrl = node.su_person_photo?.field_media_image?.image_style_uri?.medium_square;
  const imageAlt = node.su_person_photo?.field_media_image?.resourceIdObjMeta?.alt ?? '';
  const placeholder = node.su_person_photo?.field_media_image?.uri.base64;

  return (
    <article {...props}>
      <div className="sm:su-flex su-no-wrap su-rs-mb-5 su-mt-50">
        {imageUrl &&
          <div className="su-rs-mr-4 su-rs-mb-1 sm:su-mb-[0rem]">
            <div className="su-relative su-rounded-full su-w-[220px] su-h-[220px] su-overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill={true}
                placeholder={placeholder ? 'blur' : 'empty'}
                blurDataURL={placeholder}
              />
            </div>
          </div>
        }

        <div className="su-flex su-flex-col su-justify-between">
          <div>

            {(node.su_person_full_title || node.su_person_short_title) &&
              <div className="su-type-0 su-leading">{node.su_person_full_title || node.su_person_short_title}</div>
            }

            <Conditional showWhen={node.su_person_pronouns}>
              <div className="su-type-0 su-leading">Pronouns: {node.su_person_pronouns}</div>
            </Conditional>
          </div>

          <LibCal libcalId={node.sul_person__libcal_id}/>
        </div>
      </div>

      <div className="su-grid md:su-grid-cols-6 su-gap-2xl">
        <div className="su-col-span-4">
          {node.body && <div
            className="su-type-1 su-rs-mt-6 sm:su-rs-mt-0 su-rs-mb-7 md:su-w-10/12 ">{formatHtml(node.body)}</div>}

          {node.su_person_components &&
            <div className="su-mb-40">
              {node.su_person_components.map(component =>
                <Paragraph key={component.id} paragraph={component} fullWidth={false}/>
              )}
            </div>
          }

          <Conditional showWhen={node.lib_guides.length > 0}>
            <LibGuides guides={node.lib_guides} className="su-mb-50"/>
          </Conditional>

          {(node.su_person_education && node.su_person_education.length > 0) &&
            <div className="su-rs-mb-7">
              <h2 className="su-type-1">Education</h2>
              {node.su_person_education.map((education, index) =>
                <div key={`person-education-${index}`} className="su-rs-mb-0">
                  {education}
                </div>
              )}
            </div>
          }

          {(node.su_person_research && node.su_person_research.length > 0) &&
            <div className="su-rs-mb-7">
              <h2 className="su-type-1">Research</h2>
              <div className="md:su-grid su-grid-cols-2">
                {node.su_person_research.map((interest, index) =>
                  <div key={`research-${index}`} className="su-rs-mb-1">
                    {formatHtml(interest)}
                  </div>
                )}
              </div>
            </div>
          }

          <Conditional showWhen={node.su_person_research_interests}>
            {node.su_person_research_interests}
          </Conditional>

          {(node.su_person_affiliations && node.su_person_affiliations.length > 0) &&
            <div className="su-rs-mb-7">
              <h2 className="su-type-1">Stanford Affiliations</h2>
              {node.su_person_affiliations.map((affiliation, index) =>
                <DrupalLinkButton key={`person-affiliation-${index}`}
                                  href={affiliation.url}>{affiliation.title}</DrupalLinkButton>
              )}
            </div>
          }
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
                      <Link scroll href={`mailto:${node.su_person_email}`}>
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

              {node.su_person_location_address && <div className="children:su-mb-0">
                {formatHtml(node.su_person_location_address)}
              </div>}

              {node?.su_person_map_url?.url &&
                <div>
                  Map URL: <Link scroll href={node.su_person_map_url.url}>{node.su_person_map_url.url}</Link>
                </div>
              }
            </Conditional>
          </div>

          {(node.su_person_links && node.su_person_links.length > 0) &&
            <div className="su-rs-mb-4">
              <div className="su-relative su-flex su-flex-row su-items-start su-mt-40 md:su-mt-20 su-mb-4">
                <LinkIcon width={26} className="md:su-absolute md:su-left-[-32px] su-mr-3 md:su-mr-0"/>
                <h2 className="su-type-0">Links</h2>
              </div>
              <div>
                {node.su_person_links.map((link, index) =>
                  <div key={`person-link-${index}`}>
                    <Link scroll href={link.uri}
                          className={'su-leading su-no-underline su-text-blue-600 hocus:su-text-black'}>* {link.title}</Link>
                  </div>
                )}
              </div>
            </div>
          }

          {node?.su_person_profile_link &&
            <DrupalLinkButton className="su-rs-mb-4" href={node.su_person_profile_link.url}>
              {node.su_person_profile_link.title}
            </DrupalLinkButton>
          }

        </div>
      </div>
    </article>
  )
}

export default StanfordPerson;