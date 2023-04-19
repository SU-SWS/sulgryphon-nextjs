import "server-only";
import axios from "axios";

export interface Guide {
  id: string
  title: string
  url: string
  type: string
}

const fetchLibGuides = async ({accountId, subjectId}: {accountId?: number, subjectId?: number}) => {
  if (!accountId && !subjectId) return [];

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

    const params = new URLSearchParams();

    if (subjectId) {
      params.set('subject_ids', subjectId.toString());
    }
    if (accountId) {
      params.set('account_ids', accountId.toString());
    }

    const data = await axios.get(`https://lgapi-us.libapps.com/1.2/guides?${params.toString()}`, guidesConfig)
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
    console.log(e);
  }
  return [];
}

export default fetchLibGuides