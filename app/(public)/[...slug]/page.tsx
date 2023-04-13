import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {getPathsFromContext} from "@/lib/drupal/get-paths";
import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalNode} from "next-drupal";
import {GetStaticPathsResult, Metadata} from "next";
import {getNodeMetadata} from "./metadata";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

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

  const getPathsForType = async (type) => {
    let pagePaths, paths: GetStaticPathsResult["paths"] = [];
    let page = 0;
    let fetchMore = true;
    const params = new DrupalJsonApiParams();

    while (fetchMore) {
      params.addPageLimit(50);
      params.addPageOffset(page * 50);
      pagePaths = await getPathsFromContext(`node--${type}`, {}, {params: params.getQueryObject()});
      paths = [...paths, ...pagePaths];
      fetchMore = pagePaths.length > 0;
      page++;
    }
    return paths;
  }

  const pagePaths = await getPathsForType('stanford_page');
  const personPaths = await getPathsForType('stanford_person');
  const eventPaths = await getPathsForType('stanford_event');
  const newsPaths = await getPathsForType('stanford_news');
  const libraryPaths = await getPathsForType('sul_library');
  let paths = [...pagePaths, ...personPaths, ...eventPaths, ...newsPaths, ...libraryPaths];

  // @ts-ignore
  if (process.env.LOCAL_STATIC_BUILD_PAGES >= 1) {
    // @ts-ignore
    // paths = paths.slice(0, process.env.LOCAL_STATIC_BUILD_PAGES)
  }
  return paths.map(path => typeof path !== "string" ? path?.params : path);
}