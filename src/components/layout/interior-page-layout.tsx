// interior-page-layout.tsx
"use client"

import {HtmlHTMLAttributes, createContext} from "react"
import OnThisPage from "@/components/patterns/on-this-page"
import DrupalLink from "@/components/patterns/elements/drupal-link"
import SecondaryMenu from "@/components/menu/secondary-menu"
import {BookLink, MenuItem, NodeStanfordNews, NodeStanfordPage, NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"

// Create and export context
export const PageLayoutContext = createContext({
  hasSulSidebar: false,
  hasSecondaryNav: false,
})

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  sulSidebar: boolean
  node: NodeStanfordPage | NodeStanfordNews | NodeSulLibrary
  menuItems?: MenuItem[] // 👈 Change to just MenuItem[] (remove BookLink union)
  currentPath: string
}

const InteriorPageLayout = ({children, sulSidebar, node, menuItems = [], currentPath, ...props}: Props) => {
  const hasSecondaryNav = sulSidebar || menuItems.length > 0

  return (
    <PageLayoutContext.Provider value={{hasSulSidebar: sulSidebar, hasSecondaryNav}}>
      <div {...props} className="centered flex flex-col justify-between gap-[8rem] lg:flex-row">
        {sulSidebar && (
          <OnThisPage>
            {node.sulRelLinks && (
              <div className="lg:mt-40">
                <h2
                  data-skip-heading="true"
                  className="type-0 m-0 block px-10 py-2 font-sans font-semibold text-cardinal-red lg:type-1 lg:mb-8 lg:p-0 lg:text-black"
                >
                  {node.sulRelLinksHeading || "Related content"}
                </h2>
                <ul className="list-none p-0">
                  {node.sulRelLinks.map((link, index) => (
                    <li key={index} className="mb-0 lg:mb-12">
                      {link.url && (
                        <DrupalLink
                          href={link.url}
                          className="type-0 block break-words px-10 py-2 font-sans font-normal text-black no-underline hocus:bg-black-10 hocus:underline lg:p-0 lg:text-digital-blue lg:underline lg:hocus:bg-transparent"
                        >
                          {link.title}
                        </DrupalLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </OnThisPage>
        )}
        {!sulSidebar && <SecondaryMenu menuItems={menuItems} currentPath={currentPath} />}

        <div className="flex-1">{children}</div>
      </div>
    </PageLayoutContext.Provider>
  )
}

export default InteriorPageLayout
