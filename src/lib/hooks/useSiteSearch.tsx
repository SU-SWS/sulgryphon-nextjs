import {useEffect, useState} from "react";
import axios from "axios";

export const useSiteSearch = (query, limit = 9999) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `/api/site-search?q=${query}`
      await axios.get(url)
        .then(result => setResults(result.data))
    }
    if (query) fetchResults();
  }, [query])
  return results.slice(0, limit);
}