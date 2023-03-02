import Conditional from "../../utils/conditional";
import {Library} from "../../../../src/types/drupal";
import {ParagraphRows} from "../../paragraph/rows/rows";
import {getResource} from "../../../lib/drupal/get-resource";

const SulLibrary = async ({node, ...props}: { node: Library }) => {
  const requests = [];
  node.su_library__paragraphs.map(component => requests.push(getResource(component.type, component.id)));
  node.su_library__paragraphs = await Promise.all(requests);

  return (
    <Conditional showWhen={node.su_library__paragraphs.length > 0}>
      <article>
        <ParagraphRows items={node.su_library__paragraphs}/>
      </article>
    </Conditional>
  )
}

export default SulLibrary;