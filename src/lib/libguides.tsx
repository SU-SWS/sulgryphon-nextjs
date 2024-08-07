import axios from "axios"
import {LibGuide} from "@/lib/drupal/drupal"

const fetchLibGuides = async ({
  accountId,
  subjectId,
}: {
  accountId?: number
  subjectId?: number
}): Promise<LibGuide[]> => {
  if (!accountId && !subjectId) return []

  try {
    const token = await getAccessToken()
    if (!token) {
      return []
    }

    const guidesConfig = {
      headers: {Authorization: "Bearer " + token},
    }

    const params = new URLSearchParams()
    params.set("status", "1")

    if (subjectId) {
      params.set("subject_ids", subjectId.toString())
    }
    if (accountId) {
      params.set("account_ids", accountId.toString())
    }

    const response = await fetch(`https://lgapi-us.libapps.com/1.2/guides?${params.toString()}`, guidesConfig)
    if (!response.ok) {
      console.error("Libguide error: " + (await response.text()))
      return []
    }
    const guideData: {
      id: string
      name: string
      url: string
      type_label: string
      status: 1 | 0
    }[] = await response.json()

    const guides: LibGuide[] = []
    guideData
      .filter(guide => guide.status === 1)
      .map(guide => {
        guides.push({
          id: guide.id,
          title: guide.name,
          url: guide.url,
          type: guide.type_label,
        })
      })

    return guides
  } catch (e) {
    console.error(e)
  }
  return []
}

interface AccessToken {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token?: string
}

const getAccessToken = async () => {
  const token: AccessToken = await axios
    .post(`https://lgapi-us.libapps.com/1.2/oauth/token`, {
      client_id: process.env.LIBGUIDE_CLIENT_ID,
      client_secret: process.env.LIBGUIDE_CLIENT_SECRET,
      grant_type: "client_credentials",
    })
    .then(response => response.data)
  return token.access_token
}

export default fetchLibGuides
