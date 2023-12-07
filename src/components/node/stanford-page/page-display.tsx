import "server-only";

import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {BasicPage, StanfordParagraph} from "@/lib/drupal/drupal";
import fetchComponents from "@/lib/fetch-components";
import {isDraftMode} from "@/lib/drupal/is-draft-mode";

const StanfordPage = async ({node}: { node: BasicPage }) => {
  const draftMode = isDraftMode();
  node.su_page_components = await fetchComponents<StanfordParagraph>(node.su_page_components ?? [], {draftMode});
  node.su_page_components = node.su_page_components.filter(item => item?.id?.length > 0);

  const fullWidth = node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full';
  return (
    <article>
      <ParagraphRows items={node.su_page_components} fullWidth={fullWidth}/>
    </article>
  )
}

export default StanfordPage;