import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {getPathsFromContext} from "@/lib/drupal/get-paths";
import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalNode} from "next-drupal";
import {GetStaticPathsResult, Metadata} from "next";
import {getNodeMetadata} from "./metadata";

export const revalidate = 60;

const fetchNodeData = async (context) => {
  const path = await translatePathFromContext(context);
  if (!path || !path.jsonapi) {
    throw 'Unable to translate path';
  }

  // Check for redirect.
  if (path.redirect?.[0].to) {
    const currentPath = '/' + (typeof context.params.slug === 'object' ? context.params.slug.join('/') : context.params.slug);
    const [destination] = path.redirect;

    if (destination.to != currentPath) {
      throw `redirect:${destination.to}`;
    }
  }
  return getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context)
}

export const generateMetadata = async (context): Promise<Metadata> => {
  try {
    const node: DrupalNode = await fetchNodeData(context);
    return getNodeMetadata(node);
  } catch (e) {
    // Probably a 404 or redirect page.
  }
  return {};
}

const NodePage = async (context) => {
  let node: DrupalNode;
  try {
    node = await fetchNodeData(context);
  } catch (e) {
    if (e.indexOf('redirect:') === 0) {
      const [, redirectTo] = e.split(':');
      redirect(redirectTo);
    }
    notFound();
  }
  return (
    <NodePageDisplay node={node}/>
  )
}

export default NodePage;

export const generateStaticParams = async (context) => {
  const pathTypes = ['node--stanford_page', 'node--stanford_person', 'node--stanford_event', 'node--stanford_news', 'node--sul_library'];
  let paths: GetStaticPathsResult["paths"] = await getPathsFromContext(pathTypes, {});
  // @ts-ignore
  if (process.env.LOCAL_STATIC_BUILD_PAGES >= 1) {
    // @ts-ignore
    paths = paths.slice(0, process.env.LOCAL_STATIC_BUILD_PAGES)
  }
  return paths.map(path => typeof path !== "string" ? path?.params : path);
}