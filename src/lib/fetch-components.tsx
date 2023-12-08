import {getResource} from "@/lib/drupal/get-resource";
import {JsonApiResource} from "next-drupal";

async function fetchComponents<T>(components: JsonApiResource[], options = {}):Promise<T[]> {
  const requests: PromiseLike<any>[] = [];
  components.map(component => requests.push(getResource(component.type, component.id, options)));

  // @ts-ignore
  return Promise.all(requests.map((p, i): T => p.catch((e: unknown) => {
    if (process.env.DEBUG) {
      console.error(`Failed Fetching (probably unpublished) component ${components[i].type}-${components[i].id}`, e);
    }
    return null
  })));
}

export default fetchComponents;