import "server-only";
import {cache} from "@/lib/drupal/get-cache";

const CACHE_KEY = 'LIBGUIDE_TOKEN';

export interface Guide {
  id: string
  title: string
  url: string
  type: string
}

const fetchLibGuides = async ({accountId, subjectId}: { accountId?: number, subjectId?: number }) => {
  if (!accountId && !subjectId) return [];

  try {
    const token = await getAccessToken();
    const guidesConfig = {
      headers: {'Authorization': 'Bearer ' + token},
    }

    const params = new URLSearchParams();
    params.set('status', "1");

    if (subjectId) {
      params.set('subject_ids', subjectId.toString());
    }
    if (accountId) {
      params.set('account_ids', accountId.toString());
    }

    const guideData = await fetch(`https://lgapi-us.libapps.com/1.2/guides?${params.toString()}`, guidesConfig)
      .then(response => response.json())

    const guides: Guide[] = [];
    guideData.filter(guide => guide.status === 1)
      .map(guide => {
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

interface AccessToken {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token?: string
}

const getAccessToken = async () => {
  const cached = cache.get<AccessToken>(CACHE_KEY)
  if (cached?.access_token) {
    return cached.access_token
  }

  const basic = Buffer.from(
    `${process.env.LIBGUIDE_CLIENT_ID}:${process.env.LIBGUIDE_CLIENT_SECRET}`
  ).toString("base64")

  const response = await fetch(`https://lgapi-us.libapps.com/1.2/oauth/token`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials`,
  });
  if (!response.ok) {

  }
  const token: AccessToken = await response.json();

  cache.set(CACHE_KEY, token, token.expires_in)
  return token.access_token
}

export default fetchLibGuides