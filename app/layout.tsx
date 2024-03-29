import "../src/styles/globals.css"

import {ReactNode} from "react";
import {Icon} from "next/dist/lib/metadata/types/metadata-types";
import DrupalWindowSync from "@/components/utils/drupal-window-sync";
import Script from "next/script";
import {GoogleAnalytics} from "@next/third-parties/google";
import Header from "@/components/layout/header";
import LibraryFooter from "@/components/layout/library-footer";
import GlobalFooter from "@/components/layout/global-footer";
import {isPreviewMode} from "@/lib/drupal/is-draft-mode";

const appleIcons: Icon[] = [60, 72, 76, 114, 120, 144, 152, 180].map(size => ({
  url: `https://www-media.stanford.edu/assets/favicon/apple-touch-icon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}));

const icons: Icon[] = [16, 32, 96, 128, 192, 196].map(size => ({
  url: size === 128 ? `https://www-media.stanford.edu/assets/favicon/favicon-${size}.png` : `https://www-media.stanford.edu/assets/favicon/favicon-${size}x${size}.png`,
  sizes: `${size}x${size}`
}));

export const metadata = {
  metadataBase: new URL('https://library.stanford.edu'),
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
  icons: {
    icon: [{url: '/favicon.ico'}, ...icons],
    apple: appleIcons
  }
}

export const revalidate = false;

const RootLayout = ({children, modal}: { children: ReactNode, modal: ReactNode }) => {
  const previewMode = isPreviewMode()
  return (
    <html lang="en">
    <DrupalWindowSync/>
    <body>
    <nav aria-label="Skip link">
      <a className="skiplink" href="#main-content">Skip to main content</a>
    </nav>
    {(!previewMode && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) &&
      <>
        <Script async src="//siteimproveanalytics.com/js/siteanalyze_80352.js"/>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}/>
      </>
    }
    <div className="grid grid-rows-1 min-h-screen">
      <div>
        <Header/>
        {children}
        {modal}
      </div>

      <footer className="row-start-2 row-end-3">
        <LibraryFooter/>
        <GlobalFooter/>
      </footer>
    </div>

    </body>
    </html>
  )
}
export default RootLayout;
