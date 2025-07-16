import {NextRequest, NextResponse} from "next/server"
import {graphqlClient} from "@/lib/gql/fetcher"
import {StanfordPersonQuery} from "@/lib/gql/__generated__/drupal.d"

// Extract the actual type of items in the results array
type StanfordPersonResultItem = NonNullable<NonNullable<StanfordPersonQuery["stanfordPerson"]>["results"][number]>

export const dynamic = "force-dynamic"

type PersonSearchResult = {
  id: string
  firstName: string
  lastName: string
  fullTitle?: string
  photo?: {
    url: string
    alt?: string
  }
  body?: {
    processed: string
  }
  email?: string
  telephone?: string
  mailCode?: string
  research?: string
  path: string
}

const getPersonSearch = async (keywords: string): Promise<PersonSearchResult[]> => {
  try {
    // Get all stanford persons using pagination to fetch ALL results
    let allResults: any[] = []
    let page = 0
    let hasMorePages = true

    while (hasMorePages) {
      const data = await graphqlClient().stanfordPerson({
        pageSize: 60, // Use the apparent page limit
        page: page,
      })

      if (data.stanfordPerson?.results) {
        allResults = allResults.concat(data.stanfordPerson.results)

        // Check if we have more pages
        const pageSize = 60
        const totalFetched = (page + 1) * pageSize
        const total = data.stanfordPerson.pageInfo?.total || 0
        hasMorePages = totalFetched < total
        page++
      } else {
        hasMorePages = false
      }
    }

    // Create a fake response structure
    const data = {
      stanfordPerson: {
        results: allResults,
        pageInfo: {total: allResults.length},
      },
    }

    if (!data.stanfordPerson?.results) {
      return []
    }

    const searchTerms = keywords
      .toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 0)

    // Type guard to ensure we only work with NodeStanfordPerson
    const isStanfordPerson = (
      node: StanfordPersonResultItem
    ): node is Extract<StanfordPersonResultItem, {__typename: "NodeStanfordPerson"}> => {
      return node.__typename === "NodeStanfordPerson"
    }

    // Filter to only stanford person nodes and calculate relevance scores
    const scoredResults = data.stanfordPerson.results
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
          ...(person.suPersonResearch?.map(research => (research?.processed as string) || "") || []),
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

    const filteredResults = scoredResults.map(result => result.person)

    // Transform to API response format
    return filteredResults.map(
      (person): PersonSearchResult => ({
        id: person.id,
        firstName: person.suPersonFirstName || "",
        lastName: person.suPersonLastName || "",
        fullTitle: person.suPersonFullTitle || undefined,
        photo: person.suPersonPhoto?.mediaImage?.url
          ? {
              url: person.suPersonPhoto.mediaImage.url,
              alt: person.suPersonPhoto.mediaImage.alt || undefined,
            }
          : undefined,
        body: person.body?.processed ? {processed: person.body.processed} : undefined,
        email: person.suPersonEmail || undefined,
        telephone: person.suPersonTelephone || undefined,
        mailCode: person.suPersonMailCode || undefined,
        research: person.suPersonResearch?.[0]?.processed || undefined,
        path: person.path || "",
      })
    )
  } catch (error) {
    console.error("Failed to fetch person search results:", error)
    throw new Error("Failed to fetch search results")
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
