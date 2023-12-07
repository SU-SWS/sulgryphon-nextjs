import {deserialize} from "@/lib/drupal/deserialize";
import {NextResponse} from "next/server";
import {DayHours} from "@/lib/hooks/useLibraryHours";

export type LibraryHours = {
  type: string
  id: string
  name: string
  primary_location: string
  locations: {
    type: string
    id: string
    name: string
    primary: boolean
    hours: DayHours[]
    links: {
      self: string
    }
    library: {
      type: string
      id: string
      name: string
      primary_location: string
      hours: DayHours[]
      links: [Object]
      locations: []
    }
  }[]
  hours: DayHours[]
}

type FetchedData = {
  data: []
  included: {
    type: string
    id: string
    attributes: {
      name: string,
      primary: boolean,
      hours: DayHours[]
    }
  }[]
}
export const GET = async () => {
  const revalidateIn = (60 - new Date().getMinutes()) * 60

  const data: FetchedData = await fetch('https://library-hours.stanford.edu/libraries.json', {next: {revalidate: revalidateIn}})
    .then(res => res.json())
    .catch(e => {
      console.error(e);
      return NextResponse.json([]);
    });

  const deserializedData = deserialize(data) as LibraryHours[];
  if (!deserializedData) {
    return [];
  }

  const locations: Record<string, {
    name: string,
    type: string,
    primaryHours: DayHours[],
    additionalLocations: { id: string, name: string, hours: DayHours[] }[]
  }> = {};

  deserializedData.map(place => {
    locations[place.id.toLowerCase()] = {
      name: place.name,
      type: place.type,
      primaryHours: place.hours,
      additionalLocations: []
    }

    place.locations.map(additionalPlace => {
      const location = data.included.find(a => a.id == additionalPlace.id);
      if (!location) return;

      if (location.attributes.primary) {
        return;
      }
      locations[place.id.toLowerCase()].additionalLocations.push({
        id: additionalPlace.id.toLowerCase(),
        name: additionalPlace.name,
        hours: location.attributes.hours
      })
    })
  });
  return NextResponse.json(locations);
}