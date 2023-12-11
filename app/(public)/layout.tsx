import LibraryFooter from "@/components/layout/library-footer";
import GlobalFooter from "@/components/layout/global-footer";
import Header from "@/components/layout/header";
import {ReactNode} from "react";
import Script from "next/script";
import GoogleAnalytics from "@/components/utils/google-analytics";
import {isDraftMode} from "@/lib/drupal/is-draft-mode";

const Layout = ({children}: { children: ReactNode }) => {
  const draftMode = isDraftMode()
  return (
    <>
      {(!draftMode && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) &&
        <>
          <Script async src="//siteimproveanalytics.com/js/siteanalyze_80352.js"/>
          <GoogleAnalytics/>
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
