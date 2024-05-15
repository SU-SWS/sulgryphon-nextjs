import Image from "next/image";
import formatHtml from "@/lib/format-html";
import {DrupalLinkButton} from "@/components/patterns/link";
import {EnvelopeIcon, LinkIcon, MapIcon, PhoneIcon} from "@heroicons/react/20/solid";
import Link from "@/components/patterns/elements/drupal-link";
import LibCal from "@/components/node/stanford-person/libcal";
import LibGuides from "@/components/node/stanford-person/libguide";
import fetchLibGuides from "@/lib/libguides";
import EmailLink from "@/components/patterns/elements/email-link";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";
import Paragraph from "@/components/paragraph";

const StanfordPerson = async ({node, ...props}: { node: NodeStanfordPerson }) => {

  const libGuides = node.sulPersonLibguideId ? await fetchLibGuides({accountId: node.sulPersonLibguideId}) : [];
  const imageUrl = node.suPersonPhoto?.mediaImage.url

  return (
    <article {...props}>
      <div className="sm:flex no-wrap rs-mb-5 mt-50">
        {imageUrl &&
          <div className="rs-mr-4 rs-mb-1 sm:mb-[0rem]">
            <div className="relative rounded-full w-[220px] h-[220px] overflow-hidden">
              <Image
                className="object-cover"
                src={buildUrl(imageUrl).toString()}
                alt=""
                fill
                sizes="500px"
              />
            </div>
          </div>
        }

        <div className="flex flex-col justify-center gap-2xl">
          <div>
            {(node.suPersonFullTitle || node.suPersonShortTitle) &&
              <div className="type-0 leading">{node.suPersonFullTitle || node.suPersonShortTitle}</div>
            }

            {(node.suPersonPronouns) &&
              <div className="type-0 leading">Pronouns: {node.suPersonPronouns}</div>
            }
          </div>

          {node.sulPersonLibcalId &&
            <LibCal libcalId={node.sulPersonLibcalId} srText={node.title}/>
          }
        </div>
      </div>

      <div className="grid md:grid-cols-6 gap-2xl">
        <div className="col-span-4">
          {node.body && <div
            className="type-1 rs-mt-6 sm:rs-mt-0 rs-mb-7 md:w-10/12 ">{formatHtml(node.body.processed)}</div>}

          {node.suPersonComponents &&
            <div className="mb-40">
              {node.suPersonComponents.map(paragraph =>
                <Paragraph key={paragraph.id} paragraph={paragraph}/>
              )}
            </div>
          }

          {libGuides.length > 0 &&
            <LibGuides guides={libGuides} className="mb-50 space-y-40"/>
          }

          {node.suPersonEducation &&
            <div className="rs-mb-7">
              <h2 className="type-1">Education</h2>
              {node.suPersonEducation.map((education, index) =>
                <div key={`person-education-${index}`} className="rs-mb-0">
                  {education}
                </div>
              )}
            </div>
          }

          {node.suPersonResearch &&
            <div className="rs-mb-7">
              <h2 className="type-1">Research</h2>
              <div className="md:grid grid-cols-2">
                {node.suPersonResearch.map((interest, index) =>
                  <div key={`research-${index}`} className="rs-mb-1">
                    {formatHtml(interest.processed)}
                  </div>
                )}
              </div>
            </div>
          }

          {(node.suPersonResearchInterests) &&
            <div className="rs-mb-7">
              {node.suPersonResearchInterests}
            </div>
          }

          {node.suPersonAffiliations &&
            <div className="rs-mb-7">
              <h2 className="type-1">Stanford Affiliations</h2>
              {node.suPersonAffiliations.map((affiliation, index) => {
                  if (!affiliation.url) return;
                  return (
                    <DrupalLinkButton key={`person-affiliation-${index}`} href={affiliation.url}>
                      {affiliation.title}
                    </DrupalLinkButton>
                  )
                }
              )}
            </div>
          }
        </div>

        <div className="col-span-2">
          <div className="rs-mb-7">
            {(node.suPersonTelephone || node.suPersonMobilePhone || node.suPersonFax || node.suPersonMailCode || node.suPersonEmail) &&
              <>
                <div className="relative flex flex-row items-start mt-40 md:mt-20 mb-4">
                  <PhoneIcon title="Phone" width={26} className="md:absolute md:left-[-32px] mr-3 md:mr-0"/>
                  <h2 className="type-0">Contact</h2>
                </div>
                <ul className="list-none p-0 children:mb-0">
                  {(node.suPersonTelephone) &&
                    <li>p {node.suPersonTelephone}</li>
                  }
                  {(node.suPersonMobilePhone) &&
                    <li>m {node.suPersonMobilePhone}</li>
                  }
                  {(node.suPersonFax) &&
                    <li>f {node.suPersonFax}</li>
                  }
                  {(node.suPersonMailCode) &&
                    <li>Mail Code: {node.suPersonMailCode}</li>
                  }
                  {node.suPersonEmail &&
                    <li>
                      <EmailLink
                        className="break-words"
                        email={node.suPersonEmail}
                      />
                      <EnvelopeIcon title="Email" width={20} className="inline-block ml-4 text-digital-blue"/>
                    </li>
                  }
                </ul>
              </>
            }
          </div>

          <div className="rs-mb-7 children:leading">
            {(node.suPersonLocationName || node.suPersonLocationAddress || node.suPersonMapUrl) &&
              <>
              <div className="relative flex flex-row items-start mt-40 md:mt-20 mb-4">
                <MapIcon title="Location" width={26} className="md:absolute md:left-[-32px] mr-3 md:mr-0"/>
                <h2 className="type-0">Location</h2>
              </div>

              {node.suPersonLocationName &&
                <div>
                {node.suPersonLocationName}
                </div>
              }

              {node.suPersonLocationAddress &&
                <div className="children:mb-0">
                {formatHtml(node.suPersonLocationAddress.processed)}
              </div>
              }

              {node.suPersonMapUrl?.url &&
                <div>
                  Map URL: <Link href={node.suPersonMapUrl.url}>{node.suPersonMapUrl.url}</Link>
                </div>
              }
              </>
            }
          </div>

          {node.suPersonLinks &&
            <div className="rs-mb-4">
              <div className="relative flex flex-row items-start mt-40 md:mt-20 mb-4">
                <LinkIcon title="Link" width={26} className="md:absolute md:left-[-32px] mr-3 md:mr-0"/>
                <h2 className="type-0">Links</h2>
              </div>
              <div>
                {node.suPersonLinks.map((link, index) => {
                    if (!link.url) return;
                    return (<div key={`person-link-${index}`}>
                      <Link href={link.url} className={'leading no-underline text-blue-600 hocus:text-black'}>
                        * {link.title}
                      </Link>
                    </div>)
                  }
                )}
              </div>
            </div>
          }

          {node.suPersonProfileLink?.url &&
            <DrupalLinkButton className="rs-mb-4" href={node.suPersonProfileLink.url}>
              {node.suPersonProfileLink.title}
            </DrupalLinkButton>
          }

        </div>
      </div>
    </article>
)
}

export default StanfordPerson;