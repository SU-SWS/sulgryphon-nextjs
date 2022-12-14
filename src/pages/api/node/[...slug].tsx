import {DrupalNode, getResource, getResourceCollection} from "next-drupal";

export default async function handler(req, res) {
  const [type, id] = req.query.slug;
  if (id) {
    const response = await getResource<DrupalNode>(type, id)
    res.status(200).json(response);
  }
  const response = await getResourceCollection<DrupalNode>(type)
  res.status(200).json(response);
}
