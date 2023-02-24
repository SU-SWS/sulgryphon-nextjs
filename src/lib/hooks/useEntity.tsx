import {useEffect, useState} from "react";
import axios from "axios";

export const useEntity = (entityType, bundle, uuid) => {
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      await axios.get(`/api/entity/${entityType}/${bundle}/${uuid}`)
        .then(result => setEntity(result.data))
        .catch(e => console.error(e.message))
    }
    if (entityType && bundle && uuid) fetchList();
  }, [bundle, entityType, uuid])
  return entity;
}