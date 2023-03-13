import Conditional from "@/components/utils/conditional";
import {Library} from "@/lib/drupal/drupal";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import {DrupalParagraph} from "next-drupal";

const SulLibrary = async ({node, ...props}: { node: Library }) => {
  node.su_library__paragraphs = await fetchComponents(node.su_library__paragraphs ?? []) as DrupalParagraph[];
  node.su_library__paragraphs = node.su_library__paragraphs.filter(item => item?.id?.length > 0);

  return (
    <Conditional showWhen={node.su_library__paragraphs.length > 0}>
      <article>
        <ParagraphRows items={node.su_library__paragraphs}/>
      </article>
    </Conditional>
  )
}

export default SulLibrary;