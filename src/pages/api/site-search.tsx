import {getSearchIndex} from "next-drupal";

export default async function handler(req, res) {
  const query = req.query.q;
  const data = await getSearchIndex('full_site_content', {params: {'filter[fulltext]': query}});

  const getImageUuid = (node) => {
    switch (node.type){
      case 'node--stanford_news':
        return node.su_news_featured_media?.id ?? node.su_news_banner?.id;
      case 'node--stanford_page':
        return node.su_page_image?.id;
      case 'node--stanford_person':
        return node.su_person_photo?.id;
      case 'node--sul_library':
        return node.su_library__contact_img?.id;
    }
    return null;
  }

  const results = data.map(node => ({
    id: node.id,
    title: node.title,
    path: node.path.alias,
    image: getImageUuid(node),
  }))
  res.status(200).json(results);
}
