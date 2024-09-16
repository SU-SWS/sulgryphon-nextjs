import {useQuery, UseQueryResult} from "@tanstack/react-query"
import axios from "axios"

const useDataFetch = <T,>(url: string, queryKeys: string[] = [], options = {}): UseQueryResult<T> => {
  queryKeys.push(url)

  return useQuery({
    queryKey: queryKeys,
    queryFn: () => axios.get(url).then(res => res.data),
    retry: false,
    ...options,
  })
}

export default useDataFetch
