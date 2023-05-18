import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {getPathsFromContext} from "@/lib/drupal/get-paths";
import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalMenuLinkContent, DrupalNode} from "next-drupal";
import {GetStaticPathsResult, Metadata} from "next";
import {getNodeMetadata} from "./metadata";
import Conditional from "@/components/utils/conditional";
import LibraryHeader from "@/components/node/sul-library/library-header";
import {Library} from "@/lib/drupal/drupal";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import {Suspense} from "react";
import SecondaryMenu from "@/components/menu/secondary-menu";
import {getMenu} from "@/lib/drupal/get-menu";

export const revalidate = 1800;

class RedirectError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

const fetchNodeData = async (context) => {
  const path = await translatePathFromContext(context);
  if (!path || !path.jsonapi) {
    throw new Error('Unable to translate path');
  }

  // Check for redirect.
  if (path.redirect?.[0].to) {
    const currentPath = '/' + (typeof context.params.slug === 'object' ? context.params.slug.join('/') : context.params.slug);
    const [destination] = path.redirect;

    if (destination.to != currentPath) {
      throw new RedirectError(destination.to);
    }
  }
  const node = await getResourceFromContext<DrupalNode>(path.jsonapi.resourceName, context)
  const fullWidth: boolean = (node.type === 'node--stanford_page' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full') ||
    (node.type === 'node--sul_library' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'sul_library_full_width');

  return {node, fullWidth}
}

export const generateMetadata = async (context): Promise<Metadata> => {
  try {
    const {node} = await fetchNodeData(context);
    return getNodeMetadata(node);
  } catch (e) {
    // Probably a 404 or redirect page.
  }
  return {};
}

const NodePage = async (context) => {
  let tree: DrupalMenuLinkContent[] = [];
  try {
    ({tree} = await getMenu('main'));
  } catch (e) {
  }

  let nodeData;
  try {
    nodeData = await fetchNodeData(context);
  } catch (e) {
    if (e instanceof RedirectError) {
      redirect(e.message);
    }
    notFound();
  }
  const {node, fullWidth} = nodeData;

  return (
    <main id="main-content" className="su-mb-50">
      <Conditional showWhen={node.type === 'node--sul_library'}>
        <LibraryHeader node={node as Library}/>
      </Conditional>

      <Conditional showWhen={node.type === 'node--stanford_news'}>
        <InternalHeaderBanner>
          <div className="su-flex su-flex-col su-w-full su-max-w-[calc(100vw-10rem)] md:su-max-w-[calc(100vw-20rem)] 3xl:su-max-w-[calc(1500px-20rem)] su-mx-auto su-mt-80 md:mt-100 su-mb-50 su-p-0">
            <h1
              className="su-text-white su-order-2">
              {node.title}
            </h1>

            {(node.su_news_topics && node.su_news_topics.length > 0) &&
              <div className="su-mb-20 su-order-1">
                {node.su_news_topics.slice(0, 1).map((topic, index) =>
                  <span key={topic.id} className="su-text-illuminating-dark su-font-semibold">{topic.name}</span>
                )}
              </div>
            }
          </div>
        </InternalHeaderBanner>
      </Conditional>

      <Conditional showWhen={!(node.type === 'node--sul_library' || node.type === 'node--stanford_news')}>
        <InternalHeaderBanner>
          <h1 className="su-w-full su-max-w-[calc(100vw-10rem)] md:su-max-w-[calc(100vw-20rem)] 3xl:su-max-w-[calc(1500px-20rem)] su-mx-auto su-relative su-text-white su-mt-80 md:mt-100 su-mb-50 su-p-0">
            {node.title}
          </h1>
        </InternalHeaderBanner>
      </Conditional>

      <Conditional showWhen={node.status != undefined && !node.status}>
        <div className="su-bg-illuminating-light su-py-30 su-mb-20">
          <div className="su-cc su-text-m2 su-flex su-gap-lg">
            <ExclamationCircleIcon width={40}/>
            Unpublished Page
          </div>
        </div>
      </Conditional>

      <Conditional showWhen={fullWidth}>
        <div>
          <NodePageDisplay node={node}/>
        </div>
      </Conditional>

      <Conditional showWhen={!fullWidth}>
        <div
          className="su-cc su-flex su-flex-col lg:su-flex-row su-justify-between su-gap-[6rem]">

          <Suspense fallback={<></>}>
            <SecondaryMenu menuItems={tree}/>
          </Suspense>

          <div className="su-flex-1">
            <NodePageDisplay node={node}/>
          </div>
        </div>
      </Conditional>
    </main>
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