import {NextRequest, NextResponse} from "next/server";
import {getSearchIndex} from "@/lib/drupal/get-search-index";
import {DrupalNode} from "next-drupal";

export const GET = async (request: NextRequest, { params }) => {
  const { searchParams } = new URL(request.url);
  const data: DrupalNode[] = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': searchParams.get('q')}});
  return NextResponse.json(data);
}
