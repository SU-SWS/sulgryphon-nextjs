import LibraryFooter from "@/components/layout/library-footer";
import GlobalFooter from "@/components/layout/global-footer";
import Header from "@/components/layout/header";
import {ReactNode} from "react";

const Layout = ({children}: { children: ReactNode }) => {

  return (

    <div className="su-grid su-grid-rows-1 su-min-h-screen">
      <div>
        {/* @ts-expect-error Async Server Component */}
        <Header/>

        <div className="su-mb-50">
          {children}
        </div>
      </div>

      <footer className="su-row-start-2 su-row-end-3">
        <LibraryFooter/>
        <GlobalFooter/>
      </footer>
    </div>
  )
}
export default Layout;
