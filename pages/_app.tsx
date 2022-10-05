import App, {AppProps} from "next/app"
import {DrupalMenuLinkContent, getMenu} from "next-drupal";

import {AppWrapper} from "../context/state";
import "styles/globals.css"

function DrupalApp({Component, pageProps}: AppProps) {

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
