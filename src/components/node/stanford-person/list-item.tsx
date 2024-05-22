import Image from "next/image";
import Link from "@/components/patterns/elements/drupal-link";
import LibCal from "./libcal";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeStanfordPerson} from "@/lib/gql/__generated__/drupal.d";

const StanfordPersonListItem = ({node, ...props}: { node: NodeStanfordPerson }) => {
  const imageUrl = node.suPersonPhoto?.mediaImage.url;

  return (
    <article
      className="@container flex flex-col gap-lg w-full basefont-20 leading-display bg-white text-black" {...props}>
      {imageUrl &&
        <div
          className="relative rounded-full overflow-hidden aspect-[1/1] w-[130px] @lg:w-[215px] mx-auto">
          <Image
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            sizes="(max-width: 1700px) 100vw, 1500px"
            className="object-cover"
          />
        </div>
      }
      <div>
        <Link href={node.path}
              className="no-underline text-digital-red hocus:underline hocus:text-black">
          <h2 className="type-1 font-semibold mb-[0.2em]">{node.title}</h2>
        </Link>
        <div className="type-0 leading-snug">{node.suPersonShortTitle}</div>
      </div>
      {node.sulPersonLibcalId &&
        <div>
          <LibCal libcalId={node.sulPersonLibcalId} srText={node.title}/>
        </div>
      }
    </article>
  )
}
export default StanfordPersonListItem;