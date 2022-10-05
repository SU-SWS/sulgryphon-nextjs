import {GetStaticPropsResult} from "next"
import {DefaultSeo, NextSeo} from "next-seo";
import {DrupalMenuLinkContent, DrupalNode, getMenu, getResource} from "next-drupal"

import {NodeStanfordPage} from "@/components/nodes/node-stanford-page";
import {PageLayout} from "@/components/layouts/page-layout"
import {fetchParagraphs, fetchRowParagraphs} from "@/lib/fetch-paragraphs";

interface HomePageProps {
  node: DrupalNode,
  menu: DrupalMenuLinkContent[],
}

const HomePage = ({node, menu, ...props}: HomePageProps) => {
  return (
    <>
      <DefaultSeo
        title={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <PageLayout menu={menu} {...props}>
        <h1 className="su-hidden">{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
        <NodeStanfordPage node={node} homepage/>
      </PageLayout>
    </>
  )
}

export default HomePage;

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {

  const node = await getResource<DrupalNode>('node--stanford_page', process.env.DRUPAL_FRONT_PAGE)
  const paragraphs = await fetchParagraphs(node.su_page_components);

  node?.su_page_components.map((row, i) => {
    node.su_page_components[i] = paragraphs.find(paragraph => paragraph.id === row.id);
  })
  const {tree} = await getMenu('main');

  return {
    props: {
      node,
      menu: tree
    },
    revalidate: 60 * 5
  }
}
