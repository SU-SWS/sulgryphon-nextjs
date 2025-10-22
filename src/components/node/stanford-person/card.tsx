import Image from "next/image"
import Link from "@/components/patterns/elements/drupal-link"
import LibCal from "./libcal"
import EmailLink from "@/components/patterns/elements/email-link"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"
import {EnvelopeIcon} from "@heroicons/react/24/outline"

interface Props {
  node: NodeStanfordPerson
  h3Heading?: boolean
}

const StanfordPersonCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"
  const imageUrl = node.suPersonPhoto?.mediaImage.url

  return (
    <article className="@container" {...props}>
      {/* Vertical layout (default) */}
      <div className="rs-pt-2 rs-px-2 rs-pb-3 mt-70 w-full border-x border-b border-t-5 border-solid border-black-10 border-t-digital-red bg-white leading-display text-black shadow-md @[510px]:hidden">
        {imageUrl && (
          <div className="relative flex justify-center pb-70 @lg:pb-80">
            <div className="absolute top-[-11rem]">
              <div className="relative aspect-[1/1] w-[130px] overflow-hidden rounded-full @lg:w-[150px]">
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
          <Link
            href={node.path || "#"}
            className="text-black no-underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:underline"
          >
            <HeadingElement className="mb-03em text-24 font-bold">{node.title}</HeadingElement>
          </Link>
          {node.suPersonFullTitle && <div className="text-18 @lg:type-0">{node.suPersonFullTitle}</div>}
          <div className="flex flex-col items-center gap-10">
            {node.suPersonEmail && (
              <div className="flex w-fit items-center">
                <EnvelopeIcon title="Email" width={20} className="mr-3 shrink-0 text-digital-blue" />

                <EmailLink
                  email={node.suPersonEmail}
                  className="break-words text-18 text-digital-blue no-underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red @lg:text-18"
                />
              </div>
            )}
            {node.sulPersonLibcalId && <LibCal libcalId={node.sulPersonLibcalId} srText={node.title} />}
          </div>
        </div>
      </div>

      {/* Horizontal layout */}
      <div className="rs-pt-2 rs-px-2 rs-pb-3 mt-0 hidden w-full flex-col border-x border-b-5 border-t border-solid border-black-10 border-b-digital-red bg-white leading-display text-black shadow-md @3xl:flex-row @[510px]:flex">
        {imageUrl && (
          <div className="mx-auto mb-50 flex items-center @3xl:mb-0 @3xl:ml-0 @3xl:mr-50">
            <div className="relative aspect-[1/1] w-[155px]">
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
          <Link
            href={node.path || "#"}
            className="text-black underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:no-underline"
          >
            <HeadingElement className="type-1">{node.title}</HeadingElement>
          </Link>

          {node.suPersonFullTitle && <div className="type-0">{node.suPersonFullTitle}</div>}

          {node.suPersonEmail && (
            <div className="">
              <EnvelopeIcon title="Email" width={20} className="mr-6 inline-block text-digital-blue" />

              <EmailLink
                email={node.suPersonEmail}
                className="break-words text-digital-blue no-underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red"
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
