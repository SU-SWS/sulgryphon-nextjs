import * as React from "react"
import {GetStaticPathsResult, GetStaticPropsResult} from "next"
import {DefaultSeo} from 'next-seo';
import {
  DrupalNode, DrupalParagraph,
  getPathsFromContext,
  getResourceFromContext,
  translatePathFromContext
} from "next-drupal"

import {fetchParagraphs, fetchRowParagraphs} from "@/lib/fetch-paragraphs";
import {PageLayout} from "@/components/layouts/page-layout";
import {NodePageDisplay} from "@/nodes/index";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

interface NodePageProps {
  node: DrupalNode
}

export default function NodePage({node, ...props}: NodePageProps) {
  if (!node) return null
  return (<>
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

  const node = await getResourceFromContext<DrupalNode>(type, context)
  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on the Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!node) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`)
  }

  let paragraphs = null

  switch (type) {
    case 'node--stanford_page':
      paragraphs = await fetchParagraphs(node.su_page_components);
      node?.su_page_components.map((row, i) => {
        node.su_page_components[i] = paragraphs.find(paragraph => paragraph.id === row.id);
      })
      break;

    case 'node--stanford_publication':

      paragraphs = await fetchRowParagraphs(node.su_publication_components, 'su_pubs_components');
      node?.su_publication_components.map((row, i) => {
        row?.su_pubs_components.map((component, j) => {
          node.su_publication_components[i].su_pubs_components[j] = paragraphs.find(paragraph => paragraph.id === component.id);
        })
      })
      break;

    case 'node--stanford_news':
      paragraphs = await fetchParagraphs(node.su_news_components);
      node.su_news_components.map((component, i) => {
        node.su_news_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--stanford_event':
      paragraphs = await fetchParagraphs(node.su_event_components);
      node.su_event_components.map((component, i) => {
        node.su_event_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--stanford_person':
      paragraphs = await fetchParagraphs(node.su_person_components);
      node.su_person_components.map((component, i) => {
        node.su_person_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--event_series':
      paragraphs = await fetchParagraphs(node.su_event_series_components);
      node.su_event_series_components.map((component, i) => {
        node.su_event_series_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;
  }

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

export const cleanNode = (node: DrupalNode) => {
  delete node.sticky;
  delete node.promote;
  delete node.links;
  delete node.node_type;
  delete node.path;
  delete node.metatag;
  delete node.revision_log;
  delete node.revision_timestamp;
  delete node.revision_uid;
  delete node.uid;
  delete node.stanford_intranet__access;
  delete node.relationshipNames;
  delete node.publish_on;
  delete node.drupal_internal_vid;
  delete node.unpublish_on;
}
