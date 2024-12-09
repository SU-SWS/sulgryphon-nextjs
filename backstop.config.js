const fs = require('fs');

const productionBaseUrl = "https://su-library-git-test-stanford-libraries.vercel.app/";
const testBaseUrl = process.env.TEST_URL;

// Read the pre-fetched pages from the JSON file
const pages = JSON.parse(fs.readFileSync('pages.json', 'utf-8'));

module.exports = {
  id: "backstop_default",
  viewports: [
    { label: "xs phone", width: 320, height: 480 },
    { label: "sm phone", width: 576, height: 480 },
    { label: "md tablet", width: 768, height: 1024 },
    { label: "lg tablet", width: 992, height: 768 },
    { label: "xl desktop", width: 1200, height: 800 },
    { label: "2xl desktop", width: 1500, height: 900 },
  ],
  onBeforeScript: "puppet/onBefore.js",
  onReadyScript: "puppet/onReady.js",
  scenarios: pages.flatMap((path) => [
    {
      label: `Production - ${path}`,
      url: productionBaseUrl + path,
      referenceUrl: "",
      readyEvent: "",
      readySelector: "",
      delay: 0,
      hideSelectors: [],
      removeSelectors: [],
      hoverSelector: "",
      clickSelector: "",
      postInteractionWait: 0,
      selectors: [],
      selectorExpansion: true,
      expect: 0,
      misMatchThreshold: 0.1,
      requireSameDimensions: true,
    },
    {
      label: `Test - ${path}`,
      url: testBaseUrl + path,
      referenceUrl: "",
      readyEvent: "",
      readySelector: "",
      delay: 0,
      hideSelectors: [],
      removeSelectors: [],
      hoverSelector: "",
      clickSelector: "",
      postInteractionWait: 0,
      selectors: [],
      selectorExpansion: true,
      expect: 0,
      misMatchThreshold: 0.1,
      requireSameDimensions: true,
    },
  ]),
  paths: {
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/engine_scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report",
  },
  report: ["browser"],
  engine: "puppeteer",
  engineOptions: {
    args: ["--no-sandbox"],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
