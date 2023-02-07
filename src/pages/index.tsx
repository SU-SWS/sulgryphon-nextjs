import {GetStaticProps, GetStaticPropsResult} from "next"
import {DrupalMenuLinkContent, DrupalNode, getMenu, getResource} from "next-drupal"

import {NodeStanfordPage} from "@/components/nodes/node-stanford-page";
import {PageLayout} from "@/components/layouts/page-layout"
import {populateParagraphData} from "@/lib/fetch-paragraphs";

import {BasicPage} from "../types/drupal";
import {AppWrapperProvider} from "../context/state";

interface HomePageProps {
  node: BasicPage
  menuItems: DrupalMenuLinkContent[]
}

const HomePage = ({node, menuItems, ...props}: HomePageProps) => {
  return (
    <AppWrapperProvider menuItems={menuItems}>
      <PageLayout {...props}>
        <h1 className="su-hidden">{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
        <NodeStanfordPage node={node} homepage/>
      </PageLayout>
    </AppWrapperProvider>
  )
}

export default HomePage;

export const getStaticProps: GetStaticProps<{ node: BasicPage, menuItems: DrupalMenuLinkContent[] }> = async (): Promise<GetStaticPropsResult<HomePageProps>> => {
  const node = await getResource<DrupalNode>('node--stanford_page', process.env.DRUPAL_FRONT_PAGE)
  await populateParagraphData(node);
  const {items} = await getMenu('main');

  return {
    props: {
      node,
      menuItems: items
    },
    revalidate: 60
  }
}
