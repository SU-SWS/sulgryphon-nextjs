import {useQuery} from "react-query";
import axios from "axios";

const useDataFetch = (url: string, queryKeys: string[] = []) => {
  queryKeys.push(url);
  return useQuery({queryKey: queryKeys, queryFn: () => axios.get(url).then(res => res.data)});
}

export default useDataFetch