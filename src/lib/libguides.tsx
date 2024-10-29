import {LibGuide} from "@/lib/drupal/drupal"
import {unstable_cache as nextCache} from "next/cache"

const fetchLibGuides = async ({
  accountId,
  subjectId,
  cacheTags = [],
}: {
  accountId?: number
  subjectId?: number
  cacheTags?: Array<string>
}): Promise<LibGuide[]> => {
  const libguideFetchInternal = nextCache(
    async () => {
      if (!accountId && !subjectId) return []

      try {
        const token = await getAccessToken()
        if (!token) {
          console.warn("unable to fetch token")
          return []
        }

        const guidesConfig = {
          headers: {Authorization: "Bearer " + token},
        }

        const params = new URLSearchParams()
        params.set("status", "1")
        if (subjectId) params.set("subject_ids", subjectId.toString())
        if (accountId) params.set("account_ids", accountId.toString())

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
    },
    [accountId?.toString() || subjectId?.toString() || "libguides"],
    {tags: cacheTags}
  )
  return libguideFetchInternal()
}

type OauthResponse = {
  access_token: string
  expires_in: number
  token_type: "Bearer"
  scope: string
}

const getAccessToken = async () => {
  const headers = new Headers()
  headers.set("Content-Type", "application/x-www-form-urlencoded")
  return fetch("https://lgapi-us.libapps.com/1.2/oauth/token", {
    next: {revalidate: 60},
    method: "POST",
    headers,
    body: `grant_type=client_credentials&client_id=${process.env.LIBGUIDE_CLIENT_ID}&client_secret=${process.env.LIBGUIDE_CLIENT_SECRET}`,
  })
    .then(response => response.json())
    .then((oauthData: OauthResponse) => oauthData.access_token)
    .catch(_e => console.warn("Unable to fetch oauth token"))
}

export default fetchLibGuides
