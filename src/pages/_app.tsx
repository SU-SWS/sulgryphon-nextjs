import {AppProps} from "next/app"
import Router from "next/router"
import {syncDrupalPreviewRoutes} from "next-drupal"
import {DefaultSeo} from "next-seo";

import "../styles/globals.css"
import SEO from '../next-seo.config';

Router.events.on("routeChangeStart", path => {
  syncDrupalPreviewRoutes(path)
})

const DrupalApp = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}


export default DrupalApp;
