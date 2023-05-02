import "../styles/globals.css"

import Editori11y from "@/components/editori11y";
import {ReactNode} from "react";
import {Icon} from "next/dist/lib/metadata/types/metadata-types";

const appleIcons: Icon[] = [60, 72, 76, 114, 120, 144, 152, 180].map(size => ({
  url: `https://www-media.stanford.edu/assets/favicon/apple-touch-icon-${size}x${size}.png`,
  sizes: `${size}x${size}`,
}));

const icons: Icon[] = [16, 32, 96, 128, 192, 196].map(size => ({
  url: size === 128 ? `https://www-media.stanford.edu/assets/favicon/favicon-${size}.png` : `https://www-media.stanford.edu/assets/favicon/favicon-${size}x${size}.png`,
  sizes: `${size}x${size}`
}));

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
  icons: {
    icon: [{url: '/favicon.ico'}, ...icons],
    apple: appleIcons
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
}

const RootLayout = ({children, modal}: { children: ReactNode, modal: ReactNode }) => {

  return (
    <html lang="en">
    <Editori11y/>
    <body>
    <nav>
      <a className="su-skiplink" href="#main-content">Skip to main content</a>
    </nav>
    {children}
    {modal}
    </body>
    </html>
  )
}
export default RootLayout;
