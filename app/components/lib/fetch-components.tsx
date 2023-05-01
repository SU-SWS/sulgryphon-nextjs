import "server-only";

import {getResource} from "@/lib/drupal/get-resource";
import {JsonApiResource} from "next-drupal";

const fetchComponents = async (components: JsonApiResource[]): Promise<JsonApiResource[]> => {
  const requests: PromiseLike<any>[] = [];
  components.map(component => requests.push(getResource(component.type, component.id)));
  // @ts-ignore
  return Promise.all(requests.map((p, i) => p.catch((e) => {console.error(`Failed Fetching (probably unpublished) component ${components[i].type}-${components[i].id}`, e); return null})));
}

export default fetchComponents;