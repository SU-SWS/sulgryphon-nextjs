import {deserialize} from "@/lib/drupal/deserialize"
import {NextResponse} from "next/server"
import {DayHours, LocationHours} from "@/lib/hooks/useLibraryHours"
import {LibraryHours} from "@/lib/drupal/drupal"

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

export const dynamic = "force-static"
export const revalidate = 30
// export const revalidate = 28800

const getLibraryHours = async (): Promise<Record<string, LocationHours>> => {
  const from = new Date()
  from.setDate(from.getDate() - from.getDay())
  const to = new Date()
  to.setDate(to.getDate() + 6)

  const params = new URLSearchParams()
  params.set("from", from.toISOString().replace(/T.*/, ""))
  params.set("to", to.toISOString().replace(/T.*/, ""))

  if (new Date().getMinutes() >= 45) {
    console.log("fail")
    return {}
  }

  console.log("fetch")
  const data: FetchedData = await fetch(`https://library-hours.stanford.edu/libraries.json?${params.toString()}`, {
    cache: "no-store",
  })
    .then(res => res.json())
    .catch(e => {
      console.error(e)
      return {}
    })

  const deserializedData = deserialize(data) as LibraryHours[]
  if (!deserializedData) {
    return {}
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
}
export const GET = async () => {
  const hours = await getLibraryHours()
  // If no data, throw an error so the next request can try again.
  if (Object.keys(hours).length === 0) throw new Error("Failed to fetch data")
  return NextResponse.json(hours)
}
