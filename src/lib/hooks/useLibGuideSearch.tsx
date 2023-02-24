import {useEffect, useState} from "react";
import axios from "axios";

export const useLibGuideSearch = (query) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `/api/libguide-search?q=${query}`
      await axios.get(url)
        .then(result => setResults(result.data))
        .catch(e => console.error(e.message))
    }
    fetchResults();
  }, [query])
  return results;
}