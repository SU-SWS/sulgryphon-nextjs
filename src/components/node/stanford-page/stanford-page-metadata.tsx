import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d"
import {getFirstText} from "@/lib/text-tools"

type Props = {
  node: NodeStanfordPage
  isHome?: true
}
const StanfordPageMetadata = async ({node, isHome}: Props) => {
  const siteName = "Stanford University Libraries"
  const bannerImage =
    node.suPageBanner?.__typename === "ParagraphStanfordBanner" && node.suPageBanner.suBannerImage?.mediaImage
  const image = node.suPageImage?.mediaImage || bannerImage

  const description = node.suPageDescription || getFirstText(node.suPageComponents)
  const pageTitle = isHome ? siteName : `${node.title} | ${siteName}`

  return (
    <>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}

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

export default StanfordPageMetadata
