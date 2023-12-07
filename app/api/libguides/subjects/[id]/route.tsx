import {NextRequest, NextResponse} from "next/server";
import fetchLibGuides from "@/lib/libguides";
import {LibGuide} from "@/lib/drupal/drupal";

export const GET = async (request: NextRequest, {params: {id}}:{params: {id: number}}) => {
  const guides: LibGuide[] = await fetchLibGuides({subjectId: id})
  return NextResponse.json(guides);
}
