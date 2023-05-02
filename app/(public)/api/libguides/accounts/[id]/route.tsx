import {NextRequest, NextResponse} from "next/server";
import fetchLibGuides, {Guide} from "@/lib/libguides";

export const GET = async (request: NextRequest, {params}) => {
  const guides: Guide[] = await fetchLibGuides({accountId: params.id})
  return NextResponse.json(guides);
}
