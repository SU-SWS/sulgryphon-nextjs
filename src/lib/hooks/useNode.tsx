import {useEffect, useState} from "react";
import axios from "axios";

export const useNode = (nodeType, uuid) => {
  const [node, setNode] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      await axios.get(`/api/node/node--${nodeType}/${uuid}`)
        .then(result => setNode(result.data))
    }
    fetchList();
  }, [nodeType, uuid])
  return node;
}