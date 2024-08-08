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

const HorizontalPersonCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? "h3" : "h2"
  const imageUrl = node.suPersonPhoto?.mediaImage.url

  return (
    <article
      className="rs-pt-2 rs-px-2 rs-pb-3 basefont-20 mt-0 flex w-full flex-col border-x border-b-5 border-t border-solid border-black-10 border-b-digital-red bg-white leading-display text-black shadow-md @3xl:flex-row"
      {...props}
    >
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
      <div className="flex flex-col gap-[4rem]">
        <div className="flex flex-col gap-[1rem]">
          <Link
            href={node.path}
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
        </div>

        {node.sulPersonLibcalId && <LibCal libcalId={node.sulPersonLibcalId} srText={node.title} />}
      </div>
    </article>
  )
}
export default HorizontalPersonCard
