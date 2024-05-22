import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import {EnvelopeIcon} from "@heroicons/react/20/solid";
import LibCal from "./libcal";

import EmailLink from "@/components/patterns/elements/email-link";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";

interface Props {
  node: NodeStanfordPerson
  h3Heading?: boolean
}

const HorizontalPersonCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  const imageUrl = node.suPersonPhoto?.mediaImage.url;

  return (
    <article
      className="flex flex-col @3xl:flex-row w-full basefont-20 leading-display bg-white text-black border-x border-t border-b-5 border-solid border-black-10  border-b-digital-red shadow-md rs-pt-2 rs-px-2 rs-pb-3 mt-0" {...props}>
      {imageUrl &&
        <div className="flex items-center mx-auto mb-50 @3xl:ml-0 @3xl:mb-0 @3xl:mr-50">
          <div className="relative aspect-[1/1] w-[155px]">
            <Image
              src={buildUrl(imageUrl).toString()}
              alt=""
              className="object-cover rounded-full"
              fill
              sizes="(max-width: 1700px) 100vw, 1500px"
            />
          </div>
        </div>
      }
      <div className="flex flex-col gap-[4rem]">
        <div className="flex flex-col gap-[1rem]">
          <Link href={node.path}
                className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red">
            <HeadingElement className="type-1">{node.title}</HeadingElement>
          </Link>

          {(node.suPersonFullTitle) &&
            <div className="type-0">{node.suPersonFullTitle}</div>
          }

          {(node.suPersonEmail) &&
            <div className="">
              <EnvelopeIcon width={20} className="inline-block mr-6 text-digital-blue"/>

              <EmailLink
                email={node.suPersonEmail}
                className="transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red no-underline text-digital-blue break-words"
              />
            </div>
          }
        </div>

        {node.sulPersonLibcalId &&
          <LibCal libcalId={node.sulPersonLibcalId} srText={node.title}/>
        }
      </div>
    </article>
  )
}
export default HorizontalPersonCard;