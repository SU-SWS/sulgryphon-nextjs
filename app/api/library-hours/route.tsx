import {deserialize} from "@/lib/drupal/deserialize"
import {NextResponse} from "next/server"
import {DayHours} from "@/lib/hooks/useLibraryHours"
import {LibraryHours} from "@/lib/drupal/drupal"
import {unstable_cache as nextCache} from "next/cache"

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

export const revalidate = 3600

const getLibraryHours = nextCache(
  async () => {
    const from = new Date()
    from.setDate(from.getDate() - from.getDay())
    const to = new Date()
    to.setDate(to.getDate() + 6)

    const params = new URLSearchParams()
    params.set("from", from.toISOString().replace(/T.*/, ""))
    params.set("to", to.toISOString().replace(/T.*/, ""))

    const data: FetchedData = await fetch(`https://library-hours.stanford.edu/libraries.json?${params.toString()}`, {cache: "no-cache"})
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
  [],
  {
    tags: ["library-hours"],
    // Revalidate at 1 second after midnight. Calculate how many seconds since midnight, and subtract from total seconds
    // in a day.
    revalidate:
      60 * 60 * 24 +
      1 -
      (parseInt(
        new Date().toLocaleTimeString("en-us", {
          hour12: false,
          hour: "numeric",
          timeZone: "America/Los_Angeles",
        })
      ) *
        60 *
        60 +
        new Date().getMinutes() * 60 +
        new Date().getSeconds()),
  }
)

export const GET = async () => {
  return NextResponse.json(await getLibraryHours())
}
