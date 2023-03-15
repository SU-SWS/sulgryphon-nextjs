import {getResource} from "@/lib/drupal/get-resource";

const fetchComponents = async (components: T[]): Promise<T[]> => {
  const requests: PromiseLike<any>[] = [];
  components.map(component => requests.push(getResource(component.type, component.id)));
  return Promise.all(requests.map(p => p.catch(() => null)));
}

export default fetchComponents;