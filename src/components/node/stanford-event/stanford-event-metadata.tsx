import {NodeStanfordEvent} from "@/lib/gql/__generated__/drupal.d"
import {getCleanDescription} from "@/lib/text-tools"

type Props = {
  node: NodeStanfordEvent
}
const SulStudyPlaceMetadata = async ({node}: Props) => {
  const siteName = "Stanford Libraries"
  const image = node.sulEventImage?.mediaImage
  const description = getCleanDescription(node.body?.processed)
  const pageTitle = `${node.title} | ${siteName}`

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />

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
      <meta name="twitter:description" content={description} />
    </>
  )
}

export default SulStudyPlaceMetadata
