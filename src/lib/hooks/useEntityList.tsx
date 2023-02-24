import {useEffect, useState} from "react";
import axios from "axios";

export const useEntityList = (entityType, bundle) => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      await axios.get(`/api/entity-list/${entityType}/${bundle}`)
        .then(result => setEntities(result.data))
        .catch(e => console.error(e.message))
    }
    fetchList();
  }, [bundle, entityType])
  return entities;
}