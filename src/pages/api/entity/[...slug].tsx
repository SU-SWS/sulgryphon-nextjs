import {getResource} from "next-drupal";

export default async function handler(req, res) {
  const [type, bundle, id] = req.query.slug;
  res.status(200).json(await getResource(`${type}--${bundle}`, id));
}
