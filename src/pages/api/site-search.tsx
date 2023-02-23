import {getSearchIndex} from "next-drupal";

export default async function handler(req, res) {
  const query = req.query.q;
  const data = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': query}});
  const results = data.map(node => ({id: node.id, title: node.title, path: node.path.alias}))
  res.status(200).json(results);
}
