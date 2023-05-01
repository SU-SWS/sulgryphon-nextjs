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
  let paths: GetStaticPathsResult["paths"] = []

  const contentPaths = await Promise.all([
    getPathsFromContext('node--stanford_page', {}),
    getPathsFromContext('node--stanford_person', {}),
    getPathsFromContext('node--stanford_event', {}),
    getPathsFromContext('node--stanford_news', {}),
    getPathsFromContext('node--sul_library', {})
  ]);
  contentPaths.map(contentTypePaths => {
    paths = [...paths, ...contentTypePaths];
  });

  // @ts-ignore
  if (process.env.LOCAL_STATIC_BUILD_PAGES >= 1) {
    // @ts-ignore
    paths = paths.slice(0, process.env.LOCAL_STATIC_BUILD_PAGES)
  }
  return paths.map(path => typeof path !== "string" ? path?.params : path);
}