import {getResourceFromContext} from "@/lib/drupal/get-resource";
import {getPathsFromContext} from "@/lib/drupal/get-paths";
import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {translatePathFromContext} from "@/lib/drupal/translate-path";
import {DrupalMenuLinkContent} from "next-drupal";
import {GetStaticPathsResult, Metadata} from "next";
import {getNodeMetadata} from "./metadata";
import LibraryHeader from "@/components/node/sul-library/library-header";
import {PageProps, Params, StanfordNode} from "@/lib/drupal/drupal";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";
import SecondaryMenu from "@/components/menu/secondary-menu";
import {getMenu} from "@/lib/drupal/get-menu";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {isDraftMode} from "@/lib/drupal/is-draft-mode";
import UnpublishedBanner from "@/components/patterns/unpublished-banner";

export const revalidate = 2592000;

class RedirectError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

const fetchNodeData = async (params: Params) => {
  const draftMode = isDraftMode();
  const path = await translatePathFromContext({params}, {draftMode});

  // Check for redirect.
  if (path?.redirect?.[0].to) {
    const currentPath = '/' + (typeof params.slug === 'object' ? params.slug.join('/') : params.slug);
    const [destination] = path.redirect;

    if (destination.to != currentPath) {
      throw new RedirectError(destination.to);
    }
  }

  if (!path || !path.jsonapi) {
    throw new Error('Unable to translate path');
  }

  if (params?.slug?.[0] === 'node' && path?.entity?.path) {
    throw new RedirectError(path.entity.path);
  }

  const node = await getResourceFromContext<StanfordNode>(path.jsonapi.resourceName, {params}, {draftMode})
  const fullWidth: boolean = (node?.type === 'node--stanford_page' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'stanford_basic_page_full') ||
    (node?.type === 'node--sul_library' && node.layout_selection?.resourceIdObjMeta?.drupal_internal__target_id === 'sul_library_full_width');

  return {node, fullWidth}
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
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
                {node.su_news_topics.slice(0, 1).map((topic, index) =>
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

          <SecondaryMenu menuItems={tree}/>

          <div className="flex-1">
            <NodePageDisplay node={node}/>
          </div>
        </div>
      }
    </main>
  )
}

export default NodePage;

export const generateStaticParams = async () => {
  const completeBuild = process.env.BUILD_COMPLETE === 'true'
  const params = new DrupalJsonApiParams();
  params.addPageLimit(50);
  let paths: GetStaticPathsResult["paths"] = [];

  try {
    paths = await getPathsFromContext([
      'node--stanford_page',
      'node--stanford_event',
      'node--stanford_news',
      'node--stanford_person',
      'node--sul_library'
    ], {params: params.getQueryObject()});

    let fetchMore = completeBuild;
    let fetchedData: GetStaticPathsResult["paths"] = []
    let page = 1;
    while (fetchMore) {
      console.log('Fetching page ' + page);
      params.addPageOffset(page * 50);

      fetchedData = await getPathsFromContext([
        'node--stanford_page',
        'node--stanford_event',
        'node--stanford_news',
        'node--stanford_person',
        'node--sul_library'
      ], {params: params.getQueryObject()})
      paths = [...paths, ...fetchedData];
      fetchMore = fetchedData.length > 0;
      page++;
    }
  } catch (e) {

  }
  return paths.map(path => typeof path !== "string" ? path?.params : path).slice(0, (completeBuild ? -1 : 5));
}