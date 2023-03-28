import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {BasicPage} from "@/lib/drupal/drupal";
import fetchComponents from "@/lib/fetch-components";

const StanfordPage = async ({node}: { node: BasicPage }) => {
  node.su_page_components = await fetchComponents(node.su_page_components ?? []);
  node.su_page_components = node.su_page_components.filter(item => item?.id?.length > 0);

  const getFeaturedImageAlt = (node): string => {
    if (node.su_page_image?.field_media_image?.resourceIdObjMeta?.alt) {
      return node.su_page_image.field_media_image.resourceIdObjMeta.alt
    }
    return '';
  }

  const getFeaturedImageUrl = (node, imageStyle = 'breakpoint_2xl_1x'): string => {
    if (node.su_page_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_image.field_media_image.image_style_uri?.[imageStyle]
    }

    if (node.su_page_banner?.su_banner_image?.field_media_image?.image_style_uri?.[imageStyle]) {
      return node.su_page_banner.su_banner_image.field_media_image.image_style_uri?.[imageStyle];
    }
    return '';
  }
  const fullWidth = node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full';
  return (
    <article>
      <ParagraphRows items={node.su_page_components} fullWidth={fullWidth}/>
    </article>
  )
}

export default StanfordPage;