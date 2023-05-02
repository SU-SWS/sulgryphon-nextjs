import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const useDataFetch = (url: string, queryKeys: string[] = [], options = {}) => {
  queryKeys.push(url);

  return useQuery({
    queryKey: queryKeys,
    queryFn: () => axios.get(url).then(res => res.data),
    ...options
  });
}

export default useDataFetch