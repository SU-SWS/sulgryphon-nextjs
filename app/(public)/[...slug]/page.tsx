import NodePageDisplay from "@/components/node";
import {notFound, redirect} from "next/navigation";
import {Metadata} from "next";
import {getNodeMetadata} from "./metadata";
import LibraryHeader from "@/components/node/sul-library/library-header";
import InternalHeaderBanner from "@/components/patterns/internal-header-banner";
import SecondaryMenu from "@/components/menu/secondary-menu";
import {isDraftMode} from "@/lib/drupal/is-draft-mode";
import UnpublishedBanner from "@/components/patterns/unpublished-banner";
import {getAllNodePaths, getEntityFromPath, getMenu} from "@/lib/gql/fetcher";
import {NodeUnion} from "@/lib/gql/__generated__/drupal.d";

export const revalidate = false;
export const dynamic = 'force-static';

const NodePage = async ({params}: PageProps) => {
  const path = getPathFromContext({params});
  const {redirect: routeRedirect, entity} = await getEntityFromPath<NodeUnion>(path, isDraftMode());

  if (routeRedirect) redirect(routeRedirect.url);
  if (!entity) notFound();

  const menuItems = await getMenu()

  const fullWidth = (entity.__typename === 'NodeStanfordPage' && entity.layoutSelection?.id === 'stanford_basic_page_full') ||
    (entity.__typename === 'NodeSulLibrary' && entity.layoutSelection?.id === 'sul_library_full_width');

  return (
    <main id="main-content" className="mb-50">
      {!entity.status &&
        <UnpublishedBanner/>
      }
      {entity.__typename === 'NodeSulLibrary' &&
        <LibraryHeader node={entity}/>
      }

      {entity.__typename === 'NodeStanfordNews' &&
        <InternalHeaderBanner>
          <div
            className="flex flex-col w-full max-w-[calc(100vw-10rem)] md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto mt-80 md:mt-100 mb-50 p-0">
            <h1
              className="text-white order-2">
              {entity.title}
            </h1>

            {entity.suNewsTopics &&
              <div className="mb-20 order-1">
                {entity.suNewsTopics.slice(0, 1).map(topic =>
                  <span key={topic.id} className="text-illuminating-dark font-semibold">{topic.name}</span>
                )}
              </div>
            }
          </div>
        </InternalHeaderBanner>
      }

      {!(entity.__typename === 'NodeSulLibrary' || entity.__typename === 'NodeStanfordNews') &&
        <InternalHeaderBanner>
          <h1
            className="w-full max-w-[calc(100vw-10rem)] md:max-w-[calc(100vw-20rem)] 3xl:max-w-[calc(1500px-20rem)] mx-auto relative text-white mt-80 md:mt-100 mb-50 p-0">
            {entity.title}
          </h1>
        </InternalHeaderBanner>
      }

      {fullWidth &&
        <div>
          <NodePageDisplay node={entity}/>
        </div>
      }

      {!fullWidth &&
        <div className="centered flex flex-col lg:flex-row justify-between gap-[8rem]">
          <div className="flex-1 order-last">
            <NodePageDisplay node={entity}/>
          </div>

          <SecondaryMenu menuItems={menuItems} currentPath={entity.path}/>
        </div>
      }
    </main>
  )
}

export const generateMetadata = async ({params}: PageProps): Promise<Metadata> => {
  if (isDraftMode()) return {};
  const path = getPathFromContext({params});
  const {entity} = await getEntityFromPath<NodeUnion>(path);
  return entity ? getNodeMetadata(entity) : {}
}

export const generateStaticParams = async (): Promise<PageProps["params"][]> => {
  if (process.env.BUILD_COMPLETE !== 'true') return []
  const nodePaths = await getAllNodePaths();
  return nodePaths.map(path => ({slug: path.split('/').filter(part => !!part)}));
}

const getPathFromContext = (context: PageProps, prefix = ""): string => {
  let {slug} = context.params

  slug = Array.isArray(slug) ? slug.map((s) => encodeURIComponent(s)).join("/") : slug
  slug = slug.replace(/^\//, '');
  return prefix ? `${prefix}/${slug}` : `/${slug}`
}

type PageProps = {
  params: { slug: string | string[] }
  searchParams?: Record<string, string | string[] | undefined>
}


export default NodePage;