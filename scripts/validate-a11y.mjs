// Runs axe-core against the pages `next build` prerendered, in a real Chrome driven over Selenium. Every page checked
// is reported before the process exits non-zero, so one run shows everything that needs fixing.
//
// Environment:
//   A11Y_BASE_URL    Where the browser reaches the running Next server. Default http://localhost:3000
//   SELENIUM_URL     Selenium WebDriver server, ie the selenium/standalone-chrome service. Default http://localhost:4444
//   A11Y_REPORT      JSON report output path. Default a11y-report.json
//   A11Y_PER_PREFIX  Check only this many pages per url prefix (/news/, /people/, ... and the top level pages), plus
//                    the home page. Default 0, every page.
import {writeFileSync} from "node:fs"
import {Builder} from "selenium-webdriver"
import chrome from "selenium-webdriver/chrome.js"
import AxeBuilder from "@axe-core/webdriverjs"
import {BUILD_DIR, getPrerenderedRoutes} from "./prerendered-pages.mjs"

const BASE_URL = (process.env.A11Y_BASE_URL || "http://localhost:3000").replace(/\/$/, "")
const SELENIUM_URL = process.env.SELENIUM_URL || "http://localhost:4444"
const REPORT_PATH = process.env.A11Y_REPORT || "a11y-report.json"
const PER_PREFIX = parseInt(process.env.A11Y_PER_PREFIX || "0") || 0
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]
const PAGE_TIMEOUT = 30_000
// Content the codebase can't fix: author-entered WYSIWYG HTML, and third party oembed iframes. Axe skips these elements
// and everything inside them.
const EXCLUDE_SELECTORS = [".wysiwyg", ".oembed"]

// Routes that can't be checked as a page. None yet: this site has no login, and preview isn't prerendered.
const SKIP_ROUTES = []

// Only pages on this site are checked. Anything that ends up on another origin, ie a redirect to a third party, is skipped.
const BASE_ORIGIN = new URL(BASE_URL).origin

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// The server HTML is not what users end up with: client components re-render after hydration (ie the main menu swaps
// its mobile <dialog> for a desktop <div> once it knows the window width). Wait until the DOM has had no mutations for
// SETTLE_QUIET ms, so axe checks the hydrated page. Give up after SETTLE_MAX ms in case something animates forever.
const SETTLE_QUIET = 1000
const SETTLE_MAX = 10_000
const waitForSettledDom = driver =>
  driver.executeAsyncScript(
    (quiet, max, done) => {
      let timer
      const finish = () => {
        observer.disconnect()
        clearTimeout(timer)
        clearTimeout(cap)
        done()
      }
      const observer = new MutationObserver(() => {
        clearTimeout(timer)
        timer = setTimeout(finish, quiet)
      })
      observer.observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
      })
      timer = setTimeout(finish, quiet)
      const cap = setTimeout(finish, max)
    },
    SETTLE_QUIET,
    SETTLE_MAX
  )

/**
 * Retry `fn` until it resolves or `timeout` ms pass. Services in CI can take a few seconds to accept connections.
 */
const retry = async (label, fn, timeout = 90_000) => {
  const start = Date.now()
  for (;;) {
    try {
      return await fn()
    } catch (error) {
      if (Date.now() - start > timeout) throw new Error(`${label} not ready after ${timeout / 1000}s: ${error.message}`)
      await sleep(2000)
    }
  }
}

const buildDriver = () => {
  const options = new chrome.Options().addArguments("--headless=new", "--window-size=1280,1024", "--disable-gpu")
  return new Builder().forBrowser("chrome").usingServer(SELENIUM_URL).setChromeOptions(options).build()
}

/**
 * The first `perPrefix` routes (in sorted order, so runs check the same pages) of each url prefix, ie the first
 * segment of `/news/story`, with single segment pages like `/about` grouped as the top level. The home page is
 * always included. Pages of one prefix are mostly one content type, so a few of each cover the shared components.
 */
const sampleRoutes = (routes, perPrefix) => {
  const groups = new Map()
  for (const route of routes) {
    const segments = route.split("/").filter(Boolean)
    if (!segments.length) continue
    const prefix = segments.length > 1 ? `/${segments[0]}/` : "/"
    groups.set(prefix, [...(groups.get(prefix) || []), route])
  }
  const sample = new Set(routes.includes("/") ? ["/"] : [])
  for (const group of groups.values()) group.slice(0, perPrefix).forEach(route => sample.add(route))
  return [...sample].sort()
}

