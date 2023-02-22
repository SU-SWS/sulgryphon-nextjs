import {useEffect, useState} from "react";
import axios from "axios";

export const useEarthWorks = (query) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `https://earthworks.stanford.edu?q=${query}&rows=10&format=json`
      await axios.get(url)
        .then(result => setResults(result.data))
    }
    fetchResults();
  }, [query])
  return results;
}