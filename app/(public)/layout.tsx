import LibraryFooter from "@/components/layout/library-footer";
import GlobalFooter from "@/components/layout/global-footer";
import Header from "@/components/layout/header";
import {getMenu} from "./lib/drupal/get-menu";
import {NextSeo} from "next-seo";
import "./styles/globals.css"

import SEO from '../../next-seo.config';

const RootLayout = async ({children}: { children: React.ReactNode }) => {
  const {tree} = await getMenu('main');

  return (
    <html>
    <head>
      <NextSeo useAppDir={true} {...SEO} />
    </head>
    <body>

    <div className="su-grid su-grid-rows-1 su-min-h-screen">
      <div>
        <a className="su-skiplink" href="#main-content">Skip to main content</a>
        <Header menuItems={tree}/>

        <div>
          {children}
        </div>
      </div>

      <footer className="su-row-start-2 su-row-end-3">
        <LibraryFooter/>
        <GlobalFooter/>
      </footer>
    </div>
    </body>
    </html>
  )
}
export default RootLayout;
