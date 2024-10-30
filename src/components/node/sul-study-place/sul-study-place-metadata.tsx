import {NodeSulStudyPlace} from "@/lib/gql/__generated__/drupal.d"

type Props = {
  node: NodeSulStudyPlace
}
const SulStudyPlaceMetadata = async ({node}: Props) => {
  const siteName = "Stanford Libraries"
  const image = node.sulStudyImage?.mediaImage || node.sulStudyBranch.suLibraryBanner?.mediaImage

  const pageTitle = `${node.title} | ${siteName}`

  return (
    <>
      <title>{pageTitle}</title>
      <meta property="og:title" content="Stanford Libraries" />

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
    </>
  )
}

export default SulStudyPlaceMetadata
