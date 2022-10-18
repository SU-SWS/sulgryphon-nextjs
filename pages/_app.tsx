import App, {AppProps} from "next/app"
import {DrupalMenuLinkContent, getMenu} from "next-drupal";
import Router from "next/router"
import {syncDrupalPreviewRoutes} from "next-drupal"

import {AppWrapper} from "../context/state";
import "styles/globals.css"

Router.events.on("routeChangeStart", path => {
  syncDrupalPreviewRoutes(path)
})

interface PageProps {
  menu: DrupalMenuLinkContent[]
}

interface DrupalAppProps extends AppProps {
  pageProps: PageProps
}

function DrupalApp({Component, pageProps}: DrupalAppProps) {

  return (
    <AppWrapper menu={pageProps.menu}>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

DrupalApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const {tree} = await getMenu('main');

  const cleanMenuItems = (menu: DrupalMenuLinkContent[]) => {
    menu.map((menuItem, i) => {
      if (!menuItem.enabled) {
        delete menu[i];
        return;
      }

      delete menuItem.enabled;
      delete menuItem.meta;
      delete menuItem.route;
      delete menuItem.menu_name;
      delete menuItem.weight;
      delete menuItem.provider;
      delete menuItem.parent;
      delete menuItem.type;
      cleanMenuItems(menuItem.items ?? []);
    })
  }
  cleanMenuItems(tree);
  appProps.pageProps.menu = tree;
  return {...appProps}
}
export default DrupalApp;
