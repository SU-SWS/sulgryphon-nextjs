import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {getAllDrupalPaths, pathIsValid} from "@/lib/drupal/get-paths";
import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalMenuLinkContent} from "next-drupal";
import {Metadata} from "next";
import {getNodeMetadata} from "./metadata";
import LibraryHeader from "@/components/node/sul-library/library-header";
import {PageProps, Params, StanfordNode} from "@/lib/drupal/drupal";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";
import SecondaryMenu from "@/components/menu/secondary-menu";
import {getMenu} from "@/lib/drupal/get-menu";
import {isDraftMode} from "@/lib/drupal/is-draft-mode";
import UnpublishedBanner from "@/components/patterns/unpublished-banner";
import {getPathFromContext} from "@/lib/drupal/utils";
import {cache} from "react";

export const revalidate = false;

class RedirectError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

const fetchNodeData = cache(async (params: Params): Promise<{ node: StanfordNode, fullWidth: boolean }> => {
  const draftMode = isDraftMode();
  const path = getPathFromContext({params});

  if (!draftMode) {
    if (!await pathIsValid(path)) throw new Error();
  }

  const pathInfo = await translatePathFromContext({params}, {draftMode});

  // Check for redirect.
  if (pathInfo?.redirect?.[0].to) {
    const currentPath = '/' + (typeof params.slug === 'object' ? params.slug.join('/') : params.slug);
    const [destination] = pathInfo.redirect;

    if (destination.to != currentPath) {
      throw new RedirectError(destination.to);
    }
  }

  if (!pathInfo || !pathInfo.jsonapi) {
    throw new Error('Unable to translate path');
  }

  if (params?.slug?.[0] === 'node' && pathInfo?.entity?.path) {
    throw new RedirectError(pathInfo.entity.path);
  }

  const node = await getResourceFromContext<StanfordNode>(pathInfo.jsonapi.resourceName, {params}, {draftMode})
  if (!node) throw new Error();

  const fullWidth: boolean = (node?.type === 'node--stanford_page' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full') ||
    (node?.type === 'node--sul_library' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'sul_library_full_width');

  return {node, fullWidth}
})

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  if (isDraftMode()) return {};

  try {
    const {node} = await fetchNodeData(params);
    if (!node) return {};

    return getNodeMetadata(node);
  } catch (e) {
    // Probably a 404 or redirect page.
  }
  return {};
}

const NodePage = async ({params}: PageProps) => {
  let tree: DrupalMenuLinkContent[] = [];
  try {
    ({tree} = await getMenu('main'));
  } catch (e) {
  }

  let nodeData;
  try {
    nodeData = await fetchNodeData(params);
  } catch (e) {
    if (e instanceof RedirectError) {
      redirect(e.message);
    }
    notFound();
  }
  const {node, fullWidth} = nodeData;
  if (!node) notFound();

  return (
    <main id="main-content" className="mb-50">
      {!node.status &&
        <UnpublishedBanner/>
      }
      {node.type === 'node--sul_library' &&
        <LibraryHeader node={node}/>
      }

      {node.type === 'node--stanford_news' &&
        <InternalHeaderBanner>
          <div
            className="flex flex-col w-full max-w-[calc(100vw-10rem)] md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto mt-80 md:mt-100 mb-50 p-0">
            <h1
              className="text-white order-2">
              {node.title}
            </h1>

            {(node.su_news_topics && node.su_news_topics.length > 0) &&
              <div className="mb-20 order-1">
                {node.su_news_topics.slice(0, 1).map(topic =>
                  <span key={topic.id} className="text-illuminating-dark font-semibold">{topic.name}</span>
                )}
              </div>
            }
          </div>
        </InternalHeaderBanner>
      }

      {!(node.type === 'node--sul_library' || node.type === 'node--stanford_news') &&
        <InternalHeaderBanner>
          <h1
            className="w-full max-w-[calc(100vw-10rem)] md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto relative text-white mt-80 md:mt-100 mb-50 p-0">
            {node.title}
          </h1>
        </InternalHeaderBanner>
      }

      {fullWidth &&
        <div>
          <NodePageDisplay node={node}/>
        </div>
      }

      {!fullWidth &&
        <div className="centered flex flex-col lg:flex-row justify-between gap-[8rem]">
          <div className="flex-1 order-last">
            <NodePageDisplay node={node}/>
          </div>

          <SecondaryMenu menuItems={tree} currentPath={node.path.alias}/>
        </div>
      }
    </main>
  )
}

export default NodePage;

export const generateStaticParams = async () => {
  const allPaths = await getAllDrupalPaths();
  const nodePaths = allPaths.get('node');

  let params: Params[] = [];
  if (nodePaths) {
    params = nodePaths.map(path => ({slug: path.split('/')}))
  }
  return process.env.BUILD_COMPLETE === 'true' ? params : params.slice(0, 1);
}