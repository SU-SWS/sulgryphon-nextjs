import Image from "next/image"
import Link from "@/components/patterns/elements/drupal-link"
import LibCal from "./libcal"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d"

const StanfordPersonListItem = ({node, ...props}: {node: NodeStanfordPerson}) => {
  const imageUrl = node.suPersonPhoto?.mediaImage.url

  return (
    <article
      className="basefont-20 flex w-full flex-col gap-lg bg-white leading-display text-black @container"
      {...props}
    >
      {imageUrl && (
        <div className="relative mx-auto aspect-[1/1] w-[130px] overflow-hidden rounded-full @lg:w-[215px]">
          <Image
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            sizes="(max-width: 1700px) 100vw, 1500px"
            className="object-cover"
          />
        </div>
      )}
      <div>
        <Link href={node.path || "#"} className="text-digital-red no-underline hocus:text-black hocus:underline">
          <h2 className="type-1 mb-[0.2em] font-semibold">{node.title}</h2>
        </Link>
        <div className="type-0 leading-snug">{node.suPersonShortTitle}</div>
      </div>
      {node.sulPersonLibcalId && (
        <div>
          <LibCal libcalId={node.sulPersonLibcalId} srText={node.title} />
        </div>
      )}
    </article>
  )
}
export default StanfordPersonListItem
