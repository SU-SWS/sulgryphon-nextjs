import {useRouter} from "next/router";
import {ReactNodeLike} from "prop-types";
import {DrupalMenuLinkContent} from "next-drupal";

import {useAppContext} from "../../context/state";
import Conditional from "@/components/simple/conditional";
import getActiveTrail from "@/lib/menu";
import {SideNav} from "@/components/menu/side-nav";
import buildMenuTree from "@/lib/build-menu-tree";

interface MainLayoutProps {
  fullWidth?: boolean;
  className?: string;
  children: ReactNodeLike;
}

export const MainContentLayout = ({fullWidth, ...props}: MainLayoutProps) => {
  const appContext = useAppContext();
  const {items: menuTree} = buildMenuTree(appContext.menuItems)

  const activeTrail = getActiveTrail(menuTree, useRouter());
  const topMenuItem = activeTrail.length > 0 ? menuTree.find(item => item.id === activeTrail[0]) : false;
  const subTree = topMenuItem && topMenuItem.items ? topMenuItem.items : [];

  const cleanSubtree = (tree: DrupalMenuLinkContent[] = []) => {
    tree.map(item => activeTrail.indexOf(item.id) === -1 ? delete item.items : cleanSubtree(item.items));
  }
  cleanSubtree(subTree);

  return (
    <main {...props} className={`${props.className ?? ''} md:su-grid su-grid-cols-4 ${fullWidth ? '' : 'su-cc'}`}>
      <Conditional showWhen={subTree?.length > 1 || subTree?.items?.length >= 1}>
        <aside className="su-hidden lg:su-block su-col-span-1">
          <SideNav menuTree={menuTree} subTree={subTree} className="su-sticky su-top-0"/>
        </aside>
      </Conditional>

      <section id="main-content" className={`su-col-span-4 ${subTree?.length >= 1 ? 'lg:su-col-span-3' : ''}`}>
        {props.children}
      </section>
    </main>

  )

}
