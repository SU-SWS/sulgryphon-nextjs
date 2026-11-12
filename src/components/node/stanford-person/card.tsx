import Image from "next/image"
import Link from "@/components/patterns/elements/drupal-link"
import LibCal from "./libcal"
import EmailLink from "@/components/patterns/elements/email-link"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordPerson} from "@/lib/gql/__generated__/graphql"
import {EnvelopeIcon} from "@heroicons/react/24/outline"

/** The fields the card reads. Full person nodes fit, and so does the trimmed data sent to the client. */
export type PersonCardData = Pick<
  NodeStanfordPerson,
  "uuid" | "title" | "path" | "suPersonFullTitle" | "suPersonEmail" | "sulPersonLibcalId"
> & {suPersonPhoto?: {mediaImage: {url: string}} | null}

interface Props {
  node: PersonCardData
  h3Heading?: boolean
}

const StanfordPersonCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"
  const imageUrl = node.suPersonPhoto?.mediaImage.url

  return (
    <article className="@container" {...props}>
      {/* Vertical layout (default) */}
      <div className="mt-70 w-full border-x border-t-5 border-b border-solid border-black-10 border-t-digital-red bg-white px-30 rs-pt-2 pb-40 leading-display text-black shadow-md @[510px]:hidden">
        {imageUrl && (
          <div className="relative flex justify-center pb-70 @lg:pb-80">
            <div className="absolute top-[-11rem]">
              <div className="relative aspect-square w-[130px] overflow-hidden rounded-full @lg:w-[150px]">
                <Image
                  className="rounded-full object-cover"
                  src={buildUrl(imageUrl).toString()}
                  alt=""
                  fill
                  sizes="(max-width: 1700px) 100vw, 1500px"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-15 text-center">
          <HeadingElement className="mb-03em text-24 font-bold">
            <Link href={node.path || "#"} className="link-card">
              {node.title}
            </Link>
          </HeadingElement>
          {node.suPersonFullTitle && <div className="text-18 @lg:type-0">{node.suPersonFullTitle}</div>}
          <div className="flex flex-col items-center gap-10">
            {node.suPersonEmail && (
              <div>
                <EmailLink
                  email={node.suPersonEmail}
                  icon={<EnvelopeIcon aria-hidden="true" width={20} className="mr-3" />}
                  className="link-cta text-18 font-semibold wrap-anywhere"
                />
              </div>
            )}
            {node.sulPersonLibcalId && <LibCal libcalId={node.sulPersonLibcalId} srText={node.title} />}
          </div>
        </div>
      </div>

      {/* Horizontal layout */}
      <div className="mt-0 hidden w-full flex-col border-x border-t border-b-5 border-solid border-black-10 border-b-digital-red bg-white rs-pt-2 rs-px-2 rs-pb-3 leading-display text-black shadow-md @[510px]:flex @3xl:flex-row">
        {imageUrl && (
          <div className="mx-auto mb-50 flex items-center @3xl:mr-50 @3xl:mb-0 @3xl:ml-0">
            <div className="relative aspect-square w-[155px]">
              <Image
                src={buildUrl(imageUrl).toString()}
                alt=""
                className="rounded-full object-cover"
                fill
                sizes="(max-width: 1700px) 100vw, 1500px"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-[1rem]">
          <HeadingElement className="type-1">
            <Link href={node.path || "#"} className="link-card">
              {node.title}
            </Link>
          </HeadingElement>

          {node.suPersonFullTitle && <div className="type-0">{node.suPersonFullTitle}</div>}

          {node.suPersonEmail && (
            <div>
              <EmailLink
                email={node.suPersonEmail}
                icon={<EnvelopeIcon aria-hidden="true" width={20} className="mr-6" />}
                className="link-cta font-semibold wrap-anywhere"
              />
            </div>
          )}

          {node.sulPersonLibcalId && <LibCal libcalId={node.sulPersonLibcalId} srText={node.title} />}
        </div>
      </div>
    </article>
  )
}

export default StanfordPersonCard
