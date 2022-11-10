import {DrupalLink, DrupalLinkButton} from "@/components/simple/link";
import {MapIcon, PhoneIcon} from "@heroicons/react/20/solid";
import {NextSeo} from "next-seo";

import {Person} from "../../types/drupal";
import formatHtml from "@/lib/format-html";
import {Paragraph} from "@/components/paragraphs";
import {DrupalImage} from "@/components/simple/image";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import LinkIcon from "@heroicons/react/20/solid/LinkIcon";
import EnvelopeIcon from "@heroicons/react/20/solid/EnvelopeIcon";

interface PersonNodeProps {
  node: Person
}

export const NodeStanfordPerson = ({node, ...props}: PersonNodeProps) => {

  return (
    <MainContentLayout>
      <article {...props}>
        <NextSeo
          openGraph={{profile: {firstName: node.su_person_first_name, lastName: node.su_person_last_name}}}
        />

        <div className="su-flex su-no-wrap su-mb-[50px]">

          {node?.su_person_photo?.field_media_image &&
              <div className="su-mr-[20px]">
                  <div className="su-rounded-full su-w-[220px] su-h-[220px] su-overflow-hidden">
                      <DrupalImage

                          src={node.su_person_photo.field_media_image.uri.url}
                          alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt}
                          height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
                          width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
                      />
                  </div>
              </div>
          }

          <div>
            {node.su_person_short_title}
            <h1>{node.title}</h1>
            {node.su_person_full_title}
          </div>
        </div>

        <div className="md:su-grid su-grid-cols-6 su-gap-[40px]">
          <div className="su-col-span-4">
            {node.body?.processed && <div>{formatHtml(node.body.processed)}</div>}

            {node.su_person_components && node.su_person_components.map(paragraph =>
              <Paragraph key={paragraph.id} paragraph={paragraph}/>
            )}

            {node.su_person_education &&
                <div>
                    <h2>Education</h2>
                  {node.su_person_education}
                </div>
            }

            {node.su_person_research &&
                <div>
                    <h2>Research</h2>
                    <div className="su-grid su-grid-cols-2">
                      {node.su_person_research.map((interest, index) =>
                        <div key={`research-${index}`}>
                          {formatHtml(interest.processed)}
                        </div>
                      )}
                    </div>
                </div>

            }


            {node.su_person_research_interests}

            {node.su_person_affiliations &&
                <div>
                    <h2>Stanford Affiliations</h2>
                  {node.su_person_affiliations.map((affiliation, index) =>
                    <DrupalLinkButton key={`person-affiliation-${index}`} href={affiliation.url}>{affiliation.title}</DrupalLinkButton>
                  )}
                </div>
            }


          </div>

          <div className="su-col-span-2">
            <div className="su-flex su-no-wrap">
              <PhoneIcon width={41}/>
              <h2 className="su-mb-0">Contact</h2>
            </div>

            {(node.su_person_email || node.su_person_mobile_phone) &&
                <ul>
                  <li>p {node.su_person_telephone}</li>
                  <li>m {node.su_person_mobile_phone}</li>
                  <li>f {node.su_person_fax}</li>
                  <li>Mail Code: {node.su_person_mail_code}</li>
                  <li><DrupalLink href={`mailto:${node.su_person_email}`}>
                    {node.su_person_email}
                    <EnvelopeIcon height={41} className="" />
                  </DrupalLink></li>
                </ul>
            }

            {(node.su_person_location_name || node.su_person_address) &&
                <div>
                    <div className="su-flex su-no-wrap">
                        <MapIcon height={41} className=""/>
                        <h2>Location</h2>
                    </div>

                  {node.su_person_location_name}
                  {formatHtml(node.su_person_location_address.processed)}
                </div>
            }

            {node?.su_person_map_url?.url &&
                <DrupalLink href={node.su_person_map_url.url}>{node.su_person_map_url.title}</DrupalLink>
            }

            {node?.su_person_links.length !== 0 &&
              <div>
                <h2>Links</h2>
                <div>
                  {node.su_person_links.map((link) =>
                    <div>
                      <DrupalLink href={link.uri} className={'ml-10 hover:text-blue-600'}>{link.title}</DrupalLink>
                    </div>
                  )}
                </div>
              </div>
            }

            {console.log(node.su_person_links )}
          </div>
        </div>
      </article>
    </MainContentLayout>
  )
}

export const NodeStanfordPersonListItem = ({node, ...props}: PersonNodeProps) => {
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

export const NodeStanfordPersonCard = ({node, ...props}: PersonNodeProps) => {

  return (
    <article className="su-shadow-md su-p-30 su-mb-30" {...props}>
      {node?.su_person_photo?.field_media_image &&
          <DrupalImage
              src={node.su_person_photo.field_media_image.uri.url}
              alt={node.su_person_photo.field_media_image.resourceIdObjMeta.alt}
              height={node.su_person_photo.field_media_image.resourceIdObjMeta.height}
              width={node.su_person_photo.field_media_image.resourceIdObjMeta.width}
          />
      }
      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black su-text-center">
        <h2>{node.title}</h2>
      </DrupalLink>
      <div className="su-text-center">{node.su_person_short_title}</div>
    </article>
  )
}
