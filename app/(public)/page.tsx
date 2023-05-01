import {getResourceByPath} from "next-drupal/src/get-resource";
import {BasicPage} from "@/lib/drupal/drupal";
import HomePageBanner from "@/components/node/stanford-page/home-page/home-page-banner";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import {DrupalParagraph} from "next-drupal";

export const revalidate = 60;

const Page = async () => {
  const node: BasicPage = await getResourceByPath('/');
  node.su_page_components = await fetchComponents(node.su_page_components ?? []) as DrupalParagraph[];
  return (
    <main id="main-content su-mb-50">
      {/* @ts-expect-error Async Server Component */}
      <HomePageBanner/>
      <ParagraphRows items={node.su_page_components} fullWidth/>
    </main>
  )
}

export default Page