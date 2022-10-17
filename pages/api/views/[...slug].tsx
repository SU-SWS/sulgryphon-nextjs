import {DrupalNode, getView} from "next-drupal";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

export default async function handler(req, res) {
  const {slug} = req.query
  const [viewId, displayId, options] = slug
  let [args, itemsToDisplay] = options.split(":")

  const params = new DrupalJsonApiParams();

  if (args.length >= 1) {
    params.addCustomParam({'views-argument': args.split('/')});
  }
  if (itemsToDisplay) {
    params.addPageLimit(itemsToDisplay);
  }

  const view = await getView<DrupalNode>(`${viewId}--${displayId}`, {params: params.getQueryObject()});
  res.status(200).json(view?.results);
}
