import {deserialize} from "@/lib/drupal/deserialize"
import {NextResponse} from "next/server"
import {DayHours} from "@/lib/hooks/useLibraryHours"
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
export const GET = async () => {
  const revalidateIn = (60 - new Date().getMinutes()) * 60

  const from = new Date()
  from.setDate(from.getDate() - from.getDay())
  const to = new Date()
  to.setDate(to.getDate() + 6)

  const params = new URLSearchParams()
  params.set("from", from.toISOString().replace(/T.*/, ""))
  params.set("to", to.toISOString().replace(/T.*/, ""))

  const data: FetchedData = await fetch(`https://library-hours.stanford.edu/libraries.json?${params.toString()}`, {next: {revalidate: revalidateIn}})
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
  return NextResponse.json(locations)
}
