import {useEffect, useState} from "react";
import axios from "axios";
import {DrupalNode} from "next-drupal";

export const useSearchResults = (query: string): [DrupalNode[], boolean, any] => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (
      async function () {
        try {
          const response = await axios.get(`/api/search?q=${query}`)
          setData(response.data)
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
    )()
  }, [query])

  return [data, loading, error]
}