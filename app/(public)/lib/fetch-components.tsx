import "server-only";

import {getResource} from "@/lib/drupal/get-resource";
import {JsonApiResource} from "next-drupal";

const fetchComponents = async (components: JsonApiResource[]): Promise<JsonApiResource[]> => {
  const requests: PromiseLike<any>[] = [];
  components.map(component => requests.push(getResource(component.type, component.id)));
  // @ts-ignore
  return Promise.all(requests.map(p => p.catch(() => null)));
}

export default fetchComponents;