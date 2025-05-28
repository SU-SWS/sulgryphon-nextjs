import formatHtml from "@/lib/format-html"
import {DrupalLinkButton} from "@/components/patterns/link"
import {EnvelopeIcon, PhoneIcon, MapIcon, DevicePhoneMobileIcon, PrinterIcon} from "@heroicons/react/24/outline"
import Link from "@/components/patterns/elements/drupal-link"
import LibCal from "@/components/node/stanford-person/libcal"
import LibGuides from "@/components/node/stanford-person/libguide"
import fetchLibGuides from "@/lib/libguides"
import EmailLink from "@/components/patterns/elements/email-link"
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import Paragraph from "@/components/paragraph"
import StanfordPersonMetadata from "@/components/node/stanford-person/stanford-person-metadata"
import NumberLink from "@/components/patterns/elements/number-link"

const StanfordPerson = async ({node, ...props}: {node: NodeStanfordPerson}) => {
  const libGuides = node.sulPersonLibguideId
    ? await fetchLibGuides({
        accountId: node.sulPersonLibguideId,
        cacheTags: [`paths:${node.path || "#"}`],
      })
    : []

  const lastUpdated = new Date(node.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })

  return (
    <article {...props}>
      <StanfordPersonMetadata node={node} />
      <div className="grid gap-2xl md:grid-cols-6">
        <div className="flex flex-col gap-40 md:col-span-4">
          {node.body && <div className="text-20 last:children:mb-0">{formatHtml(node.body.processed)}</div>}

          {node.suPersonProfileLink?.url && (
            <DrupalLinkButton href={node.suPersonProfileLink.url}>{node.suPersonProfileLink.title}</DrupalLinkButton>
          )}

          {node.suPersonComponents && (
            <div className="*:mb-40 last:*:mb-0">
              {node.suPersonComponents.map(paragraph => (
                <Paragraph key={paragraph.id} paragraph={paragraph} />
              ))}
            </div>
          )}

          {libGuides.length > 0 && (
            <div>
              <h2 className="mb-16">Guides</h2>
              <LibGuides heading="Guides" guides={libGuides} className="space-y-40" />
            </div>
          )}

          {node.suPersonEducation && (
            <div>
              <h2 className="mb-16">Education</h2>
              <ul>
                {node.suPersonEducation.map((education, index) => (
                  <li key={`person-education-${index}`}>{education}</li>
                ))}
              </ul>
            </div>
          )}

          {node.suPersonResearch && (
            <div>
              <h2 className="mb-16">Expertise</h2>
              <ul>
                {node.suPersonResearch.map((interest, index) => (
                  <li key={`research-${index}`}>{formatHtml(interest.processed)}</li>
                ))}
              </ul>
            </div>
          )}

          {node.suPersonResearchInterests && <div>{node.suPersonResearchInterests}</div>}

          {node.suPersonAffiliations && (
            <div>
              <h2 className="mb-16">Stanford Affiliations</h2>
              {node.suPersonAffiliations.map((affiliation, index) => {
                if (!affiliation.url) return
                return (
                  <DrupalLinkButton key={`person-affiliation-${index}`} href={affiliation.url}>
                    {affiliation.title}
                  </DrupalLinkButton>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex h-fit flex-col justify-between gap-24 border border-black-10 p-32 shadow-lg md:col-span-2">
          {(node.suPersonTelephone ||
            node.suPersonMobilePhone ||
            node.suPersonFax ||
            node.suPersonMailCode ||
            node.suPersonEmail) && (
            <div>
              <h2 className="text-24">Contact</h2>
              <ul className="list-none p-0 children:mb-[0.4rem] last:children:mb-0">
                {node.suPersonTelephone && (
                  <li className="flex flex-row items-center">
                    <PhoneIcon title="Phone" width={24} className="mr-4 text-digital-blue" />
                    <NumberLink tel={node.suPersonTelephone} />
                  </li>
                )}
                {node.suPersonMobilePhone && (
                  <li className="flex flex-row items-center">
                    <DevicePhoneMobileIcon title="Phone" width={24} className="mr-4 text-digital-blue" />
                    <NumberLink tel={node.suPersonMobilePhone} />
                  </li>
                )}
                {node.suPersonFax && (
                  <li className="flex flex-row items-center">
                    <PrinterIcon title="Phone" width={24} className="mr-4 text-digital-blue" />
                    <NumberLink tel={node.suPersonFax} />
                  </li>
                )}
                {node.suPersonEmail && (
                  <li className="flex flex-row items-center">
                    <EnvelopeIcon title="Email" width={24} className="mr-4 text-digital-blue" />
                    <EmailLink className="break-words" email={node.suPersonEmail} />
                  </li>
                )}
                {node.suPersonMailCode && <li>Mail Code: {node.suPersonMailCode}</li>}
              </ul>
            </div>
          )}

          {(node.suPersonLocationName || node.suPersonLocationAddress || node.suPersonMapUrl) && (
            <div className="children:mb-[0.4rem] last:children:mb-0">
              {node.suPersonLocationName && <div className="text-16 md:text-18">{node.suPersonLocationName}</div>}

              {node.suPersonLocationAddress && (
                <div className="children:mb-0">{formatHtml(node.suPersonLocationAddress.processed)}</div>
              )}

              {node.suPersonMapUrl?.url && (
                <div className="flex flex-row items-center">
                  <MapIcon title="Location" width={24} className="mr-4 text-digital-blue" />
                  <Link href={node.suPersonMapUrl.url} className="text-16 md:text-18">
                    Map
                  </Link>
                </div>
              )}
            </div>
          )}

          {node.suPersonLinks && (
            <div>
              <h2 className="text-24">Links</h2>
              <ul className="list-none p-0 children:mb-[0.4rem] last:children:mb-0">
                {node.suPersonLinks.map((link, index) => {
                  if (!link.url) return
                  return (
                    <li key={`person-link-${index}`} className="m-0">
                      <Link href={link.url} className={"leading text-blue-600 no-underline hocus:text-black"}>
                        {link.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {node.sulPersonLibcalId && <LibCal libcalId={node.sulPersonLibcalId} srText={node.title} />}
        </div>
      </div>
      <div className="rs-mb-0 rs-mt-4 centered">Last updated {lastUpdated}</div>
    </article>
  )
}

export default StanfordPerson
