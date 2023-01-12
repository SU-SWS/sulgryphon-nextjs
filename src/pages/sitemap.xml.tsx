import axios from "axios";

const SitemapXml = () => {
  // Nothing needed here.
  // See https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps
}

export const getServerSideProps = async ({req, res}) => {
  const drupalSitemap = await axios.get(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/sitemap.xml')
    .then(response => response.data);
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(drupalSitemap.replace(/>http[s]?:\/\/.*?\//g, `>https://${req.headers.host}/`));
  res.end();

  return {
    props: {},
  };
}


export default SitemapXml;