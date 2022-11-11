import {useAppContext} from "../../context/state";
import getActiveTrail from "@/lib/menu";
import {SideNav} from "@/components/menu/side-nav";
import {DrupalMenuLinkContent} from "next-drupal";

interface MainLayoutProps {
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MainContentLayout = ({fullWidth, ...props}: MainLayoutProps) => {
  const appContext = useAppContext();

  const activeTrail = getActiveTrail(appContext.menu);
  let subTree;

  const cleanSubMenu = (menu: DrupalMenuLinkContent[], activeTrail: number[]) => {
    menu.map((menuItem, i) => {
      if (i !== activeTrail[0]) {
        delete menuItem.items;
      } else {
        cleanSubMenu(menuItem.items ?? [], activeTrail.slice(1));
      }
    });
  }


  if (activeTrail.length >= 1) {
    subTree = appContext.menu[activeTrail[0]]?.items;
    if (subTree?.length === 1) {
      subTree = [];
    }
    cleanSubMenu(subTree ?? [], activeTrail.slice(1));
  }

  return (
    <main {...props} className={`${props.className ?? ''} md:su-grid su-grid-cols-4 ${fullWidth ? '' : 'su-cc'}`}>
      {(subTree?.length >= 1) &&
          <aside className="su-hidden lg:su-block su-col-span-1">
              <SideNav tree={subTree} className="su-sticky su-top-0"/>
          </aside>
      }

      <section id="main-content" className={`su-col-span-4 ${subTree?.length >= 1 ? 'lg:su-col-span-3' : ''}`}>
        {props.children}
      </section>
    </main>

  )

}
