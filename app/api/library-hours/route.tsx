import {deserialize} from "@/lib/drupal/deserialize"
import {NextResponse} from "next/server"
import {DayHours} from "@/lib/hooks/useLibraryHours"
import {LibraryHours} from "@/lib/drupal/drupal"
import {revalidateTag, unstable_cache as nextCache} from "next/cache"
import {fetchLibraryHours} from "./fetch-library-hours"

type FetchedData = {
  data: []
  included: {
    type: string
    id: string
    attributes: {
      name: string
      primary: boolean
      hours: DayHours[]
    }
  }[]
}

export const revalidate = false

const getLibraryHours = nextCache(
  async () => {
    const data: FetchedData = await fetchLibraryHours()
      .then(res => res.json())
      .catch(e => {
        console.error(e)
        return NextResponse.json([])
      })
    const deserializedData = deserialize(data) as LibraryHours[]
    if (!deserializedData) {
      return NextResponse.json([])
    }

    const locations: Record<
      string,
      {
        name: string
        type: string
        primaryHours: DayHours[]
        additionalLocations: {id: string; name: string; hours: DayHours[]}[]
      }
    > = {}

    deserializedData.map(place => {
      locations[place.id.toLowerCase()] = {
        name: place.name,
        type: place.type,
        primaryHours: place.hours,
        additionalLocations: [],
      }

      place.locations.map(additionalPlace => {
        const location = data.included.find(a => a.id == additionalPlace.id)
        if (!location) return

        if (location.attributes.primary) {
          return
        }
        locations[place.id.toLowerCase()].additionalLocations.push({
          id: additionalPlace.id.toLowerCase(),
          name: additionalPlace.name,
          hours: location.attributes.hours,
        })
      })
    })

    return locations
  },
  ["library-hours"],
  {
    tags: ["library-hours"],
  }
)

export const GET = async () => {
  const hours = await getLibraryHours()
  // If no data, try to invalidate the cached data, so we can re-try fetching the data.
  if (!hours) revalidateTag("library-hours")
  return NextResponse.json(hours)
}
