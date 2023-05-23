import {getResource} from "@/lib/drupal/get-resource";
import {JsonApiResource} from "next-drupal";

async function fetchComponents<T>(components: JsonApiResource[]) {
  const requests: PromiseLike<any>[] = [];
  components.map(component => requests.push(getResource(component.type, component.id)));
  // @ts-ignore
  return Promise.all(requests.map((p, i) => p.catch((e) => {console.error(`Failed Fetching (probably unpublished) component ${components[i].type}-${components[i].id}`, e); return null})));
}

export default fetchComponents;