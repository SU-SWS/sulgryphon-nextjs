import Jsona from "jsona";
import axios from "axios";

export default async function handler(req, res) {
  const {slug} = req.query
  const [viewId, displayId, options] = slug
  let [args, itemsToDisplay] = options.split(":")

  let url = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/views/${viewId}/${displayId}`;

  if (args) {
    args = args.split('/');
    url += '?';
    for (let i = 0; i < args.length; i++) {
      url += `views-argument[]=${args[i]}`
      if (i !== args.length - 1) {
        url += '&';
      }
    }
    url += `&views-argument[]=0&views-argument[]=0&views-argument[]=0`;
  }

  if (itemsToDisplay) {
    if (args) {
      url += `&page[limit]=${itemsToDisplay}`;
    } else {
      url += `?page[limit]=${itemsToDisplay}`
    }
  }

  const items = await axios.get(url)
    .then(({data}) => {
      const dataFormatter = new Jsona()
      return dataFormatter.deserialize(data);
    });

  res.status(200).json(items ?? [])
}
