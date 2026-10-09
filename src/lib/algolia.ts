import {getConfigPage} from "@/lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@/lib/gql/__generated__/graphql"

// /search is force-dynamic and getAlgoliaCredential() is uncached, so without this each of the
// warnings below would be logged on every page view.
const warned = new Set<string>()
const warnOnce = (message: string) => {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(message)
}

export type AlgoliaCredential = {
  appId: string
  indexName: string
  apiKey: string
}

/**
 * Resolve Algolia search credentials for the /search page.
 *
 * 1. ALGOLIA_ID + ALGOLIA_INDEX + ALGOLIA_KEY environment variables.
 * 2. Drupal "Site Settings" config page when "Algolia Searching UI" is checked and the
 *    Application ID, Search Index and Search Only Key are all filled in.
 * 3. undefined falls back to the database-backed search.
 *
 */
export const getAlgoliaCredential = async (): Promise<AlgoliaCredential | undefined> => {
  const {ALGOLIA_ID, ALGOLIA_INDEX, ALGOLIA_KEY} = process.env
  if (ALGOLIA_ID && ALGOLIA_INDEX && ALGOLIA_KEY) {
    return {appId: ALGOLIA_ID, indexName: ALGOLIA_INDEX, apiKey: ALGOLIA_KEY}
  }

  const configPage = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")
  if (!configPage?.suSiteAlgoliaUi) return

  const {suSiteAlgoliaId: appId, suSiteAlgoliaIndex: indexName, suSiteAlgoliaSearch: apiKey} = configPage
  if (!appId || !indexName || !apiKey) {
    warnOnce(
      "Algolia Searching UI is enabled in Drupal but the Application ID, Search Index or Search Only Key is missing; using database search."
    )
    return
  }

  return {appId, indexName, apiKey}
}
