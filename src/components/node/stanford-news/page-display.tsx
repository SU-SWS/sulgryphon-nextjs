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
import StanfordNewsMetadata from "@/components/node/stanford-news/stanford-news-metadata"
import InternalHeaderBanner from "@/components/patterns/internal-header-banner"

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

  const encodeTitle = encodeURIComponent(node.title)

  return (
    <div {...props} className="centered">
      <StanfordNewsMetadata node={node} />
      <InternalHeaderBanner>
        <div className="mx-auto mb-65 mt-48 flex w-full max-w-[calc(100vw-10rem)] flex-col p-0 md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)]">
          <h1 id={node.id} className="order-2 mb-0">
            {node.title}
          </h1>

          {node.suNewsTopics && (
            <div className="order-1 mb-1">
              {node.suNewsTopics.slice(0, 1).map(topic => (
                <span key={topic.id} className="text-16 font-semibold uppercase text-cardinal-red md:text-18">
                  {topic.name}
                </span>
              ))}
            </div>
          )}
          {node.suNewsDek && <p className="order-3 mb-0 text-20 leading sm:text-22">{node.suNewsDek}</p>}
        </div>
      </InternalHeaderBanner>
      <div className="centered mb-40 2xl:w-2/3">
        <div className="mx-auto w-fit gap-16 md:flex">
          <div className="flex md:order-last">
            {!node.suNewsHideSocial && (
              <ul className="list-unstyled flex flex-row gap-[0.8rem]">
                <li>
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix="http://www.facebook.com/sharer.php?u="
                    suffix="&display=popup"
                  >
                    <span className="sr-only">Stanford Facebook</span>
                    <FacebookIcon />
                  </NewsSocialLink>
                </li>
                <li>
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix="https://twitter.com/intent/tweet?url="
                    suffix={`&text=${encodeTitle}`}
                  >
                    <span className="sr-only">Stanford Twitter</span>
                    <TwitterIcon />
                  </NewsSocialLink>
                </li>
                <li>
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix="https://www.linkedin.com/shareArticle?mini=true&url="
                    suffix={`&title=${encodeTitle}`}
                  >
                    <span className="sr-only">Stanford LinkedIn</span>
                    <LinkedInIcon />
                  </NewsSocialLink>
                </li>
                <li>
                  <NewsSocialLink
                    className="text-black transition-colors hocus:text-digital-blue"
                    prefix={`mailto:?subject=${encodeTitle}&body=`}
                  >
                    <span className="sr-only">Forward Email</span>
                    <EnvelopeIcon title="Email" width={28} />
                  </NewsSocialLink>
                </li>
                <li>
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
      <hr className="mx-auto mb-40 w-1/2 text-black-40" />

      {imageUrl && (
        <figure className="mb-40 table w-full">
          <span className="relative mx-auto block aspect-[16/9] lg:w-800">
            <Image className="object-cover" src={buildUrl(imageUrl).toString()} alt={imageAlt || ""} fill />
          </span>
          {node.suNewsBannerMediaCaption && (
            <figcaption className="table-caption caption-bottom text-center text-16 font-normal">
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
            <figcaption className="table-caption caption-bottom text-center text-16 font-normal">
              {node.suNewsBannerMediaCaption}
            </figcaption>
          )}
        </figure>
      )}

      {node.suNewsComponents && (
        <div className="w-full lg:children:max-w-1000">
          {node.suNewsComponents.map(paragraph => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))}
        </div>
      )}
      <footer className="rs-py-4 centered">Last updated {lastUpdated}</footer>
    </div>
  )
}

export default StanfordNews
