import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {DrupalNode} from "next-drupal";
import {getResource} from "@/lib/drupal/get-resource";
import {getView} from "@/lib/drupal/get-view";
import {NextRequest, NextResponse} from "next/server";

export const GET = async (request: NextRequest, {params}) => {
  const [viewId, displayId, options] = params.slug
  let [args, itemsToDisplay] = options.split(":")
  const drupalParams = new DrupalJsonApiParams();

  args += '/0/0/0/0/0/0';
  drupalParams.addCustomParam({'views-argument': args.replace(/^\//, '').split('/')});

  if (itemsToDisplay) {
    drupalParams.addPageLimit(itemsToDisplay);
  }

  const view = await getView<DrupalNode>(`${viewId}--${displayId}`, {params: drupalParams.getQueryObject()});
  const requests: PromiseLike<any>[] = [];

  view.results.map(result => {
    requests.push(getResource<DrupalNode>(
      result.type,
      result.id
    ))
  })

  return NextResponse.json(await Promise.all(requests));
}
