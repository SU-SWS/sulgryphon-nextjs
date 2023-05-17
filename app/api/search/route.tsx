import {NextRequest, NextResponse} from "next/server";
import {getSearchIndex} from "@/lib/drupal/get-search-index";
import {DrupalNode} from "next-drupal";
import {getNodeMetadata} from "../../(public)/[...slug]/metadata";
import fetchComponents from "@/lib/fetch-components";

export const GET = async (request: NextRequest, { params }) => {
  const { searchParams } = new URL(request.url);
  const data: DrupalNode[] = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': searchParams.get('q')}});
  const fullContent = await fetchComponents(data);
  return NextResponse.json(fullContent.map(node => getNodeMetadata(node)));
}
