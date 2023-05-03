'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {syncDrupalPreviewRoutes} from "@/lib/drupal/sync-drupal-preview-path";

const useNavigationEvent = () => {
  const [url, setUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setUrl(pathname ? pathname : null);
  }, [pathname]);

  useEffect(() => {
    if(!(url?.startsWith('/calendar/') || url?.startsWith('/study-place/'))) syncDrupalPreviewRoutes(url)
  }, [url])
  return url;
}

export default useNavigationEvent;