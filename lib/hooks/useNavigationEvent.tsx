'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {syncDrupalPreviewRoutes} from "@/lib/drupal/sync-drupal-preview-path";

const useNavigationEvent = () => {
  const [url, setUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!(pathname?.startsWith('/calendar/') || pathname?.startsWith('/study-place/'))) {
      setUrl(pathname ? pathname : null);
    }
  }, [pathname]);

  useEffect(() => syncDrupalPreviewRoutes(url), [url])
  return url;
}

export default useNavigationEvent;