import {NextRequest, NextResponse} from "next/server"
import {graphqlClient} from "@/lib/gql/gql-client"
import {
  StanfordPersonSearchDocument,
  StanfordPersonSearchQuery,
  StanfordPersonSearchQueryVariables,
  NodeStanfordPerson,
} from "@/lib/gql/__generated__/graphql"
import {cacheTag} from "next/cache"

// Extract the actual type of items in the results array
type StanfordPersonResultItem = NonNullable<NonNullable<StanfordPersonSearchQuery["stanfordPerson"]>["results"][number]>

// Create a simplified API response type based on the GraphQL NodeStanfordPerson type
type PersonSearchResult = {
  id: NodeStanfordPerson["id"]
  firstName: NodeStanfordPerson["suPersonFirstName"]
  lastName: NodeStanfordPerson["suPersonLastName"]
  fullTitle: NodeStanfordPerson["suPersonFullTitle"]
  photo?: {
    url: string
    alt?: string
  }
  body?: string
  email: NodeStanfordPerson["suPersonEmail"]
  telephone: NodeStanfordPerson["suPersonTelephone"]
  mailCode: NodeStanfordPerson["suPersonMailCode"]
  research?: string[]
  personTypes?: Array<{
    name: string
  }>
  path: NodeStanfordPerson["path"]
}

/**
 * Fetch every person once and cache the full list, so each search only filters it in memory
 * instead of paging through Drupal again.
 */
const getAllPeople = async (): Promise<StanfordPersonResultItem[]> => {
  "use cache: remote"

  cacheTag("all-cache", "views", "views:stanford_person")
  let allResults: StanfordPersonResultItem[] = []
  let page = 0
  let hasMorePages = true

  while (hasMorePages) {
    const data = await graphqlClient().request<StanfordPersonSearchQuery, StanfordPersonSearchQueryVariables>(
      StanfordPersonSearchDocument,
      {
        pageSize: 999, // Fetch large batch to reduce API calls
        page: page,
      }
    )

    if (data.stanfordPerson?.results) {
      allResults = allResults.concat(data.stanfordPerson.results)

      // Check if we have more pages
      const pageSize = 999
      const totalFetched = (page + 1) * pageSize
      const total = data.stanfordPerson.pageInfo?.total || 0
      hasMorePages = totalFetched < total
      page++
    } else {
      hasMorePages = false
    }
  }
  return allResults
}

const getPersonSearch = async (keywords: string): Promise<PersonSearchResult[]> => {
  try {
    const allResults = await getAllPeople()

    if (!allResults.length) {
      return []
    }

    const searchTerms = keywords
      .toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 0)

    // Type guard to ensure we only work with NodeStanfordPerson
    const isStanfordPerson = (
      node: StanfordPersonResultItem
    ): node is Extract<StanfordPersonResultItem, {__typename: "NodeStanfordPerson"}> =>
      node.__typename === "NodeStanfordPerson"

    // Filter to only stanford person nodes and calculate relevance scores
    const scoredResults = allResults
      .filter(isStanfordPerson)
      .map(person => {
        // Create searchable text from all relevant fields
        const searchableFields = [
          person.suPersonFirstName || "",
          person.suPersonLastName || "",
          person.suPersonFullTitle || "",
          person.suPersonShortTitle || "",
          person.body?.processed || "",
          ...(person.suPersonResearchInterests || []),
          ...(person.suPersonResearch?.map(
            (research: {processed?: string | null}) => (research?.processed as string) || ""
          ) || []),
          ...(person.suPersonTypeGroup?.map((type: {name: string}) => type.name) || []),
        ]
          .join(" ")
          .toLowerCase()

        // Calculate score based on how many search terms match (partial word matching)
        const score = searchTerms.reduce((count, term) => {
          const found = searchableFields.indexOf(term) !== -1
          return found ? count + 1 : count
        }, 0)

        return {person, score}
      })
      .filter(result => result.score > 0) // Only include results with at least one match
      .sort((a, b) => b.score - a.score) // Sort by score (highest first)

    const filteredResults = scoredResults.map(
      (result): Extract<StanfordPersonResultItem, {__typename: "NodeStanfordPerson"}> => result.person
    )

    // Transform to API response format
    return filteredResults.map((person): PersonSearchResult => ({
      id: person.uuid,
      firstName: person.suPersonFirstName || "",
      lastName: person.suPersonLastName || "",
      fullTitle: person.suPersonFullTitle || undefined,
      photo: person.suPersonPhoto?.mediaImage?.url
        ? {
            url: person.suPersonPhoto.mediaImage.url,
            alt: person.suPersonPhoto.mediaImage.alt || undefined,
          }
        : undefined,
      body: person.body?.processed || undefined,
      email: person.suPersonEmail || undefined,
      telephone: person.suPersonTelephone || undefined,
      mailCode: person.suPersonMailCode || undefined,
      research:
        person.suPersonResearch
          ?.map((r: {processed?: string | null}) => r.processed)
          .filter((text): text is string => Boolean(text)) || undefined,
      personTypes:
        person.suPersonTypeGroup?.map(type => ({
          name: type.name,
        })) || undefined,
      path: person.path || "",
    }))
  } catch (error) {
    console.error("Failed to fetch person search results:", error)
    return []
  }
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || searchParams.get("query") || searchParams.get("search")

  if (!query) {
    return NextResponse.json({error: "Search query parameter is required. Use ?q=your-search-terms"}, {status: 400})
  }

  try {
    const results = await getPersonSearch(query)
    return NextResponse.json({
      query,
      count: results.length,
      results,
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({error: "Internal server error"}, {status: 500})
  }
}
