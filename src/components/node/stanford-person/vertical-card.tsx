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

const VerticalPersonCard = ({node, h3Heading, ...props}: Props) => {
  const HeadingElement = h3Heading ? 'h3' : 'h2';
  const imageUrl = node.suPersonPhoto?.mediaImage.url

  return (
    <article
      className="@container w-full basefont-20 leading-display bg-white text-black border-x border-t-5 border-b border-solid border-black-10 border-t-digital-red shadow-md rs-pt-2 rs-px-2 rs-pb-3 mt-70" {...props}>
      {imageUrl &&
        <div
          className="relative flex justify-center pb-70 @lg:pb-80">
          <div className="absolute top-[-11rem]">
            <div
              className="relative rounded-full aspect-[1/1] w-[130px] @lg:w-[150px] overflow-hidden">
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
      }

      <div className="flex flex-col gap-[4.5rem]">
        <div className="flex flex-col">
          <Link
            href={node.path}
            className="underline hocus:no-underline active:no-underline text-black hocus:text-brick-dark active:text-digital-red"
          >
            <HeadingElement className="type-0 @lg:type-1 font-serif">{node.title}</HeadingElement>
          </Link>
          <div className="flex flex-col gap-[1.2rem]">
            {(node.suPersonFullTitle) &&
              <div className="text-18 @lg:type-0">{node.suPersonFullTitle}</div>
            }

            {node.suPersonEmail &&
              <div className="flex items-center">
                <EnvelopeIcon title="Email" width={20} className="flex-shrink-0 mr-3 text-digital-blue"/>

                <EmailLink
                  email={node.suPersonEmail}
                  className="transition-colors hover:text-brick-dark hover:bg-black-10 focus:bg-none focus:text-cardinal-red active:text-cardinal-red no-underline text-digital-blue text-18 @lg:text-18 break-words"
                />
              </div>
            }
          </div>
        </div>

        {node.sulPersonLibcalId &&
          <LibCal libcalId={node.sulPersonLibcalId} srText={node.title}/>
        }
      </div>
    </article>
  )
}
export default VerticalPersonCard;