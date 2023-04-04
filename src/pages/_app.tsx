import {AppProps} from "next/app"
import Router from "next/router"
import {syncDrupalPreviewRoutes} from "next-drupal"

Router.events.on("routeChangeStart", path => {
  syncDrupalPreviewRoutes(path)
})

const DrupalApp = ({Component, pageProps}: AppProps) => {
  return (
    <Component {...pageProps} />
  )
}


export default DrupalApp;
