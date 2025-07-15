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
    // Get all stanford persons using the existing GraphQL query
    // Since there's no search parameter in the existing view, we'll fetch all and filter
    const data = await graphqlClient().stanfordPerson({
      pageSize: -1, // Get all results
    })

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

    // Filter to only stanford person nodes and then filter by search terms
    const filteredResults = data.stanfordPerson.results.filter(isStanfordPerson).filter(person => {
      // Create searchable text from all relevant fields
      const searchableFields = [
        person.suPersonFirstName || "",
        person.suPersonLastName || "",
        person.suPersonFullTitle || "",
        person.suPersonShortTitle || "",
        person.body?.processed || "",
        ...(person.suPersonResearch?.map(research => (research.processed as string) || "") || []),
      ]
        .join(" ")
        .toLowerCase()

      // Check if any search term matches
      return searchTerms.some(term => searchableFields.includes(term))
    })

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
