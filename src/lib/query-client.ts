import {environmentManager, QueryClient} from "@tanstack/react-query"

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Avoid refetching on every mount and window focus. The data this site fetches on the client
        // (library hours) changes a few times a day.
        staleTime: 10 * 60 * 1000,
        // A couple of retries ride out a flaky network instead of leaving the component empty.
        retry: 2,
      },
    },
  })

let browserQueryClient: QueryClient | undefined

/**
 * Query client for client-side data fetching.
 *
 * In the browser every component shares one client, so the same request is made once and its result
 * shared. On the server a fresh client is made each time: a module-level client would be shared across
 * every request and user.
 */
export const getQueryClient = (): QueryClient => {
  if (environmentManager.isServer()) return makeQueryClient()
  return (browserQueryClient ??= makeQueryClient())
}
