import {getResourceByPath} from "../lib/drupal/get-resource";
import {getPathFromContext} from "../lib/drupal/utils";
import {getPathsFromContext} from "../lib/drupal/get-paths";
import NodePageDisplay from "../components/node";


const NodePage = async (context) => {
  const path = getPathFromContext(context)
  const node = await getResourceByPath(path)

  return (
    <NodePageDisplay node={node}/>
  )
}

export default NodePage;

export const generateStaticParams = async () => {
  const paths = await getPathsFromContext('node--stanford_page', {})
  return paths.map(path => typeof path !== "string" ? path?.params : path);
}