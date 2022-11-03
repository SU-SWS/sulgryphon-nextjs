import {DrupalNode, DrupalParagraph, getResource} from "next-drupal";

export const fetchParagraphs = async (components: DrupalParagraph[]) => {
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

export const populateParagraphData = async (node: DrupalNode) => {
  let paragraphs = null

  switch (node.type) {
    case 'node--stanford_page':
      paragraphs = await fetchParagraphs(node.su_page_components);
      node?.su_page_components.map((component, i) => {
        node.su_page_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--stanford_publication':

      paragraphs = await fetchParagraphs(node.su_publication_components);
      node?.su_publication_components.map((component, i) => {
        node.su_publication_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--stanford_news':
      paragraphs = await fetchParagraphs(node.su_news_components);
      node.su_news_components.map((component, i) => {
        node.su_news_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--stanford_event':
      paragraphs = await fetchParagraphs(node.su_event_components);
      node.su_event_components.map((component, i) => {
        node.su_event_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--stanford_person':
      paragraphs = await fetchParagraphs(node.su_person_components);
      node.su_person_components.map((component, i) => {
        node.su_person_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--event_series':
      paragraphs = await fetchParagraphs(node.su_event_series_components);
      node.su_event_series_components.map((component, i) => {
        node.su_event_series_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;
  }
}