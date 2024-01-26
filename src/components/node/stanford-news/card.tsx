import Link from "@/components/patterns/elements/drupal-link";
import Image from "next/image";
import {buildUrl} from "@/lib/drupal/utils";
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal";

interface Props {
  node: NodeStanfordNews
  h3Heading?: boolean
}

const StanfordNewsCard = ({node, h3Heading, ...props}: Props) => {
  const goToUrl = node.suNewsSource?.url || node.path;
  const featuredImageUrl = node.suNewsFeaturedMedia?.mediaImage.url
  const bannerImageUrl = node.suNewsBanner?.__typename === 'MediaImage' && node.suNewsBanner.mediaImage.url;
  const imageUrl =  featuredImageUrl || bannerImageUrl

  const HeadingElement = h3Heading ? 'h3' : 'h2';
  return (
    <article {...props} className="flex flex-col">
      {imageUrl &&
        <div className="overflow-hidden aspect-[4/3] relative mb-40" aria-hidden="true">
          <Image
            className="object-cover object-center"
            src={buildUrl(imageUrl).toString()}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 500px"
          />
        </div>
      }

      <HeadingElement className="text-m2 order-last">
        <Link href={goToUrl}
              className="text-black-true hover:text-brick-dark underline hover:no-underline">
          {node.title}
        </Link>
      </HeadingElement>

      {node.suNewsTopics?.[0]?.name &&
        <div className="font-semibold mb-20">
          {node.suNewsTopics[0].name}
        </div>
      }


    </article>
  )
}
export default StanfordNewsCard;