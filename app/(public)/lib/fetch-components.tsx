import {DrupalParagraph} from "next-drupal";
import {getResource} from "@/lib/drupal/get-resource";

const fetchComponents= async (components: DrupalParagraph[]) => {

  const requests: PromiseLike<any>[] = [];
  components.map(component => requests.push(getResource(component.type, component.id)));

  // @ts-ignore
  const fetchedComponents = await Promise.all(requests.map(p => p.catch(e => null)));

  fetchedComponents.map((item, i) => {
    if (item) {
      components[i] = item;
    }
  })

  return components;
}

export default fetchComponents;