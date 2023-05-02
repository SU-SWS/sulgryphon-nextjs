'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {syncDrupalPreviewRoutes} from "@/lib/drupal/sync-drupal-preview-path";

const useNavigationEvent = () => {
  const [url, setUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && searchParams) {
      const param = searchParams.toString()
      setUrl(pathname + (param ? '?' + param : ''));
    }
  }, [pathname, searchParams]);

  useEffect(() => syncDrupalPreviewRoutes(url), [url])
  return url;
}

export default useNavigationEvent;