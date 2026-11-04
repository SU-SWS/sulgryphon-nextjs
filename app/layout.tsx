import "../src/styles/index.css"

import {ReactNode, Suspense} from "react"
import {Icon} from "next/dist/lib/metadata/types/metadata-types"
import {sourceSans3, stanford} from "../src/styles/typography/fonts"
import DrupalWindowSync from "@/components/utils/drupal-window-sync"
import Header from "@/components/layout/header"
import LibraryFooter from "@/components/layout/library-footer"
import GlobalFooter from "@/components/layout/global-footer"
import Analytics from "@/components/utils/analytics"
import {twJoin} from "tailwind-merge"

const appleIcons: Icon[] = [60, 72, 76, 114, 120, 144, 152, 180].map(size => ({
  url: `https://www-media.stanford.edu/assets/favicon/apple-touch-icon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}))

const icons: Icon[] = [16, 32, 96, 128, 192, 196].map(size => ({
  url:
    size === 128
      ? `https://www-media.stanford.edu/assets/favicon/favicon-${size}.png`
      : `https://www-media.stanford.edu/assets/favicon/favicon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}))

export const metadata = {
  metadataBase: new URL("https://library.stanford.edu"),
  openGraph: {
    type: "website",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{url: "/favicon.ico"}, ...icons],
    apple: appleIcons,
  },
}

const RootLayout = ({children, modal}: {children: ReactNode; modal: ReactNode}) => {
  return (
    <html
      lang="en"
      className={twJoin(sourceSans3.className, stanford.variable, "scroll-smooth")}
      data-scroll-behavior="smooth"
    >
      <body>
        {/* Reads the pathname, which isn't known for every route at build time. */}
        <Suspense>
          <DrupalWindowSync />
        </Suspense>
        <nav aria-label="Skip link">
          <a className="skiplink" href="#main-content">
            Skip to main content
          </a>
        </nav>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          // Reads the pathname, which isn't known for every route at build time.
          <Suspense>
            <Analytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          </Suspense>
        )}
        <div className="grid min-h-screen grid-rows-1">
          <div>
            <Header />
            {children}
            {modal}
          </div>

          <footer className="row-start-2 row-end-3">
            <LibraryFooter />
            <GlobalFooter />
          </footer>
        </div>
      </body>
    </html>
  )
}
export default RootLayout
