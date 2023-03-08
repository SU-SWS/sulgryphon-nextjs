import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {getPathsFromContext} from "@/lib/drupal/get-paths";
import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalNode} from "next-drupal";

export const revalidate = 60;

const NodePage = async (context) => {
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


  const node = await getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context)

  return (
    <NodePageDisplay node={node}/>
  )
}

export default NodePage;

export const generateStaticParams = async () => {
  const paths = await getPathsFromContext('node--stanford_page', {})
  return paths.map(path => typeof path !== "string" ? path?.params : path);
}