import {DrupalNode, getResource, getView} from "next-drupal";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

export default async function handler(req, res) {
  const d = new Date();
  const {slug} = req.query
  const [viewId, displayId, options] = slug
  let [args, itemsToDisplay] = options.split(":")
  const params = new DrupalJsonApiParams();

  if (args.length >= 1) {
    args += '/0/0/0/0/0/0';
    params.addCustomParam({'views-argument': args.split('/')});
  }
  if (itemsToDisplay) {
    params.addPageLimit(itemsToDisplay);
  }
  console.log(d.getTime() / 1000, `${viewId}--${displayId}`);

  const view = await getView<DrupalNode>(`${viewId}--${displayId}`, {params: params.getQueryObject()});
  const requests = [];

  view.results.map(result => {
    requests.push(getResource<DrupalNode>(
      result.type,
      result.id
    ))
  })
  const data = await Promise.all(requests)
  console.log(d.getTime() / 1000, `${viewId}--${displayId}`);
  res.status(200).json(data);
}
