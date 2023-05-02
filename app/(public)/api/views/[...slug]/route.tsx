import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {DrupalView} from "next-drupal";
import {getView} from "@/lib/drupal/get-view";
import {NextRequest, NextResponse} from "next/server";
import fetchComponents from "@/lib/fetch-components";

export const GET = async (request: NextRequest, {params}) => {
  const [viewId, displayId, options] = params.slug
  let [args, itemsToDisplay] = options ? options.split(":") : ['', null];
  const drupalParams = new DrupalJsonApiParams();

  args += '/0/0/0/0/0/0';
  drupalParams.addCustomParam({'views-argument': args.replace(/^\//, '').split('/')});

  if (itemsToDisplay) {
    drupalParams.addPageLimit(itemsToDisplay);
  }

  const view = await getView<Promise<DrupalView>>(`${viewId}--${displayId}`, {params: drupalParams.getQueryObject()});
  // @ts-ignore
  return NextResponse.json(await fetchComponents(view.results));
}
