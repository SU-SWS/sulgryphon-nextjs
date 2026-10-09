import {useQuery, UseQueryOptions, UseQueryResult} from "@tanstack/react-query"
import {getQueryClient} from "@/lib/query-client"

/**
 * Fetch JSON from a url on the client, deduplicated and cached across components.
 *
 * The query client is passed directly, so components need no provider wrapper.
 */
const useDataFetch = <T,>(
  url: string,
  options: Omit<UseQueryOptions<T>, "queryKey" | "queryFn"> = {}
): UseQueryResult<T> =>
  useQuery(
    {
      queryKey: [url],
      queryFn: async ({signal}) => {
        const response = await fetch(url, {signal})
        if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`)
        return (await response.json()) as T
      },
      ...options,
    },
    getQueryClient()
  )

export default useDataFetch
