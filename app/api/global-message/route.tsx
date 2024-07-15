import {NextRequest, NextResponse} from "next/server"
import {buildHeaders} from "@/lib/drupal/utils"
import {GraphQLClient} from "graphql-request"
import {getSdk} from "@/lib/gql/__generated__/queries"
import type {RequestConfig} from "graphql-request/src/types"

export const GET = async (request: NextRequest) => {
  const graphqlClient = (requestConfig: RequestConfig = {}, isPreviewMode?: boolean) => {
    requestConfig.headers = buildHeaders(requestConfig.headers as HeadersInit, isPreviewMode)
    const client = new GraphQLClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/graphql", {
      ...requestConfig,
      next: {
        revalidate: 5, // revalidate every 5 seconds to catch updates as soon as possible.
        ...requestConfig.next,
      },
      fetch: async (input: URL | RequestInfo, init?: RequestInit) => fetch(input, init),
    })
    return getSdk(client)
  }

  try {
    const headers = await buildHeaders()
    const query = await graphqlClient({headers, next: {tags: ["config-pages"]}}).ConfigPages()
    return NextResponse.json(query.stanfordGlobalMessages.nodes[0])
  } catch (e) {
    console.error("Failed to fetch global message", e)
  }
}
