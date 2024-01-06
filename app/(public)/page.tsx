import {getResourceByPath} from "@/lib/drupal/get-resource";
import {BasicPage, StanfordParagraph} from "@/lib/drupal/drupal";
import {Metadata} from "next";
import {getNodeMetadata} from "./[...slug]/metadata";
import HomePageBanner from "@/components/node/stanford-page/home-page/home-page-banner";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import fetchComponents from "@/lib/fetch-components";
import {notFound} from "next/navigation";

export const revalidate = 1800;

export const generateMetadata = async (): Promise<Metadata> => {
  const node = await getResourceByPath<BasicPage>('/');
  return node ? getNodeMetadata(node) : {};
}

const Page = async () => {
  const node = await getResourceByPath<BasicPage>('/');
  if (!node) notFound();
  node.su_page_components = await fetchComponents<StanfordParagraph>(node.su_page_components ?? []);

  return (
    <main id="main-content" className="mb-50">
      <HomePageBanner/>
      <ParagraphRows items={node.su_page_components} fullWidth/>
    </main>
  )
}

export default Page