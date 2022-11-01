import {DefaultSeoProps} from 'next-seo';

const config: DefaultSeoProps = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  titleTemplate: '%s | ' + process.env.NEXT_PUBLIC_SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://library.stanford.edu',
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default config;