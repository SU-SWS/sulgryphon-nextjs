import HomePageBanner from "./home-page-banner";
import {BasicPage} from "@/lib/drupal/drupal";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import {DrupalParagraph} from "next-drupal";

const HomePageNode = async ({node}: {node: BasicPage}) => {
  node.su_page_components = await fetchComponents(node.su_page_components ?? []);

  return (
    <div>
      {/* @ts-expect-error Async Server Component */}
      <HomePageBanner/>
      <ParagraphRows items={node.su_page_components}/>
    </div>
  )
}

export default HomePageNode;