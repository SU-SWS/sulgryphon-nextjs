import {useEffect, useState} from "react";
import axios from "axios";

export const useSiteSearch = (query, limit = 9999, callback = null) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `/api/site-search?q=${query}`
      await axios.get(url)
        .then(result => {
          setResults(result.data);
          callback?.(result.data)
        })
        .catch(e => console.error(e.message))
    }
    if (query) fetchResults();
  }, [query])
  return results.slice(0, limit);
}