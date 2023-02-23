import axios from "axios";

export default async function handler(req, res) {
  const query = req.query.q;
  const results = [];

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
    const data = await axios.get(`https://lgapi-us.libapps.com/1.2/guides?sort_by=relevance&search_terms=${query}`, guidesConfig)
      .then(response => response.data);

    data.map(guide => {
      results.push({
        id: guide.id,
        title: guide.name,
        url: guide.url,
        type: guide.type_label
      })
    });
  } catch (e) {
  }
  res.status(200).json(results);
}
