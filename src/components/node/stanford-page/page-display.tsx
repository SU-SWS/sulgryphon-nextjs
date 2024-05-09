import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal.d";

const StanfordPage = async ({node}: { node: NodeStanfordPage }) => {
  const fullWidth = node.layoutSelection?.id === 'stanford_basic_page_full';
  const updated = node.changed.time;
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const lastUpdated  = new Date(updated).toLocaleDateString(undefined, options)

  return (
    <article>
      {node.suPageComponents &&
        <ParagraphRows items={node.suPageComponents} fullWidth={fullWidth}/>
      }
      <div className="centered rs-py-4">Last updated {lastUpdated}</div>
    </article>
  )
}

export default StanfordPage;