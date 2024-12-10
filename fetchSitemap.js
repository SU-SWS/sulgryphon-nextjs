const fetch = require('node-fetch');
const fs = require('fs');
const { DOMParser } = require('xmldom'); // Importing xmldom to parse XML
const { URL } = require('url'); // Import URL to easily parse and extract pathnames

async function fetchSitemap() {
  const sitemapUrl = 'https://su-library-git-test-stanford-libraries.vercel.app/sitemap.xml';
  const response = await fetch(sitemapUrl);
  const sitemapXml = await response.text(); // Fetch sitemap as a string

  // Use DOMParser to parse the XML string into a document
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sitemapXml, 'text/xml');

  // Extract the URLs using getElementsByTagName
  const urlElements = xmlDoc.getElementsByTagName('url');

  // Extract the loc (URL) for each URL element and get only the pathname
  const pages = [];
  for (let i = 0; i < urlElements.length; i++) {
    const locElement = urlElements[i].getElementsByTagName('loc')[0];
    if (locElement) {
      const fullUrl = locElement.textContent;
      const path = new URL(fullUrl).pathname; // Extract pathname from the full URL
      pages.push(path); // Push the path to the pages array
    }
  }

  // Write the paths to a JSON file
  fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2));

  console.log('Sitemap paths saved to pages.json');
}

fetchSitemap().catch((error) => console.error('Error fetching sitemap:', error));
