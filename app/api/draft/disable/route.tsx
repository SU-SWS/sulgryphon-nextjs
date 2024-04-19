import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export const revalidate = 0;

export async function GET() {
  cookies().delete('preview');
  return NextResponse.json({message: 'preview disabled'}, {status: 200})
}