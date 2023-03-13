import {JsonApiResource} from "next-drupal";
import {getResource} from "@/lib/drupal/get-resource";

const fetchComponents= async (components: JsonApiResource[]) => {

  const requests: PromiseLike<any>[] = [];
  components.map(component => requests.push(getResource(component.type, component.id)));

  // @ts-ignore
  return await Promise.all(requests.map(p => p.catch(e => null)));
}

export default fetchComponents;