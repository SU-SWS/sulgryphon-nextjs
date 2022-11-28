import {GetStaticPaths, GetStaticPathsResult, GetStaticProps, GetStaticPropsResult} from "next"
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {
  DrupalMenuLinkContent,
  DrupalNode, getMenu,
  getPathsFromContext,
  getResourceByPath,
  getResourceFromContext,
  translatePathFromContext
} from "next-drupal"

import {Breadcrumb} from "../types/drupal";
import {AppWrapperProvider} from "../context/state";
import {populateParagraphData} from "@/lib/fetch-paragraphs";
import {PageLayout} from "@/components/layouts/page-layout";
import {NodePageDisplay} from "@/nodes/index";

interface NodePageProps {
  node: DrupalNode
  menuItems: DrupalMenuLinkContent[]
  breadcrumbs: Breadcrumb[]
}

const NodePage = ({node, menuItems, breadcrumbs, ...props}: NodePageProps) => {
  if (!node) return null

  return (
    <AppWrapperProvider menuItems={menuItems} breadcrumbs={breadcrumbs}>
      <PageLayout {...props}>
        <NodePageDisplay node={node}/>
      </PageLayout>
    </AppWrapperProvider>
  )
}
export default NodePage;

export const getStaticPaths: GetStaticPaths = async (context): Promise<GetStaticPathsResult> => {
  const params = new DrupalJsonApiParams();
  let fetchMore = true;
  let page = 0;
  let pagedPaths, paths = [];

  // Make sure to fetch all basic pages. We'll fetch other content types later since we can't fetch them all at once.
  while (fetchMore) {
    pagedPaths = await getPathsFromContext(['node--stanford_page'], context, {params: params.getQueryObject()})
    paths = [...paths, ...pagedPaths]

    params.addPageOffset(page * 50);
    page++;

    // Local development environment doesn't need to pre-render all pages. Just build 50 for now.
    if (process.env.NODE_ENV === 'development' || pagedPaths.length === 0) {
      fetchMore = false;
    }
  }

  const overriddenPaths = [
    '/events',
    '/people',
    '/news'
  ];
  paths = paths.filter(path => overriddenPaths.indexOf('/' + path.params.slug.join('/')) == -1);

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<{ node: DrupalNode, menuItems: DrupalMenuLinkContent[], breadcrumbs: Breadcrumb[] }> = async (context): Promise<GetStaticPropsResult<NodePageProps>> => {

  const path = await translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true
    }
  }

  // Check for redirect.
  if (path.redirect?.length) {
    const [redirect] = path.redirect
    return {
      redirect: {
        destination: redirect.to,
        permanent: redirect.status === "301",
      },
    }
  }

  const type = path.jsonapi.resourceName

  let node = await getResourceFromContext<DrupalNode>(type, context)
  // At this point, we know the path exists, and it points to a resource.
  // If we receive an error, it means something went wrong on the Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!node) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  await populateParagraphData(node);

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && node?.status === false) {
    return {
      notFound: true,
    }
  }

  const getBreadcrumbs = async () => {
    const pathParts = node.path.alias.split('/')

    const requests = []
    pathParts.map((part, i) => {
      if (part && i < pathParts.length-1) {
        const href = pathParts.slice(0, i + 1).join('/');
        requests.push(getResourceByPath(href));
      }
    })
    const resources = await Promise.all(requests)

    const crumbs = [{href: '/', text: 'Home'}];
    resources.map(resource => {
      // If we have taxonomy term links, add those links for the breadcrumbs here.
      if (resource?.path?.alias && resource?.title) {
        crumbs.push({href: resource.path.alias, text: resource.title})
      }
    })
    crumbs.push({href: node.path.alias, text: node.title})
    return crumbs;
  }

  // For some reason, using the `tree` here produces hydration issues. So just pass the simple array of menu items, and
  // build the menu tree in the page component instead. ¯\_(ツ)_/¯
  const {items} = await getMenu('main');

  return {
    props: {
      node,
      menuItems: items,
      breadcrumbs: await getBreadcrumbs()
    },
    revalidate: 60 * 60
  }
}
