// interior-page.tsx
import {HtmlHTMLAttributes} from "react"
import {MenuItem, NodeStanfordNews, NodeStanfordPage, NodeSulLibrary} from "@/lib/gql/__generated__/drupal.d"
import {getMenu} from "@/lib/gql/fetcher"
import InteriorPageLayout from "./interior-page-layout"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage | NodeStanfordNews | NodeSulLibrary
  currentPath: string
  menuItems?: MenuItem[] // 👈 Remove BookLink union here too
}

const InteriorPage = async ({children, node, currentPath, ...props}: Props) => {
  const sulSidebar =
    (node.__typename === "NodeStanfordPage" && node.layoutSelection?.id === "sul_side_nav") ||
    (node.__typename === "NodeStanfordNews" && node.layoutSelection?.id === "sul_news_side_nav") ||
    (node.__typename === "NodeSulLibrary" && node.layoutSelection?.id === "sul_branch_side_nav")

  const menuItems = await getMenu()

  return (
    <InteriorPageLayout sulSidebar={sulSidebar} node={node} menuItems={menuItems} currentPath={currentPath} {...props}>
      {children}
    </InteriorPageLayout>
  )
}

export default InteriorPage
