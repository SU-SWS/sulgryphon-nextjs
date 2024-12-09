const fetch = require('node-fetch');
const fs = require('fs');
const { DOMParser } = require('xmldom'); // Importing xmldom to parse XML

async function fetchSitemap() {
  const sitemapUrl = 'https://su-library-git-test-stanford-libraries.vercel.app/sitemap.xml';
  const response = await fetch(sitemapUrl);
  const sitemapXml = await response.text(); // Fetch sitemap as a string

  // Use DOMParser to parse the XML string into a document
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sitemapXml, 'text/xml');

  // Extract the URLs using getElementsByTagName
  const urlElements = xmlDoc.getElementsByTagName('url');

  // Extract the loc (URL) for each URL element
  const pages = [];
  for (let i = 0; i < urlElements.length; i++) {
    const locElement = urlElements[i].getElementsByTagName('loc')[0];
    if (locElement) {
      pages.push(locElement.textContent); // Push the URL text to pages array
    }
  }

  // Write the pages to a JSON file
  fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2));

  console.log('Sitemap pages saved to pages.json');
}

fetchSitemap().catch((error) => console.error('Error fetching sitemap:', error));
