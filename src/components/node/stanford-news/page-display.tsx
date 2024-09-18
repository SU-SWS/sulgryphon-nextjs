import Oembed from "@/components/patterns/elements/oembed"
import Image from "next/image"
import {EnvelopeIcon} from "@heroicons/react/20/solid"
import LinkedInIcon from "@/components/patterns/icons/LinkedInIcon"
import TwitterIcon from "@/components/patterns/icons/TwitterIcon"
import FacebookIcon from "@/components/patterns/icons/FacebookIcon"
import NewsSocialLink from "@/components/node/stanford-news/news-social-link"
import {formatDate} from "@/lib/format-date"
import NewsPrintButton from "@/components/node/stanford-news/print-button"
import {redirect} from "next/navigation"
import {buildUrl} from "@/lib/drupal/utils"
import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"
import Paragraph from "@/components/paragraph"

const StanfordNews = async ({node, ...props}: {node: NodeStanfordNews}) => {
  // Redirect the user to the external source.
  if (node.suNewsSource?.url) redirect(node.suNewsSource?.url)

  const imageUrl = node.suNewsBanner?.__typename === "MediaImage" && node.suNewsBanner.mediaImage.url
  const imageAlt = node.suNewsBanner?.__typename === "MediaImage" && node.suNewsBanner.mediaImage.alt

  const lastUpdated = new Date(node.changed.time as string).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  })

  return (
    <article {...props} className="centered mt-50">
      <div className="centered mb-100 2xl:w-2/3">
        {node.suNewsDek && <div className="">{node.suNewsDek}</div>}
        <div className="md:flex">
          <div className="flex md:order-last">
            {!node.suNewsHideSocial && (
              <ul className="list-unstyled mt-[-3px] flex md:pl-[10px]">
                <li className="mr-1em">
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix="http://www.facebook.com/sharer.php?u="
                    suffix="&display=popup"
                  >
                    <span className="sr-only">Stanford Facebook</span>
                    <FacebookIcon />
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix="https://twitter.com/intent/tweet?url="
                    suffix={`&text=${node.title}`}
                  >
                    <span className="sr-only">Stanford Twitter</span>
                    <TwitterIcon />
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix="https://www.linkedin.com/shareArticle?mini=true&url="
                    suffix={`&title=${node.title}`}
                  >
                    <span className="sr-only">Stanford LinkedIn</span>
                    <LinkedInIcon />
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix={`mailto:?subject=${node.title}&body=`}
                  >
                    <span className="sr-only">Forward Email</span>
                    <EnvelopeIcon title="Email" width={28} />
                  </NewsSocialLink>
                </li>
                <li className="mr-1em">
                  <NewsPrintButton />
                </li>
              </ul>
            )}
          </div>
          <div>
            {node.suNewsPublishingDate && <>{formatDate(node.suNewsPublishingDate.time)} |&nbsp;</>}
            {node.suNewsByline}
          </div>
        </div>
      </div>
      <hr className="mx-auto mb-100 w-1/2 text-black-40" />

      {imageUrl && (
        <figure className="mb-100 table w-full">
          <span className="relative mx-auto block aspect-[16/9] lg:w-10/12">
            <Image className="object-cover" src={buildUrl(imageUrl).toString()} alt={imageAlt || ""} fill />
          </span>
          {node.suNewsBannerMediaCaption && (
            <figcaption className="table-caption caption-bottom text-center">
              {node.suNewsBannerMediaCaption}
            </figcaption>
          )}
        </figure>
      )}

      {node.suNewsBanner?.__typename === "MediaVideo" && (
        <figure className="mb-100 table w-full">
          <span className="relative mx-auto block aspect-[16/9] w-10/12">
            <Oembed url={node.suNewsBanner.mediaOembedVideo} />
          </span>
          {node.suNewsBannerMediaCaption && (
            <figcaption className="table-caption caption-bottom text-center">
              {node.suNewsBannerMediaCaption}
            </figcaption>
          )}
        </figure>
      )}

      {node.suNewsComponents && (
        <div className="centered 2xl:w-2/3">
          {node.suNewsComponents.map(paragraph => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))}
        </div>
      )}
      <div className="rs-py-4 centered">Last updated {lastUpdated}</div>
    </article>
  )
}

export default StanfordNews
