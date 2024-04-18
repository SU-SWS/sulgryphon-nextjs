"use client";

import {useEffect} from "react";

const DisablePreviewMode = () => {
  useEffect(() => {
    fetch('/api/draft/disable', {cache: 'no-cache'})
  }, [])
  return null;
}
export default DisablePreviewMode;