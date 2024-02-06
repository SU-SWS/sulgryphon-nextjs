import {Metadata} from "next";
import {getNodeMetadata} from "./[...slug]/metadata";
import HomePageBanner from "@/components/node/stanford-page/home-page/home-page-banner";
import {ParagraphRows} from "@/components/paragraph/rows/rows";
import {notFound} from "next/navigation";
import {getEntityFromPath} from "@/lib/gql/fetcher";
import {NodeStanfordPage} from "@/lib/gql/__generated__/drupal";

export const revalidate = false;

export const generateMetadata = async (): Promise<Metadata> => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>('/');
  return entity ? getNodeMetadata(entity) : {};
}

const Page = async () => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>('/')
  if (!entity) notFound();

  return (
    <main id="main-content" className="mb-50">
      <HomePageBanner/>
      {entity.suPageComponents &&
        <ParagraphRows items={entity.suPageComponents} fullWidth/>
      }
    </main>
  )
}

export default Page