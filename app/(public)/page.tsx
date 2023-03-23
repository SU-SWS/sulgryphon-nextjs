import {getResourceByPath} from "next-drupal/src/get-resource";
import HomePageNode from "@/components/node/stanford-page/home-page/page-display";
import {BasicPage} from "@/lib/drupal/drupal";
import {Metadata} from "next";
import {getNodeMetadata} from "./[...slug]/metadata";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  const node: BasicPage = await getResourceByPath('/');
  return getNodeMetadata(node);
}

const Page = async () => {
  const node: BasicPage = await getResourceByPath('/');
  return (
    <div>
      {/* @ts-expect-error Async Server Component */}
      <HomePageNode node={node}/>
    </div>
  )
}

export default Page