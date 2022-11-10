import {getMenu} from "next-drupal";

export default async function handler(req, res) {
  const {tree} = await getMenu('main')
  res.status(200).json(tree);
}
