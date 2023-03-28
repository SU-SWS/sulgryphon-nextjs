import {Library} from "@/lib/drupal/drupal";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours";
import {DrupalParagraph} from "next-drupal";

const SulLibrary = async ({node, ...props}: { node: Library }) => {
  node.su_library__paragraphs = await fetchComponents(node.su_library__paragraphs ?? []) as DrupalParagraph[];
  node.su_library__paragraphs = node.su_library__paragraphs.filter(item => item?.id?.length > 0);
  const fullWidth = node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'sul_library_full_width'

  return (
    <article className="su-mb-50" {...props}>
      <LibraryAdditionalHours node={node}/>
      <ParagraphRows items={node.su_library__paragraphs} fullWidth={fullWidth}/>
    </article>
  )
}

export default SulLibrary;