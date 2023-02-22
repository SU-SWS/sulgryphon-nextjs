import {useEffect, useState} from "react";
import axios from "axios";

export const useExhibits = (query) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = `https://exhibits.stanford.edu/exhibit_finder?q=${query}`
      await axios.get(url)
        .then(result => setResults(result.data))
    }
    fetchResults();
  }, [query])
  return results;
}