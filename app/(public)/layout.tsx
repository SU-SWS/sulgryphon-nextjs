import LibraryFooter from "@/components/layout/library-footer";
import GlobalFooter from "@/components/layout/global-footer";
import Header from "@/components/layout/header";
import {ReactNode} from "react";
import Script from "next/script";
import {GoogleAnalytics} from "@next/third-parties/google";
import {isDraftMode} from "@/lib/drupal/is-draft-mode";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;
export const dynamic = 'force-static';

const Layout = ({children}: { children: ReactNode }) => {
  const draftMode = isDraftMode()
  return (
    <>
      {(!draftMode && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) &&
        <>
          <Script async src="//siteimproveanalytics.com/js/siteanalyze_80352.js"/>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}/>
        </>
      }
      <div className="grid grid-rows-1 min-h-screen">
        <div>
          <Header/>
          {children}
        </div>

        <footer className="row-start-2 row-end-3">
          <LibraryFooter/>
          <GlobalFooter/>
        </footer>
      </div>
    </>
  )
}
export default Layout;
