import {DrupalNode, DrupalParagraph, getResource} from "next-drupal";
import axios from "axios";

export const fetchParagraphs = async (components: DrupalParagraph[]) => {
  const requests = [];
  components.map(component => {
    requests.push(getResource<DrupalParagraph>(
      component.type,
      component.id
    ))
  })
  return await Promise.all(requests)
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
      node.lib_guides = await fetchLibGuides(node.sul_person__libguide_id);
      break;

    case 'node--stanford_event_series':
      paragraphs = await fetchParagraphs(node.su_event_series_components);
      node.su_event_series_components.map((component, i) => {
        node.su_event_series_components[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;

    case 'node--sul_library':
      paragraphs = await fetchParagraphs(node.su_library__paragraphs);
      node?.su_library__paragraphs.map((component, i) => {
        node.su_library__paragraphs[i] = paragraphs.find(paragraph => paragraph.id === component.id);
      })
      break;
  }
}

const fetchLibGuides = async (id) => {
  if (!id) {
    return [];
  }
  const oauthConfig = {
    client_id: process.env.LIBGUIDE_CLIENT_ID,
    client_secret: process.env.LIBGUIDE_CLIENT_SECRET,
    grant_type: 'client_credentials'
  };

  try {
    const token = await axios.post('https://lgapi-us.libapps.com/1.2/oauth/token', oauthConfig)
      .then(response => response.data.access_token)

    const guidesConfig = {
      headers: {'Authorization': 'Bearer ' + token},
    }
    const data = await axios.get(`https://lgapi-us.libapps.com/1.2/guides?account_ids=${id}`, guidesConfig)
      .then(response => response.data);

    const guides = [];
    data.map(guide => {
      guides.push({
        id: guide.id,
        title: guide.name,
        url: guide.url,
        type: guide.type_label
      })
    });

    return guides
  } catch (e) {
  }
  return [];
}