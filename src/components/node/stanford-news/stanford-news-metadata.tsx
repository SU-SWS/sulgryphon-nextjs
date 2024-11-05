import {NodeStanfordNews} from "@/lib/gql/__generated__/drupal.d"
import {getFirstText} from "@/lib/text-tools"

type Props = {
  node: NodeStanfordNews
}
const SulStudyPlaceMetadata = async ({node}: Props) => {
  const siteName = "Stanford Libraries"
  const featuredImage = node.suNewsFeaturedMedia?.mediaImage
  const bannerImage = node.suNewsBanner?.__typename === "MediaImage" && node.suNewsBanner.mediaImage
  const image = featuredImage || bannerImage

  const description = node.suNewsDek || getFirstText(node.suNewsComponents)
  const pageTitle = `${node.title} | ${siteName}`

  return (
    <>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="article" />
      {node.suNewsPublishingDate && (
        <meta property="article:published_time" content={new Date(node.suNewsPublishingDate.time).toISOString()} />
      )}

      {node.suNewsTopics?.map((topic, i) => <meta key={`meta-tag-${i}`} property="article:tag" content={topic.name} />)}

      {image && (
        <>
          <meta property="og:image" content={image.url} />
          <meta property="og:image:width" content={image.width.toString()} />
          <meta property="og:image:height" content={image.height.toString()} />
          {image.alt && <meta property="og:image:alt" content={image.alt} />}

          <meta name="twitter:image" content={image.url} />
          <meta name="twitter:image:width" content={image.width.toString()} />
          <meta name="twitter:image:height" content={image.height.toString()} />
          {image.alt && <meta name="twitter:image:alt" content={image.alt} />}
        </>
      )}

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
    </>
  )
}

export default SulStudyPlaceMetadata
