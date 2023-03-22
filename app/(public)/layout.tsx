import LibraryFooter from "@/components/layout/library-footer";
import GlobalFooter from "@/components/layout/global-footer";
import Header from "@/components/layout/header";
import {getMenu} from "./lib/drupal/get-menu";
import "./styles/globals.css"

import {DrupalMenuLinkContent} from "next-drupal";

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://library.stanford.edu',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const RootLayout = async ({children}: { children: React.ReactNode }) => {
  let tree: DrupalMenuLinkContent[] = [];
  try {
    ({tree} = await getMenu('main'));
  } catch (e) {
  }

  return (
    <html lang="en">
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
