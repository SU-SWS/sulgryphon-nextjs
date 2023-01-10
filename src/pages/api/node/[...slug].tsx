import {DrupalNode, getResource, getResourceCollection} from "next-drupal";
import {cleanNode} from "@/lib/clean-node";

export default async function handler(req, res) {
  const [type, id] = req.query.slug;
  if (id) {
    res.status(200).json(await getResource<DrupalNode>(type, id));
  } else {
    res.status(200).json(await getResourceCollection<DrupalNode[]>(type));
  }
}
