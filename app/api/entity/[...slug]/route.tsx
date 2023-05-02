import {getResource, getResourceCollection} from "@/lib/drupal/get-resource";
import {NextRequest, NextResponse} from "next/server";

export const GET = async (request: NextRequest, {params: {slug}}) => {
  const [type, id] = slug;
  if (id) {
    return NextResponse.json(await getResource(type, id));
  }
  return NextResponse.json(await getResourceCollection(type));
}
