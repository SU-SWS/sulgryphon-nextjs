import {useEffect, useState} from "react";
import axios from "axios";

export const useSearchWorks = (query, articles = false) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = articles ? '`https://searchworks.stanford.edu/articles?q=${query}&rows=10&format=json`' : `https://searchworks.stanford.edu/?q=${query}&rows=10&format=json`
      await axios.get(url)
        .then(result => setResults(result.data))
    }
    fetchResults();
  }, [query])
  return results;
}