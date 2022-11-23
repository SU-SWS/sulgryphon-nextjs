import {getResourceByPath} from "next-drupal";

export default async function handler(req, res) {
  const path = req.query.path.split('?')[0].split('#')[0];
  const pathParts = path.split('/')

  const requests = []
  pathParts.map((part, i) => {
    if (part) {
      const href = pathParts.slice(0, i + 1).join('/');
      requests.push(getResourceByPath(href));
    }
  })
  const resources = await Promise.all(requests)

  const crumbs = [{href: '/', text: 'Home'}];
  resources.map(resource => {
    crumbs.push({href: resource.path.alias, text: resource.title})
  })

  res.status(200).json(crumbs);
}
