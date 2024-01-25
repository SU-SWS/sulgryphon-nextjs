import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal";

const StanfordPage = async ({node}: { node: NodeStanfordPage }) => {
  const fullWidth = node.layoutSelection?.id === 'stanford_basic_page_full';

  return (
    <article>
      {node.suPageComponents &&
        <ParagraphRows items={node.suPageComponents} fullWidth={fullWidth}/>
      }
    </article>
  )
}

export default StanfordPage;