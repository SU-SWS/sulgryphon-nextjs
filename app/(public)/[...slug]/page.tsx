import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {getPathsFromContext} from "@/lib/drupal/get-paths";
import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalNode} from "next-drupal";
import {Metadata} from "next";
import {getNodeMetadata} from "./metadata";

export const revalidate = 60;

const fetchNodeData = async (context) => {
  const path = await translatePathFromContext(context);
  if (!path || !path.jsonapi) {
    notFound();
  }

  // Check for redirect.
  if (path.redirect?.length) {
    const currentPath = '/' + (typeof context.params.slug === 'object' ? context.params.slug.join('/') : context.params.slug);
    const [destination] = path.redirect;

    if (destination.to != currentPath) {
      redirect(destination.to)
    }
  }

  return await getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context)
}

export const generateMetadata = async (context): Promise<Metadata> => {
  const node: DrupalNode = await fetchNodeData(context);
  return getNodeMetadata(node);
}

const NodePage = async (context) => {

  let node: DrupalNode;
  try {
    node = await fetchNodeData(context);
  } catch (e) {
    notFound();
  }

  return (
    <NodePageDisplay node={node}/>
  )
}

export default NodePage;

export const generateStaticParams = async (context) => {
  try {
    const paths = await getPathsFromContext('node--stanford_page', {})
    return paths.map(path => typeof path !== "string" ? path?.params : path);
  } catch (e) {
  }
  return [];
}