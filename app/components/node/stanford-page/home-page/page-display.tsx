import HomePageBanner from "./home-page-banner";
import {BasicPage} from "../../../../../src/types/drupal";
import {ParagraphRows} from "../../../paragraph/rows/rows";
import {getResource} from "../../../../lib/drupal/get-resource";

const HomePageNode = async ({node}: BasicPage) => {
  const requests = [];
  node.su_page_components.map(component => requests.push(getResource(component.type, component.id)));
  node.su_page_components = await Promise.all(requests);

  return (
    <div>
      <HomePageBanner/>
      <ParagraphRows items={node.su_page_components}/>
    </div>
  )
}

export default HomePageNode;