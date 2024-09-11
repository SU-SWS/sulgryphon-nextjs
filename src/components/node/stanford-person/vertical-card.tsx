import Image from "next/image"
import Link from "@/components/patterns/elements/drupal-link"
import {EnvelopeIcon} from "@heroicons/react/20/solid"
import LibCal from "./libcal"
import EmailLink from "@/components/patterns/elements/email-link"

import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"

interface Props {
  node: NodeStanfordPerson
  h3Heading?: boolean
}

const VerticalPersonCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"
  const imageUrl = node.suPersonPhoto?.mediaImage.url

  return (
    <article
      className="rs-pt-2 rs-px-2 rs-pb-3 basefont-20 mt-70 w-full border-x border-b border-t-5 border-solid border-black-10 border-t-digital-red bg-white leading-display text-black shadow-md @container"
      {...props}
    >
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

      <div className="flex flex-col gap-[4.5rem]">
        <div className="flex flex-col">
          <Link
            href={node.path}
            className="text-black underline active:text-digital-red active:no-underline hocus:text-brick-dark hocus:no-underline"
          >
            <HeadingElement className="type-0 font-serif @lg:type-1">{node.title}</HeadingElement>
          </Link>
          <div className="flex flex-col gap-[1.2rem]">
            {node.suPersonFullTitle && <div className="text-18 @lg:type-0">{node.suPersonFullTitle}</div>}

            {node.suPersonEmail && (
              <div className="flex items-center">
                <EnvelopeIcon title="Email" width={20} className="mr-3 flex-shrink-0 text-digital-blue" />

                <EmailLink
                  email={node.suPersonEmail}
                  className="break-words text-18 text-digital-blue no-underline transition-colors hover:bg-black-10 hover:text-brick-dark focus:bg-none focus:text-cardinal-red active:text-cardinal-red @lg:text-18"
                />
              </div>
            )}
          </div>
        </div>

        {node.sulPersonLibcalId && <LibCal libcalId={node.sulPersonLibcalId} srText={node.title} />}
      </div>
    </article>
  )
}
export default VerticalPersonCard
