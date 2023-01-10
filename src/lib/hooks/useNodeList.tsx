import {useEffect, useState} from "react";
import axios from "axios";

export const useNodeList = (nodeType) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      await axios.get(`/api/node/node--${nodeType}`)
        .then(result => setNodes(result.data))
    }
    fetchList();
  }, [nodeType])
  return nodes;
}