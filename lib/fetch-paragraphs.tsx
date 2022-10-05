import {DrupalParagraph, getResource} from "next-drupal";

export async function fetchParagraphs(components: DrupalParagraph[]) {
  const requests = [];
  components.map(component => {
    requests.push(getResource<DrupalParagraph>(
      component.type,
      component.id
    ))
  })
  const paragraphs = await Promise.all(requests)

  return paragraphs.map(paragraph => {
    delete paragraph.links;
    delete paragraph.parent_field_name;
    delete paragraph.parent_type;
    delete paragraph.parent_id;
    delete paragraph.relationshipsNames;
    delete paragraph.resourceIdObjMeta;
    delete paragraph.revision_translation_affected;
    return paragraph
  })
}

export function fetchRowParagraphs(rows: DrupalParagraph[], componentField: string) {
  const requests = [];
  rows.map(row => {
    row[componentField].map(component => {
      requests.push(component)
    })
  })
  return fetchParagraphs(requests);
}
