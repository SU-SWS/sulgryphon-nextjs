import {DefaultSeoProps} from 'next-seo';

const config: DefaultSeoProps = {
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