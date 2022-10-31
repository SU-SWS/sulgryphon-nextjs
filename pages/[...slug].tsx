import * as React from "react"
import {GetStaticPathsResult, GetStaticPropsResult} from "next"
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {DefaultSeo} from 'next-seo';
import {
  DrupalNode,
  getPathsFromContext,
  getResourceFromContext,
  translatePathFromContext
} from "next-drupal"

import {populateParagraphData} from "@/lib/fetch-paragraphs";
import {PageLayout} from "@/components/layouts/page-layout";
import {NodePageDisplay} from "@/nodes/index";
import {cleanNode} from "@/lib/clean-node";

interface NodePageProps {
  node: DrupalNode
}

export default function NodePage({node, ...props}: NodePageProps) {
  if (!node) return null
  return (
    <>
      <DefaultSeo
        title={node.title + ' | ' + process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <PageLayout {...props}>
        <NodePageDisplay node={node}/>
      </PageLayout>
    </>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
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

export async function getStaticProps(context): Promise<GetStaticPropsResult<NodePageProps>> {

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

  cleanNode(node);
  return {
    props: {
      node
    },
    revalidate: 60 * 60
  }
}
