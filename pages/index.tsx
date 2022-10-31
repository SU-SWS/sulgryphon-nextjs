import {GetStaticPropsResult} from "next"
import {DefaultSeo} from "next-seo";
import {DrupalNode, getResource} from "next-drupal"

import {NodeStanfordPage} from "@/components/nodes/node-stanford-page";
import {PageLayout} from "@/components/layouts/page-layout"
import {populateParagraphData} from "@/lib/fetch-paragraphs";
import {cleanNode} from "@/lib/clean-node";

interface HomePageProps {
  node: DrupalNode
}

const HomePage = ({node, ...props}: HomePageProps) => {
  return (
    <>
      <DefaultSeo
        title={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <PageLayout {...props}>
        <h1 className="su-hidden">{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
        <NodeStanfordPage node={node} homepage/>
      </PageLayout>
    </>
  )
}

export default HomePage;

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const node = await getResource<DrupalNode>('node--stanford_page', process.env.DRUPAL_FRONT_PAGE)
  await populateParagraphData(node);
  cleanNode(node);

  return {
    props: {
      node
    },
    revalidate: 60
  }
}
