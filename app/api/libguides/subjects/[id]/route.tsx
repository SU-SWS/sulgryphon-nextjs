import {NextRequest, NextResponse} from "next/server";
import fetchLibGuides, {Guide} from "@/lib/libguides";

export const GET = async (request: NextRequest, {params: {id}}) => {
  const guides: Guide[] = await fetchLibGuides({subjectId: id})
  return NextResponse.json(guides);
}
