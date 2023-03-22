import {Library} from "@/lib/drupal/drupal";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import LibraryAdditionalHours from "@/components/node/sul-library/library-additional-hours";

const SulLibrary = async ({node, ...props}: { node: Library }) => {
  node.su_library__paragraphs = await fetchComponents(node.su_library__paragraphs ?? []);
  node.su_library__paragraphs = node.su_library__paragraphs.filter(item => item?.id?.length > 0);

  return (
    <article className="su-mb-50" {...props}>
      <LibraryAdditionalHours node={node}/>
      <ParagraphRows items={node.su_library__paragraphs}/>
    </article>
  )
}

export default SulLibrary;