import {DrupalNode, getResource} from "next-drupal";
import {cleanNode} from "@/lib/clean-node";

export default async function handler(req, res) {
  const [type, id] = req.query.slug;
  const response = await getResource<DrupalNode>(type, id)
  cleanNode(response);
  res.status(200).json(response);
}
