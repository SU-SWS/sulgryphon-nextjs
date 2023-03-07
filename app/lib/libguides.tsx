import axios from "axios";

interface Guide {
  id: string
  title: string
  url: string
  type: string
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

    const guides: Guide[] = [];
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

export default fetchLibGuides