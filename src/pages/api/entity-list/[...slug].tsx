import {getResourceCollection} from "next-drupal";

export default async function handler(req, res) {
  const [type, bundle] = req.query.slug;
  res.status(200).json(await getResourceCollection(`${type}--${bundle}`));
}