const allRoutes = getPrerenderedRoutes().filter(route => !SKIP_ROUTES.includes(route))
if (!allRoutes.length) {
  console.error(`No prerendered HTML found in ${BUILD_DIR}. Run \`yarn build\` first.`)
  process.exit(1)
}
const routes = PER_PREFIX ? sampleRoutes(allRoutes, PER_PREFIX) : allRoutes
if (PER_PREFIX) console.log(`Checking ${routes.length} of ${allRoutes.length} pages, ${PER_PREFIX} per url prefix.`)

await retry("Next server", async () => {
  const response = await fetch(BASE_URL)
  if (response.status >= 500) throw new Error(`HTTP ${response.status}`)
})
let driver = await retry("Selenium", buildDriver)
await driver.manage().setTimeouts({pageLoad: PAGE_TIMEOUT, script: PAGE_TIMEOUT})

const pages = []
const skippedPages = []

/**
 * Skip `route` if the browser is no longer on this site, ie a redirect to a third party.
 */
const skipIfOffSite = async route => {
  const currentUrl = await driver.getCurrentUrl()
  if (new URL(currentUrl).origin === BASE_ORIGIN) return false
  skippedPages.push({route, redirectedTo: currentUrl})
  console.log(`- ${route} skipped, it left the site for ${currentUrl}`)
  return true
}

for (const route of routes) {
  const url = BASE_URL + route
  try {
    await driver.get(url)
    await driver.wait(() => driver.executeScript("return document.readyState === 'complete'"), PAGE_TIMEOUT)
    await waitForSettledDom(driver)
    if (await skipIfOffSite(route)) continue
    const axe = new AxeBuilder(driver).withTags(WCAG_TAGS)
    EXCLUDE_SELECTORS.forEach(selector => axe.exclude(selector))
    const {violations} = await axe.analyze()
    // A delayed redirect can also land while axe is running, leaving results from the other site.
    if (await skipIfOffSite(route)) continue
    pages.push({route, violations})
    console.log(`${violations.length ? "✖" : "✔"} ${route}${violations.length ? ` (${violations.length} rules)` : ""}`)
  } catch (error) {
    // Record the failure and keep going. Start a fresh browser in case the session itself is what broke.
    pages.push({route, error: error.message, violations: []})
    console.log(`! ${route} could not be checked: ${error.message}`)
    await driver.quit().catch(() => {})
    driver = await retry("Selenium", buildDriver)
    await driver.manage().setTimeouts({pageLoad: PAGE_TIMEOUT, script: PAGE_TIMEOUT})
  }
}
await driver.quit().catch(() => {})

// Group by rule so a shared component that breaks on every page reads as one problem, not dozens.
const rules = new Map()
for (const {route, violations} of pages) {
  for (const violation of violations) {
    const rule = rules.get(violation.id) || {
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      helpUrl: violation.helpUrl,
      nodeCount: 0,
      pages: [],
    }
    rule.nodeCount += violation.nodes.length
    rule.pages.push({route, targets: violation.nodes.map(node => node.target.join(" "))})
    rules.set(violation.id, rule)
  }
}

const IMPACT_ORDER = ["critical", "serious", "moderate", "minor"]
const sortedRules = [...rules.values()].sort((a, b) => IMPACT_ORDER.indexOf(a.impact) - IMPACT_ORDER.indexOf(b.impact))
const erroredPages = pages.filter(page => page.error)
const failingPages = pages.filter(page => page.violations.length)

console.log("")
for (const rule of sortedRules) {
  console.log(`[${rule.impact}] ${rule.id}: ${rule.help}`)
  console.log(`  ${rule.helpUrl}`)
  console.log(`  ${rule.nodeCount} elements on ${rule.pages.length} pages`)
  for (const {route, targets} of rule.pages) {
    console.log(`    ${route}`)
    for (const target of targets) console.log(`      ${target}`)
  }
  console.log("")
}
for (const {route, error} of erroredPages) console.log(`Could not check ${route}: ${error}`)

writeFileSync(
  REPORT_PATH,
  JSON.stringify(
    {
      baseUrl: BASE_URL,
      tags: WCAG_TAGS,
      excluded: EXCLUDE_SELECTORS,
      checked: pages.length,
      prerendered: allRoutes.length,
      rules: sortedRules,
      errors: erroredPages,
      skipped: skippedPages,
    },
    null,
    2
  )
)

console.log(
  `Checked ${pages.length} pages: ${sortedRules.length} rules violated on ${failingPages.length} pages, ` +
    `${erroredPages.length} pages could not be checked, ${skippedPages.length} pages left the site and were skipped. ` +
    `Report written to ${REPORT_PATH}.`
)

process.exit(sortedRules.length || erroredPages.length ? 1 : 0)
