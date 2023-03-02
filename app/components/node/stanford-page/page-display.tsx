import {NextSeo} from "next-seo";
import {ParagraphRows} from "../../paragraph/rows/rows";
import {getResource} from "../../../lib/drupal/get-resource";

const StanfordPage = async ({node}) => {
  const requests = [];
  node.su_page_components.map(component => requests.push(getResource(component.type, component.id)));
  node.su_page_components = await Promise.all(requests);

  const getFeaturedImageAlt = (node): string => {
    if (node.su_page_image?.field_media_image?.resourceIdObjMeta?.alt) {
      return node.su_page_image.field_media_image.resourceIdObjMeta.alt
    }
    return '';
  }

  const getFeaturedImageUrl = (node, imageStyle = 'breakpoint_2xl_1x'): null | string => {
    if (node.su_page_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_image.field_media_image.image_style_uri?.[imageStyle]
    }

    if (node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_banner.su_banner_image.field_media_image.image_style_uri?.[imageStyle];
    }
    return null;
  }

  return (
    <>
      <NextSeo
        useAppDir={true}
        title={node.title}
        description={node.su_page_description}
        openGraph={{
          type: 'website',
          title: node.title,
          description: node.su_page_description,
          images: [{
            url: getFeaturedImageUrl(node, 'card_956x478'),
            width: 956,
            height: 478,
            alt: getFeaturedImageAlt(node)
          }]
        }}
      />

      <article>
        <ParagraphRows items={node.su_page_components}/>
      </article>
    </>
  )
}

export default StanfordPage;