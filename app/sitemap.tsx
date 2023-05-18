import {MetadataRoute} from "next";
import axios from "axios";

const xml2js = require('xml2js');

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const drupalSitemap = await axios.get(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/sitemap.xml')
    .then(response => response.data);
  const urls: MetadataRoute.Sitemap = [];

  xml2js.parseString(drupalSitemap, (err, result) => {
    result.urlset.url.map(item => {
      if (item?.loc?.[0]) {
        urls.push({
          url: item.loc[0].replace(/http[s]?:\/\/.*?\//g,  process.env.NEXT_PUBLIC_DOMAIN + `/`),
          lastModified: item.lastmod?.[0],
        })
      }
    })
  });

  return urls
}
export default Sitemap;