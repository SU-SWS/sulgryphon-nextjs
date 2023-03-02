import {getResourceByPath} from "next-drupal/src/get-resource";
import HomePageNode from "./components/node/stanford-page/home-page/page-display";

const Page = async () => {
  const node = await getResourceByPath('/');

  return (
    <div>
      <HomePageNode node={node}/>
    </div>
  )
}

export default Page